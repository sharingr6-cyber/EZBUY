"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { type CartItem, useCart } from '@/context/cart-context';

export default function CartItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border">
        <Image
          src={item.image.src}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <h4 className="font-semibold text-sm text-foreground truncate">{item.name}</h4>
        <p className="text-primary text-lg font-bold mt-1">S/{item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              className="h-8 w-12 border-0 bg-transparent text-center"
              value={item.quantity}
              readOnly
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
        onClick={() => removeFromCart(item.id)}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
