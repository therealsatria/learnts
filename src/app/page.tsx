// src/app/page.tsx
import Link from "next/link";
import { FiBook, FiCode, FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 mb-4">
            TypeScript Learning Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Pelajari TypeScript dengan contoh praktis dan implementasi dalam Next.js
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <FiBook className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold">Modul Pembelajaran</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <ModuleCard 
                title="Generics & Interfaces" 
                href="/generics-and-interfaces"
                description="Pelajari cara membuat kode yang fleksibel dan dapat digunakan kembali dengan generics dan interfaces."
              />
              <ModuleCard 
                title="Arrow Functions" 
                href="/arrow-functions"
                description="Memahami sintaks fungsi panah dan kapan menggunakannya dalam TypeScript."
              />
              <ModuleCard 
                title="Type Assertions & Type Guards" 
                href="/type-assertions-guards"
                description="Teknik untuk bekerja dengan tipe data yang lebih aman dan ekspresif."
              />
              <ModuleCard 
                title="Classes & Inheritance" 
                href="/classes-inheritance"
                description="OOP dalam TypeScript dengan class, inheritance, dan modifiers."
              />
              <ModuleCard 
                title="Utility Types" 
                href="/utility-types"
                description="Menggunakan Partial, Readonly, Pick, Omit, dan utility types lainnya."
              />
              <ModuleCard 
                title="Async/Await & Promises" 
                href="/async-await"
                description="Menangani operasi asinkron dengan tipe yang aman."
              />
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <FiCode className="text-teal-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold">Implementasi Next.js</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <ModuleCard 
                title="TypeScript dengan API Routes" 
                href="/nextjs-api-routes"
                description="Membuat API endpoints dengan tipe yang aman di Next.js."
              />
              <ModuleCard 
                title="Typed Components & Props" 
                href="/typed-components"
                description="Membuat komponen React dengan props yang diketik dengan baik."
              />
              <ModuleCard 
                title="Custom Hooks dengan TypeScript" 
                href="/custom-hooks"
                description="Membuat dan menggunakan custom hooks dengan TypeScript."
              />
              <ModuleCard 
                title="State Management" 
                href="/state-management"
                description="Mengelola state aplikasi dengan TypeScript (Context, Redux, Zustand)."
              />
              <ModuleCard 
                title="Form Handling & Validation" 
                href="/form-handling"
                description="Validasi form dengan tipe yang aman menggunakan Zod dan React Hook Form."
              />
              <ModuleCard 
                title="Project Structure & Best Practices" 
                href="/project-structure"
                description="Mengorganisir proyek Next.js + TypeScript dengan praktik terbaik."
              />
            </div>
          </section>
        </main>

        <footer className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Dibuat dengan ❤️ untuk pembelajaran TypeScript
          </p>
        </footer>
      </div>
    </div>
  );
}

function ModuleCard({ title, href, description }: { title: string; href: string; description: string }) {
  return (
    <Link 
      href={href}
      className="block p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400">{title}</h3>
        <FiArrowRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </Link>
  );
}
