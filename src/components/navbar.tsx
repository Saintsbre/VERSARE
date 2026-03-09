"use client";

import Link from "next/link";
import { useVersareStore } from "@/lib/store";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Navbar() {
  const cart = useVersareStore((state) => state.cart);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-6",
        isScrolled ? "bg-background/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        <div className="flex gap-8 items-center">
          <Menu className="w-5 h-5 text-primary md:hidden cursor-pointer" />
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-primary/80">
            <Link href="/" className="hover:text-primary transition-colors">Início</Link>
            <Link href="/" className="hover:text-primary transition-colors">Coleções</Link>
            <Link href="/" className="hover:text-primary transition-colors">Sobre</Link>
          </div>
        </div>

        <Link href="/" className="justify-self-center">
          <h1 className="text-3xl font-brand tracking-widest text-primary uppercase">Versare</h1>
        </Link>

        <div className="flex gap-6 items-center justify-self-end text-primary/80">
          <Search className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          <Link href="/cart" className="relative hover:text-primary transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-primary-foreground text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
