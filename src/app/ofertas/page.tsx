import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { flashSaleProducts, Product } from "@/lib/data";
import OfertasHero from "@/components/ofertas/hero";
import OfertasGrid from "@/components/ofertas/product-grid";

export default function OfertasPage() {
  const productsOnSale: Product[] = flashSaleProducts;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <OfertasHero />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <OfertasGrid products={productsOnSale} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
