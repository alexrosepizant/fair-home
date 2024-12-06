import React from 'react';
import { Home, Users, Settings, PlusCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Navigation() {
    const { setActiveView } = useStore();

    return (
        <nav className="bg-white shadow-sm fixed bottom-0 left-0 right-0 md:relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between md:justify-start gap-4 py-4">
                    <NavButton
                        icon={<Home />}
                        label="Tasks"
                        onClick={() => setActiveView('tasks')}
                    />
                    <NavButton
                        icon={<Users />}
                        label="Members"
                        onClick={() => setActiveView('members')}
                    />
                    <NavButton
                        icon={<Settings />}
                        label="Settings"
                        onClick={() => setActiveView('settings')}
                    />
                    <NavButton
                        icon={<PlusCircle />}
                        label="New Task"
                        onClick={() => setActiveView('new-task')}
                        className="md:ml-auto"
                    />
                </div>
            </div>
        </nav>
    );
}

interface NavButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    className?: string;
}

function NavButton({ icon, label, onClick, className = '' }: NavButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-indigo-600 transition-colors ${className}`}
        >
            {icon}
            <span className="text-xs">{label}</span>
        </button>
    );
}
