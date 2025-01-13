import type { Metadata } from "next";
import "@/styles/globals.css";

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
