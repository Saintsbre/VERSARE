"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function Essence() {
  const essenceImg = PlaceHolderImages.find(img => img.id === 'essence-bg');

  return (
    <section className="bg-primary py-16 md:py-24 px-4 md:px-12 text-primary-foreground overflow-hidden border-y border-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl">
          <Image
            src={essenceImg?.imageUrl || "https://i.imgur.com/QHnytp8.jpeg"}
            alt="Essência Urbana"
            fill
            className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        <div className="fade-in">
          <span className="text-secondary font-medium tracking-[0.3em] uppercase text-[8px] md:text-[10px] mb-4 md:mb-6 block font-body">
            Nosso Lifestyle
          </span>
          <h2 className="text-3xl md:text-6xl font-headline mb-6 md:mb-8 leading-tight">
            Minimalismo Street, <br />
            <span className="italic">Atitude Global.</span>
          </h2>
          <div className="space-y-4 md:space-y-6 text-primary-foreground/80 font-body text-base md:text-lg leading-relaxed max-w-xl">
            <p>
              A Versare une a precisão da estética europeia com o caos criativo das grandes metrópoles brasileiras. 
              Somos o streetwear feito com propósito.
            </p>
            <p>
              Substituímos o descartável pelo duradouro. Linhos de alta gramatura, sarjas sustentáveis e couros premium se transformam em silhuetas contemporâneas que respeitam a rua e quem a habita.
            </p>
            <div className="pt-6 md:pt-8 border-t border-primary-foreground/10 flex items-center gap-4">
              <div className="w-8 md:w-12 h-px bg-secondary"></div>
              <p className="italic font-headline text-lg md:text-xl">The Street Heritage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
