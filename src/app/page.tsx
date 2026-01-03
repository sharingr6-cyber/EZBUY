import Header from "@/components/layout/header";
import HeroSection from "@/components/landing/hero";
import FeaturedProducts from "@/components/landing/featured-products";
import FlashSales from "@/components/landing/flash-sales";
import PcBuilder from "@/components/landing/pc-builder";
import Footer from "@/components/layout/footer";
import LiveStreams from "@/components/landing/live-streams";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <HeroSection />
        <FeaturedProducts />
        <FlashSales />
        <LiveStreams />
        <PcBuilder />
      </main>
      <Footer />
    </>
  );
}
