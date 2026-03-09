
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { db } from "@/lib/firebase-client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, MapPin, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PreSavePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [noNumber, setNoNumber] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [addressData, setAddressData] = useState({
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
  });
  
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);

    try {
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
        complement: formData.get("complement") as string,
        document: formData.get("document") as string,
        newsletter: formData.get("newsletter") === "on",
        createdAt: serverTimestamp(),
      };

      if (!db) {
        throw new Error("Banco de dados não inicializado. Verifique as configurações do Firebase.");
      }

      // Salva no Firestore
      const docRef = await addDoc(collection(db, "pre-saves"), payload);
      console.log("Documento salvo com ID: ", docRef.id);
      
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      console.error("Erro detalhado ao salvar:", error);
      toast({
        variant: "destructive",
        title: "Erro no Cadastro",
        description: error.message || "Não foi possível conectar ao banco de dados. Certifique-se de que o Firebase está configurado corretamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-4 md:px-12">
        <div className="max-w-2xl w-full bg-white/40 p-8 md:p-12 rounded-[2rem] shadow-xl fade-in border border-primary/5">
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
                  Você agora faz parte da lista exclusiva da Versare. Avisaremos você por WhatsApp assim que o Drop 01 for liberado em 2026.
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

              <p className="text-[9px] uppercase tracking-[0.3em] text-primary/30 font-bold">
                The Future of Streetwear
              </p>
            </div>
          ) : (
            <>
              <div className="mb-12 text-center">
                <span className="text-secondary font-medium tracking-[0.3em] uppercase text-[10px] mb-4 block">
                  Acesso Exclusivo
                </span>
                <h1 className="text-4xl font-headline text-primary mb-4">Pré-Save Drop 01</h1>
                <p className="text-primary/60 font-body text-sm leading-relaxed max-w-md mx-auto">
                  Garanta sua peça exclusiva preenchendo as informações de reserva para o próximo lançamento de 2026.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-6">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary/80 border-b border-primary/10 pb-2">
                    Dados para Entrega
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      name="firstName" 
                      required 
                      placeholder="Nome"
                      className="rounded-lg bg-white/50 border-primary/10 h-12 px-6"
                    />
                    <Input 
                      name="lastName" 
                      required 
                      placeholder="Sobrenome"
                      className="rounded-lg bg-white/50 border-primary/10 h-12 px-6"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="Email"
                      className="rounded-lg bg-white/50 border-primary/10 h-12 px-6"
                    />
                    <Input 
                      name="whatsapp" 
                      type="tel" 
                      required 
                      placeholder="Telefone com DDD"
                      className="rounded-lg bg-white/50 border-primary/10 h-12 px-6"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <Input 
                        name="cep" 
                        required 
                        placeholder="CEP (Digite para localizar)"
                        onChange={handleCepChange}
                        maxLength={9}
                        className="rounded-lg bg-white/50 border-primary/10 h-12 px-6"
                      />
                      {cepLoading && <Loader2 className="absolute right-4 top-3.5 w-5 h-5 animate-spin text-primary/40" />}
                    </div>

                    {addressData.localidade && (
                      <div className="bg-primary/5 p-4 rounded-lg flex items-start gap-3 border border-primary/10 animate-in fade-in slide-in-from-top-2 duration-300">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div className="text-xs text-primary/70">
                          <p className="font-bold text-primary">CEP Localizado</p>
                          <p>{addressData.logradouro} - {addressData.bairro}</p>
                          <p>{addressData.localidade} - {addressData.uf}</p>
                        </div>
                      </div>
                    )}

                    <Input 
                      name="address" 
                      required 
                      value={addressData.logradouro}
                      onChange={(e) => setAddressData({...addressData, logradouro: e.target.value})}
                      placeholder="Endereço"
                      className="rounded-lg bg-white/50 border-primary/10 h-12 px-6"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex gap-2 items-center">
                        <Input 
                          name="number" 
                          disabled={noNumber}
                          required={!noNumber}
                          placeholder="Número"
                          className="rounded-lg bg-white/50 border-primary/10 h-12 px-6 flex-grow"
                        />
                        <div className="flex items-center space-x-2 min-w-fit pr-2">
                          <Checkbox 
                            id="noNumber" 
                            checked={noNumber}
                            onCheckedChange={(checked) => setNoNumber(!!checked)}
                          />
                          <Label htmlFor="noNumber" className="text-[10px] uppercase text-primary/60 font-medium cursor-pointer">S/N</Label>
                        </div>
                      </div>
                      <Input 
                        name="complement" 
                        placeholder="Apto, Bloco, etc. (opcional)"
                        className="rounded-lg bg-white/50 border-primary/10 h-12 px-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                    <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary/80">
                      Dados para Nota Fiscal
                    </h3>
                    <HelpCircle className="w-4 h-4 text-primary/20 cursor-help" />
                  </div>
                  
                  <Input 
                    name="document" 
                    required 
                    placeholder="CPF ou CNPJ"
                    className="rounded-lg bg-white/50 border-primary/10 h-12 px-6"
                  />

                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox id="newsletter" name="newsletter" className="mt-0.5" defaultChecked />
                    <Label 
                      htmlFor="newsletter" 
                      className="text-[11px] text-primary/60 leading-tight font-medium cursor-pointer"
                    >
                      Quero receber novidades e avisos antecipados da Versare por e-mail e WhatsApp.
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-accent text-primary-foreground h-16 rounded-full uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-lg mt-4 group"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Garantir meu Acesso Antecipado
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
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
