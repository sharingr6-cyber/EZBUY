import ProductCard from "@/components/product-card";
import { allProducts } from "@/lib/data";

export default function FeaturedProducts() {
  const featuredProducts = allProducts.slice(0, 4);
  
  return (
    <section className="bg-background/95 py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
