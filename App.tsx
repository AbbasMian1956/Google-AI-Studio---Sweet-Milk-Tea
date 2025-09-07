
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { IngredientInput } from './components/IngredientInput';
import { RecipeCard } from './components/RecipeCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WelcomeMessage } from './components/WelcomeMessage';
import { generateRecipe, generateRecipeImage } from './services/geminiService';
import type { Recipe } from './types';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['salt', 'sugar', 'corn flour', 'water', 'oil', 'eggs', 'cream']);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError('Please add some ingredients first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);
    setRecipeImage(null);

    try {
      const recipePromise = generateRecipe(ingredients);
      const recipeResult = await recipePromise;
      
      if (recipeResult) {
        setRecipe(recipeResult);
        // Generate image after we have the recipe name
        const imagePromise = generateRecipeImage(recipeResult.recipeName, recipeResult.description);
        const imageUrl = await imagePromise;
        setRecipeImage(imageUrl);
      } else {
        throw new Error('Failed to generate a recipe. The model returned no content.');
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console and your API key.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 md:p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Your Ingredients</h2>
          <p className="text-gray-400 mb-6">Enter the ingredients you have on hand. Press Enter after each one.</p>
          <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
          <button
            onClick={handleGenerateRecipe}
            disabled={isLoading || ingredients.length === 0}
            className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center shadow-lg shadow-cyan-600/20"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span className="ml-2">Generating...</span>
              </>
            ) : (
              '✨ Generate Recipe'
            )}
          </button>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {!isLoading && !recipe && !error && <WelcomeMessage />}

          {recipe && (
            <RecipeCard recipe={recipe} imageUrl={recipeImage} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
