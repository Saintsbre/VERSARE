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
      <Link href={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-[#F5F1E9] rounded-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${isHovered && product.imageBack ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          data-ai-hint="luxury fashion product"
        />
        {product.imageBack && (
          <Image
            src={product.imageBack}
            alt={`${product.name} back view`}
            fill
            className={`object-cover transition-all duration-700 absolute inset-0 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            data-ai-hint="luxury fashion back"
          />
        )}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
      </Link>
      
      <div className="mt-6 flex justify-between items-start">
        <div>
          <h3 className="font-headline text-xl text-primary">{product.name}</h3>
          <p className="text-[10px] uppercase tracking-widest text-primary/50 mt-1">{product.category}</p>
        </div>
        <p className="font-body text-sm font-semibold text-primary/80">${product.price}</p>
      </div>

      <div className="mt-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <Button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="flex-1 bg-primary hover:bg-accent text-primary-foreground rounded-full text-[10px] uppercase tracking-widest h-10"
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}
