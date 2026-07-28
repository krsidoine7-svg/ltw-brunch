import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Brunch Light of the World — 2ᵉ Édition | La Guérison des Victimes de Viols',
  description: 'Inscrivez-vous gratuitement à la 2ᵉ Édition du Brunch Light of the World le 14 Août 2026 à 08h30 à HETEC Dokui. Génération de ticket mobile, QR Code et studio d\'affiches.',
  openGraph: {
    title: 'Brunch Light of the World — 2ᵉ Édition',
    description: 'La Guérison des Victimes de Viols. 14 Août 2026 à HETEC Dokui. Obtenez votre ticket smartphone !',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-dark`}>
        {children}
      </body>
    </html>
  );
}
