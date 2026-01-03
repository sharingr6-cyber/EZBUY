"use client";

import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, Cpu, MemoryStick, Zap } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useToast } from "@/hooks/use-toast";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
  );
}


function SpecBadge({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:bg-primary/5">
          <div className="text-primary">{icon}</div>
          <span className="font-medium text-foreground">{label}</span>
      </div>
  );
}

export default function ProductInfo({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const phoneNumber = "1234567890";
  
  const cashPrice = product.price;
  const cardPrice = product.originalPrice || product.price * 1.05; // 5% more if no original price
  const specs = product.specs || [];

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "¡Añadido al carrito!",
      description: `${product.name} ha sido añadido a tu loot.`,
    });
  };

  const whatsappMessage = `¡Hola EZBUY! Estoy interesado en comprar el siguiente producto: ${product.name} (SKU: ${product.sku}).`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div>
        <p className="text-sm font-medium text-primary uppercase tracking-widest">{product.category}</p>
        <h1 className="text-3xl md:text-4xl font-black text-foreground mt-1">{product.name}</h1>
        <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>SKU: {product.sku}</span>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span>{product.stock} en Stock</span>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg bg-card border border-border p-6">
        <div className="flex flex-col gap-4">
            <div>
                <p className="text-sm text-muted-foreground">Precio Especial (Efectivo/Transferencia)</p>
                <p className="text-4xl md:text-5xl font-black text-primary animate-pulse">
                    S/{cashPrice.toFixed(2)}
                </p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Precio de Lista (Tarjeta)</p>
                <p className="text-xl font-bold text-muted-foreground line-through">
                    S/{cardPrice.toFixed(2)}
                </p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button size="lg" className="h-14 text-lg font-bold uppercase w-full" onClick={handleAddToCart}>
          Añadir al Carrito
        </Button>
        <Button asChild size="lg" variant="outline" className="h-14 text-lg font-bold uppercase w-full border-2 bg-green-500/10 border-green-500 text-green-400 hover:bg-green-500/20 hover:text-green-300">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Comprar por WhatsApp
            </a>
        </Button>
      </div>

      <Separator className="bg-border" />

      <div>
        <h3 className="text-lg font-bold text-foreground uppercase mb-4">Especificaciones Clave</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {specs.map((spec, index) => {
            let icon = <Cpu className="w-6 h-6" />;
            if(spec.toLowerCase().includes('ddr') || spec.toLowerCase().includes('gb')) icon = <MemoryStick className="w-6 h-6" />;
            if(spec.toLowerCase().includes('watt') || spec.toLowerCase().includes('w')) icon = <Zap className="w-6 h-6" />;
            
            return <SpecBadge key={index} icon={icon} label={spec} />
          })}
        </div>
      </div>
    </div>
  );
}
