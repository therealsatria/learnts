"use client";

import { useState, createContext, useContext, useReducer } from 'react';

// ==========================================
// BAGIAN 1: CONTEXT API
// ==========================================

// Mendefinisikan tipe untuk ThemeContext
type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Membuat context dengan nilai default
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook untuk menggunakan ThemeContext
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Provider component untuk ThemeContext
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Contoh komponen yang menggunakan ThemeContext
function ThemeDemo() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <p>Current theme: {theme}</p>
      <button 
        onClick={toggleTheme}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toggle Theme
      </button>
    </div>
  );
}

// ==========================================
// BAGIAN 2: REDUX PATTERN (REDUCER)
// ==========================================

// Mendefinisikan tipe untuk state dan action
type CounterState = {
  count: number;
};

type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_COUNT'; payload: number };

// Reducer function untuk mengelola state
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET_COUNT':
      return { count: action.payload };
    default:
      return state;
  }
}

// Contoh komponen yang menggunakan reducer
function CounterDemo() {
  // Inisialisasi state dan dispatch dengan useReducer
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">Counter: {state.count}</h3>
      <div className="flex space-x-2">
        <button 
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Increment
        </button>
        <button 
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
        <button 
          onClick={() => dispatch({ type: 'RESET' })}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// ==========================================
// BAGIAN 3: ZUSTAND PATTERN (SIMPLIFIED)
// ==========================================

// Mendefinisikan tipe untuk store
type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// Implementasi sederhana dari store pattern seperti Zustand
function createStore<T>(initialState: T): [() => T, (partial: Partial<T>) => void] {
  let state = initialState;
  const listeners: (() => void)[] = [];

  const getState = () => state;
  
  const setState = (partial: Partial<T>) => {
    state = { ...state, ...partial };
    listeners.forEach(listener => listener());
  };

  return [getState, setState];
}

// Membuat custom hook untuk todo store
function useTodoStore() {
  // State untuk menyimpan todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fungsi untuk menambah todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Fungsi untuk toggle status todo
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Fungsi untuk menghapus todo
  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, removeTodo };
}

// Contoh komponen yang menggunakan todo store
function TodoDemo() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">Todo List</h3>
      
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-2 border rounded-l"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </form>
      
      <ul className="space-y-2">
        {todos.length === 0 ? (
          <li className="text-gray-500">No todos yet</li>
        ) : (
          todos.map(todo => (
            <li 
              key={todo.id} 
              className="flex items-center justify-between p-2 border rounded"
            >
              <span 
                className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button 
                onClick={() => removeTodo(todo.id)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

// ==========================================
// HALAMAN UTAMA
// ==========================================

export default function StateManagementPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">State Management dengan TypeScript</h1>
      
      {/* Context API Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Context API</h2>
        <p className="mb-4">
          Context API adalah fitur bawaan React untuk mengelola state global tanpa prop drilling.
          Dengan TypeScript, kita dapat mendefinisikan tipe data yang jelas untuk context.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`
// Mendefinisikan tipe untuk ThemeContext
type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Membuat context dengan nilai default
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook untuk menggunakan ThemeContext
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
            `}</code>
          </pre>
        </div>
        
        <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
          <ThemeProvider>
            <ThemeDemo />
          </ThemeProvider>
        </div>
      </section>
      
      {/* Redux Pattern Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. Redux Pattern (useReducer)</h2>
        <p className="mb-4">
          Redux adalah library populer untuk state management. Di sini kita menggunakan useReducer
          hook dari React yang mengimplementasikan pola Redux dengan TypeScript.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`
// Mendefinisikan tipe untuk state dan action
type CounterState = {
  count: number;
};

type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_COUNT'; payload: number };

// Reducer function untuk mengelola state
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    // ...
  }
}
            `}</code>
          </pre>
        </div>
        
        <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
          <CounterDemo />
        </div>
      </section>
      
      {/* Zustand Pattern Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. Zustand Pattern</h2>
        <p className="mb-4">
          Zustand adalah library state management yang ringan dan mudah digunakan.
          Di sini kita mengimplementasikan pola yang mirip dengan Zustand menggunakan hooks.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`
// Mendefinisikan tipe untuk store
type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// Custom hook untuk todo store
function useTodoStore() {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = (text: string) => {
    // Implementation...
  };
  
  // Other methods...
  
  return { todos, addTodo, toggleTodo, removeTodo };
}
            `}</code>
          </pre>
        </div>
        
        <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
          <TodoDemo />
        </div>
      </section>
      
      {/* Perbandingan */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Perbandingan State Management</h2>
        <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Fitur</th>
                <th className="border p-2">Context API</th>
                <th className="border p-2">Redux</th>
                <th className="border p-2">Zustand</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Kompleksitas</td>
                <td className="border p-2">Rendah</td>
                <td className="border p-2">Tinggi</td>
                <td className="border p-2">Rendah</td>
              </tr>
              <tr>
                <td className="border p-2">Boilerplate</td>
                <td className="border p-2">Minimal</td>
                <td className="border p-2">Banyak</td>
                <td className="border p-2">Minimal</td>
              </tr>
              <tr>
                <td className="border p-2">Performa</td>
                <td className="border p-2">Baik untuk state sederhana</td>
                <td className="border p-2">Baik untuk state kompleks</td>
                <td className="border p-2">Sangat baik</td>
              </tr>
              <tr>
                <td className="border p-2">TypeScript Support</td>
                <td className="border p-2">Baik</td>
                <td className="border p-2">Baik dengan toolkit</td>
                <td className="border p-2">Sangat baik</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
} 