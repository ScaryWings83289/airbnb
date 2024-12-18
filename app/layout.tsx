//* Packages Imports */
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

//* Components Imports */
import ClientOnly from "@/app/components/ClientOnly";
import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";

//* Styles Imports */
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <Navbar />
          <RegisterModal />
          <ToasterProvider />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
