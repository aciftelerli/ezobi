import type { Metadata } from "next";
import { Fraunces, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Storimini | Kişiselleştirilmiş Masal Platformu",
  description: "Storimini ile çocuğunuzun adı, ilgileri ve hayal gücüyle kişiselleştirilmiş masallar oluşturun.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={poppins.variable + " " + fraunces.variable}>
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
