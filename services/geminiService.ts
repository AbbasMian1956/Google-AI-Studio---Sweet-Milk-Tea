
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: "The name of the recipe." },
    description: { type: Type.STRING, description: "A short, enticing description of the dish." },
    prepTime: { type: Type.STRING, description: "Preparation time, e.g., '15 minutes'." },
    cookTime: { type: Type.STRING, description: "Cooking time, e.g., '25 minutes'." },
    servings: { type: Type.STRING, description: "Number of servings, e.g., '4 servings'." },
    ingredients: {
      type: Type.ARRAY,
      description: "List of ingredients required for the recipe, including quantities.",
      items: { type: Type.STRING }
    },
    instructions: {
      type: Type.ARRAY,
      description: "Step-by-step instructions to prepare the dish.",
      items: { type: Type.STRING }
    }
  },
  required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"],
};

export async function generateRecipe(ingredients: string[]): Promise<Recipe | null> {
  const prompt = `
    You are a professional chef. Based on the following ingredients, create a single, delicious recipe.
    Ensure the recipe primarily uses the ingredients provided, but you can assume common pantry staples like salt, pepper, basic spices and water are available.
    
    Available ingredients: ${ingredients.join(', ')}.

    Please provide the output in the requested JSON format. Do not add any extra commentary or text outside of the JSON structure.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      console.error("Gemini API returned an empty response for recipe generation.");
      return null;
    }

    const recipeData: Recipe = JSON.parse(jsonText);
    return recipeData;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe from Gemini API.");
  }
}

export async function generateRecipeImage(recipeName: string, description: string): Promise<string | null> {
    const prompt = `A vibrant, high-quality, professional food photograph of "${recipeName}". ${description}. The dish should look delicious and be plated beautifully on a clean, modern surface. Cinematic lighting, photorealistic, epic detail.`;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '16:9',
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;

    } catch (error) {
        console.error("Error generating recipe image:", error);
        // It's not a critical failure, so we don't throw. The app can proceed without an image.
        return null;
    }
}
