import "@/app/globals.css";
import { appConfig } from "@/config/app";
import { Metadata } from "next";
import { geist, geistMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { RealTimeProvider } from "@/components/realtime-provider";

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: "%s | " + appConfig.name,
  },
  applicationName: appConfig.name,
  description: appConfig.description,
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
  authors: [
    {
      name: "razlevio",
      url: "https://github.com/razlevio",
    },
  ],
  creator: "razlevio",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
  verification: {
    google: "google",
    yandex: "yandex",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        geist.className,
        geist.variable,
        geistMono.variable
      )}
      suppressHydrationWarning
    >
      <body>
        <RealTimeProvider />
        {children}
      </body>
    </html>
  );
}
