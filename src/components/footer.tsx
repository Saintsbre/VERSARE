import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background py-20 px-6 md:px-12 border-t border-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/">
            <div className="relative w-48 h-18 mb-6">
              <Image 
                src="https://i.imgur.com/Y0ZQbVN.png" 
                alt="Versare Logo" 
                fill 
                className="object-contain object-left"
              />
            </div>
          </Link>
          <p className="text-primary/60 font-body text-sm max-w-xs leading-relaxed">
            Redefinindo o luxo urbano através do artesanato e materiais sustentáveis. 
            Inspirado pela essência do Brasil, feito para o mundo.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-6">Loja</h4>
          <ul className="space-y-4 text-sm text-primary/60 font-medium">
            <li><Link href="/" className="hover:text-primary transition-colors">Todos os Produtos</Link></li>
            <li><Link href="/" className="hover:text-primary transition-colors">Peças de Linho</Link></li>
            <li><Link href="/" className="hover:text-primary transition-colors">Acessórios Artesanais</Link></li>
            <li><Link href="/" className="hover:text-primary transition-colors">Novidades</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-6">Conectar</h4>
          <ul className="space-y-4 text-sm text-primary/60 font-medium">
            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Pinterest</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-primary/40 uppercase tracking-widest font-medium">
          &copy; 2024 Versare. Todos os direitos reservados.
        </p>
        <div className="flex gap-8 text-[10px] text-primary/40 uppercase tracking-widest font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Política de Privacidade</Link>
          <Link href="/" className="hover:text-primary transition-colors">Termos de Serviço</Link>
        </div>
      </div>
    </footer>
  );
}
