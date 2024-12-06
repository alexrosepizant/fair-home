import React from 'react';
import { Heart, HeartOff } from 'lucide-react';
import type { EmotionalRating as Rating } from '../types/task';

interface Props {
    value: Rating;
    onChange: (rating: Rating) => void;
}

export function EmotionalRating({ value, onChange }: Props) {
    return (
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
                <button
                    key={rating}
                    onClick={() => onChange(rating as Rating)}
                    className={`transition-colors ${
                        rating <= value ? 'text-rose-500' : 'text-gray-300'
                    }`}
                >
                    {rating <= value ? (
                        <Heart className="w-6 h-6" />
                    ) : (
                        <HeartOff className="w-6 h-6" />
                    )}
                </button>
            ))}
        </div>
    );
}
