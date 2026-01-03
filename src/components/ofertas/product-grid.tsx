import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/data";

type OfertasGridProps = {
  products: Product[];
};

export default function OfertasGrid({ products }: OfertasGridProps) {
    
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black uppercase font-headline tracking-tight">
            Todo Nuestro Loot con <span className="text-destructive">Descuento</span>
        </h2>
        <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
            Desde tarjetas gráficas hasta periféricos, encuentra todo lo que necesitas para tu setup a un precio que no podrás creer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
           <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
