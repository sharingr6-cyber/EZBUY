
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home, Star } from "lucide-react";
import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/data";
import type { SortOption } from "@/app/products/page";
import Link from "next/link";
import { cn } from "@/lib/utils";

function Breadcrumbs({ categoryTitle }: { categoryTitle: string }) {
  const isAll = categoryTitle === 'Todos';
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
            Home
          </Link>
        </li>
        <li className="text-primary">/</li>
        <li>
          <Link href="/products" className={cn("font-semibold", isAll ? "text-foreground" : "text-muted-foreground hover:text-primary")}>
            Productos
          </Link>
        </li>
        {!isAll && (
          <>
            <li className="text-primary">/</li>
            <li>
                <span className="font-semibold text-primary">{categoryTitle}</span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}


function ProductPagination() {
  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <Button variant="outline" size="icon" className="h-10 w-10 border-primary text-primary hover:bg-primary/10 hover:text-primary">
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button variant="outline" className="h-10 w-10 border-primary bg-primary/10 text-primary">1</Button>
      <Button variant="outline" className="h-10 w-10 border-primary/50 text-muted-foreground hover:border-primary hover:bg-primary/10 hover:text-primary">2</Button>
      <Button variant="outline" className="h-10 w-10 border-primary/50 text-muted-foreground hover:border-primary hover:bg-primary/10 hover:text-primary">3</Button>
      <Button variant="outline" size="icon" className="h-10 w-10 border-primary text-primary hover:bg-primary/10 hover:text-primary">
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}

function ProductRating({ rating, reviewCount }: { rating: number, reviewCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/50'}`} />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">({reviewCount})</span>
    </div>
  )
}

type ProductGridProps = {
  products: Product[];
  categoryTitle: string;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
};

export default function ProductGrid({ products, categoryTitle, sortOption, onSortChange }: ProductGridProps) {
    const headerTitle = categoryTitle === 'Todos' ? 'Todos los Productos' : categoryTitle;
    const headerSubtitle = categoryTitle === 'Todos'
        ? 'Explora todo nuestro arsenal de hardware y periféricos.'
        : `Precisión, velocidad y comodidad para llevar tu juego al siguiente nivel en ${categoryTitle.toLowerCase()}.`;

  return (
    <div className="w-full lg:w-3/4 xl:w-4/5">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Breadcrumbs categoryTitle={categoryTitle} />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Ordenar por:</span>
          <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger className="w-[180px] bg-card border-border">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Más populares</SelectItem>
              <SelectItem value="price-asc">Menor precio</SelectItem>
              <SelectItem value="price-desc">Mayor precio</SelectItem>
              <SelectItem value="rating">Mejor valorados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black uppercase font-headline tracking-tighter">
            {headerTitle.split(' ').slice(0, -1).join(' ')} <span className="text-primary">{headerTitle.split(' ').slice(-1)}</span>
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            {headerSubtitle}
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
           <ProductCard key={product.id} product={product}>
              <div className="p-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">{product.category}</p>
                  <h3 className="text-lg font-bold leading-tight text-foreground truncate h-6">{product.name}</h3>
                  <ProductRating rating={product.rating || 0} reviewCount={product.reviewCount || 0} />
                  <div className="flex items-baseline justify-between pt-2">
                      <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-extrabold text-foreground">
                              S/{product.price.toFixed(2)}
                          </p>
                          {product.originalPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                  S/{product.originalPrice?.toFixed(2)}
                              </p>
                          )}
                      </div>
                  </div>
              </div>
            </ProductCard>
        ))}
      </div>
      
      <ProductPagination />

    </div>
  );
}
