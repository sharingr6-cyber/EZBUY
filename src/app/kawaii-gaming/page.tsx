
"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProductGrid from "@/components/kawaii/product-grid";
import ProductFilters from "@/components/kawaii/product-filters";
import { kawaiiProducts, type Product } from "@/lib/data";
import HeroSection from "@/components/kawaii/hero";

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export default function KawaiiGamingPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortOption, setSortOption] = useState<SortOption>('popular');

  const filteredProducts = activeCategory === 'Todos'
    ? kawaiiProducts
    : kawaiiProducts.filter(p => p.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'popular':
      default:
        return (b.reviewCount || 0) - (a.reviewCount || 0);
    }
  });


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <ProductFilters
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <ProductGrid 
              products={sortedProducts} 
              categoryTitle={activeCategory}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
