import ProductCard from "@/components/product-card";
import { allProducts } from "@/lib/data";
import placeholderImages from '@/lib/placeholder-images.json';


export default function FeaturedProducts() {
  const featuredProducts = allProducts.slice(0, 4);
  const bgImage = placeholderImages.placeholderImages.find(p => p.id === 'featured-products-bg');
  
  return (
    <section 
      className="relative h-full w-full flex flex-col justify-center py-16 md:py-24"
    >
       {bgImage && (
         <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage.imageUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-background/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase font-headline">
            Productos <span className="text-primary">Destacados</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            Lo último en tecnología para llevar tu experiencia de juego al siguiente nivel.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
