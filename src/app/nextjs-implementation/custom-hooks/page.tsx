"use client";

import { useState, useEffect, useCallback } from 'react';

// Custom hook untuk menangani state lokal dengan TypeScript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Custom hook untuk menangani fetch data dengan TypeScript
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Custom hook untuk menangani form dengan TypeScript
function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, reset };
}

// Custom hook untuk menangani countdown timer
function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);
  const reset = useCallback(() => {
    setIsActive(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return { seconds, isActive, start, pause, reset };
}

// Custom hook untuk menangani dark mode
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const toggleDarkMode = useCallback(() => {
    setIsDark(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  }, []);

  return { isDark, toggleDarkMode };
}

export default function CustomHooksPage() {
  // Contoh penggunaan useForm
  const { values, handleChange, reset } = useForm({
    username: '',
    email: ''
  });

  // Contoh penggunaan useCountdown
  const { seconds, isActive, start, pause, reset: resetTimer } = useCountdown(60);

  // Contoh penggunaan useDarkMode
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Custom Hooks dengan TypeScript</h1>
      
      {/* Form Hook Demo */}
      <section className="mb-8 p-6 border rounded-lg bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">useForm Hook</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset Form
          </button>
          <pre className="mt-4 p-4 bg-gray-100 rounded">
            <code>{JSON.stringify(values, null, 2)}</code>
          </pre>
        </div>
      </section>

      {/* Countdown Hook Demo */}
      <section className="mb-8 p-6 border rounded-lg bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">useCountdown Hook</h2>
        <div className="space-y-4">
          <div className="text-4xl font-bold text-center">{seconds}</div>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={isActive ? pause : start}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Dark Mode Hook Demo */}
      <section className="mb-8 p-6 border rounded-lg bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">useDarkMode Hook</h2>
        <div className="flex items-center justify-between">
          <span>Current Mode: {isDark ? 'Dark' : 'Light'}</span>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Toggle Dark Mode
          </button>
        </div>
      </section>

      {/* Dokumentasi */}
      <section className="mt-8 p-6 border rounded-lg bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">Dokumentasi</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">useForm</h3>
            <pre className="bg-gray-100 p-4 rounded">
              <code>{`const { values, errors, handleChange, reset } = useForm({
  username: '',
  email: ''
});`}</code>
            </pre>
          </div>
          <div>
            <h3 className="font-medium mb-2">useCountdown</h3>
            <pre className="bg-gray-100 p-4 rounded">
              <code>{`const { seconds, isActive, start, pause, reset } = useCountdown(60);`}</code>
            </pre>
          </div>
          <div>
            <h3 className="font-medium mb-2">useDarkMode</h3>
            <pre className="bg-gray-100 p-4 rounded">
              <code>{`const { isDark, toggleDarkMode } = useDarkMode();`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
} 