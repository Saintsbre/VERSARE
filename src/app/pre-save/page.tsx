
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase-client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function PreSavePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      whatsapp: formData.get("whatsapp") as string,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "pre-saves"), data);
      setSuccess(true);
      toast({
        title: "Sucesso!",
        description: "Você foi cadastrado na lista exclusiva da Versare.",
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível realizar o cadastro. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-4 md:px-12">
        <div className="max-w-md w-full bg-white/40 p-8 md:p-12 rounded-[2rem] shadow-xl fade-in border border-primary/5">
          {success ? (
            <div className="text-center space-y-6 py-8">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
              <h1 className="text-3xl font-headline text-primary">Bem-vindo à Versare.</h1>
              <p className="text-primary/60 font-body leading-relaxed">
                Seu lugar no Drop 01 está garantido. Você receberá um aviso exclusivo em breve.
              </p>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "/"}
                className="rounded-full uppercase tracking-widest text-[10px] mt-4"
              >
                Voltar ao Início
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center md:text-left">
                <span className="text-secondary font-medium tracking-[0.3em] uppercase text-[10px] mb-4 block">
                  Acesso Exclusivo
                </span>
                <h1 className="text-4xl font-headline text-primary mb-4">Pré-Save Drop 01</h1>
                <p className="text-primary/60 font-body text-sm leading-relaxed">
                  Cadastre-se para receber o acesso antecipado e garantir as peças mais limitadas da coleção.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] uppercase tracking-widest text-primary/40 font-bold ml-1">Nome Completo</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Seu nome"
                    className="rounded-full bg-white/50 border-primary/10 h-12 px-6"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-primary/40 font-bold ml-1">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="email@exemplo.com"
                    className="rounded-full bg-white/50 border-primary/10 h-12 px-6"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-[10px] uppercase tracking-widest text-primary/40 font-bold ml-1">WhatsApp</Label>
                  <Input 
                    id="whatsapp" 
                    name="whatsapp" 
                    type="tel" 
                    required 
                    placeholder="(00) 00000-0000"
                    className="rounded-full bg-white/50 border-primary/10 h-12 px-6"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-accent text-primary-foreground h-14 rounded-full uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-lg"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cadastrar Pre-Save"}
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
