
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 text-center border-b border-gray-700/50 shadow-lg bg-gray-900/80 backdrop-blur-sm">
      <h1 className="text-4xl md:text-5xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
          Gemini Recipe Generator
        </span>
      </h1>
      <p className="text-gray-400 mt-2 text-lg">What's in your kitchen?</p>
    </header>
  );
};
