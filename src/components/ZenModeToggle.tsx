import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';

export function ZenModeToggle() {
    const { zenMode, toggleZenMode } = useStore();

    return (
        <button
            onClick={toggleZenMode}
            className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg transition-colors ${
                zenMode
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
        >
            {zenMode ? (
                <Moon className="w-6 h-6" />
            ) : (
                <Sun className="w-6 h-6" />
            )}
        </button>
    );
}
