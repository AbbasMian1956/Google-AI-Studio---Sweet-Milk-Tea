
import React from 'react';

export const WelcomeMessage: React.FC = () => {
    return (
        <div className="text-center p-8 bg-gray-800/30 rounded-lg border border-dashed border-gray-600">
            <div className="mb-4 text-5xl">🍽️</div>
            <h2 className="text-2xl font-bold text-gray-200">Welcome to the Recipe Generator</h2>
            <p className="mt-2 text-gray-400">
                Add your ingredients above and click "Generate Recipe" to discover what you can cook today!
            </p>
        </div>
    );
};
