
"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import CartItem from "./cart-item";

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

export default function CartSidebar() {
  const { isCartOpen, closeCart, cartItems, total } = useCart();
  const phoneNumber = "1234567890";

  const generateWhatsAppMessage = () => {
    const header = "¡Hola EZBUY! Estoy interesado en los siguientes productos de mi carrito:\n\n";
    const items = cartItems.map(item => `*${item.name}* (x${item.quantity}) - S/${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const footer = `\n\n*Total Estimado:* S/${total.toFixed(2)}`;
    return encodeURIComponent(header + items + footer);
  };
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`;


  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="flex w-full flex-col bg-card sm:max-w-lg p-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="text-xl font-bold uppercase tracking-wider">Tu Loot</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
            <>
                <ScrollArea className="flex-1 px-6">
                    <div className="divide-y divide-border">
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                </ScrollArea>
                <SheetFooter className="px-6 py-4 space-y-4 border-t">
                    <div className="text-right">
                        <span className="text-base text-muted-foreground">Total Estimado:</span>
                        <p className="text-primary text-2xl font-bold">S/{total.toFixed(2)}</p>
                    </div>
                    <Button 
                        asChild 
                        className="w-full h-12 text-sm font-bold uppercase bg-green-500 text-white hover:bg-green-600 transition-all shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]"
                    >
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="w-5 h-5 mr-2" />
                            Comprar por WhatsApp
                        </a>
                    </Button>
                </SheetFooter>
            </>
        ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center px-6">
                <p className="text-2xl font-bold">Tu carrito está vacío</p>
                <p className="text-muted-foreground">Parece que aún no has añadido nada. ¡Explora nuestros productos!</p>
                <Button onClick={closeCart}>Seguir comprando</Button>
            </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
