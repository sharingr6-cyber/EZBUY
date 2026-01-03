import { flashSaleProducts } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/product-card";
import { Clock } from "lucide-react";
import placeholderImages from '@/lib/placeholder-images.json';

function CountdownTimer() {
    const timeUnits = [
        { value: '02', label: 'Días' },
        { value: '10', label: 'Horas' },
        { value: '48', label: 'Min' },
        { value: '16', label: 'Seg' },
    ];

    return (
        <div className="flex items-center gap-2 md:gap-4">
            {timeUnits.map((unit, index) => (
                <div key={unit.label} className="flex items-center gap-2 md:gap-3">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-3xl font-bold text-primary font-mono">{unit.value}</span>
                        <span className="text-xs text-muted-foreground uppercase">{unit.label}</span>
                    </div>
                    {index < timeUnits.length - 1 && (
                        <span className="text-2xl md:text-3xl font-bold text-primary/50">:</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default function FlashSales() {
  const bgImage = placeholderImages.placeholderImages.find(p => p.id === 'flash-sales-bg');

  return (
    <section 
      className="relative h-full w-full flex flex-col justify-center container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      {bgImage && (
         <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage.imageUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-background/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl font-headline">
              Flash <span className="bg-gradient-to-r from-destructive to-primary bg-clip-text text-transparent">Sales</span>
            </h2>
            <p className="mt-2 text-lg text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              <Clock className="w-5 h-5 text-destructive" />
              <span>¡Ofertas por tiempo limitado!</span>
            </p>
          </div>
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <CountdownTimer />
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {flashSaleProducts.map((product) => (
              <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
