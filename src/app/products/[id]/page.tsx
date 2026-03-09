
"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useVersareStore, Product } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, Share2, Heart } from "lucide-react";
import Link from "next/link";
import { AIRecommendations } from "@/components/ai-recommendations-client";

const SAMPLE_PRODUCTS: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Classic Linen Shirt",
    price: 185,
    description: "Breathable, lightweight linen shirt perfect for summer evenings. Features a relaxed collar and sustainable mother-of-pearl buttons.",
    details: "100% Brazilian Linen. Hand-stitched in Sao Paulo. Gentle wash only.",
    image: "https://picsum.photos/seed/product1/600/800",
    category: "Apparel"
  },
  "2": {
    id: "2",
    name: "Artisan Leather Sandals",
    price: 220,
    description: "Handcrafted sandals using vegetable-tanned leather that develops a beautiful patina over time.",
    details: "Italian leather soles, Brazilian artisan upper craftsmanship.",
    image: "https://picsum.photos/seed/product2/600/800",
    category: "Accessories"
  },
  "3": {
    id: "3",
    name: "Woven Straw Tote",
    price: 145,
    description: "A spacious tote hand-woven by local artisans using sustainable straw fibres.",
    details: "Natural straw body, organic tanned leather handles.",
    image: "https://picsum.photos/seed/product3/600/800",
    category: "Accessories"
  },
  "4": {
    id: "4",
    name: "Organic Cotton Trousers",
    price: 195,
    description: "Relaxed fit trousers made from high-grade organic cotton for ultimate comfort.",
    details: "GOTS certified cotton. Fair trade produced.",
    image: "https://picsum.photos/seed/product4/600/800",
    category: "Apparel"
  }
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = SAMPLE_PRODUCTS[id as string];
  const { addToCart, addToHistory } = useVersareStore();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (product) {
      addToHistory(product.name);
    }
  }, [product, addToHistory]);

  if (!product) return <div>Product not found</div>;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary/40 hover:text-primary transition-colors mb-8">
          <ChevronLeft className="w-3 h-3" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          <div className="md:col-span-7">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F1E9] shadow-xl fade-in">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-secondary font-medium tracking-[0.2em] uppercase text-[10px]">
                {product.category}
              </span>
              <div className="flex gap-4">
                <Share2 className="w-5 h-5 text-primary/40 cursor-pointer hover:text-primary transition-colors" />
                <Heart className="w-5 h-5 text-primary/40 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4 leading-tight">{product.name}</h1>
            <p className="text-2xl font-body text-primary mb-8">${product.price}</p>
            
            <div className="h-px bg-primary/10 mb-8"></div>
            
            <p className="text-primary/70 text-lg font-body leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-4 mb-10">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Details</h4>
              <p className="text-sm text-primary/60 font-body italic leading-relaxed">
                {product.details}
              </p>
            </div>

            <Button 
              onClick={() => addToCart(product)}
              className="w-full bg-primary hover:bg-accent text-primary-foreground py-8 rounded-none text-xs uppercase tracking-[0.2em] transition-all duration-300"
            >
              Add to Shopping Bag
            </Button>

            <div className="mt-8 flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest text-primary/40">
              <p>Free Shipping</p>
              <div className="w-1 h-1 rounded-full bg-primary/20"></div>
              <p>Sustainable Materials</p>
              <div className="w-1 h-1 rounded-full bg-primary/20"></div>
              <p>Artisanal Craft</p>
            </div>
          </div>
        </div>

        <AIRecommendations currentItemDetails={`${product.name}: ${product.description}. Material: ${product.details}`} />
      </div>

      <Footer />
    </main>
  );
}
