import { create } from 'zustand';
import type { Task } from '../types/task';
import type { User } from '../types/user';
import type { EmotionalFeedback, ConflictReport } from '../types/emotions';

type View = 'tasks' | 'members' | 'settings' | 'new-task';

interface Store {
  tasks: Task[];
  users: User[];
  zenMode: boolean;
  activeView: View;
  emotionalFeedback: EmotionalFeedback[];
  conflicts: ConflictReport[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  toggleZenMode: () => void;
  updateUserEmotionalState: (userId: string, state: User['emotionalState']) => void;
  setActiveView: (view: View) => void;
  addEmotionalFeedback: (feedback: EmotionalFeedback) => void;
  reportConflict: (conflict: ConflictReport) => void;
  resolveConflict: (taskId: string, resolution: string) => void;
}

export const useStore = create<Store>((set) => ({
  tasks: [],
  users: [
    {
      id: 'user-1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?u=john',
      emotionalState: 'neutral',
      preferences: {
        preferredTasks: [],
        dislikedTasks: [],
      },
    },
  ],
  zenMode: false,
  activeView: 'tasks',
  emotionalFeedback: [],
  conflicts: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
  toggleZenMode: () => set((state) => ({ zenMode: !state.zenMode })),
  updateUserEmotionalState: (userId, state) =>
    set((store) => ({
      users: store.users.map((user) =>
        user.id === userId ? { ...user, emotionalState: state } : user
      ),
    })),
  setActiveView: (view) => set({ activeView: view }),
  addEmotionalFeedback: (feedback) =>
    set((state) => ({
      emotionalFeedback: [...state.emotionalFeedback, feedback],
    })),
  reportConflict: (conflict) =>
    set((state) => ({
      conflicts: [...state.conflicts, conflict],
    })),
  resolveConflict: (taskId, resolution) =>
    set((state) => ({
      conflicts: state.conflicts.map((conflict) =>
        conflict.taskId === taskId
          ? { ...conflict, status: 'resolved', resolution }
          : conflict
      ),
    })),
}));