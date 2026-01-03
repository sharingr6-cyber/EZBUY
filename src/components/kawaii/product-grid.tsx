
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Home, Star, Heart, ChevronRight } from "lucide-react";
import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/data";
import type { SortOption } from "@/app/kawaii-gaming/page";
import Link from "next/link";
import { cn } from "@/lib/utils";

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm text-pink-200/80">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home className="w-4 h-4" />
            Home
          </Link>
        </li>
        <li className="text-pink-400/50"><ChevronRight className="w-4 h-4" /></li>
        <li>
          <Link href="/products" className="hover:text-white transition-colors">
            Categorías
          </Link>
        </li>
        <li className="text-pink-400/50"><ChevronRight className="w-4 h-4" /></li>
        <li>
            <span className="font-semibold text-white">Kawaii Gaming</span>
        </li>
      </ol>
    </nav>
  );
}


function ProductPagination() {
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {[1, 2, 3].map((page) => (
        <Button 
          key={page}
          variant={page === 1 ? "default" : "outline"} 
          size="icon" 
          className={cn(
            "h-10 w-10 rounded-full font-bold",
            page === 1 
              ? "bg-white text-pink-500 border-white shadow-lg shadow-white/20"
              : "bg-pink-500/10 border-pink-400/50 text-pink-200 hover:bg-white/10 hover:border-white hover:text-white"
          )}
        >
          {page}
        </Button>
      ))}
    </div>
  )
}

function ProductRating({ rating, reviewCount }: { rating: number, reviewCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-300 fill-yellow-300' : 'text-pink-200/30'}`} />
        ))}
      </div>
      <span className="text-xs text-pink-200/60">({reviewCount})</span>
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
    const headerTitle = "Colección Kawaii Gaming";
    const headerSubtitle = 'Encuentra los periféricos más adorables y potentes para tu setup.';

  return (
    <div className="w-full lg:w-3/4 xl:w-4/5">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Breadcrumbs />
        <div className="flex items-center gap-2">
          <span className="text-sm text-pink-200/80">Ordenar por:</span>
          <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger className="w-[180px] bg-pink-500/10 border-pink-400/50 text-white rounded-lg backdrop-blur-sm">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="bg-card border-pink-400/50 text-white rounded-lg">
              <SelectItem value="popular">Más populares</SelectItem>
              <SelectItem value="price-asc">Menor precio</SelectItem>
              <SelectItem value="price-desc">Mayor precio</SelectItem>
              <SelectItem value="rating">Mejor valorados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black uppercase font-kawaii tracking-wider" style={{textShadow: "0 0 5px #fbcfe8, 0 0 10px #f9a8d4"}}>
            <span className="text-white">{categoryTitle === "Todos" ? headerTitle : categoryTitle}</span>
        </h2>
        <p className="mt-2 text-pink-200/80 max-w-2xl mx-auto">
            {headerSubtitle}
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
           <ProductCard key={product.id} product={product}>
              <div className="p-4 space-y-3 bg-card rounded-b-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">{product.category}</p>
                  <h3 className="text-lg font-bold leading-tight text-white truncate h-6">{product.name}</h3>
                  <ProductRating rating={product.rating || 0} reviewCount={product.reviewCount || 0} />
                  <div className="flex items-baseline justify-between pt-2">
                      <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-extrabold text-pink-300">
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
