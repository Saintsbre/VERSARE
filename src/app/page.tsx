
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
    name: "Camisa de Linho Clássica",
    price: 185,
    description: "Camisa de linho leve e respirável, perfeita para noites de verão.",
    details: "100% Linho Brasileiro. Costurada à mão em São Paulo.",
    image: "https://picsum.photos/seed/product1/600/800",
    category: "Vestuário"
  },
  {
    id: "2",
    name: "Sandálias de Couro Artesanal",
    price: 220,
    description: "Sandálias feitas à mão usando couro de curtimento vegetal.",
    details: "Solado de couro italiano, artesanato brasileiro.",
    image: "https://picsum.photos/seed/product2/600/800",
    category: "Acessórios"
  },
  {
    id: "3",
    name: "Bolsa de Palha Trançada",
    price: 145,
    description: "Uma bolsa espaçosa trançada à mão por artesãos locais.",
    details: "Palha natural, alças de couro.",
    image: "https://picsum.photos/seed/product3/600/800",
    category: "Acessórios"
  },
  {
    id: "4",
    name: "Calça de Algodão Orgânico",
    price: 195,
    description: "Calças de corte relaxado feitas de algodão orgânico de alta qualidade.",
    details: "Algodão certificado GOTS.",
    image: "https://picsum.photos/seed/product4/600/800",
    category: "Vestuário"
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
                A Coleção
              </span>
              <h2 className="text-4xl font-headline text-primary">Novidades</h2>
            </div>
            <Link href="/" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors border-b border-primary/20 pb-1">
              Ver Tudo
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {SAMPLE_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Essence />

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="relative h-[400px] overflow-hidden">
             <Image 
              src="https://picsum.photos/seed/editor1/800/600" 
              alt="Editorial" 
              fill 
              className="object-cover" 
              data-ai-hint="fashion lifestyle"
             />
           </div>
           <div className="p-8">
              <h3 className="text-3xl font-headline text-primary mb-6">Feito para Viver</h3>
              <p className="text-primary/70 mb-8 leading-relaxed">
                Versare não é apenas sobre roupas. É sobre um estilo de vida que valoriza a qualidade, 
                a sustentabilidade e a beleza do feito à mão. Cada ponto conta uma história de tradição 
                reimaginada para o mundo moderno.
              </p>
              <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] border-primary text-primary hover:bg-primary hover:text-white px-8">
                Explorar Lookbook
              </Button>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
