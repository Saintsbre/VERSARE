import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-editorial');

  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-5 z-10 fade-in order-2 md:order-1 text-center md:text-left">
          <span className="text-secondary font-medium tracking-[0.3em] uppercase text-[8px] md:text-[10px] mb-4 block font-body">
            Drop 01 // Brazilidade 2026
          </span>
          <h2 className="text-5xl md:text-8xl font-brand leading-[0.9] text-primary mb-6 md:mb-8">
            Brasil <br />
            <span className="italic">Elevado.</span>
          </h2>
          <p className="text-primary/70 font-body text-base md:text-lg max-w-md mx-auto md:mx-0 mb-8 md:mb-10 leading-relaxed">
            A essência da cultura brasileira encontra o rigor do minimalismo europeu. 
            Streetwear de luxo que celebra nossa identidade com materiais nobres e alma urbana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/pre-save">
              <Button className="bg-primary hover:bg-accent text-primary-foreground px-12 py-6 rounded-full text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 h-14 shadow-lg active:scale-95">
                Cadastrar Pré-Save
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:col-span-7 relative h-[400px] md:h-[800px] w-full fade-in order-1 md:order-2" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 bg-secondary/10 -m-2 md:-m-8 z-0 translate-x-2 md:translate-x-4 translate-y-2 md:translate-y-4 rounded-[1.5rem] md:rounded-[2.5rem]"></div>
          <div className="relative h-full w-full overflow-hidden shadow-2xl rounded-[1.5rem] md:rounded-[2.5rem]">
            <Image
              src={heroImage?.imageUrl || "https://i.imgur.com/yfezlP6.jpeg"}
              alt="Versare Streetwear Editorial"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              data-ai-hint="luxury streetwear urban fashion"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
