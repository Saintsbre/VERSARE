
"use client";

import Image from "next/image";
import Link from "next/link";
import { Product, useVersareStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useVersareStore((state) => state.addToCart);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative flex flex-col fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-[#F5F1E9] rounded-2xl shadow-sm transition-shadow hover:shadow-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${isHovered && product.imageBack ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          data-ai-hint="luxury fashion product"
        />
        {product.imageBack && (
          <Image
            src={product.imageBack}
            alt={`${product.name} back view`}
            fill
            className={`object-cover transition-all duration-700 absolute inset-0 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            data-ai-hint="luxury fashion back"
          />
        )}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
      </Link>
      
      <div className="mt-4 md:mt-6 flex justify-between items-start px-1">
        <div>
          <h3 className="font-headline text-lg md:text-xl text-primary truncate max-w-[150px] md:max-w-none">{product.name}</h3>
          <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-primary/50 mt-1">{product.category}</p>
        </div>
        <p className="font-body text-sm md:text-base font-semibold text-primary/80">${product.price}</p>
      </div>

      <div className="mt-4 flex gap-2 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 px-1">
        <Button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="flex-1 bg-primary hover:bg-accent text-primary-foreground rounded-full text-[9px] md:text-[10px] uppercase tracking-widest h-10 md:h-12 shadow-sm active:scale-95 transition-transform"
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}
