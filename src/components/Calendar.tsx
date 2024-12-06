import React from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Task } from '../types/task';

export function Calendar() {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const { tasks } = useStore();

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getTasksForDay = (date: Date): Task[] => {
        return tasks.filter(
            (task) => task.dueDate && isSameDay(new Date(task.dueDate), date),
        );
    };

    const previousMonth = () => {
        setCurrentDate(
            (date) => new Date(date.getFullYear(), date.getMonth() - 1),
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            (date) => new Date(date.getFullYear(), date.getMonth() + 1),
        );
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={previousMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (day) => (
                        <div
                            key={day}
                            className="text-center text-sm font-medium text-gray-500 py-2"
                        >
                            {day}
                        </div>
                    ),
                )}

                {days.map((day) => {
                    const dayTasks = getTasksForDay(day);
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    const isCurrentDay = isToday(day);

                    return (
                        <div
                            key={day.toISOString()}
                            className={`min-h-[80px] p-1 border rounded ${
                                isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                            } ${isCurrentDay ? 'border-indigo-500' : 'border-gray-200'}`}
                        >
                            <div className="text-right">
                                <span
                                    className={`text-sm ${
                                        isCurrentMonth
                                            ? 'text-gray-900'
                                            : 'text-gray-400'
                                    } ${isCurrentDay ? 'font-bold' : ''}`}
                                >
                                    {format(day, 'd')}
                                </span>
                            </div>
                            <div className="mt-1">
                                {dayTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="text-xs p-1 mb-1 rounded bg-indigo-100 text-indigo-700 truncate"
                                        title={task.title}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
