//* Packages Imports */
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

//* Components Imports */
import Navbar from "@/app/components/navbar/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
