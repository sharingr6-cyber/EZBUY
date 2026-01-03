
import { Product } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Separator } from '@/components/ui/separator';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div className="mt-16 md:mt-24">
      <Separator className="mb-8 bg-border" />
      <h2 className="text-2xl md:text-3xl font-bold text-foreground uppercase text-center">
        Productos <span className="text-primary">Relacionados</span>
      </h2>
      <p className="text-muted-foreground text-center mt-2 mb-12">También te podría interesar</p>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
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
  );
}
