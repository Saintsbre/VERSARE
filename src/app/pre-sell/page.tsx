
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirestore, addDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, Check, Plus, Minus, RotateCcw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const AVAILABLE_TSHIRTS = [
  { 
    id: "maraca", 
    name: "MARACA OVERSIZED", 
    image: "https://i.imgur.com/LOSpwAG.jpeg",
    imageBack: "https://i.imgur.com/kh1I9p6.jpeg"
  },
  { 
    id: "street-club", 
    name: "STREET CLUB OVERSIZED", 
    image: "https://i.imgur.com/xrHRwq6.jpeg",
    imageBack: "https://i.imgur.com/qVegjta.jpeg"
  },
  { 
    id: "errejota", 
    name: "ERREJOTA OVERSIZED", 
    image: "https://i.imgur.com/DdsZdcD.jpeg",
    imageBack: "https://i.imgur.com/2EM2Yo1.jpeg"
  },
  { 
    id: "domingo", 
    name: "DOMINGO OVERSIZED", 
    image: "https://i.imgur.com/NZkBcyv.jpeg",
    imageBack: "https://i.imgur.com/SuZ7W4Z.jpeg"
  },
  { 
    id: "fly", 
    name: "FLY OVERSIZED", 
    image: "https://i.imgur.com/NZkBcyv.jpeg",
    imageBack: "https://i.imgur.com/zlcXbf1.jpeg"
  }
];

const COLORS = ["Branco", "Preto", "Off-White"];
const SIZES = ["P", "M", "G", "GG"];

interface Selection {
  id: string;
  name: string;
  color: string;
  size: string;
  quantity: string;
}

