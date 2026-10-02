import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Added the verification tag directly into Next.js metadata object
export const metadata: Metadata = {
  title: "SignalFlow — Make Your Marketing Measurable",
  description:
    "SignalFlow helps businesses understand which marketing efforts create real results.",
  verification: {
    google: "GZdgo9v425_MDtO3d6a2v3UyyrXLlZhdgeWft6XEirk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        {/* Google Tag Manager (Kept for your Meta Ads tracking) */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://googletagmanager.com;
            })(window,document,'script','dataLayer','GTM-N26D2JCF');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
