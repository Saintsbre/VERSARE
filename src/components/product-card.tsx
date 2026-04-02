
"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showBack, setShowBack] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Efeito de troca automática a cada 3 segundos quando não houver hover
  useEffect(() => {
    if (!product.imageBack || isHovered) return;

    const interval = setInterval(() => {
      setShowBack((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [product.imageBack, isHovered]);

  return (
    <div 
      className="group relative flex flex-col fade-in"
      onMouseEnter={() => {
        setIsHovered(true);
        setShowBack(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowBack(false);
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F1E9] rounded-2xl shadow-sm transition-shadow hover:shadow-md">
        <Link href={`/products/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${showBack && product.imageBack ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            data-ai-hint="luxury fashion product"
          />
          {product.imageBack && (
            <Image
              src={product.imageBack}
              alt={`${product.name} back view`}
              fill
              className={`object-cover transition-all duration-700 absolute inset-0 ${showBack ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              data-ai-hint="luxury fashion back"
            />
          )}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
        </Link>

        {product.imageBack && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowBack(!showBack);
            }}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-xl border border-primary/10 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label="Trocar imagem"
          >
            <RotateCcw className={`w-4 h-4 text-primary transition-transform duration-500 ${showBack ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="mt-4 md:mt-6 flex flex-col px-1">
        <h3 className="font-headline text-lg md:text-xl text-primary truncate">{product.name}</h3>
        <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mt-1">Brasilidade</p>
      </div>

      <div className="mt-4 flex gap-2 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 px-1">
        <Link href="/pre-sell" className="w-full">
          <Button 
            className="w-full bg-primary hover:bg-accent text-primary-foreground rounded-full text-[10px] uppercase tracking-widest h-12 shadow-sm active:scale-95 transition-transform"
          >
            Garantir via Pre-Sell
          </Button>
        </Link>
      </div>
    </div>
  );
}
