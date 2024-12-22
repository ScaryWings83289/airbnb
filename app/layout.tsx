//* Packages Imports */
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

//* Components Imports */
import ClientOnly from "@/app/components/ClientOnly";
import LoginModal from "@/app/components/modals/LoginModal";
import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import RentModal from "@/app/components/modals/RentModal";
import ToasterProvider from "@/app/providers/ToasterProvider";

//* Utils Imports */
import { getCurrentUser } from "@/app/actions/getCurrentUser";

//* Styles Imports */
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <LoginModal />
          <Navbar currentUser={currentUser} />
          <RegisterModal />
          <RentModal />
          <ToasterProvider />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
