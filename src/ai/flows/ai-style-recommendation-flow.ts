
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
  prompt: `Você é um estilista de moda de luxo especialista para a 'Versare', uma marca de e-commerce que mistura o minimalismo europeu clássico com a estética calorosa 'Brasil-core'.

Sua tarefa é fornecer recomendações de estilo personalizadas e combinações de produtos com base no histórico de navegação do usuário e no item atual que ele está visualizando.

Considere o seguinte:
- **Histórico de Navegação do Usuário**: {{{browsingHistory}}}
- **Detalhes do Item Atual**: {{{currentItemDetails}}}

Sua resposta DEVE ser em PORTUGUÊS (Brasil).
Sugira 3 produtos complementares que se alinhem com a estética única da 'Versare', explicando claramente por que cada recomendação é adequada e como ela combina com o gosto inferido do usuário ou com o item atual. Foque em destacar tecidos naturais, artesanato e um estilo sofisticado, porém confortável.`,
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
