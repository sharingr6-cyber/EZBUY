'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import Link from 'next/link';

export default function HeroSection() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-banner');

  return (
    <section 
      className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center text-center text-white overflow-hidden"
    >
      {heroImage && (
         <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage.imageUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-background to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase font-headline tracking-tighter">
          Domina el Juego con el
          <br />
          <span className="bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
            Setup Definitivo
          </span>
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground">
          Ofertas exclusivas en los componentes y periféricos más potentes para llevar tu experiencia gaming al límite.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto rounded-full font-bold text-lg h-14 px-8 uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary))]">
            <Link href="/products?sort=popular">
              Ver Oferta Estrella
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full font-bold text-lg h-14 px-8 uppercase tracking-wider border-2 border-primary text-primary hover:bg-primary/10 transition-all">
            <Link href="/products">
              Explorar Todo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
