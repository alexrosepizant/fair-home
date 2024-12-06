import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { EmotionalRating } from './EmotionalRating';
import type { Task } from '../types/task';
import { useStore } from '../store/useStore';

interface Props {
  task: Task;
  onClose: () => void;
}

export function EmotionalFeedbackModal({ task, onClose }: Props) {
  const { updateTask, updateUserEmotionalState, users } = useStore();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update task emotional ratings
    updateTask(task.id, {
      emotionalRatings: { ...task.emotionalRatings, 'user-1': rating },
    });

    // Update user emotional state based on rating
    if (rating <= 2) {
      updateUserEmotionalState('user-1', 'stressed');
    } else if (rating >= 4) {
      updateUserEmotionalState('user-1', 'relaxed');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">How do you feel about this task?</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Rate your emotional response:</p>
            <EmotionalRating value={rating} onChange={setRating} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share your thoughts (optional):
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              placeholder="How does this task make you feel?"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}