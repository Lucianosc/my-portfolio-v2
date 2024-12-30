import type { Metadata } from "next";
import { Montserrat, Hind } from "next/font/google";
import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const hind = Hind({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "Luciano Frontend Developer",
  description: "Showcasing my skills and experience as a Frontend Developer",
  keywords:
    "Frontend, Frontend Developer, Frontend Engineer, Frontend Dev, Frontend Devs, Frontend Developer Portfolio, Frontend Developer Profile, Frontend Developer Resume, Luciano Frontend Developer, Luciano Frontend Dev, Luciano Frontend Devs, Luciano Frontend Engineer, Luciano Frontend Engineers, Luciano Frontend Portfolio, Luciano Frontend Profile, Luciano Frontend Resume, Luciano Portfolio, Luciano Profile, Luciano Resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${montserrat.variable} ${hind.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
