
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useVersareStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useVersareStore();

  const total = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-headline text-primary mb-12">Sua Sacola</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6 fade-in">
            <ShoppingBag className="w-12 h-12 text-primary/10" />
            <p className="text-primary/60 font-body text-lg italic">Sua sacola está vazia.</p>
            <Link href="/">
              <Button className="bg-primary hover:bg-accent text-primary-foreground rounded-none px-8 py-6 uppercase tracking-widest text-[10px]">
                Explorar Coleções
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-8">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex gap-6 pb-8 border-b border-primary/10 fade-in">
                  <div className="relative w-24 h-32 bg-[#F5F1E9] flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-headline text-primary">{item.name}</h3>
                        <X 
                          className="w-4 h-4 text-primary/40 cursor-pointer hover:text-primary transition-colors" 
                          onClick={() => removeFromCart(item.id)}
                        />
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-primary/40 mt-1">{item.category}</p>
                    </div>
                    <p className="text-lg font-body text-primary font-semibold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/40 p-8 shadow-sm">
                <h2 className="text-xl font-headline text-primary mb-8 pb-4 border-b border-primary/10">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-primary/60">
                    <span>Subtotal</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-primary/60">
                    <span>Frete</span>
                    <span>Cortesia</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-headline text-primary mb-10 pt-4 border-t border-primary/10">
                  <span>Total</span>
                  <span>${total}</span>
                </div>

                <Button className="w-full bg-primary hover:bg-accent text-primary-foreground py-8 rounded-none text-xs uppercase tracking-[0.2em] transition-all duration-300">
                  Finalizar Compra
                </Button>

                <div className="mt-8 pt-8 border-t border-primary/5 text-center">
                  <p className="text-[10px] text-primary/30 uppercase tracking-[0.2em] font-medium mb-4">
                    Pagamento seguro via Stripe
                  </p>
                  <div className="flex justify-center gap-4 opacity-30 grayscale">
                    <div className="w-8 h-5 bg-primary rounded-sm"></div>
                    <div className="w-8 h-5 bg-primary rounded-sm"></div>
                    <div className="w-8 h-5 bg-primary rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
