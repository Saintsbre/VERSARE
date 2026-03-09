
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
    name: "Camisa de Linho Clássica",
    price: 185,
    description: "Camisa de linho leve e respirável, perfeita para noites de verão. Possui colarinho relaxado e botões sustentáveis de madrepérola.",
    details: "100% Linho Brasileiro. Costurada à mão em São Paulo. Lavagem suave apenas.",
    image: "https://picsum.photos/seed/product1/600/800",
    category: "Vestuário"
  },
  "2": {
    id: "2",
    name: "Sandálias de Couro Artesanal",
    price: 220,
    description: "Sandálias feitas à mão usando couro de curtimento vegetal que desenvolve uma pátina linda com o tempo.",
    details: "Sola de couro italiano, artesanato de artesãos brasileiros.",
    image: "https://picsum.photos/seed/product2/600/800",
    category: "Acessórios"
  },
  "3": {
    id: "3",
    name: "Bolsa de Palha Trançada",
    price: 145,
    description: "Uma bolsa espaçosa trançada à mão por artesãos locais usando fibras de palha sustentáveis.",
    details: "Corpo de palha natural, alças de couro orgânico.",
    image: "https://picsum.photos/seed/product3/600/800",
    category: "Acessórios"
  },
  "4": {
    id: "4",
    name: "Calça de Algodão Orgânico",
    price: 195,
    description: "Calças de corte relaxado feitas de algodão orgânico de alta qualidade para o máximo conforto.",
    details: "Algodão certificado GOTS. Produzido via comércio justo.",
    image: "https://picsum.photos/seed/product4/600/800",
    category: "Vestuário"
  }
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = SAMPLE_PRODUCTS[id as string];
  const { addToCart, addToHistory } = useVersareStore();

  useEffect(() => {
    if (product) {
      addToHistory(product.name);
    }
  }, [product, addToHistory]);

  if (!product) return <div>Produto não encontrado</div>;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary/40 hover:text-primary transition-colors mb-8">
          <ChevronLeft className="w-3 h-3" /> Voltar para a Coleção
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
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Detalhes</h4>
              <p className="text-sm text-primary/60 font-body italic leading-relaxed">
                {product.details}
              </p>
            </div>

            <Button 
              onClick={() => addToCart(product)}
              className="w-full bg-primary hover:bg-accent text-primary-foreground py-8 rounded-none text-xs uppercase tracking-[0.2em] transition-all duration-300"
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
