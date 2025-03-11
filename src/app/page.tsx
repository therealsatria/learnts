// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">My TypeScript Playground</h1>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <h2 className="text-2xl font-bold">Modules</h2>
          <ul>
            <li>
              <Link href="/generics-and-interfaces">
                <code>Generics & Interfaces</code>
              </Link>
            </li>
            {/* Add more modules here as you create them */}
          </ul>
        </div>
      </main>
    </div>
  );
}
