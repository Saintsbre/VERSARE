
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
    id: "1",
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
    id: "3",
    name: "FLY OVERSIZE",
    price: 185,
    description: "Design contemporâneo para quem vive o ritmo da cidade com atitude.",
    details: "Malha encorpada, gola reforçada, detalhes em bordado.",
    image: "https://i.imgur.com/45AlfcA.jpeg",
    imageBack: "https://i.imgur.com/379gAh7.jpeg",
    category: "Streetwear"
  },
  {
    id: "4",
    name: "ROMA OVERSIZE",
    price: 410,
    description: "Silhueta ampla e moderna. O equilíbrio perfeito entre o luxo e a rua.",
    details: "100% Algodão, modelagem wide, estética streetwear.",
    image: "https://i.imgur.com/MfpdCpM.jpeg",
    imageBack: "https://i.imgur.com/nEVUYNk.jpeg",
    category: "Streetwear"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="py-20 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-medium tracking-[0.3em] uppercase text-[10px] mb-2 block">
                O Drop
              </span>
              <h2 className="text-4xl font-headline text-primary">Lançamentos</h2>
            </div>
            <Link href="/" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors border-b border-primary/20 pb-1">
              Ver Coleção Completa
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {SAMPLE_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Silence />

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="relative h-[400px] overflow-hidden rounded-[2rem]">
             <Image 
              src="https://picsum.photos/seed/urban-editorial/800/600" 
              alt="Street Editorial" 
              fill 
              className="object-cover" 
              data-ai-hint="urban streetwear fashion"
             />
           </div>
           <div className="p-8">
              <h3 className="text-3xl font-headline text-primary mb-6">Manifesto Urbano</h3>
              <p className="text-primary/70 mb-8 leading-relaxed font-body">
                Versare é sobre a liberdade de movimento. É o streetwear que entende de alfaiataria. 
                Cada drop é pensado para quem transita entre o concreto da cidade e a leveza do fim de tarde, 
                sempre com autenticidade e materiais de verdade.
              </p>
              <Button variant="outline" className="rounded-full uppercase tracking-widest text-[10px] border-primary text-primary hover:bg-primary hover:text-white px-8 h-12 transition-all duration-300">
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
