
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function Essence() {
  const essenceImg = PlaceHolderImages.find(img => img.id === 'essence-bg');

  return (
    <section className="bg-primary py-24 px-6 md:px-12 text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden">
          <Image
            src={essenceImg?.imageUrl || "https://picsum.photos/seed/essence/800/1000"}
            alt="Textura Artesanal"
            fill
            className="object-cover opacity-80"
          />
        </div>
        
        <div className="fade-in">
          <span className="text-secondary font-medium tracking-[0.3em] uppercase text-[10px] mb-6 block">
            Nossa Essência
          </span>
          <h2 className="text-4xl md:text-6xl font-headline mb-8 leading-tight">
            Curadoria Europeia, <br />
            <span className="italic">Alma Brasileira.</span>
          </h2>
          <div className="space-y-6 text-primary-foreground/80 font-body text-lg leading-relaxed max-w-xl">
            <p>
              Versare nasceu do desejo de unir dois mundos: a elegância estrutural da alfaiataria europeia e o pulso vibrante e orgânico da alma brasileira.
            </p>
            <p>
              Cada peça é um testemunho do slow fashion, criada com materiais 100% naturais — linhos, algodões orgânicos e couros curtidos à mão — desenhados para envelhecer com graça e contar uma história de artesanato.
            </p>
            <div className="pt-8 border-t border-primary-foreground/10 flex items-center gap-4">
              <div className="w-12 h-px bg-secondary"></div>
              <p className="italic font-headline text-xl">A Filosofia Versare</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
