// src/app/generics-and-interfaces/page.tsx
import Link from "next/link";
import { User, Product } from "./interfaces";
import {
  identity,
  getFirstElement,
  getProperty,
  mapArray,
  filterArray,
} from "./functions";

export default function GenericsAndInterfacesPage() {
  // Example Usage
  const user: User = { id: 1, name: "Satria", email: "satria@example.com" };
  const product: Product = { id: 101, name: "Laptop", price: 1200, category: "Electronics" };

  // Identity
  const stringIdentity = identity<string>("Hello Generic");
  const numberIdentity = identity<number>(123);
  const userIdentity = identity<User>(user);

  // Get first element
  const numbers = [1, 2, 3, 4, 5];
  const firstElement = getFirstElement<number>(numbers);
  const userList: User[] = [
    {id: 1, name: "satu", email:"satu@email.com"},
    {id: 2, name: "dua", email:"dua@email.com"},
  ];
  const firstUser = getFirstElement<User>(userList);

  // Get property
  const productName = getProperty<Product, "name">(product, "name");
  const userEmail = getProperty<User, "email">(user, "email");

  // Map Array
  const squaredNumbers = mapArray<number, number>(numbers, (num) => num * num);
  const userNames = mapArray<User, string>(userList, (user) => user.name);

  // Filter Array
  const evenNumbers = filterArray<number>(numbers, (num) => num % 2 === 0);
  const expensiveProducts = filterArray<Product>(
    [
      { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
      { id: 2, name: "Phone", price: 800, category: "Electronics" },
      { id: 3, name: "Mouse", price: 25, category: "Electronics" },
    ],
    (prod) => prod.price > 500
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="flex items-center mb-4">
          <Link 
            href="/" 
            className="text-blue-500 hover:text-blue-700 mr-4 transition-colors"
          >
            &larr; Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-bold">Generics & Interfaces di TypeScript</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Generics dan interfaces adalah fitur penting dalam TypeScript yang memungkinkan Anda membuat kode yang fleksibel, 
          dapat digunakan kembali, dan dengan tipe yang aman.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <CodeExample
          title="Interface"
          description="Interface mendefinisikan struktur objek dengan tipe yang jelas."
          code={`interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}`}
          result={`const user: User = ${JSON.stringify(user, null, 2)}
const product: Product = ${JSON.stringify(product, null, 2)}`}
        />

        <CodeExample
          title="Generic Identity Function"
          description="Fungsi generik yang mengembalikan argumen dengan tipe yang sama."
          code={`function identity<T>(arg: T): T {
  return arg;
}`}
          result={`identity<string>("Hello Generic") = "${stringIdentity}"
identity<number>(123) = ${numberIdentity}
identity<User>(user) = ${JSON.stringify(userIdentity, null, 2)}`}
        />

        <CodeExample
          title="Generic Array Function"
          description="Fungsi generik untuk mengambil elemen pertama dari array."
          code={`function getFirstElement<T>(list: T[]): T | undefined {
  return list[0];
}`}
          result={`getFirstElement<number>([1, 2, 3, 4, 5]) = ${firstElement}
getFirstElement<User>(userList) = ${JSON.stringify(firstUser, null, 2)}`}
        />

        <CodeExample
          title="Generic dengan Keyof"
          description="Fungsi generik yang menggunakan keyof untuk mengakses properti objek dengan aman."
          code={`function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`}
          result={`getProperty<Product, "name">(product, "name") = "${productName}"
getProperty<User, "email">(user, "email") = "${userEmail}"`}
        />

        <CodeExample
          title="Generic Map Function"
          description="Fungsi generik untuk memetakan array ke tipe lain."
          code={`function mapArray<T, U>(array: T[], callback: (item: T) => U): U[] {
  return array.map(callback);
}`}
          result={`mapArray<number, number>(numbers, (num) => num * num) = ${JSON.stringify(squaredNumbers)}
mapArray<User, string>(userList, (user) => user.name) = ${JSON.stringify(userNames)}`}
        />

        <CodeExample
          title="Generic Filter Function"
          description="Fungsi generik untuk memfilter array berdasarkan kondisi."
          code={`function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}`}
          result={`filterArray<number>(numbers, (num) => num % 2 === 0) = ${JSON.stringify(evenNumbers)}
filterArray<Product>(products, (prod) => prod.price > 500) = ${JSON.stringify(expensiveProducts, null, 2)}`}
        />
      </div>
    </div>
  );
}

function CodeExample({ 
  title, 
  description, 
  code, 
  result 
}: { 
  title: string; 
  description: string; 
  code: string; 
  result: string;
}) {
  return (
    <section className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
      </div>
      <div className="p-4 bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
        <pre>{code}</pre>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Hasil:</h3>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded font-mono text-sm whitespace-pre-wrap">
          {result}
        </div>
      </div>
    </section>
  );
}
