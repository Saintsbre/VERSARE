
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
  "maraca": {
    id: "maraca",
    name: "MARACA OVERSIZED",
    price: 360,
    description: "Inspirada no templo do futebol. Minimalismo e paixão em cada fibra.",
    details: "100% Algodão Premium, gramatura alta, estampa exclusiva frontal e traseira.",
    image: "https://i.imgur.com/LOSpwAG.jpeg",
    imageBack: "https://i.imgur.com/kh1I9p6.jpeg",
    category: "Brasilidade"
  },
  "street-club": {
    id: "street-club",
    name: "STREET CLUB OVERSIZED",
    price: 345,
    description: "A essência das ruas em um corte sofisticado. Feita para o movimento urbano.",
    details: "Algodão de alta gramatura, modelagem boxy, toque peletizado.",
    image: "https://i.imgur.com/xrHRwq6.jpeg",
    imageBack: "https://i.imgur.com/qVegjta.jpeg",
    category: "Brasilidade"
  },
  "errejota": {
    id: "errejota",
    name: "ERREJOTA OVERSIZED",
    price: 345,
    description: "A vibração do Rio traduzida em moda contemporânea.",
    details: "Algodão premium, corte oversized, feito no Brasil.",
    image: "https://i.imgur.com/DdsZdcD.jpeg",
    imageBack: "https://i.imgur.com/2EM2Yo1.jpeg",
    category: "Brasilidade"
  },
  "domingo": {
    id: "domingo",
    name: "DOMINGO OVERSIZED",
    price: 320,
    description: "O conforto de um domingo ensolarado com a atitude da Versare.",
    details: "Malha encorpada, gola reforçada, detalhes em bordado.",
    image: "https://i.imgur.com/NZkBcyv.jpeg",
    imageBack: "https://i.imgur.com/SuZ7W4Z.jpeg",
    category: "Brasilidade"
  },
  "fly": {
    id: "fly",
    name: "FLY OVERSIZED",
    price: 320,
    description: "Leveza e presença. O design que voa alto na estética urbana.",
    details: "Algodão 30.1 penteado, modelagem ampla, estampa silk screen.",
    image: "https://i.imgur.com/NZkBcyv.jpeg",
    imageBack: "https://i.imgur.com/zlcXbf1.jpeg",
    category: "Brasilidade"
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
              <span className="text-secondary font-bold tracking-[0.2em] uppercase text-[10px] md:text-[12px]">
                Brasilidade
              </span>
              <div className="flex gap-4">
                <Share2 className="w-5 h-5 text-primary/40 cursor-pointer hover:text-primary transition-colors" />
                <Heart className="w-5 h-5 text-primary/40 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-headline text-primary mb-1 leading-tight">{product.name}</h1>
            <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold text-secondary mb-4">Brasilidade</p>
            
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

            <Link href="/pre-sell">
              <Button 
                className="w-full bg-primary hover:bg-accent text-primary-foreground py-8 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300"
              >
                Garantir via Pre-Sell
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
