'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import placeholderImages from '@/lib/placeholder-images.json';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

function KickIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 7"
            fill="currentColor"
        >
            <path d="M0 0h3v1H1v1H0v3h1v1H0v2h1V6h2V5h1V2H3v1H1V2h2V0H0zm5 0h2v5H5V0zm1 6h1v1H6v-1zM9 0h3v1H9v1h2v1H9v1h2v1H9v2h3v-1h-1V5h1V4h1V1H9V0zm5 0h3v1h-2v5h2v1h-3V0zm4 0h3v1h-1v1h-1v1h1v1h1v1h-2v1h-1V0z" />
        </svg>
    );
}


function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2859 3333"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M2081 0c55 473 319 755 778 781v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753-356-583-138-1606 1004-1647v561c-87 14-180 36-265 65-254 86-398 247-358 531 77 544 1075 705 992-358V1h551z" />
    </svg>
  );
}

const StreamCard = ({ platform, user, link, icon, colorClass, bgColorClass, shadowColorClass }: { platform: string, user: string, link: string, icon: React.ReactNode, colorClass: string, bgColorClass: string, shadowColorClass: string }) => (
    <div className={cn("relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 group", bgColorClass, "hover:border-primary/50")}>
        <div className="p-6 flex flex-col items-center text-center">
            <div className={cn("mb-4 h-16 w-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110", colorClass)}>
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-white">{platform}</h3>
            <p className="text-muted-foreground font-semibold">{user}</p>
            <Button asChild className={cn("mt-6 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105", shadowColorClass)}>
                <Link href={link} target="_blank" rel="noopener noreferrer">
                    Ver en Vivo
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
    </div>
);

const backgroundImages = [
    placeholderImages.placeholderImages.find(p => p.id === 'stream-bg-valorant'),
    placeholderImages.placeholderImages.find(p => p.id === 'stream-bg-csgo'),
    placeholderImages.placeholderImages.find(p => p.id === 'stream-bg-battlefield'),
    placeholderImages.placeholderImages.find(p => p.id === 'stream-bg-arcraiders'),
    placeholderImages.placeholderImages.find(p => p.id === 'stream-bg-minecraft'),
].filter(Boolean) as any[];


export default function LiveStreams() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);
    
    return (
        <section className="relative py-24 sm:py-32 border-y border-border overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute inset-0">
                {backgroundImages.map((bgImage, index) => (
                    <div
                        key={bgImage.id}
                        className={cn(
                            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out",
                            index === currentImageIndex ? "opacity-20" : "opacity-0"
                        )}
                        style={{ backgroundImage: `url(${bgImage.imageUrl})` }}
                        data-ai-hint={bgImage.imageHint}
                    />
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background" />
            <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-background to-transparent" />

            <div className="relative container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl sm:text-5xl font-black uppercase font-headline tracking-tighter">
                    Únete al <span className="text-primary">Squad</span>
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    ¡No te pierdas ni un segundo de la acción! Sígueme en mis canales y forma parte de la comunidad.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <StreamCard 
                        platform="Kick"
                        user="s4ndias"
                        link="https://kick.com/s4ndias"
                        icon={<KickIcon className="w-auto h-8" />}
                        colorClass="text-green-400"
                        bgColorClass="bg-green-500/5"
                        shadowColorClass="bg-green-500 text-white hover:bg-green-400 shadow-[0_0_20px_theme(colors.green.500)]"
                    />
                    <StreamCard 
                        platform="TikTok"
                        user="@s4ndias"
                        link="https://www.tiktok.com/@s4ndias"
                        icon={<TikTokIcon className="h-10 w-10" />}
                        colorClass="text-white"
                        bgColorClass="bg-pink-500/5"
                        shadowColorClass="bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_#fff]"
                    />
                </div>
            </div>
        </section>
    );
}
