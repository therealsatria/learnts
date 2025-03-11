"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function TypeScriptModulesPage() {
  const modules = [
    {
      title: "Generics & Interfaces",
      href: "/generics-and-interfaces",
      description: "Pelajari cara membuat kode yang fleksibel dan dapat digunakan kembali dengan generics dan interfaces."
    },
    {
      title: "Arrow Functions",
      href: "/arrow-functions",
      description: "Memahami sintaks fungsi panah dan kapan menggunakannya dalam TypeScript."
    },
    {
      title: "Type Assertions & Type Guards",
      href: "/type-assertions-guards",
      description: "Teknik untuk bekerja dengan tipe data yang lebih aman dan ekspresif."
    },
    {
      title: "Classes & Inheritance",
      href: "/classes-inheritance",
      description: "OOP dalam TypeScript dengan class, inheritance, dan modifiers."
    },
    {
      title: "Utility Types",
      href: "/utility-types",
      description: "Menggunakan Partial, Readonly, Pick, Omit, dan utility types lainnya."
    },
    {
      title: "Async/Await & Promises",
      href: "/async-await",
      description: "Menangani operasi asinkron dengan tipe yang aman."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="flex items-center mb-4">
          <Link 
            href="/" 
            className="text-blue-500 hover:text-blue-700 mr-4 transition-colors"
          >
            &larr; Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-bold">Modul Pembelajaran TypeScript</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Pelajari konsep-konsep dasar TypeScript dengan contoh praktis dan penjelasan yang mudah dipahami.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <Link 
            key={index}
            href={module.href}
            className="block p-6 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400">{module.title}</h3>
              <FiArrowRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <p className="text-gray-600 dark:text-gray-300">{module.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">Tentang Modul Pembelajaran TypeScript</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Modul-modul ini dirancang untuk membantu Anda memahami konsep-konsep dasar TypeScript. 
          Setiap modul fokus pada fitur spesifik dari TypeScript dan menyediakan contoh praktis 
          yang dapat Anda jalankan langsung di browser.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Disarankan untuk mempelajari modul-modul ini secara berurutan jika Anda baru mengenal TypeScript, 
          tetapi Anda juga dapat memilih modul spesifik yang ingin Anda pelajari lebih dalam.
        </p>
      </div>
    </div>
  );
} 