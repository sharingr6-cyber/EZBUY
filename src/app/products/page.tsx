
"use client";

import { useState, useEffect, Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProductGrid from "@/components/products/product-grid";
import ProductFilters from "@/components/products/product-filters";
import { allProducts, type Product } from "@/lib/data";
import { useSearchParams } from "next/navigation";

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Todos';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);


  const searchFilteredProducts = searchQuery
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProducts;
  
  const categoryFilteredProducts = activeCategory === 'Todos'
    ? searchFilteredProducts
    : searchFilteredProducts.filter(p => p.category === activeCategory);


  const sortedProducts = [...categoryFilteredProducts].sort((a, b) => {
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
      <main className="flex-grow container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <ProductGrid 
            products={sortedProducts} 
            categoryTitle={searchQuery ? `Resultados para "${searchQuery}"` : activeCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
