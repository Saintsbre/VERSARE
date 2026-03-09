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
    name: "Hoodie de Linho Oversized",
    price: 345,
    description: "Modelagem street com o frescor do linho. Conforto absoluto para o dia a dia urbano.",
    details: "Linho encorpado, corte boxy, feito no Brasil.",
    image: "https://i.imgur.com/x6JzQYO.jpeg",
    imageBack: "https://i.imgur.com/QsAAj0y.jpeg",
    category: "Streetwear"
  },
  "2": {
    id: "2",
    name: "Sneaker Versare 01",
    price: 520,
    description: "Tênis minimalista em couro premium com solado vulcanizado.",
    details: "Couro legítimo, acabamento manual, durabilidade extrema.",
    image: "https://i.imgur.com/0emZ0Ht.jpeg",
    imageBack: "https://picsum.photos/seed/street2-back/600/800",
    category: "Calçados"
  },
  "3": {
    id: "3",
    name: "Bag Crossbody Urbana",
    price: 185,
    description: "Acessório essencial para quem vive o ritmo da cidade.",
    details: "Lona resistente, alças ajustáveis, detalhes em couro.",
    image: "https://picsum.photos/seed/street3/600/800",
    imageBack: "https://picsum.photos/seed/street3-back/600/800",
    category: "Acessórios"
  },
  "4": {
    id: "4",
    name: "Calça Cargo Wide Leg",
    price: 410,
    description: "Silhueta ampla e bolsos utilitários em sarja de alta gramatura.",
    details: "100% Algodão, modelagem wide, estética utilitária.",
    image: "https://picsum.photos/seed/street4/600/800",
    imageBack: "https://picsum.photos/seed/street4-back/600/800",
    category: "Streetwear"
  }
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = SAMPLE_PRODUCTS[id as string];
  const { addToCart, addToHistory } = useVersareStore();
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (product) {
      addToHistory(product.name);
      setActiveImage(product.image);
    }
  }, [product, addToHistory]);

  if (!product) return <div className="pt-40 text-center">Produto não encontrado</div>;

  const images = [product.image, product.imageBack].filter(Boolean) as string[];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary/40 hover:text-primary transition-colors mb-8">
          <ChevronLeft className="w-3 h-3" /> Voltar para a Coleção
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          <div className="md:col-span-7 flex flex-col md:flex-row-reverse gap-6">
            <div className="relative aspect-[3/4] flex-1 overflow-hidden bg-[#F5F1E9] shadow-xl rounded-[2.5rem] fade-in">
              <Image
                src={activeImage || product.image}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-secondary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`${product.name} view ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
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
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Detalhes</h4>
              <p className="text-sm text-primary/60 font-body italic leading-relaxed">
                {product.details}
              </p>
            </div>

            <Button 
              onClick={() => addToCart(product)}
              className="w-full bg-primary hover:bg-accent text-primary-foreground py-8 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300"
            >
              Adicionar ao Carrinho
            </Button>

            <div className="mt-8 flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest text-primary/40">
              <p>Frete Grátis</p>
              <div className="w-1 h-1 rounded-full bg-primary/20"></div>
              <p>Materiais Sustentáveis</p>
              <div className="w-1 h-1 rounded-full bg-primary/20"></div>
              <p>Trabalho Artesanal</p>
            </div>
          </div>
        </div>

        <AIRecommendations currentItemDetails={`${product.name}: ${product.description}. Material: ${product.details}`} />
      </div>

      <Footer />
    </main>
  );
}
