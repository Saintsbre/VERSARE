import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background py-16 md:py-20 px-4 md:px-12 border-t border-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div className="sm:col-span-2">
          <Link href="/">
            <div className="relative w-40 h-14 mb-6">
              <Image 
                src="https://i.imgur.com/Y0ZQbVN.png" 
                alt="Versare Logo" 
                fill 
                className="object-contain object-left"
              />
            </div>
          </Link>
          <p className="text-primary/60 font-body text-xs md:text-sm max-w-xs leading-relaxed">
            Redefinindo o luxo urbano através do artesanato e materiais sustentáveis. 
            Inspirado pela essência do Brasil, feito para o mundo.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-8 sm:col-span-2 md:col-span-2 md:grid-cols-2">
          <div>
            <h4 className="text-[9px] md:text-[10px] uppercase tracking-widest text-primary font-bold mb-6">Loja</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-primary/60 font-medium">
              <li><Link href="/" className="hover:text-primary transition-colors">Produtos</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Coleções</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Acessórios</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Novidades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[9px] md:text-[10px] uppercase tracking-widest text-primary font-bold mb-6">Conectar</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-primary/60 font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pinterest</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 md:mt-20 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[8px] md:text-[10px] text-primary/40 uppercase tracking-widest font-medium text-center md:text-left">
          &copy; 2026 Versare. Todos os direitos reservados.
        </p>
        <div className="flex gap-6 md:gap-8 text-[8px] md:text-[10px] text-primary/40 uppercase tracking-widest font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Privacidade</Link>
          <Link href="/" className="hover:text-primary transition-colors">Termos</Link>
        </div>
      </div>
    </footer>
  );
}
