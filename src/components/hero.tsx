
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-editorial');

  return (
    <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 z-10 fade-in">
          <span className="text-secondary font-medium tracking-[0.3em] uppercase text-[10px] mb-4 block font-body">
            Drop 01 // City Vibes 2024
          </span>
          <h2 className="text-6xl md:text-8xl font-brand leading-[0.9] text-primary mb-8">
            Street <br />
            <span className="italic">Elevado.</span>
          </h2>
          <p className="text-primary/70 font-body text-lg max-w-md mb-10 leading-relaxed">
            Onde a estrutura clássica encontra a atitude das ruas. 
            Streetwear de luxo com alma brasileira e materiais sustentáveis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-primary hover:bg-accent text-primary-foreground px-8 py-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 h-14">
              Comprar Novo Drop
            </Button>
            <Button variant="ghost" className="text-primary hover:bg-secondary/20 px-8 py-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 h-14">
              Nossa Visão
            </Button>
          </div>
        </div>

        <div className="md:col-span-7 relative h-[600px] md:h-[800px] w-full fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 bg-secondary/10 -m-4 md:-m-8 z-0 translate-x-4 translate-y-4 rounded-[2.5rem]"></div>
          <div className="relative h-full w-full overflow-hidden shadow-2xl rounded-[2.5rem]">
            <Image
              src={heroImage?.imageUrl || "https://i.imgur.com/IgsaBrY.jpeg"}
              alt="Versare Streetwear Editorial"
              fill
              className="object-cover"
              priority
              data-ai-hint="luxury streetwear urban fashion"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
