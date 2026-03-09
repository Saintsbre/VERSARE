
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Essence } from "@/components/essence";
import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Classic Linen Shirt",
    price: 185,
    description: "Breathable, lightweight linen shirt perfect for summer evenings.",
    details: "100% Brazilian Linen. Hand-stitched in Sao Paulo.",
    image: "https://picsum.photos/seed/product1/600/800",
    category: "Apparel"
  },
  {
    id: "2",
    name: "Artisan Leather Sandals",
    price: 220,
    description: "Handcrafted sandals using vegetable-tanned leather.",
    details: "Italian leather, Brazilian craftsmanship.",
    image: "https://picsum.photos/seed/product2/600/800",
    category: "Accessories"
  },
  {
    id: "3",
    name: "Woven Straw Tote",
    price: 145,
    description: "A spacious tote hand-woven by local artisans.",
    details: "Natural straw, leather handles.",
    image: "https://picsum.photos/seed/product3/600/800",
    category: "Accessories"
  },
  {
    id: "4",
    name: "Organic Cotton Trousers",
    price: 195,
    description: "Relaxed fit trousers made from high-grade organic cotton.",
    details: "GOTS certified cotton.",
    image: "https://picsum.photos/seed/product4/600/800",
    category: "Apparel"
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
                The Collection
              </span>
              <h2 className="text-4xl font-headline text-primary">New Arrivals</h2>
            </div>
            <Link href="/collections" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors border-b border-primary/20 pb-1">
              View All
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
              <h3 className="text-3xl font-headline text-primary mb-6">Designed for Living</h3>
              <p className="text-primary/70 mb-8 leading-relaxed">
                Versare isn't just about clothing. It's about a lifestyle that values quality, 
                sustainability, and the beauty of the handmade. Every stitch tells a story of tradition 
                reimagined for the modern world.
              </p>
              <Button variant="outline" className="rounded-none uppercase tracking-widest text-[10px] border-primary text-primary hover:bg-primary hover:text-white px-8">
                Explore the Lookbook
              </Button>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
