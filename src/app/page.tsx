
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Essence } from "@/components/essence";
import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const SAMPLE_PRODUCTS = [
  {
    id: "maraca",
    name: "MARACA OVERSIZED",
    price: 360,
    description: "Inspirada no templo do futebol. Minimalismo e paixão em cada fibra.",
    details: "100% Algodão Premium, gramatura alta, estampa exclusiva frontal e traseira.",
    image: "https://i.imgur.com/LOSpwAG.jpeg",
    imageBack: "https://i.imgur.com/kh1I9p6.jpeg",
    category: "Brazilidade"
  },
  {
    id: "street-club",
    name: "STREET CLUB OVERSIZED",
    price: 345,
    description: "A essência das ruas em um corte sofisticado. Feita para o movimento urbano.",
    details: "Algodão de alta gramatura, modelagem boxy, toque peletizado.",
    image: "https://i.imgur.com/xrHRwq6.jpeg",
    imageBack: "https://i.imgur.com/qVegjta.jpeg",
    category: "Streetwear"
  },
  {
    id: "errejota",
    name: "ERREJOTA OVERSIZED",
    price: 345,
    description: "A vibração do Rio traduzida em moda contemporânea.",
    details: "Algodão premium, corte oversized, feito no Brasil.",
    image: "https://i.imgur.com/DdsZdcD.jpeg",
    imageBack: "https://i.imgur.com/2EM2Yo1.jpeg",
    category: "Brazilidade"
  },
  {
    id: "domingo",
    name: "DOMINGO OVERSIZED",
    price: 320,
    description: "O conforto de um domingo ensolarado com a atitude da Versare.",
    details: "Malha encorpada, gola reforçada, detalhes em bordado.",
    image: "https://i.imgur.com/NZkBcyv.jpeg",
    imageBack: "https://i.imgur.com/SuZ7W4Z.jpeg",
    category: "Lançamento"
  },
  {
    id: "fly",
    name: "FLY OVERSIZED",
    price: 320,
    description: "Leveza e presença. O design que voa alto na estética urbana.",
    details: "Algodão 30.1 penteado, modelagem ampla, estampa silk screen.",
    image: "https://i.imgur.com/NZkBcyv.jpeg",
    imageBack: "https://i.imgur.com/zlcXbf1.jpeg",
    category: "Streetwear"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="py-16 md:py-24 px-4 md:px-12 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-secondary font-medium tracking-[0.3em] uppercase text-[8px] md:text-[10px] mb-2 block">
                Drop 01 // 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-headline text-primary">Lançamentos</h2>
            </div>
            <Link href="/pre-sell" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors border-b border-primary/20 pb-1">
              Ver Coleção Completa
            </Link>
          </div>
          
          <div className="relative px-4 md:px-0">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-8">
                {SAMPLE_PRODUCTS.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 md:pl-8 sm:basis-1/2 lg:basis-1/4">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Setas de navegação proeminentes nas laterais */}
              <div className="flex">
                <CarouselPrevious className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 backdrop-blur-md border-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-xl" />
                <CarouselNext className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/80 backdrop-blur-md border-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-xl" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      <Essence />

      <section className="py-16 md:py-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
           <div className="relative h-[300px] md:h-[500px] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem]">
             <Image 
              src="https://i.imgur.com/CmAT1T9.jpeg" 
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
                sempre com autenticidade e linhos de alta gramatura.
              </p>
              <Link href="/pre-sell">
                <Button variant="outline" className="w-full md:w-auto rounded-full uppercase tracking-widest text-[10px] border-primary text-primary hover:bg-primary hover:text-white px-8 h-12 transition-all duration-300">
                  Ver Lookbook Urban
                </Button>
              </Link>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
