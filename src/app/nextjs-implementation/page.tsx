"use client";

import Link from "next/link";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

export default function NextJsImplementationPage() {
  const modules = [
    {
      title: "TypeScript dengan API Routes",
      href: "/nextjs-implementation/api-routes",
      description: "Membuat API endpoints dengan tipe yang aman di Next.js."
    },
    {
      title: "Typed Components & Props",
      href: "/nextjs-implementation/typed-components",
      description: "Membuat komponen React dengan props yang diketik dengan baik."
    },
    {
      title: "Custom Hooks dengan TypeScript",
      href: "/nextjs-implementation/custom-hooks",
      description: "Membuat dan menggunakan custom hooks dengan TypeScript."
    },
    {
      title: "State Management",
      href: "/nextjs-implementation/state-management",
      description: "Mengelola state aplikasi dengan TypeScript (Context, Redux, Zustand)."
    },
    {
      title: "Form Handling & Validation",
      href: "/nextjs-implementation/form-handling",
      description: "Validasi form dengan tipe yang aman menggunakan Zod dan React Hook Form."
    },
    {
      title: "Project Structure & Best Practices",
      href: "/nextjs-implementation/project-structure",
      description: "Mengorganisir proyek Next.js + TypeScript dengan praktik terbaik."
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
          <h1 className="text-3xl font-bold">Implementasi Next.js dengan TypeScript</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Pelajari cara mengimplementasikan TypeScript dalam proyek Next.js dengan berbagai contoh praktis.
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
        <h2 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">Tentang Modul Implementasi Next.js</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Modul-modul ini dirancang untuk membantu Anda memahami cara mengimplementasikan TypeScript dalam proyek Next.js. 
          Setiap modul fokus pada aspek spesifik dari pengembangan aplikasi Next.js dengan TypeScript, 
          mulai dari API Routes hingga praktik terbaik dalam struktur proyek.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Pelajari setiap modul secara berurutan untuk pemahaman yang komprehensif, atau pilih modul spesifik 
          yang relevan dengan kebutuhan proyek Anda saat ini.
        </p>
      </div>
    </div>
  );
} 