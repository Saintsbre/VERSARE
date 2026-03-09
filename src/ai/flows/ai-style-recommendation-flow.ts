'use server';
/**
 * @fileOverview Um agente de IA que fornece recomendações de estilo personalizadas e combinações de produtos.
 *
 * - aiStyleRecommendation - Uma função que gera recomendações de estilo.
 * - AIStyleRecommendationInput - O tipo de entrada para a função aiStyleRecommendation.
 * - AIStyleRecommendationOutput - O tipo de retorno para a função aiStyleRecommendation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIStyleRecommendationInputSchema = z.object({
  browsingHistory: z
    .array(z.string())
    .describe('Uma lista de descrições ou nomes de produtos que o usuário visualizou anteriormente.'),
  currentItemDetails: z
    .string()
    .describe('Informações detalhadas sobre o produto atual que o usuário está visualizando.'),
});
export type AIStyleRecommendationInput = z.infer<
  typeof AIStyleRecommendationInputSchema
>;

const AIStyleRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      productName: z.string().describe('O nome do produto recomendado.'),
      description: z
        .string()
        .describe('Uma breve explicação de por que este produto é recomendado e como ele combina.'),
    })
  ),
});
export type AIStyleRecommendationOutput = z.infer<
  typeof AIStyleRecommendationOutputSchema
>;

export async function aiStyleRecommendation(
  input: AIStyleRecommendationInput
): Promise<AIStyleRecommendationOutput> {
  return aiStyleRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiStyleRecommendationPrompt',
  input: {schema: AIStyleRecommendationInputSchema},
  output: {schema: AIStyleRecommendationOutputSchema},
  prompt: `Você é um estilista especialista da 'Versare', uma marca de e-commerce que funde o minimalismo europeu clássico, a estética 'Brasil-core' e a atitude do STREETWEAR de luxo.

Sua tarefa é fornecer recomendações de estilo personalizadas e combinações de produtos com base no histórico de navegação do usuário e no item atual.

Considere o seguinte:
- **Histórico de Navegação**: {{{browsingHistory}}}
- **Item Atual**: {{{currentItemDetails}}}

Sua resposta DEVE ser em PORTUGUÊS (Brasil).
Sugira 3 produtos complementares que alinhem com a estética 'Streetwear Sofisticado' da Versare. Pense em modelagens oversized, tecidos nobres, acessórios urbanos e um visual que transita entre a galeria de arte e a rua. Explique como a peça traz um toque urbano e cool para o look.`,
});

const aiStyleRecommendationFlow = ai.defineFlow(
  {
    name: 'aiStyleRecommendationFlow',
    inputSchema: AIStyleRecommendationInputSchema,
    outputSchema: AIStyleRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
