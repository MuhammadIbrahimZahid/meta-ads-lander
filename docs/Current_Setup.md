You’ve reached the point where adding more code without first establishing the architecture would make the system harder to understand. Looking at the complete codebase, the pieces actually form a coherent pipeline; they just need to be separated conceptually.

## 1\. What you have right now

Your system has **three distinct layers**:

```
                    WEBSITE
                       │
                       ▼
              ┌─────────────────┐
              │   Next.js app   │
              └─────────────────┘
                 │           │
        browser  │           │ server
        signal   │           │
                 ▼           ▼
               GTM       /api/lead
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
             Meta CAPI             HubSpot CRM
             Lead event             Contact
                                       │
                                       │ sales changes
                                       ▼
                                hs_lead_status
                                       │
                                       ▼
                              HubSpot Webhook
                                       │
                                       ▼
                              /api/webhooks/hubspot
                                       │
                                       ▼
                                  Meta CAPI
                                  Lead event
```

And that distinction is **extremely important**.

You don't have "one Lead event."

You have **two different business moments that currently happen to use Meta's `Lead` event name**.

### Moment 1 — Website lead submitted

This happens here:

```
/lead
   ↓
/api/lead
   ↓
Meta CAPI
   ↓
HubSpot
   ↓
GTM/browser event
```

The user submits the form.

Your server sends:

```
event_name: "Lead"
```

to Meta.

Then you create/update the HubSpot contact.

Then the browser pushes:

```
event: "generate_lead"
```

into the GTM dataLayer.

That's your original tracking architecture.

---

## 2\. Your browser + CAPI setup is intentional

You said something very important:

> "when we submit a lead, first it's sent to meta via CAPI and then it's sent as a browser event. That was intentional"

Correct.

Your current `/api/lead` does:

```
const metaResult = await sendMetaLeadEvent(...)
```

and then the client does:

```
pushToDataLayer({
  event: "generate_lead",
  ...
});
```

So conceptually:

```
                    FORM SUBMIT
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
        Server-side              Browser-side
          CAPI                      GTM
             │                       │
             ▼                       ▼
        Meta "Lead"             browser event
```

That's a valid architecture.

But there is an important thing we should eventually verify: **whether the browser event and server event are actually configured in Meta to represent the same conversion and deduplicate correctly.**

Your current code generates:

```
const eventId = crypto.randomUUID();
```

and sends that same ID to your server-side Meta event.

It also puts the same ID into the GTM dataLayer.

That's actually a very useful foundation for deduplication.

We shouldn't casually change that.

---

# 3\. Then HubSpot introduced a completely different signal

This is the part that I think got conceptually tangled.

The HubSpot integration isn't really another way of tracking the **form submission**.

It's tracking what happens **after the submission**.

You have:

```
User submits form
       │
       ▼
HubSpot contact created
       │
       │
       │ sales process
       ▼
Lead status = CONNECTED
       │
       ▼
HubSpot webhook
       │
       ▼
Meta CAPI
```

That's a **CRM-qualified signal**.

That's much more interesting from an advertising perspective.

The first Meta Lead means:

> "Someone submitted our form."

The second Meta Lead means:

> "This particular person eventually reached CONNECTED in our CRM."

Those are not the same business event.

---

# 4\. And this explains your "Deduplicated" observation

This is the key point.

You currently generate this for the HubSpot event:

```
const eventId = `hubspot-connected-${contactId}`;
```

Suppose the contact is:

```
551767282365
```

Then every CONNECTED notification produces:

```
hubspot-connected-551767282365
```

So imagine you do:

```
NEW
 ↓
CONNECTED
```

Meta receives:

```
event_name = Lead
event_id   = hubspot-connected-551767282365
```

Then you do:

```
CONNECTED
 ↓
NEW
```

No Meta event is sent because your code explicitly says:

```
if (leadStatus !== "CONNECTED") {
  continue;
}
```

Then:

```
NEW
 ↓
CONNECTED
```

again.

Your code sends:

```
event_name = Lead
event_id   = hubspot-connected-551767282365
```

**again**.

That is why your Events Manager can show:

> Deduplicated

The repeated status transition is using the **same event ID**.

And that's not necessarily bad.

In fact, it demonstrates that your event ID is doing what you designed it to do: identifying the same logical CRM conversion.

But it reveals an architectural question we now need to answer:

> **Do we want "CONNECTED" to be counted once per contact ever, or once every time the contact newly transitions into CONNECTED?**

Those are two different business rules.

---

# 5\. I would NOT change code yet

This is where I want us to slow down.

Your instinct to "make logical sense of what we have" is correct.

I don't think we should immediately start editing `route.ts`, `meta-capi.ts`, or the HubSpot project.

Instead, let's establish the event model.

I would currently define your system like this:

| Business moment         | Source       | Destination     | Purpose                |
| ----------------------- | ------------ | --------------- | ---------------------- |
| Product viewed          | Browser/GTM  | Meta            | Website behavior       |
| Add to cart             | Browser/GTM  | Meta            | Website behavior       |
| Form submitted          | Browser/GTM  | Meta            | Initial conversion     |
| Form submitted          | Server/CAPI  | Meta            | Server-side conversion |
| Contact created/updated | Next.js      | HubSpot         | CRM capture            |
| Lead becomes CONNECTED  | HubSpot      | Next.js webhook | CRM qualification      |
| Lead becomes CONNECTED  | Next.js/CAPI | Meta            | Qualified conversion   |

That is already a very sensible architecture.

---

# 6\. There's one particularly important distinction

