// src/app/typescript-modules/generics-and-interfaces/page.tsx
import Link from "next/link";
import {
  User,
  Product,
  Order,
  CartItem,
  Address,
  ApiResponse,
} from "./interfaces";
import {
  identity,
  getFirstElement,
  getProperty,
  mapArray,
  filterArray,
  sortBy,
  groupBy,
  reduceArray,
  findItem,
  removeItem,
  updateItem,
  paginateArray,
  pipe,
} from "./functions";

export default function GenericsAndInterfacesPage() {
  // Example Usage
  const user: User = { id: 1, name: "Satria", email: "satria@example.com" };
  const product: Product = {
    id: 101,
    name: "Laptop",
    price: 1200,
    category: "Electronics",
  };

  // Identity
  const stringIdentity = identity<string>("Hello Generic");
  const numberIdentity = identity<number>(123);
  const userIdentity = identity<User>(user);

  // Get first element
  const numbers = [1, 2, 3, 4, 5];
  const firstElement = getFirstElement<number>(numbers);
  const userList: User[] = [
    { id: 1, name: "satu", email: "satu@email.com" },
    { id: 2, name: "dua", email: "dua@email.com" },
  ];
  const firstUser = getFirstElement<User>(userList);

  // Get property
  const productName = getProperty<Product, "name">(product, "name");
  const userEmail = getProperty<User, "email">(user, "email");

  // Map Array
  const squaredNumbers = mapArray<number, number>(
    numbers,
    (num) => num * num
  );
  const userNames = mapArray<User, string>(userList, (user) => user.name);

  // Filter Array
  const evenNumbers = filterArray<number>(numbers, (num) => num % 2 === 0);
  const products: Product[] = [
    { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
    { id: 2, name: "Phone", price: 800, category: "Electronics" },
    { id: 3, name: "Mouse", price: 25, category: "Electronics" },
    { id: 4, name: "Keyboard", price: 75, category: "Electronics" },
  ];
  const expensiveProducts = filterArray<Product>(
    products,
    (prod) => prod.price > 500
  );

  // Contoh penggunaan sortBy
  const sortedProductsByPriceAsc = sortBy(products, "price");
  const sortedProductsByNameDesc = sortBy(products, "name", "desc");

  // Contoh penggunaan groupBy
  const groupedProductsByCategory = groupBy(products, "category");

  // Contoh penggunaan reduceArray
  const cartItems: CartItem[] = [
    { product: products[0], quantity: 2, price: products[0].price },
    { product: products[1], quantity: 1, price: products[1].price },
  ];
  const totalCartPrice = reduceArray(
    cartItems,
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Contoh penggunaan findItem
  const foundProduct = findItem(products, (prod) => prod.id === 2);

  // Contoh penggunaan removeItem
  const remainingProducts = removeItem(products, (prod) => prod.id === 3);

  // Contoh penggunaan updateItem
  const updatedCartItems = updateItem(
    cartItems,
    (item) => item.product.id === 1,
    { ...cartItems[0], quantity: 3 }
  );

  // Contoh penggunaan paginateArray
  const firstPageProducts = paginateArray(products, 1, 2);
  const secondPageProducts = paginateArray(products, 2, 2);

  // Contoh penggunaan pipe
  const processProducts = pipe(
    (arr: Product[]) => filterArray(arr, (prod) => prod.price > 50),
    (arr: Product[]) =>
      mapArray(arr, (prod) => ({ ...prod, name: prod.name.toUpperCase() }))
  );
  const processedProducts = processProducts(products);

  // Contoh penggunaan ApiResponse
  const apiResponse: ApiResponse<User> = {
    data: user,
    status: 200,
    message: "Success",
  };

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
          <h1 className="text-3xl font-bold">
            Generics & Interfaces di TypeScript
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Generics dan interfaces adalah fitur penting dalam TypeScript yang
          memungkinkan Anda membuat kode yang fleksibel, dapat digunakan
          kembali, dan dengan tipe yang aman.
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
}

interface Order {
  orderId: number;
  userId: number;
  products: Product[];
  orderDate: Date;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
}

interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
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
          result={`mapArray<number, number>(numbers, (num) => num * num) = ${JSON.stringify(
            squaredNumbers
          )}
mapArray<User, string>(userList, (user) => user.name) = ${JSON.stringify(
            userNames
          )}`}
        />

        <CodeExample
          title="Generic Filter Function"
          description="Fungsi generik untuk memfilter array berdasarkan kondisi."
          code={`function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}`}
          result={`filterArray<number>(numbers, (num) => num % 2 === 0) = ${JSON.stringify(
            evenNumbers
          )}
filterArray<Product>(products, (prod) => prod.price > 500) = ${JSON.stringify(
            expensiveProducts,
            null,
            2
          )}`}
        />
        <CodeExample
          title="Generic SortBy Function"
          description="Fungsi generik untuk mengurutkan array berdasarkan properti tertentu."
          code={`function sortBy<T, K extends keyof T>(array: T[], key: K, order: 'asc' | 'desc' = 'asc'): T[] {
            // ...
          }`}
          result={`sortBy(products, "price") = ${JSON.stringify(
            sortedProductsByPriceAsc,
            null,
            2
          )}
sortBy(products, "name", "desc") = ${JSON.stringify(
            sortedProductsByNameDesc,
            null,
            2
          )}`}
        />
        <CodeExample
          title="Generic GroupBy Function"
          description="Fungsi generik untuk mengelompokkan array berdasarkan properti tertentu."
          code={`function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
            // ...
          }`}
          result={`groupBy(products, "category") = ${JSON.stringify(
            groupedProductsByCategory,
            null,
            2
          )}`}
        />
        <CodeExample
          title="Generic Reduce Function"
          description="Fungsi generik untuk mereduksi array menjadi satu nilai."
          code={`function reduceArray<T, U>(array: T[], callback: (accumulator: U, currentItem: T, index: number, array: T[]) => U, initialValue: U): U {
            // ...
          }`}
          result={`reduceArray(cartItems, (acc, item) => acc + item.quantity * item.price, 0) = ${totalCartPrice}`}
        />
        <CodeExample
          title="Generic Find Function"
          description="Fungsi generik untuk mencari item dalam array berdasarkan kondisi."
          code={`function findItem<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
            // ...
          }`}
          result={`findItem(products, (prod) => prod.id === 2) = ${JSON.stringify(
            foundProduct,
            null,
            2
          )}`}
        />
        <CodeExample
          title="Generic Remove Function"
          description="Fungsi generik untuk menghapus item dalam array berdasarkan kondisi."
          code={`function removeItem<T>(array: T[], predicate: (item: T) => boolean): T[] {
            // ...
          }`}
          result={`removeItem(products, (prod) => prod.id === 3) = ${JSON.stringify(
            remainingProducts,
            null,
            2
          )}`}
        />
        <CodeExample
          title="Generic Update Function"
          description="Fungsi generik untuk mengupdate item dalam array berdasarkan kondisi."
          code={`function updateItem<T>(array: T[], predicate: (item: T) => boolean, newItem: T): T[] {
            // ...
          }`}
          result={`updateItem(cartItems, (item) => item.product.id === 1, { ...cartItems[0], quantity: 3 }) = ${JSON.stringify(
            updatedCartItems,
            null,
            2
          )}`}
        />
        <CodeExample
          title="Generic Paginate Function"
          description="Fungsi generik untuk membagi array menjadi beberapa halaman."
          code={`function paginateArray<T>(array: T[], page: number, pageSize: number): T[] {
            // ...
          }`}
          result={`paginateArray(products, 1, 2) = ${JSON.stringify(
            firstPageProducts,
            null,
            2
          )}
paginateArray(products, 2, 2) = ${JSON.stringify(
            secondPageProducts,
            null,
            2
          )}`}
        />
        <CodeExample
          title="Generic Pipe Function"
          description="Fungsi generik untuk menggabungkan beberapa fungsi menjadi satu."
          code={`function pipe<T>(...fns: ((arg: T) => T)[]) {
            // ...
          }`}
          result={`pipe(filterArray, mapArray) = ${JSON.stringify(
            processedProducts,
            null,
            2
          )}`}
        />
        <CodeExample
          title="Generic ApiResponse"
          description="Interface generik untuk membungkus response dari API."
          code={`interface ApiResponse<T> {
            data: T;
            status: number;
            message: string;
          }`}
          result={`ApiResponse<User> = ${JSON.stringify(
            apiResponse,
            null,
            2
          )}`}
        />
      </div>
    </div>
  );
}

function CodeExample({
  title,
  description,
  code,
  result,
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
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
          Hasil:
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded font-mono text-sm whitespace-pre-wrap">
          {result}
        </div>
      </div>
    </section>
  );
}
