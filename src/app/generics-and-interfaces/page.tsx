// src/app/generics-and-interfaces/page.tsx
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">TypeScript Generics & Interfaces</h1>
        </div>

        <div className="flex flex-col gap-2 items-start justify-center">
          <h2 className="text-2xl font-bold">Identity Function:</h2>
          <p>String Identity: {stringIdentity}</p>
          <p>Number Identity: {numberIdentity}</p>
          <p>User Identity: {JSON.stringify(userIdentity)}</p>
        </div>

        <div className="flex flex-col gap-2 items-start justify-center">
          <h2 className="text-2xl font-bold">Get First Element:</h2>
          <p>First Number: {firstElement}</p>
          <p>First User: {JSON.stringify(firstUser)}</p>
        </div>

        <div className="flex flex-col gap-2 items-start justify-center">
          <h2 className="text-2xl font-bold">Get Property:</h2>
          <p>Product Name: {productName}</p>
          <p>User Email: {userEmail}</p>
        </div>
        <div className="flex flex-col gap-2 items-start justify-center">
          <h2 className="text-2xl font-bold">Map Array:</h2>
          <p>Squared Numbers: {JSON.stringify(squaredNumbers)}</p>
          <p>User Names: {JSON.stringify(userNames)}</p>
        </div>
        <div className="flex flex-col gap-2 items-start justify-center">
          <h2 className="text-2xl font-bold">Filter Array:</h2>
          <p>Even Number: {JSON.stringify(evenNumbers)}</p>
          <p>Expensive Product: {JSON.stringify(expensiveProducts)}</p>
        </div>
      </main>
    </div>
  );
}