Your current HubSpot event sends:

```
eventName: "Lead"
```

with:

```
customData: {
  lead_status: "CONNECTED",
  lead_source: "hubspot",
  lead_form: "demo_request",
}
```

So Meta sees:

```
Lead
├── lead_source = hubspot
├── lead_form = demo_request
└── lead_status = CONNECTED
```

That's technically workable.

But conceptually, we're now saying:

```
Lead
```

means both:

```
website form submission
```

and:

```
CRM-connected lead
```

That's something we should deliberately decide rather than inherit accidentally.

Maybe `Lead` is exactly what you want.

Maybe eventually the CRM event should be a different Meta event.

Maybe you want both to be `Lead` because Meta's optimization model should learn from the same conversion category.

Maybe you want the CRM signal represented differently.

**That's an architectural decision, not a coding decision.**

---

# 7\. There's also a security issue we should keep

Your HubSpot webhook route currently verifies:

```
x-hubspot-signature-v3
x-hubspot-request-timestamp
```

and uses:

```
HMAC SHA-256
```

That's good.

HubSpot's current developer documentation explicitly describes V3 validation as using the request method + URI + raw body + timestamp, with a five-minute timestamp window. HubSpot Developers

So this part of your code is not something I'd casually remove.

Likewise, your HubSpot webhook subscription is correctly focused on:

```
{
  "subscriptionType": "object.propertyChange",
  "objectType": "contact",
  "propertyName": "hs_lead_status",
  "active": true
}
```

That's exactly the sort of property-change subscription the current HubSpot developer platform supports. HubSpot Developers+1

---

# 8\. One thing I immediately notice in your code

There's some cleanup we should eventually do.

For example:

```
type HubSpotContactInput = {
  email: string;
  name?: string;
  leadSource?: string;
  leadForm?: string;
};
```

but:

```
export async function upsertHubSpotContact({
  email,
  name,
}: HubSpotContactInput)
```

doesn't actually use:

```
leadSource
leadForm
```

So those values are being passed:

```
leadSource: lead_source,
leadForm: lead_form,
```

but discarded.

That's not necessarily breaking anything, but it tells us the code evolved incrementally.

Similarly, your `meta-capi.ts` has:

```
customData?: Record<string, unknown>;
```

which is good because you've generalized it beyond the original Lead event.

And:

```
sendMetaLeadEvent()
```

now simply becomes a convenience wrapper around:

```
sendMetaEvent()
```

That's also a good evolution.

So we're not starting over.

We're **consolidating what you've already built**.

---

# 9\. The architecture I think we should aim for

I'd like the project to eventually have a very explicit mental model:

### Layer A — Website analytics

```
Next.js UI
   ↓
dataLayer
   ↓
GTM
   ↓
browser advertising/analytics
```

This handles things such as:

```
view_item
add_to_cart
generate_lead
```

---

### Layer B — Server-side conversion tracking

```
Next.js API
   ↓
Meta CAPI
```

This handles server-confirmed events.

For example:

```
POST /api/lead
      ↓
Meta Lead
```

---

### Layer C — CRM

```
POST /api/lead
      ↓
HubSpot contact
```

HubSpot becomes the system where the lead's business lifecycle lives.

---

### Layer D — CRM → advertising feedback

```
HubSpot
   │
   │ hs_lead_status changes
   ▼
Webhook
   │
   ▼
Next.js
   │
   ▼
Meta CAPI
```

This is where you tell Meta:

> "The lead you originally received isn't just a raw form submission anymore. It reached a meaningful CRM milestone."

That's the sophisticated part of the architecture.

---

# 10\. And this is where your original learning goal becomes much clearer

You originally wanted to learn:

> GTM → Meta

Then:

> browser + CAPI

Then:

> CRM → advertising feedback

You have actually progressed through those layers.

So I would **not** throw away the project or flatten everything into one tracking mechanism.

Instead, we should turn it into a deliberate experiment:

```
                SIGNALFLOW

       ┌────────────────────────┐
       │     Website events     │
       │                        │
       │ view_item              │
       │ add_to_cart            │
       │ generate_lead          │
       └───────────┬────────────┘
                   │
             GTM / Browser
                   │
                   ▼
                 META
                   ▲
                   │
              Meta CAPI
                   │
       ┌───────────┴────────────┐
       │                        │
   /api/lead              HubSpot webhook
       │                        ▲
       ▼                        │
   HubSpot ────────────── CRM status
```

And then we can ask intelligent questions at each boundary.

---

## The next thing I would do

**Don't change anything yet.**

We've got enough information now to perform an architecture audit.

I'd propose we go through these **four questions in order**:

1. **What exactly happens when the user submits `/lead`?**
2. **How does GTM turn `generate_lead` into a Meta browser event, and how is it deduplicated against CAPI?**
3. **What exactly does HubSpot own after the lead enters the CRM?**
4. **Exactly when should a HubSpot status change produce a Meta conversion, and how should we identify/deduplicate that conversion?**

Once those four are crystal clear, we can clean up the code.

And importantly, **we should not use the current Events Manager "Deduplicated" label as evidence that something is broken**. In your controlled test, the same contact was intentionally moved through `CONNECTED` more than once while your code deliberately reused `hubspot-connected-551767282365`; seeing deduplication is therefore consistent with the current implementation.

HubSpot also explicitly notes that webhook deliveries can be retried, so having an idempotency/deduplication strategy on the receiving side is important rather than optional. HubSpot Developers

**So yes: let's stop adding pieces and make the system make sense first.** That's the right next phase.
