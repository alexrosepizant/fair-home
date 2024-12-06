export type EmotionalState = 'relaxed' | 'neutral' | 'stressed';
export type TaskStressLevel = 'light' | 'moderate' | 'heavy';

export interface EmotionalFeedback {
    userId: string;
    taskId: string;
    rating: number;
    comment?: string;
    timestamp: Date;
}

export interface ConflictReport {
    taskId: string;
    users: string[];
    reason: string;
    status: 'pending' | 'resolved';
    resolution?: string;
}
