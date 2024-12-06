import React, { useState } from 'react';
import { Calendar, Users, MessageCircle } from 'lucide-react';
import type { Task } from '../types/task';
import { EmotionalFeedbackModal } from './EmotionalFeedbackModal';
import { useStore } from '../store/useStore';
import {
    getTaskStressLevel,
    suggestTaskReassignment,
} from '../utils/taskDistribution';

interface Props {
    task: Task;
}

export function TaskCard({ task }: Props) {
    const { updateTask, users } = useStore();
    const [showFeedback, setShowFeedback] = useState(false);
    const stressLevel = getTaskStressLevel(task);

    const handleReassignment = () => {
        const newAssignees = suggestTaskReassignment(
            task,
            users,
            task.assignedTo[0],
        );
        if (newAssignees.length > 0) {
            updateTask(task.id, { assignedTo: newAssignees });
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            {task.description}
                        </p>
                    </div>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) =>
                            updateTask(task.id, { completed: e.target.checked })
                        }
                        className="h-6 w-6 rounded border-gray-300"
                    />
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{task.assignedTo.length} assigned</span>
                    </div>
                    {task.dueDate && (
                        <div className="flex items-center gap-2 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>
                                {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                    <div
                        className={`text-sm px-2 py-1 rounded ${
                            stressLevel === 'light'
                                ? 'bg-green-100 text-green-800'
                                : stressLevel === 'moderate'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {stressLevel} stress
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <button
                        onClick={() => setShowFeedback(true)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>Share Feelings</span>
                    </button>
                    {stressLevel === 'heavy' && (
                        <button
                            onClick={handleReassignment}
                            className="text-sm text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700"
                        >
                            Suggest Reassignment
                        </button>
                    )}
                </div>
            </div>

            {showFeedback && (
                <EmotionalFeedbackModal
                    task={task}
                    onClose={() => setShowFeedback(false)}
                />
            )}
        </>
    );
}
