
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Sparkles, Heart } from 'lucide-react';

export default function HeroSection() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'kawaii-banner');

  return (
    <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center text-center text-white overflow-hidden bg-gradient-to-b from-pink-300/20 via-purple-300/10 to-pink-300/20">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover opacity-20"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex justify-center items-center gap-2 sm:gap-4">
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-pink-400 animate-pulse fill-pink-400" />
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase font-kawaii tracking-wider" 
              style={{textShadow: "0 0 10px #EC4899, 0 0 20px #EC4899, 0 0 30px #f9a8d4"}}>
              <span className="bg-gradient-to-r from-pink-200 via-white to-pink-200 bg-clip-text text-transparent">
                Kawaii Gaming
              </span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl">Collection</span>
            </h1>
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-pink-400 animate-pulse fill-pink-400 [animation-delay:0.5s]" />
        </div>
        <p className="mt-4 mx-auto max-w-2xl text-base sm:text-lg text-pink-100/90 font-sans">
          Tu setup soñado con la estética más cute. ¡Equípate con estilo y domina con dulzura!
        </p>
      </div>
    </section>
  );
}