export default function PreSellPage() {
  const firestore = useFirestore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [noNumber, setNoNumber] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [addressData, setAddressData] = useState({
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
  });
  
  const { toast } = useToast();

  // Efeito de auto-flip a cada 3 segundos para as peças não selecionadas
  useEffect(() => {
    const interval = setInterval(() => {
      setFlippedIds(prev => {
        // Toca o flip de todas as peças que têm costas disponíveis de forma alternada
        const newFlipped = [...prev];
        AVAILABLE_TSHIRTS.forEach(shirt => {
          if (shirt.imageBack) {
            const index = newFlipped.indexOf(shirt.id);
            if (index > -1) {
              newFlipped.splice(index, 1);
            } else {
              newFlipped.push(shirt.id);
            }
          }
        });
        return newFlipped;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      setCepLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddressData({
            logradouro: data.logradouro || "",
            bairro: data.bairro || "",
            localidade: data.localidade || "",
            uf: data.uf || "",
          });
        } else {
          toast({
            variant: "destructive",
            title: "CEP não encontrado",
            description: "Verifique o número digitado.",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setCepLoading(false);
      }
    }
  };

  const toggleShirt = (shirt: typeof AVAILABLE_TSHIRTS[0]) => {
    setSelections(prev => {
      const exists = prev.find(s => s.id === shirt.id);
      if (exists) {
        return prev.filter(s => s.id !== shirt.id);
      }
      return [...prev, { id: shirt.id, name: shirt.name, color: COLORS[0], size: SIZES[1], quantity: "1" }];
    });
  };

  const toggleFlip = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFlippedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const updateSelection = (id: string, field: 'color' | 'size' | 'quantity', value: string) => {
    setSelections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (selections.length === 0) {
      toast({
        variant: "destructive",
        title: "Seleção necessária",
        description: "Selecione pelo menos uma peça para o pre-sell.",
      });
      return;
    }
    
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      whatsapp: formData.get("whatsapp") as string,
      cep: formData.get("cep") as string,
      address: addressData.logradouro || (formData.get("address") as string),
      number: noNumber ? "S/N" : (formData.get("number") as string),
      noNumber: noNumber,
      complement: formData.get("complement") as string || "",
      document: formData.get("document") as string,
      newsletter: formData.get("newsletter") === "on",
      selectedProducts: selections.map(({ name, color, size, quantity }) => ({ name, color, size, quantity })),
      createdAt: serverTimestamp(),
    };

    const preSellRef = collection(firestore, "pre-sell");
    addDocumentNonBlocking(preSellRef, payload);
    
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-4 md:px-12">
        <div className="max-w-5xl w-full bg-white/40 p-8 md:p-16 rounded-[2.5rem] shadow-xl fade-in border border-primary/5">
          {success ? (
            <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-500">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
                <div className="relative bg-primary rounded-full w-24 h-24 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl font-headline text-primary">Reserva Confirmada.</h1>
                <p className="text-primary/60 font-body leading-relaxed max-w-sm mx-auto">
                  Sua seleção foi registrada com sucesso no Pre-Sell. Avisaremos você por WhatsApp assim que o Drop 01 for liberado em 2026.
                </p>
              </div>

              <div className="pt-8 border-t border-primary/5">
                <Link href="/">
                  <Button 
                    variant="outline" 
                    className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-10 h-14 uppercase tracking-[0.2em] text-[10px] transition-all"
                  >
                    Voltar para a Coleção
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-16 text-center">
                <span className="text-secondary font-medium tracking-[0.3em] uppercase text-[10px] mb-4 block">
                  Acesso Exclusivo
                </span>
                <h1 className="text-4xl md:text-5xl font-headline text-primary mb-6">Pre-Sell Drop 01</h1>
                <p className="text-primary/60 font-body text-base leading-relaxed max-w-lg mx-auto">
                  Selecione abaixo as peças, cores, tamanhos e quantidades que você deseja garantir no lançamento de 2026 através do nosso Pre-Sell.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-20">
                <div className="space-y-10">
                  <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                    <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold text-primary">
                      Escolha suas Peças
                    </h3>
                    <div className="flex-grow h-px bg-primary/5"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                    {AVAILABLE_TSHIRTS.map((shirt) => {
                      const selection = selections.find(s => s.id === shirt.id);
                      const isSelected = !!selection;
                      const isFlipped = flippedIds.includes(shirt.id);

                      return (
                        <div 
                          key={shirt.id}
                          className={cn(
                            "group flex flex-col rounded-[2rem] overflow-hidden border-2 transition-all duration-500 bg-white/30",
                            isSelected ? "border-secondary shadow-2xl scale-[1.02]" : "border-transparent opacity-85 hover:opacity-100 shadow-md hover:shadow-lg"
                          )}
                        >
                          <div 
                            className="aspect-[4/5] relative cursor-pointer"
                            onClick={() => toggleShirt(shirt)}
                          >
                            <Image 
                              src={shirt.image} 
                              alt={shirt.name} 
                              fill 
                              className={cn(
                                "object-cover transition-all duration-700",
                                isFlipped ? "opacity-0 scale-105" : "opacity-100 scale-100"
                              )} 
                            />
                            {shirt.imageBack && (
                              <Image 
                                src={shirt.imageBack} 
                                alt={`${shirt.name} back`} 
                                fill 
                                className={cn(
                                  "object-cover transition-all duration-700 absolute inset-0",
                                  isFlipped ? "opacity-100 scale-100" : "opacity-0 scale-95"
                                )} 
                              />
                            )}

                            {shirt.imageBack && (
                              <button
                                type="button"
                                onClick={(e) => toggleFlip(e, shirt.id)}
                                className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md p-3.5 rounded-full shadow-2xl border border-primary/10 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
                                aria-label="Ver parte de trás"
                              >
                                <RotateCcw className={cn("w-5 h-5 text-primary transition-transform duration-500", isFlipped && "rotate-180")} />
                              </button>
                            )}

                            {isSelected && (
                              <div className="absolute inset-0 bg-secondary/5 flex items-center justify-center backdrop-blur-[2px] pointer-events-none">
                                <div className="bg-secondary text-white rounded-full p-4 shadow-2xl animate-in zoom-in-50 duration-300">
                                  <Check className="w-8 h-8" />
                                </div>
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-primary/5">
                              <p className="text-xs font-bold text-primary text-center uppercase tracking-widest">
                                {shirt.name}
                              </p>
                              <p className="text-[8px] text-center uppercase tracking-widest text-secondary font-bold mt-0.5">Brasilidade</p>
                            </div>
                          </div>
                          
                          {isSelected && (
                            <div className="p-6 space-y-5 animate-in fade-in slide-in-from-top-4 duration-500 bg-white/50">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-[9px] uppercase tracking-widest text-primary/60 font-bold">Cor</Label>
                                  <Select 
                                    value={selection.color} 
                                    onValueChange={(v) => updateSelection(shirt.id, 'color', v)}
                                  >
                                    <SelectTrigger className="h-11 text-[11px] rounded-xl bg-white/80 border-primary/10 hover:border-secondary/30 transition-colors">
                                      <SelectValue placeholder="Cor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {COLORS.map(c => (
                                        <SelectItem key={c} value={c} className="text-[11px]">{c}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-[9px] uppercase tracking-widest text-primary/60 font-bold">Tam.</Label>
                                  <Select 
                                    value={selection.size} 
                                    onValueChange={(v) => updateSelection(shirt.id, 'size', v)}
                                  >
                                    <SelectTrigger className="h-11 text-[11px] rounded-xl bg-white/80 border-primary/10 hover:border-secondary/30 transition-colors">
                                      <SelectValue placeholder="Tam" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {SIZES.map(s => (
                                        <SelectItem key={s} value={s} className="text-[11px]">{s}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-[9px] uppercase tracking-widest text-primary/60 font-bold">Qtd.</Label>
                                  <div className="flex items-center justify-between h-11 px-3 rounded-xl bg-white/80 border border-primary/10">
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const current = parseInt(selection.quantity);
                                        if (current > 1) updateSelection(shirt.id, 'quantity', (current - 1).toString());
                                      }}
                                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/5 text-primary transition-colors active:scale-90"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-sm font-bold text-primary min-w-[20px] text-center">
                                      {selection.quantity}
                                    </span>
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const current = parseInt(selection.quantity);
                                        if (current < 10) updateSelection(shirt.id, 'quantity', (current + 1).toString());
                                      }}
                                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/5 text-primary transition-colors active:scale-90"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                    <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold text-primary">
                      Dados para Entrega
                    </h3>
                    <div className="flex-grow h-px bg-primary/5"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input name="firstName" required placeholder="Nome" className="rounded-xl bg-white/50 border-primary/10 h-14 px-6 text-sm" />
                    <Input name="lastName" required placeholder="Sobrenome" className="rounded-xl bg-white/50 border-primary/10 h-14 px-6 text-sm" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input name="email" type="email" required placeholder="Email" className="rounded-xl bg-white/50 border-primary/10 h-14 px-6 text-sm" />
                    <Input name="whatsapp" type="tel" required placeholder="Telefone com DDD" className="rounded-xl bg-white/50 border-primary/10 h-14 px-6 text-sm" />
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <Input name="cep" required placeholder="CEP" onChange={handleCepChange} maxLength={9} className="rounded-xl bg-white/50 border-primary/10 h-14 px-6 text-sm" />
                      {cepLoading && <Loader2 className="absolute right-5 top-4.5 w-5 h-5 animate-spin text-primary/40" />}
                    </div>

                    <Input name="address" required value={addressData.logradouro} onChange={(e) => setAddressData({...addressData, logradouro: e.target.value})} placeholder="Endereço" className="rounded-xl bg-white/50 border-primary/10 h-14 px-6 text-sm" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex gap-3 items-center">
                        <Input name="number" disabled={noNumber} required={!noNumber} placeholder="Número" className="rounded-xl bg-white/50 border-primary/10 h-14 px-6 text-sm flex-grow" />
                        <div className="flex items-center space-x-3">
                          <Checkbox id="noNumber" checked={noNumber} onCheckedChange={(checked) => setNoNumber(!!checked)} />
                          <Label htmlFor="noNumber" className="text-[10px] uppercase text-primary/60 font-bold cursor-pointer">S/N</Label>
                        </div>
                      </div>
                      <Input name="complement" placeholder="Complemento" className="rounded-xl bg-white/50 border-primary/10 h-14 px-6 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                    <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold text-primary">
                      Dados para Nota Fiscal
                    </h3>
                  </div>
                  <Input name="document" required placeholder="CPF ou CNPJ" className="rounded-xl bg-white/50 border-primary/10 h-14 px-6 text-sm" />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-accent text-primary-foreground h-20 rounded-full uppercase tracking-[0.3em] text-[11px] transition-all"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Garantir meu Acesso via Pre-Sell"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
