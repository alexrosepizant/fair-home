import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Task } from '../types/task';

export function TaskForm() {
    const { addTask, setActiveView, users } = useStore();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'cleaning',
        assignedTo: [] as string[],
        dueDate: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const task: Task = {
            id: crypto.randomUUID(),
            ...formData,
            completed: false,
            emotionalRatings: {},
            isShared: formData.assignedTo.length > 1,
            dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        };
        addTask(task);
        setActiveView('tasks');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">New Task</h2>
                    <button
                        onClick={() => setActiveView('tasks')}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            required
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    category: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="cleaning">Cleaning</option>
                            <option value="cooking">Cooking</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="assignedTo"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Assign To
                        </label>
                        <select
                            id="assignedTo"
                            multiple
                            value={formData.assignedTo}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    assignedTo: Array.from(
                                        e.target.selectedOptions,
                                        (option) => option.value,
                                    ),
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="dueDate"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            value={formData.dueDate}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dueDate: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setActiveView('tasks')}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
