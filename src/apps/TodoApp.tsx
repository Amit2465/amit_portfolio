import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn Flutter', completed: true },
    { id: 2, text: 'Build a portfolio', completed: false },
    { id: 3, text: 'Apply for jobs', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
        },
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-emerald-50 p-4 pt-16">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Todo List</h2>
        <p className="text-center text-gray-600 mb-4 text-sm">
          {completedCount} of {todos.length} tasks completed
        </p>

        {/* Add Todo */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTodo}
            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={16} />
          </motion.button>
        </div>

        {/* Todo List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={`
                  flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200
                  ${todo.completed ? 'opacity-60' : ''}
                `}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleTodo(todo.id)}
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${todo.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-300 hover:border-green-500'
                    }
                  `}
                >
                  {todo.completed && <Check size={12} />}
                </motion.button>
                
                <span className={`
                  flex-1 text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}
                `}>
                  {todo.text}
                </span>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 size={14} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {todos.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No tasks yet. Add one above!
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;