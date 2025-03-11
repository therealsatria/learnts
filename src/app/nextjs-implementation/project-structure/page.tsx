"use client";

import { useState } from 'react';

// Komponen untuk menampilkan struktur folder
function FolderStructure({ data, level = 0 }: { data: FolderItem; level?: number }) {
  const [isOpen, setIsOpen] = useState(level < 2);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  const indent = level * 20;
  
  return (
    <div>
      <div 
        className="flex items-center cursor-pointer py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2"
        onClick={toggleOpen}
        style={{ marginLeft: `${indent}px` }}
      >
        <span className="mr-2">{isOpen ? '📂' : '📁'}</span>
        <span className={`font-medium ${data.isImportant ? 'text-blue-600 dark:text-blue-400' : ''}`}>
          {data.name}
        </span>
        {data.description && (
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            {data.description}
          </span>
        )}
      </div>
      
      {isOpen && data.children && (
        <div>
          {data.children.map((child, index) => (
            <div key={index}>
              {child.type === 'folder' ? (
                <FolderStructure data={child} level={level + 1} />
              ) : (
                <div 
                  className="flex items-center py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2"
                  style={{ marginLeft: `${indent + 20}px` }}
                >
                  <span className="mr-2">📄</span>
                  <span className={child.isImportant ? 'text-blue-600 dark:text-blue-400' : ''}>
                    {child.name}
                  </span>
                  {child.description && (
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {child.description}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Tipe untuk struktur folder
interface FolderItem {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  isImportant?: boolean;
  children?: FolderItem[];
}

// Data struktur folder untuk Next.js + TypeScript
const projectStructure: FolderItem = {
  name: "my-nextjs-app",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      isImportant: true,
      description: "Direktori utama untuk kode sumber",
      children: [
        {
          name: "app",
          type: "folder",
          isImportant: true,
          description: "Direktori untuk App Router (Next.js 13+)",
          children: [
            {
              name: "api",
              type: "folder",
              description: "API Routes",
              children: [
                {
                  name: "[...route]",
                  type: "folder",
                  children: [
                    { name: "route.ts", type: "file", description: "API endpoint dengan dynamic route" }
                  ]
                }
              ]
            },
            {
              name: "(auth)",
              type: "folder",
              description: "Route group untuk autentikasi",
              children: [
                {
                  name: "login",
                  type: "folder",
                  children: [
                    { name: "page.tsx", type: "file", description: "Halaman login" }
                  ]
                },
                {
                  name: "register",
                  type: "folder",
                  children: [
                    { name: "page.tsx", type: "file", description: "Halaman register" }
                  ]
                }
              ]
            },
            {
              name: "dashboard",
              type: "folder",
              children: [
                { name: "page.tsx", type: "file", description: "Halaman dashboard" },
                { name: "layout.tsx", type: "file", description: "Layout untuk dashboard" }
              ]
            },
            { name: "favicon.ico", type: "file", description: "Favicon" },
            { name: "globals.css", type: "file", description: "CSS global" },
            { name: "layout.tsx", type: "file", isImportant: true, description: "Root layout" },
            { name: "page.tsx", type: "file", isImportant: true, description: "Halaman utama" }
          ]
        },
        {
          name: "components",
          type: "folder",
          isImportant: true,
          description: "Komponen yang dapat digunakan kembali",
          children: [
            {
              name: "ui",
              type: "folder",
              description: "Komponen UI dasar",
              children: [
                { name: "Button.tsx", type: "file" },
                { name: "Card.tsx", type: "file" },
                { name: "Input.tsx", type: "file" }
              ]
            },
            {
              name: "layout",
              type: "folder",
              description: "Komponen layout",
              children: [
                { name: "Header.tsx", type: "file" },
                { name: "Footer.tsx", type: "file" },
                { name: "Sidebar.tsx", type: "file" }
              ]
            },
            {
              name: "forms",
              type: "folder",
              description: "Komponen form",
              children: [
                { name: "LoginForm.tsx", type: "file" },
                { name: "RegisterForm.tsx", type: "file" }
              ]
            }
          ]
        },
        {
          name: "hooks",
          type: "folder",
          description: "Custom hooks",
          children: [
            { name: "useAuth.ts", type: "file" },
            { name: "useFetch.ts", type: "file" },
            { name: "useLocalStorage.ts", type: "file" }
          ]
        },
        {
          name: "lib",
          type: "folder",
          description: "Utilitas dan fungsi helper",
          children: [
            { name: "api.ts", type: "file", description: "Fungsi untuk API calls" },
            { name: "utils.ts", type: "file", description: "Fungsi utilitas umum" },
            { name: "constants.ts", type: "file", description: "Konstanta aplikasi" }
          ]
        },
        {
          name: "types",
          type: "folder",
          isImportant: true,
          description: "Definisi tipe TypeScript",
          children: [
            { name: "index.ts", type: "file", description: "Export semua tipe" },
            { name: "user.ts", type: "file", description: "Tipe untuk user" },
            { name: "api.ts", type: "file", description: "Tipe untuk API responses" }
          ]
        },
        {
          name: "context",
          type: "folder",
          description: "React Context untuk state global",
          children: [
            { name: "AuthContext.tsx", type: "file" },
            { name: "ThemeContext.tsx", type: "file" }
          ]
        },
        {
          name: "styles",
          type: "folder",
          description: "CSS modules dan style utilities",
          children: [
            { name: "variables.css", type: "file" },
            { name: "animations.css", type: "file" }
          ]
        }
      ]
    },
    {
      name: "public",
      type: "folder",
      description: "Aset statis",
      children: [
        { name: "images", type: "folder" },
        { name: "fonts", type: "folder" }
      ]
    },
    {
      name: "__tests__",
      type: "folder",
      description: "Unit dan integration tests",
      children: [
        { name: "components", type: "folder" },
        { name: "pages", type: "folder" }
      ]
    },
    {
      name: ".github",
      type: "folder",
      description: "GitHub workflows dan templates",
      children: [
        { name: "workflows", type: "folder" }
      ]
    },
    { name: ".eslintrc.json", type: "file", isImportant: true, description: "Konfigurasi ESLint" },
    { name: ".prettierrc", type: "file", description: "Konfigurasi Prettier" },
    { name: "next.config.js", type: "file", isImportant: true, description: "Konfigurasi Next.js" },
    { name: "package.json", type: "file", isImportant: true, description: "Dependensi dan scripts" },
    { name: "tsconfig.json", type: "file", isImportant: true, description: "Konfigurasi TypeScript" },
    { name: "tailwind.config.js", type: "file", description: "Konfigurasi Tailwind CSS" },
    { name: "README.md", type: "file", description: "Dokumentasi proyek" }
  ]
};

// Komponen untuk menampilkan praktik terbaik
function BestPractice({ title, description, code }: { title: string; description: string; code?: string }) {
  return (
    <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-300 mb-3">{description}</p>
        {code && (
          <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

export default function ProjectStructurePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Project Structure & Best Practices</h1>
      
      {/* Penjelasan */}
      <section className="mb-8">
        <p className="mb-4">
          Struktur proyek yang baik dan praktik terbaik dalam pengembangan Next.js dengan TypeScript
          sangat penting untuk memastikan skalabilitas, maintainability, dan kolaborasi tim yang efektif.
          Pada modul ini, kita akan mempelajari cara mengorganisir proyek Next.js dengan TypeScript
          dan praktik terbaik yang harus diikuti.
        </p>
      </section>
      
      {/* Struktur Proyek */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">1. Struktur Proyek</h2>
        <p className="mb-4">
          Berikut adalah struktur proyek yang direkomendasikan untuk aplikasi Next.js dengan TypeScript.
          Struktur ini mengikuti prinsip separation of concerns dan modularitas.
        </p>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
          <FolderStructure data={projectStructure} />
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Penjelasan Struktur:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>src/</strong>: Direktori utama untuk kode sumber. Memisahkan kode sumber dari file konfigurasi.
              </li>
              <li>
                <strong>src/app/</strong>: Menggunakan App Router (Next.js 13+) untuk routing berbasis file.
              </li>
              <li>
                <strong>src/components/</strong>: Komponen React yang dapat digunakan kembali, diorganisir berdasarkan kategori.
              </li>
              <li>
                <strong>src/hooks/</strong>: Custom hooks untuk logika yang dapat digunakan kembali.
              </li>
              <li>
                <strong>src/lib/</strong>: Utilitas dan fungsi helper yang tidak spesifik untuk React.
              </li>
              <li>
                <strong>src/types/</strong>: Definisi tipe TypeScript yang digunakan di seluruh aplikasi.
              </li>
              <li>
                <strong>src/context/</strong>: React Context untuk state management global.
              </li>
              <li>
                <strong>public/</strong>: Aset statis seperti gambar dan font.
              </li>
              <li>
                <strong>__tests__/</strong>: Unit dan integration tests, diorganisir mirip dengan struktur kode sumber.
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Praktik Terbaik TypeScript */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">2. Praktik Terbaik TypeScript</h2>
        <p className="mb-4">
          TypeScript memberikan banyak keuntungan dalam pengembangan aplikasi Next.js. Berikut adalah
          beberapa praktik terbaik untuk menggunakan TypeScript secara efektif.
        </p>
        
        <div className="space-y-6">
          <BestPractice
            title="Gunakan Interface untuk Objek dan Type untuk Union/Intersection"
            description="Interface lebih baik untuk objek yang dapat diperluas, sementara Type lebih fleksibel untuk union dan intersection types."
            code={`// Interface untuk objek
interface User {
  id: string;
  name: string;
  email: string;
}

// Type untuk union
type Status = 'pending' | 'active' | 'inactive';

// Type untuk intersection
type AdminUser = User & {
  permissions: string[];
};`}
          />
          
          <BestPractice
            title="Hindari any, Gunakan unknown untuk Tipe yang Tidak Diketahui"
            description="Tipe any menghilangkan semua keuntungan TypeScript. Gunakan unknown untuk nilai yang tipenya tidak diketahui, lalu lakukan type narrowing."
            code={`// Buruk
function processData(data: any) {
  return data.length; // Tidak ada type checking
}

// Baik
function processData(data: unknown) {
  if (Array.isArray(data)) {
    return data.length; // Type-safe
  }
  return 0;
}`}
          />
          
          <BestPractice
            title="Gunakan Enum dengan Hati-hati"
            description="Enum menghasilkan JavaScript yang lebih besar. Untuk kasus sederhana, gunakan union type dari string literals."
            code={`// Hindari enum untuk kasus sederhana
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

// Lebih baik gunakan union type
type UserRole = 'ADMIN' | 'USER' | 'GUEST';`}
          />
          
          <BestPractice
            title="Manfaatkan Generics untuk Komponen yang Reusable"
            description="Generics memungkinkan komponen dan fungsi menjadi lebih fleksibel namun tetap type-safe."
            code={`// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}`}
          />
          
          <BestPractice
            title="Gunakan Type Predicates untuk Type Narrowing"
            description="Type predicates membantu TypeScript memahami hasil dari fungsi type guard."
            code={`interface User { name: string; email: string; }
interface Admin { name: string; permissions: string[]; }

// Type predicate
function isAdmin(user: User | Admin): user is Admin {
  return 'permissions' in user;
}

function handleUser(user: User | Admin) {
  if (isAdmin(user)) {
    // TypeScript tahu user adalah Admin di sini
    console.log(user.permissions);
  } else {
    // TypeScript tahu user adalah User di sini
    console.log(user.email);
  }
}`}
          />
        </div>
      </section>
      
      {/* Praktik Terbaik Next.js */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">3. Praktik Terbaik Next.js</h2>
        <p className="mb-4">
          Next.js memiliki fitur dan pola khusus yang perlu diperhatikan untuk pengembangan yang efektif.
        </p>
        
        <div className="space-y-6">
          <BestPractice
            title="Gunakan App Router untuk Routing Modern"
            description="App Router (Next.js 13+) menawarkan fitur seperti nested layouts, loading states, dan error boundaries yang terintegrasi."
            code={`// src/app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <nav>...</nav>
      <main>{children}</main>
    </div>
  );
}

// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return <div>Dashboard Content</div>;
}`}
          />
          
          <BestPractice
            title="Pisahkan Client dan Server Components"
            description="React Server Components (RSC) memungkinkan rendering di server tanpa JavaScript client. Pisahkan komponen client dan server dengan jelas."
            code={`// Server Component
export default async function ProductList() {
  const products = await fetchProducts();
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Client Component
'use client';

import { useState } from 'react';

export default function ProductFilter() {
  const [filter, setFilter] = useState('');
  // ...
}`}
          />
          
          <BestPractice
            title="Gunakan Route Handlers untuk API"
            description="Route Handlers memungkinkan Anda membuat API endpoints dengan mudah dalam App Router."
            code={`// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await fetchUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newUser = await createUser(body);
  return NextResponse.json(newUser, { status: 201 });
}`}
          />
          
          <BestPractice
            title="Optimalkan Images dengan next/image"
            description="Komponen Image dari Next.js mengoptimalkan gambar secara otomatis, termasuk lazy loading dan responsive sizes."
            code={`import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div>
      <Image
        src="/profile.jpg"
        alt="Profile Picture"
        width={300}
        height={300}
        priority
      />
    </div>
  );
}`}
          />
          
          <BestPractice
            title="Gunakan Metadata API untuk SEO"
            description="Next.js menyediakan API untuk mengelola metadata halaman, yang penting untuk SEO."
            code={`// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [{ url: post.image }],
    },
  };
}

export default function BlogPost({ params }: Props) {
  // ...
}`}
          />
        </div>
      </section>
      
      {/* Praktik Terbaik Pengembangan */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">4. Praktik Terbaik Pengembangan</h2>
        <p className="mb-4">
          Selain TypeScript dan Next.js, ada praktik pengembangan umum yang harus diikuti untuk
          memastikan kualitas kode dan kolaborasi tim yang efektif.
        </p>
        
        <div className="space-y-6">
          <BestPractice
            title="Gunakan ESLint dan Prettier"
            description="ESLint membantu menemukan masalah dalam kode, sementara Prettier memastikan format kode yang konsisten."
            code={`// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
  }
}

// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}`}
          />
          
          <BestPractice
            title="Implementasikan Testing"
            description="Testing adalah bagian penting dari pengembangan aplikasi. Gunakan Jest dan React Testing Library untuk unit dan integration testing."
            code={`// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/ui/Button';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});`}
          />
          
          <BestPractice
            title="Gunakan Environment Variables dengan Bijak"
            description="Next.js mendukung environment variables untuk konfigurasi yang berbeda di lingkungan yang berbeda."
            code={`// .env.local (tidak di-commit)
DATABASE_URL=postgres://...
API_KEY=secret_key

// .env (di-commit)
NEXT_PUBLIC_API_URL=https://api.example.com

// Penggunaan
// Server-side (aman)
const dbUrl = process.env.DATABASE_URL;

// Client-side (harus menggunakan NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;`}
          />
          
          <BestPractice
            title="Implementasikan CI/CD"
            description="Continuous Integration dan Continuous Deployment memastikan kualitas kode dan deployment yang lancar."
            code={`// .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build`}
          />
          
          <BestPractice
            title="Dokumentasikan Kode dan API"
            description="Dokumentasi yang baik membantu anggota tim baru dan memastikan pemeliharaan jangka panjang."
            code={`/**
 * Fetches user data from the API
 * @param {string} userId - The ID of the user to fetch
 * @returns {Promise<User>} The user data
 * @throws {Error} If the user is not found or the request fails
 */
export async function fetchUser(userId: string): Promise<User> {
  const response = await fetch(\`/api/users/\${userId}\`);
  
  if (!response.ok) {
    throw new Error(\`Failed to fetch user: \${response.statusText}\`);
  }
  
  return response.json();
}`}
          />
        </div>
      </section>
      
      {/* Kesimpulan */}
      <section className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">Kesimpulan</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Struktur proyek yang baik dan praktik terbaik dalam pengembangan Next.js dengan TypeScript
          sangat penting untuk memastikan skalabilitas, maintainability, dan kolaborasi tim yang efektif.
          Dengan mengikuti panduan ini, Anda dapat membangun aplikasi Next.js yang robust dan mudah dipelihara.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Ingatlah bahwa tidak ada struktur proyek atau set praktik terbaik yang "satu ukuran untuk semua".
          Selalu sesuaikan dengan kebutuhan spesifik proyek Anda dan tim Anda.
        </p>
      </section>
    </div>
  );
} 