import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/layout/Footer";
import "../globals.css";
import { Providers } from "./provider";
import { ToasterProvider } from "@/shared/providers/toaster-provider";
import { QueryProvider } from "@/providers/QueryProvider";
import ClientHeader from "@/components/client/clientHeader";
import { Metadata } from "next";

// Define the Locale type locally
type Locale = "en" | "fr"; // Add other supported languages as needed

// Keywords by language
const keywordsFr = [
  "",
];

const keywordsEn = [
  "",
];

// Dynamic metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;

  // Select keywords based on locale
  const keywords = locale === "fr" ? keywordsFr : keywordsEn;

  // Add common keywords to the language-specific ones
  const allKeywords = [
    "",
    "",
    "",
    "",
    "",
    "",
    ...keywords,
  ];

  // Descriptions by language
  const descriptionFr =
    "Meilleur Taux.";

  const descriptionEn =
    "Meilleur Taux.";

  // Select description based on locale
  const description = locale === "fr" ? descriptionFr : descriptionEn;
  const urlSiteBackup = "https://www.meilleurtaux.com/";
  // Base metadata that's common across locales
  const titleDefault =
    locale === "fr"
      ? "Meilleur Taux."
      : "Meilleur Taux.";
  const baseMetadata: Metadata = {
    title: {
      default: titleDefault,
      template: "%s | Meilleur Taux Madagascar",
    },
    viewport: "width=device-width, initial-scale=1",
    authors: [{ name: "Arkeup" }],
    keywords: allKeywords,
    description: description,

    // Robots configuration
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Favicon configuration
    icons: {
      icon: "/icons/favicon.ico",
      shortcut: "/icons/icon0.png",
      apple: "/icons/icon0.png",
      other: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          url: "/icons/icon0.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          url: "/icons/icon0.png",
        },
        {
          rel: "mask-icon",
          url: "/icons/icon0.png",
          color: "#5bbad5",
        },
      ],
    },

    // Alternate languages for SEO
    alternates: {
      canonical: `${
        process.env.NEXT_PUBLIC_SITE_URL || urlSiteBackup
      }/${locale}`,
      languages: {
        fr: `${process.env.NEXT_PUBLIC_SITE_URL || urlSiteBackup}/fr`,
        en: `${process.env.NEXT_PUBLIC_SITE_URL || urlSiteBackup}/en`,
      },
    },
  };

  // Open Graph metadata
  const openGraph = {
    type: "website",
    locale: locale,
    url: process.env.NEXT_PUBLIC_SITE_URL || urlSiteBackup,
    siteName: titleDefault,
    title: titleDefault,
    description: description,
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_SITE_URL || urlSiteBackup
        }/og-image.jpg`,
        width: 1200,
        height: 630,
        alt:
          locale === "fr"
            ? "Meilleur Taux."
            : "Meilleur Taux.",
      },
    ],
  };

  return {
    ...baseMetadata,
    openGraph,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-gray-100" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <Providers>
              <ClientHeader />
              <main>{children}</main>
              <Footer />
              <ToasterProvider />
            </Providers>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
