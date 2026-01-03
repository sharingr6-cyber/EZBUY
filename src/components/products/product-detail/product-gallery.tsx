
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { cn } from '@/lib/utils';

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const galleryImages = product.gallery || [product.image];
  const [mainImage, setMainImage] = useState(galleryImages[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg group transition-all duration-300 ease-in-out">
        <Image
          src={mainImage.src}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={product.image.hint}
          priority
        />
         <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-border/20 group-hover:ring-primary group-hover:shadow-[0_0_20px_hsl(var(--primary))] transition-all duration-300"></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <button
            key={index}
            className={cn(
              'relative aspect-square w-full overflow-hidden rounded-md transition-all duration-200 ring-offset-4 ring-offset-background',
              image.src === mainImage.src ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
            )}
            onClick={() => setMainImage(image)}
          >
            <Image
              src={image.src}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              data-ai-hint={image.hint}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
