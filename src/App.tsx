import React from 'react';
import { TaskCard } from './components/TaskCard';
import { ZenModeToggle } from './components/ZenModeToggle';
import { Navigation } from './components/Navigation';
import { TaskForm } from './components/TaskForm';
import { Calendar } from './components/Calendar';
import { useStore } from './store/useStore';

function App() {
  const { tasks, zenMode, activeView } = useStore();

  if (zenMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Zen Mode Active</h1>
          <p className="text-xl">Take time to relax and recharge</p>
        </div>
        <ZenModeToggle />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">FairHome</h1>
        </div>
      </header>

      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8 mb-16 md:mb-0">
        {activeView === 'tasks' && (
          <div className="space-y-8">
            <Calendar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {tasks.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No tasks yet. Create your first task!</p>
                </div>
              )}
            </div>
          </div>
        )}
        {activeView === 'members' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Members management coming soon!</p>
          </div>
        )}
        {activeView === 'settings' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Settings panel coming soon!</p>
          </div>
        )}
        {activeView === 'new-task' && <TaskForm />}
      </main>

      <ZenModeToggle />
    </div>
  );
}

export default App;