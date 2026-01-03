import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Zap, AlertTriangle } from 'lucide-react';

export default function OfertasHero() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'pc-builder-bg');

  return (
    <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center text-center text-white overflow-hidden bg-gradient-to-b from-destructive/40 via-destructive/20 to-background">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover opacity-10"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex justify-center items-center gap-4">
            <Zap className="w-16 h-16 text-destructive animate-pulse" />
            <h1 
              className="text-5xl md:text-7xl font-black uppercase font-headline tracking-tighter" 
              style={{textShadow: "0px 0px 15px hsl(var(--destructive))"}}>
              <span className="bg-gradient-to-r from-destructive via-red-400 to-amber-400 bg-clip-text text-transparent">
                OFERTAS
              </span>
              <br />
              <span className="text-4xl md:text-6xl">¡IMPERDIBLES!</span>
            </h1>
            <Zap className="w-16 h-16 text-destructive animate-pulse [animation-delay:0.5s]" />
        </div>
        <p className="mt-4 mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground font-sans flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          ¡Solo por tiempo limitado! Aprovecha los mejores precios.
        </p>
      </div>
    </section>
  );
}
