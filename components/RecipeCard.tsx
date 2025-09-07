
import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  imageUrl: string | null;
}

const ImagePlaceholder: React.FC = () => (
    <div className="w-full h-64 bg-gray-700 animate-pulse flex items-center justify-center rounded-t-lg">
      <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
    </div>
);

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, imageUrl }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl shadow-teal-500/10 overflow-hidden border border-gray-700 animate-fade-in-up">
      {imageUrl ? (
        <img src={imageUrl} alt={recipe.recipeName} className="w-full h-64 object-cover" />
      ) : (
        <ImagePlaceholder />
      )}
      <div className="p-6 md:p-8">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 mb-2">{recipe.recipeName}</h3>
        <p className="text-gray-400 mb-6">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-4 text-center mb-8 border-y border-gray-700 py-4">
            <div className="flex-1">
                <p className="text-sm text-gray-400">Prep Time</p>
                <p className="font-bold text-lg text-cyan-300">{recipe.prepTime}</p>
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-400">Cook Time</p>
                <p className="font-bold text-lg text-cyan-300">{recipe.cookTime}</p>
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-400">Servings</p>
                <p className="font-bold text-lg text-cyan-300">{recipe.servings}</p>
            </div>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h4 className="text-xl font-semibold text-cyan-400 mb-4">Ingredients</h4>
            <ul className="space-y-2 list-disc list-inside text-gray-300">
              {recipe.ingredients.map((item, index) => (
                <li key={index} className="pl-2">{item}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xl font-semibold text-cyan-400 mb-4">Instructions</h4>
            <ol className="space-y-4 text-gray-300">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="bg-cyan-700 text-cyan-100 rounded-full h-6 w-6 text-center font-bold mr-4 flex-shrink-0">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
