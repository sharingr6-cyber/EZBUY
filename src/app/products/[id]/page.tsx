
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getProductById, getRelatedProducts, Product } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/products/product-detail/product-gallery";
import ProductInfo from "@/components/products/product-detail/product-info";
import RelatedProducts from "@/components/products/product-detail/related-products";

type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
        <RelatedProducts products={relatedProducts} />
      </main>
      <Footer />
    </div>
  );
}
