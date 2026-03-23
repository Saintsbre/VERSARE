import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Essence } from "@/components/essence";
import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SAMPLE_PRODUCTS = [
  {
    id: "5",
    name: "BRAZILIDADE OVERSIZE",
    price: 450,
    description: "Edição especial comemorativa. A alma da Seleção Brasileira traduzida em streetwear de luxo.",
    details: "Algodão de alta gramatura, bordado exclusivo, modelagem boxy.",
    image: "https://i.imgur.com/8bpewZP.jpeg",
    category: "Special Drop"
  },
  {
    id: "3",
    name: "ERREJOTA OVERSIZE",
    price: 345,
    description: "Camiseta com modelagem street e corte boxy. Conforto absoluto para o dia a dia urbano.",
    details: "Algodão premium, corte oversized, feito no Brasil.",
    image: "https://i.imgur.com/x6JzQYO.jpeg",
    imageBack: "https://i.imgur.com/QsAAj0y.jpeg",
    category: "Streetwear"
  },
  {
    id: "2",
    name: "GLASSES OVERSIZE",
    price: 520,
    description: "Peça essencial com estética urbana e minimalista. Tecido de alta gramatura.",
    details: "Algodão premium, acabamento manual, durabilidade extrema.",
    image: "https://i.imgur.com/0emZ0Ht.jpeg",
    imageBack: "https://i.imgur.com/mRAZvlJ.jpeg",
    category: "Streetwear"
  },
  {
    id: "1",
    name: "FLY OVERSIZE",
    price: 185,
    description: "Design contemporâneo para quem vive o ritmo da cidade com atitude.",
    details: "Algodão premium, malha encorpada, gola reforçada, detalhes em bordado.",
    image: "https://i.imgur.com/45AlfcA.jpeg",
    imageBack: "https://i.imgur.com/379gAh7.jpeg",
    category: "Streetwear"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="py-16 md:py-20 px-4 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-secondary font-medium tracking-[0.3em] uppercase text-[8px] md:text-[10px] mb-2 block">
                O Drop
              </span>
              <h2 className="text-3xl md:text-4xl font-headline text-primary">Lançamentos</h2>
            </div>
            <Link href="/" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors border-b border-primary/20 pb-1">
              Ver Coleção Completa
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
            {SAMPLE_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Silence />

      <section className="py-16 md:py-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
           <div className="relative h-[300px] md:h-[500px] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem]">
             <Image 
              src="https://imgur.com/cvRMhxV.jpeg" 
              alt="Manifesto Urbano" 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint="urban streetwear fashion"
             />
           </div>
           <div className="p-4 md:p-8">
              <h3 className="text-2xl md:text-3xl font-headline text-primary mb-6">Manifesto Urbano</h3>
              <p className="text-primary/70 mb-8 leading-relaxed font-body text-sm md:text-base">
                Versare é sobre a liberdade de movimento. É o streetwear que entende de alfaiataria. 
                Cada drop é pensado para quem transita entre o concreto da cidade e a leveza do fim de tarde, 
                sempre com autenticidade e materiais de verdade.
              </p>
              <Button variant="outline" className="w-full md:w-auto rounded-full uppercase tracking-widest text-[10px] border-primary text-primary hover:bg-primary hover:text-white px-8 h-12 transition-all duration-300">
                Ver Lookbook Urban
              </Button>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Silence() {
  return <Essence />
}
