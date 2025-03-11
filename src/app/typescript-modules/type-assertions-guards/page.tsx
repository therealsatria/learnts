import Link from "next/link";
import {
  getLength,
  getLengthAlternative,
  convertToNumber,
  COLORS,
  doubleAssertion,
  isString,
  isNumber,
  Animal,
  Dog,
  Cat,
  makeSound,
  Car,
  Boat,
  isCar,
  isBoat,
  getVehicleInfo,
  calculateArea,
  User,
  Admin,
  isAdmin,
  getUserPermissions,
  type Color,
  type Shape
} from "./examples";

export default function TypeAssertionsGuardsPage() {
  // Type Assertions Examples
  const lengthResult = getLength("Hello TypeScript");
  const lengthAltResult = getLengthAlternative("Hello TypeScript");
  const numberResult = convertToNumber("42");
  const colorExample: Color = "red"; // Type is restricted to "red" | "green" | "blue"
  const doubleAssertResult = doubleAssertion({ toString: () => "Converted Object" });

  // Type Guards Examples
  const values: unknown[] = ["Hello", 42, true, { name: "Object" }];
  const stringValues = values.filter(isString);
  const numberValues = values.filter(isNumber);

  // instanceof Type Guard
  const dog = new Dog("Rex", "German Shepherd");
  const cat = new Cat("Whiskers", "Orange");
  const dogSound = makeSound(dog);
  const catSound = makeSound(cat);

  // Property Check Type Guard
  const car: Car = { make: "Toyota", model: "Corolla", year: 2020 };
  const boat: Boat = { make: "Yamaha", model: "242X", length: 24 };
  const carInfo = getVehicleInfo(car);
  const boatInfo = getVehicleInfo(boat);

  // Discriminated Union Type Guard
  const circle: Shape = { kind: "circle", radius: 5 };
  const rectangle: Shape = { kind: "rectangle", width: 4, height: 6 };
  const triangle: Shape = { kind: "triangle", base: 3, height: 4 };
  const circleArea = calculateArea(circle);
  const rectangleArea = calculateArea(rectangle);
  const triangleArea = calculateArea(triangle);

  // User-defined Type Guard
  const regularUser: User = { id: 1, name: "John", email: "john@example.com" };
  const adminUser: Admin = { 
    id: 2, 
    name: "Admin", 
    email: "admin@example.com", 
    role: "admin", 
    permissions: ["read", "write", "delete"] 
  };
  const regularUserPermissions = getUserPermissions(regularUser);
  const adminUserPermissions = getUserPermissions(adminUser);

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
          <h1 className="text-3xl font-bold">Type Assertions & Type Guards di TypeScript</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Type assertions dan type guards memungkinkan Anda untuk bekerja dengan tipe data yang lebih aman dan ekspresif di TypeScript.
          Type assertions memberi tahu compiler tentang tipe data, sementara type guards memverifikasi tipe data saat runtime.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Type Assertions</h2>
          
          <CodeExample
            title="Basic Type Assertion dengan 'as'"
            description="Menggunakan 'as' untuk memberitahu TypeScript tentang tipe data yang sebenarnya."
            code={`function getLength(obj: any): number {
  const str = obj as string;
  return str.length;
}`}
            result={`getLength("Hello TypeScript") = ${lengthResult}`}
          />

          <CodeExample
            title="Type Assertion dengan Angle Bracket"
            description="Sintaks alternatif untuk type assertion (tidak direkomendasikan dalam JSX)."
            code={`function getLengthAlternative(obj: any): number {
  const str = <string>obj;
  return str.length;
}`}
            result={`getLengthAlternative("Hello TypeScript") = ${lengthAltResult}`}
          />

          <CodeExample
            title="Type Assertion untuk Konversi"
            description="Menggunakan type assertion untuk konversi antara tipe yang kompatibel."
            code={`function convertToNumber(value: string | number): number {
  return (value as number);
}`}
            result={`convertToNumber("42") = ${numberResult}`}
          />

          <CodeExample
            title="Const Assertion"
            description="Menggunakan 'as const' untuk membuat literal type yang lebih spesifik."
            code={`const COLORS = ["red", "green", "blue"] as const;
type Color = typeof COLORS[number]; // "red" | "green" | "blue"`}
            result={`const colorExample: Color = "red";
// Type is restricted to "red" | "green" | "blue"`}
          />

          <CodeExample
            title="Double Assertion"
            description="Menggunakan double assertion untuk kasus khusus (gunakan dengan hati-hati)."
            code={`function doubleAssertion(obj: any): string {
  return obj as unknown as string;
}`}
            result={`doubleAssertion({ toString: () => "Converted Object" }) = "${doubleAssertResult}"`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Type Guards</h2>
          
          <CodeExample
            title="Type Guard dengan typeof"
            description="Menggunakan operator typeof untuk memeriksa tipe primitif."
            code={`function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}`}
            result={`["Hello", 42, true, { name: "Object" }].filter(isString) = ${JSON.stringify(stringValues)}
["Hello", 42, true, { name: "Object" }].filter(isNumber) = ${JSON.stringify(numberValues)}`}
          />

          <CodeExample
            title="Type Guard dengan instanceof"
            description="Menggunakan operator instanceof untuk memeriksa instance dari class."
            code={`class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
  
  bark(): string {
    return "Woof!";
  }
}

class Cat extends Animal {
  color: string;
  constructor(name: string, color: string) {
    super(name);
    this.color = color;
  }
  
  meow(): string {
    return "Meow!";
  }
}

function makeSound(animal: Animal): string {
  if (animal instanceof Dog) {
    return animal.bark();
  } else if (animal instanceof Cat) {
    return animal.meow();
  }
  return "Unknown animal sound";
}`}
            result={`const dog = new Dog("Rex", "German Shepherd");
const cat = new Cat("Whiskers", "Orange");
makeSound(dog) = "${dogSound}"
makeSound(cat) = "${catSound}"`}
          />

          <CodeExample
            title="Type Guard dengan Property Check"
            description="Menggunakan operator 'in' untuk memeriksa keberadaan property."
            code={`interface Car {
  make: string;
  model: string;
  year: number;
}

interface Boat {
  make: string;
  model: string;
  length: number;
}

function isCar(vehicle: Car | Boat): vehicle is Car {
  return 'year' in vehicle;
}

function isBoat(vehicle: Car | Boat): vehicle is Boat {
  return 'length' in vehicle;
}

function getVehicleInfo(vehicle: Car | Boat): string {
  if (isCar(vehicle)) {
    return \`Car: \${vehicle.make} \${vehicle.model} (\${vehicle.year})\`;
  } else {
    return \`Boat: \${vehicle.make} \${vehicle.model} (\${vehicle.length}ft)\`;
  }
}`}
            result={`const car: Car = { make: "Toyota", model: "Corolla", year: 2020 };
const boat: Boat = { make: "Yamaha", model: "242X", length: 24 };
getVehicleInfo(car) = "${carInfo}"
getVehicleInfo(boat) = "${boatInfo}"`}
          />

          <CodeExample
            title="Type Guard dengan Discriminated Union"
            description="Menggunakan property diskriminator untuk membedakan tipe dalam union."
            code={`type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}`}
            result={`const circle: Shape = { kind: "circle", radius: 5 };
const rectangle: Shape = { kind: "rectangle", width: 4, height: 6 };
const triangle: Shape = { kind: "triangle", base: 3, height: 4 };
calculateArea(circle) = ${circleArea.toFixed(2)}
calculateArea(rectangle) = ${rectangleArea}
calculateArea(triangle) = ${triangleArea}`}
          />

          <CodeExample
            title="User-defined Type Guard"
            description="Membuat fungsi type guard kustom dengan predicate type."
            code={`interface User {
  id: number;
  name: string;
  email?: string;
}

interface Admin extends User {
  role: "admin";
  permissions: string[];
}

function isAdmin(user: User): user is Admin {
  return (user as Admin).role === "admin";
}

function getUserPermissions(user: User): string[] {
  if (isAdmin(user)) {
    return user.permissions;
  }
  return ["read"];
}`}
            result={`const regularUser: User = { id: 1, name: "John", email: "john@example.com" };
const adminUser: Admin = { 
  id: 2, 
  name: "Admin", 
  email: "admin@example.com", 
  role: "admin", 
  permissions: ["read", "write", "delete"] 
};
getUserPermissions(regularUser) = ${JSON.stringify(regularUserPermissions)}
getUserPermissions(adminUser) = ${JSON.stringify(adminUserPermissions)}`}
          />
        </section>
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
    <section className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
      </div>
      <div className="p-4 bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
        <pre>{code}</pre>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Hasil:</h4>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded font-mono text-sm whitespace-pre-wrap">
          {result}
        </div>
      </div>
    </section>
  );
} 