import { Button } from '@/components/ui/button';
import placeholderImages from '@/lib/placeholder-images.json';
import Link from 'next/link';
import { WhatsAppIcon, BuildPcIcon, WarrantyIcon, ShippingIcon } from '../icons';

const InfoCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="relative overflow-hidden rounded-lg bg-black/30 p-5 backdrop-blur-sm transition-all duration-300 ring-1 ring-border/20 hover:ring-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
        <div className="flex items-center gap-4">
            <div className="text-primary">{icon}</div>
            <div>
                <h3 className="font-bold text-base text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    </div>
);


export default function PcBuilder() {
  const bgImage = placeholderImages.placeholderImages.find(p => p.id === 'pc-builder-bg');
  const phoneNumber = "1234567890";
  const message = "¡Hola EZBUY! Quisiera recibir asesoría para armar mi propia PC gamer.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


  return (
    <section 
      className="relative py-24 sm:py-32 h-full flex flex-col justify-center"
    >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: bgImage ? `url(${bgImage.imageUrl})` : 'none' }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-brightness-50" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="text-center lg:text-left">
                    <h2 className="text-4xl sm:text-5xl font-black uppercase font-headline tracking-tighter">
                        CONSTRUYE TU MÁQUINA
                        <br />
                        <span className="text-primary">
                            DEFINITIVA
                        </span>
                    </h2>
                    <p className="mt-4 max-w-lg mx-auto lg:mx-0 text-base sm:text-lg text-muted-foreground">
                        Personaliza cada componente con ayuda de expertos y crea el setup perfecto para tu estilo de juego.
                    </p>
                    <div className="mt-8 flex justify-center lg:justify-start">
                        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full font-bold text-lg h-14 px-8 uppercase tracking-wider border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--primary))] transition-all duration-300">
                            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                <WhatsAppIcon className="mr-2 h-5 w-5" />
                                PEDIR ASESORÍA
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <InfoCard 
                        icon={<BuildPcIcon className="w-8 h-8" />}
                        title="+5,000 PCs Armadas"
                        description="Experiencia y calidad garantizada en cada ensamble."
                    />
                    <InfoCard 
                        icon={<WarrantyIcon className="w-8 h-8" />}
                        title="Garantía de por Vida"
                        description="Soporte y confianza total en todos nuestros componentes."
                    />
                    <InfoCard 
                        icon={<ShippingIcon className="w-8 h-8" />}
                        title="Envío a Nivel Nacional"
                        description="Recibe tu nueva PC en la puerta de tu casa, estés donde estés."
                    />
                </div>
            </div>
        </div>
    </section>
  );
}
