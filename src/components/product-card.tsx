
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { useToast } from "@/hooks/use-toast"


type ProductCardProps = {
  product: Product;
  children?: React.ReactNode;
};

export default function ProductCard({ product, children }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast()

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const isKawaii = product.tags?.includes('kawaii');
  
  let discountPercentageLabel = '';
  if (hasDiscount && product.originalPrice) {
    const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    discountPercentageLabel = `-${discountPercentage}%`;
  }


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "¡Añadido al carrito!",
      description: `${product.name} ha sido añadido a tu loot.`,
    })
  };

  return (
    <Card className={cn(
      "group relative w-full overflow-hidden rounded-xl border-border bg-card transition-all duration-300 h-full",
      "hover:-translate-y-1 hover:shadow-2xl",
      isKawaii 
        ? "border-pink-400/20 bg-pink-500/5 hover:border-pink-400 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
        : "hover:border-primary hover:shadow-primary/10"
    )}>
      <div className="flex flex-col h-full">
        <Link href={`/products/${product.id}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />
        <CardContent className="p-0">
          <div className="relative aspect-square w-full">
            <Image
              src={product.image.src}
              alt={product.name}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.image.hint}
            />
            {hasDiscount && (
              <>
                <Badge 
                  variant="destructive" 
                  className={cn(
                    "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold uppercase",
                    isKawaii ? "bg-pink-500/80 border-none text-white backdrop-blur-sm" : "bg-destructive/80 border-none text-white"
                  )}
                >
                  Oferta
                </Badge>
                <Badge 
                  variant="destructive" 
                  className={cn(
                    "absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold uppercase",
                     isKawaii ? "bg-pink-500/80 border-none text-white backdrop-blur-sm" : "bg-destructive/80 border-none text-white"
                  )}
                >
                  {discountPercentageLabel}
                </Badge>
              </>
            )}
            <div className="absolute bottom-2 right-2 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
               <Button 
                  size="icon" 
                  onClick={handleAddToCart}
                  className={cn(
                    "relative z-20 h-10 w-10 shrink-0 rounded-full text-primary-foreground transition-transform duration-300 group-hover:scale-110",
                    isKawaii 
                      ? "bg-pink-400 hover:bg-pink-500 hover:shadow-[0_0_15px_#fff]"
                      : "bg-primary hover:bg-primary/90"
                  )}
                >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Añadir al carrito</span>
                </Button>
            </div>
          </div>
        </CardContent>
        <div className="flex-grow flex flex-col justify-between">
            {children ? (
                children
            ) : (
                <div className="p-4 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">{product.category}</p>
                    <h3 className="text-lg font-bold leading-tight text-foreground truncate h-6">{product.name}</h3>
                    <div className="flex items-baseline justify-between pt-2">
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-extrabold text-foreground">
                                S/{product.price.toFixed(2)}
                            </p>
                            {hasDiscount && (
                                <p className="text-sm text-muted-foreground line-through">
                                    S/{product.originalPrice?.toFixed(2)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </Card>
  );
}
