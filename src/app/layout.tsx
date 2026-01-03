import type { Metadata } from 'next';
import Head from 'next/head';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import WhatsAppFab from '@/components/whatsapp-fab';
import { Inter, Fredoka } from 'next/font/google';
import { CartProvider } from '@/context/cart-context';
import CartSidebar from '@/components/cart/cart-sidebar';
import { FirebaseClientProvider } from '@/firebase';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fredoka',
});

export const metadata: Metadata = {
  title: 'EZBUY | Tienda de PC Gamer y Hardware en Perú',
  description: 'La mejor tienda de componentes de PC y hardware gaming en Perú. Venta de tarjetas de video, procesadores y más con garantía y envíos a todo el Perú.',
  keywords: 'PC Gamer Perú, Tienda de cómputo Perú, Hardware Gaming Lima, Tarjetas de video Perú, Componentes de PC, RTX Perú, Armado de PC Gamer, EZBUY Perú',
  openGraph: {
    title: 'EZBUY | Tienda de PC Gamer y Hardware en Perú',
    description: 'El setup definitivo para gamers. Ofertas en tarjetas de video, procesadores y periféricos.',
    url: 'https://ezbuy.com.pe', // Reemplazar con el dominio real
    siteName: 'EZBUY',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?w=1200&h=630&fit=crop', // URL de una imagen representativa para Open Graph
        width: 1200,
        height: 630,
        alt: 'Setup de PC Gamer de alto rendimiento de EZBUY',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
};

const storeSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "EZBUY",
  "url": "https://ezbuy.com.pe", // Reemplazar con el dominio real
  "description": "Tienda especialista en hardware, componentes y periféricos para PC Gamer en Perú. Ofrecemos garantía y envíos a nivel nacional.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PE"
  },
  "priceRange": "S/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" className="dark">
      <Head>
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
          />
      </Head>
      <body className={cn(
        "font-body bg-background text-foreground antialiased min-h-screen flex flex-col",
        inter.variable,
        fredoka.variable
        )}>
          <FirebaseClientProvider>
            <CartProvider>
              <div className="flex flex-col flex-grow">
                {children}
              </div>
              <CartSidebar />
              <Toaster />
              <WhatsAppFab phoneNumber="1234567890" message="Hola, estoy interesado en sus productos." />
            </CartProvider>
          </FirebaseClientProvider>
      </body>
    </html>
  );
}
