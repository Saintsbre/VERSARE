"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Product } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, Share2, Heart } from "lucide-react";
import Link from "next/link";
import { AIRecommendations } from "@/components/ai-recommendations-client";

const SAMPLE_PRODUCTS: Record<string, Product> = {
  "1": {
    id: "1",
    name: "FLY OVERSIZE",
    price: 185,
    description: "Design contemporâneo para quem vive o ritmo da cidade com atitude.",
    details: "Algodão premium, malha encorpada, gola reforçada, detalhes em bordado.",
    image: "https://i.imgur.com/45AlfcA.jpeg",
    imageBack: "https://i.imgur.com/379gAh7.jpeg",
    category: "Streetwear"
  },
  "2": {
    id: "2",
    name: "GLASSES OVERSIZE",
    price: 520,
    description: "Peça essencial com estética urbana e minimalista. Tecido de alta gramatura.",
    details: "Algodão premium, acabamento manual, durabilidade extrema.",
    image: "https://i.imgur.com/0emZ0Ht.jpeg",
    imageBack: "https://i.imgur.com/mRAZvlJ.jpeg",
    category: "Streetwear"
  },
  "3": {
    id: "3",
    name: "ERREJOTA OVERSIZE",
    price: 345,
    description: "Camiseta com modelagem street e corte boxy. Conforto absoluto para o dia a dia urbano.",
    details: "Algodão premium, corte oversized, feito no Brasil.",
    image: "https://i.imgur.com/x6JzQYO.jpeg",
    imageBack: "https://i.imgur.com/QsAAj0y.jpeg",
    category: "Streetwear"
  },
  "4": {
    id: "4",
    name: "ROMA OVERSIZE",
    price: 410,
    description: "Silhueta ampla e moderna. O equilíbrio perfeito entre o luxo e a rua.",
    details: "100% Algodão, modelagem wide, estética streetwear.",
    image: "https://i.imgur.com/MfpdCpM.jpeg",
    imageBack: "https://i.imgur.com/nEVUYNk.jpeg",
    category: "Streetwear"
  },
  "5": {
    id: "5",
    name: "BRAZILIDADE OVERSIZE",
    price: 450,
    description: "Edição especial comemorativa. A alma da Seleção Brasileira traduzida em streetwear de luxo.",
    details: "Algodão de alta gramatura, bordado exclusivo, modelagem boxy.",
    image: "https://i.imgur.com/8bpewZP.jpeg",
    category: "Special Drop"
  }
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = SAMPLE_PRODUCTS[id as string];
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  if (!product) return <div className="pt-40 text-center">Produto não encontrado</div>;

  const images = [product.image, product.imageBack].filter(Boolean) as string[];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 md:pt-32 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary/40 hover:text-primary transition-colors mb-6 md:mb-8">
          <ChevronLeft className="w-3 h-3" /> Voltar para a Coleção
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-20">
          <div className="md:col-span-7 flex flex-col md:flex-row-reverse gap-4 md:gap-6">
            <div className="relative aspect-[3/4] flex-1 overflow-hidden bg-[#F5F1E9] shadow-xl rounded-[1.5rem] md:rounded-[2.5rem] fade-in">
              <Image
                src={activeImage || product.image}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500"
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-20 md:w-20 md:h-28 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-secondary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <Image 
                      src={img} 
                      alt={`${product.name} view ${idx}`} 
                      fill 
                      className="object-cover" 
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-5 flex flex-col fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-secondary font-medium tracking-[0.2em] uppercase text-[8px] md:text-[10px]">
                {product.category}
              </span>
              <div className="flex gap-4">
                <Share2 className="w-5 h-5 text-primary/40 cursor-pointer hover:text-primary transition-colors" />
                <Heart className="w-5 h-5 text-primary/40 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-headline text-primary mb-4 leading-tight">{product.name}</h1>
            
            <div className="h-px bg-primary/10 mb-6 md:mb-8"></div>
            
            <p className="text-primary/70 text-base md:text-lg font-body leading-relaxed mb-6 md:mb-8">
              {product.description}
            </p>

            <div className="space-y-4 mb-8 md:mb-10">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Detalhes</h4>
              <p className="text-xs md:text-sm text-primary/60 font-body italic leading-relaxed">
                {product.details}
              </p>
            </div>

            <Link href="/pre-save">
              <Button 
                className="w-full bg-primary hover:bg-accent text-primary-foreground py-8 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300"
              >
                Cadastrar Pré-Save
              </Button>
            </Link>

            <div className="mt-8 grid grid-cols-3 gap-2 text-center text-[7px] md:text-[9px] uppercase tracking-widest text-primary/40">
              <p>Edição Limitada</p>
              <p>Acesso Antecipado</p>
              <p>Drop 2026</p>
            </div>
          </div>
        </div>

        <AIRecommendations currentItemDetails={`${product.name}: ${product.description}. Material: ${product.details}`} />
      </div>

      <Footer />
    </main>
  );
}
