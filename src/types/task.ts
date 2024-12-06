export type EmotionalRating = 1 | 2 | 3 | 4 | 5;

export interface Task {
    id: string;
    title: string;
    description: string;
    assignedTo: string[];
    emotionalRatings: Record<string, EmotionalRating>;
    completed: boolean;
    dueDate?: Date;
    isShared: boolean;
    category: 'cleaning' | 'cooking' | 'maintenance' | 'other';
}
