import type { Metadata } from "next";
import { ContactBadge } from "@/components/ContactBadge";
import { StoreProvider } from "@/components/StoreProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATELIER OBJECTS — Objects for Quiet Living",
  description: "A demonstration storefront for enduring furniture, lighting, and objects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
          <ContactBadge />
        </StoreProvider>
      </body>
    </html>
  );
}
