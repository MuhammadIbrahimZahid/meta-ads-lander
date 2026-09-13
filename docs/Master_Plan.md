# SignalFlow Analytics Lab — Master Plan

## Phase 0 — Foundation

**Goal:** establish a clean architecture.

We'll have:

```
SignalFlow website
       ↓
   dataLayer
       ↓
      GTM
   ↙       ↘
Meta Pixel   GA4
   ↓          ↓
Test Events  DebugView
```

### Tasks

- Keep the existing Meta Pixel `1467512768547538`
- Keep the existing `PageView`
- Set up GA4
- Connect GA4 through GTM
- Establish our `dataLayer` convention
- Learn GTM Preview
- Learn publishing/versioning
- Verify the same user action in:
  - browser Network
  - GTM Preview
  - Meta Test Events
  - GA4 DebugView

  **Checkpoint:** PageView works in both Meta and GA4.

---

# Phase 1 — Basic Meta Events

We'll build an **Event Lab** page containing buttons/actions.

For example:

```
Event Lab

[ View Content ]
[ Generate Lead ]
[ Contact ]
[ Search ]
[ Login ]
[ Sign Up ]
[ Share ]
```

Each action will push an event into the `dataLayer`.

Example:

```
dataLayer.push({
  event: "generate_lead",
  lead_type: "demo_request",
  form_id: "demo_form"
});
```

GTM will then translate that into the appropriate Meta event.

We'll learn:

- Custom Event triggers
- Data Layer Variables
- Meta Pixel Event tags
- event parameters
- event naming
- testing
- publishing

  **Checkpoint:** several Meta standard events successfully arrive in Test Events.

---

# Phase 2 — GA4 Event Mapping

Now the interesting part.

The **same website action** will feed both platforms.

For example:

```
Website
   ↓
generate_lead
   ↓
  GTM
  ↙  ↘
Meta  GA4
Lead  generate_lead
```

We'll learn that Meta and GA4 don't necessarily use identical event names.

For example:

| User action  | Meta                   | GA4             |
| ------------ | ---------------------- | --------------- |
| Lead form    | `Lead`                 | `generate_lead` |
| Signup       | `CompleteRegistration` | `sign_up`       |
| Search       | `Search`               | `search`        |
| Login        | `Login`                | `login`         |
| Content view | `ViewContent`          | `view_item`     |

We'll verify each platform independently.

**Checkpoint:** one `dataLayer` event → two analytics platforms.

---

# Phase 3 — Event Parameters

This is where I want us to slow down and really understand GTM.

Instead of:

```
dataLayer.push({
  event: "generate_lead"
});
```

we'll start sending:

```
dataLayer.push({
  event: "generate_lead",
  lead_type: "demo_request",
  form_id: "demo_form",
  value: 100,
  currency: "USD"
});
```

Then we'll learn:

```
dataLayer
   ↓
Data Layer Variable
   ↓
GTM
   ↓
Meta parameter
   +
GA4 parameter
```

We'll deliberately inspect every value at every stage.

**Checkpoint:** we understand exactly how a JavaScript value gets from the website into Meta and GA4.

---

# Phase 4 — Ecommerce Laboratory

We'll turn part of SignalFlow into a fake store.

Something like:

```
/shop
/shop/product
/shop/cart
/shop/checkout
/shop/payment
/shop/success
```

Then we'll implement the ecommerce journey.

### GA4

We'll use Google's recommended ecommerce structure:

```
view_item
add_to_cart
view_cart
begin_checkout
add_payment_info
purchase
refund
```

GA4's ecommerce model uses structured `items`, `value`, `currency`, `transaction_id`, etc., so this will teach us the real-world implementation rather than simplified examples. Google for Developers+1

### Meta

We'll map the appropriate Meta events:

```
ViewContent
AddToCart
InitiateCheckout
AddPaymentInfo
Purchase
```

**Checkpoint:** complete a fake purchase and see the correct event + parameters in both systems.

---

# Phase 5 — Event IDs & Deduplication

Now we get into **real Meta implementation territory**.

We'll introduce:

```
event_name
event_id
```

For example:

```
event_name = Purchase
event_id   = ORDER-10001
```

Then we'll learn why an event sent from:

```
Browser Pixel
```

and the same event sent from:

```
Conversions API
```

must be identifiable as the same event rather than two purchases.

We'll intentionally create duplicates and then fix them.

**Checkpoint:** understand browser/server event deduplication.

---

# Phase 6 — Conversions API

Only after the browser implementation is solid.

We'll implement:

```
             Purchase
                │
          ┌─────┴─────┐
          ↓           ↓
       Browser      Server
       Pixel         CAPI
          │           │
          └─────┬─────┘
                ↓
              Meta
```

We'll test:

- browser only
- server only
- browser + server
- duplicate events
- event IDs
- deduplication

This is where all the previous phases start coming together.

---

# Phase 7 — Advanced GA4

We'll then go deeper into GA4:

- event parameters
- custom dimensions
- custom metrics
- key events
- ecommerce reporting
- DebugView
- attribution
- user properties
- session behavior
- event naming conventions

We'll use GA4's documented recommended event structures rather than making everything custom. Google for Developers+1

---

# Phase 8 — Debugging Laboratory

This one is **mandatory**.

We'll intentionally break things.

For example:

```
❌ dataLayer doesn't fire
❌ wrong event name
❌ wrong GTM trigger
❌ variable undefined
❌ Meta tag doesn't fire
❌ GA4 tag doesn't fire
❌ parameter missing
❌ wrong Pixel ID
❌ wrong GA4 measurement ID
❌ unpublished GTM container
❌ browser request blocked
❌ duplicate Purchase
```

Then we'll diagnose each one systematically.

The goal is that eventually you can look at:

```
dataLayer
GTM Preview
Network
Meta Test Events
GA4 DebugView
```

and immediately figure out **where the chain broke**.

---

# Phase 9 — Final Real-World Project

At the end, SignalFlow itself becomes a miniature real-world tracking implementation.

We'll have something like:

```
                    SIGNALFLOW
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      Website        GTM           Backend
        │              │              │
        ↓              ↓              ↓
    dataLayer      Meta Pixel       CAPI
                       │
                       ↓
                     Meta

                       +

                      GA4
                       │
                       ↓
                   Analytics
```

And we'll document the entire implementation.

---

# Our Golden Rule

I want us to follow one rule throughout the project:

> **Never add an event without understanding the entire path that event takes.**

For every event we'll answer:

1. **What user action happened?**
2. **What does the website push to `dataLayer`?**
3. **What does GTM see?**
4. **Which trigger fires?**
5. **What Meta event is sent?**
6. **What parameters are sent?**
7. **What GA4 event is sent?**
8. **What does the browser Network request look like?**
9. **What does Meta Test Events show?**
10. **What does GA4 DebugView show?**
11. **What happens after publishing?**

That will prevent us from turning this into a "click these 17 buttons" tutorial.

---

# Current Status

We're **not starting from zero**.

### Completed

- [x] Vercel site
- [x] GTM installed
- [x] Meta Pixel created
- [x] Meta Pixel ID `1467512768547538`
- [x] Meta Base/PageView tag
- [x] GTM Preview verified
- [x] GTM container published
- [x] Live browser event verified
- [x] Meta Test Events verified
- [x] `PageView` = **Processed**

### Current position

**Phase 0 — Foundation**

We're ready to move to:

> **GA4 + our `dataLayer` architecture**

And I suggest we **do not build ten Meta events yet**.

First, let's establish the clean architecture with **one deliberately designed event**, understand it completely, and then replicate the pattern.

That one event will become our template for everything that follows.
