
import React, { useState } from 'react';

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, setIngredients }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!ingredients.includes(inputValue.trim().toLowerCase())) {
        setIngredients([...ingredients, inputValue.trim().toLowerCase()]);
      }
      setInputValue('');
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-2 bg-gray-900/50 border border-gray-600 rounded-lg min-h-[44px]">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient}
            className="flex items-center bg-cyan-800 text-cyan-100 text-sm font-medium px-3 py-1 rounded-full animate-fade-in"
          >
            <span>{ingredient}</span>
            <button
              onClick={() => removeIngredient(ingredient)}
              className="ml-2 text-cyan-300 hover:text-white focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={ingredients.length === 0 ? "e.g., chicken, rice, tomatoes..." : "Add more..."}
          className="flex-grow bg-transparent p-1 focus:outline-none text-gray-100 min-w-[120px]"
        />
      </div>
    </div>
  );
};
