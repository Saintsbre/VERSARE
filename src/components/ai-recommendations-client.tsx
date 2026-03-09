
"use client";

import { useEffect, useState } from "react";
import { aiStyleRecommendation, AIStyleRecommendationOutput } from "@/ai/flows/ai-style-recommendation-flow";
import { useVersareStore } from "@/lib/store";
import { Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AIRecommendationsProps {
  currentItemDetails: string;
}

export function AIRecommendations({ currentItemDetails }: AIRecommendationsProps) {
  const history = useVersareStore((state) => state.history);
  const [recommendations, setRecommendations] = useState<AIStyleRecommendationOutput['recommendations']>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRecs() {
      setLoading(true);
      try {
        const result = await aiStyleRecommendation({
          browsingHistory: history,
          currentItemDetails: currentItemDetails,
        });
        setRecommendations(result.recommendations);
      } catch (error) {
        console.error("AI Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecs();
  }, [history, currentItemDetails]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 className="w-6 h-6 animate-spin text-secondary" />
        <p className="text-[10px] uppercase tracking-widest text-primary/60">Styling with AI...</p>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-20 fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-5 h-5 text-secondary" />
        <h3 className="text-2xl font-headline text-primary">Styled For You</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, idx) => (
          <Card key={idx} className="bg-white/50 border-none rounded-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h4 className="font-headline text-lg text-primary mb-2">{rec.productName}</h4>
              <p className="text-sm text-primary/70 leading-relaxed font-body">
                {rec.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
