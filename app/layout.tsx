import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Club Amsterdam — Barbería de Élite",
  description: "Una barbería. Un club. Un estándar. Membresías exclusivas, reservas online y cortes de precisión en Amsterdam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
