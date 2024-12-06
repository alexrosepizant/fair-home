export interface User {
  id: string;
  name: string;
  avatar: string;
  emotionalState: 'relaxed' | 'neutral' | 'stressed';
  preferences: {
    preferredTasks: string[];
    dislikedTasks: string[];
  };
}