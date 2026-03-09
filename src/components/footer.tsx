
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background py-20 px-6 md:px-12 border-t border-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-headline text-primary mb-6">Versare</h2>
          <p className="text-primary/60 font-body text-sm max-w-xs leading-relaxed">
            Redefining luxury through artisanal craftsmanship and sustainable materials. 
            Inspired by the coast, made for the world.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-6">Shop</h4>
          <ul className="space-y-4 text-sm text-primary/60 font-medium">
            <li><Link href="/collections" className="hover:text-primary transition-colors">All Products</Link></li>
            <li><Link href="/collections" className="hover:text-primary transition-colors">Linen Wear</Link></li>
            <li><Link href="/collections" className="hover:text-primary transition-colors">Artisanal Accessories</Link></li>
            <li><Link href="/collections" className="hover:text-primary transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-6">Connect</h4>
          <ul className="space-y-4 text-sm text-primary/60 font-medium">
            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Pinterest</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-primary/40 uppercase tracking-widest font-medium">
          &copy; 2024 Versare. All rights reserved.
        </p>
        <div className="flex gap-8 text-[10px] text-primary/40 uppercase tracking-widest font-medium">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
