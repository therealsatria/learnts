import Link from "next/link";
import {
  add,
  calculateArea,
  greet,
  sum,
  processArray,
  getPersonInfo,
  createPerson,
  config,
  isString,
  multiply,
  type Person
} from "./examples";

export default function ArrowFunctionsPage() {
  // Example usage
  const addResult = add(5, 3);
  const areaResult = calculateArea(4, 6);
  const greetResult = greet("Satria");
  const greetDefaultResult = greet();
  const sumResult = sum(1, 2, 3, 4, 5);
  
  const numbers = [1, 2, 3, 4, 5];
  const doubledNumbers = processArray(numbers, (num) => num * 2);
  const numberStrings = processArray(numbers, (num) => `Number: ${num}`);
  
  const person: Person = { name: "Budi", age: 30 };
  const personInfo = getPersonInfo(person);
  const newPerson = createPerson("Ani", 25);
  
  const double = multiply(2);
  const triple = multiply(3);
  const doubleResult = double(10);
  const tripleResult = triple(10);
  
  // Type guard example
  const testValues = ["hello", 42, true, "world"];
  const stringValues = testValues.filter(isString);

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
          <h1 className="text-3xl font-bold">Arrow Functions di TypeScript</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Arrow functions adalah fitur ES6 yang menyediakan sintaks yang lebih ringkas untuk mendefinisikan fungsi.
          TypeScript menambahkan anotasi tipe untuk membuat arrow functions lebih kuat dan aman.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <CodeExample
          title="Basic Arrow Function"
          description="Sintaks dasar arrow function dengan parameter dan return type."
          code="const add = (a: number, b: number): number => a + b;"
          result={`add(5, 3) = ${addResult}`}
        />

        <CodeExample
          title="Arrow Function dengan Multiple Statements"
          description="Arrow function dengan blok kode yang berisi beberapa statement."
          code={`const calculateArea = (width: number, height: number): number => {
  const area = width * height;
  return area;
};`}
          result={`calculateArea(4, 6) = ${areaResult}`}
        />

        <CodeExample
          title="Default Parameters"
          description="Arrow function dengan parameter default."
          code={`const greet = (name: string = "Guest"): string => \`Hello, \${name}!\`;`}
          result={`greet("Satria") = "${greetResult}"
greet() = "${greetDefaultResult}"`}
        />

        <CodeExample
          title="Rest Parameters"
          description="Arrow function dengan rest parameters untuk jumlah argumen yang tidak tetap."
          code={`const sum = (...numbers: number[]): number => 
  numbers.reduce((total, num) => total + num, 0);`}
          result={`sum(1, 2, 3, 4, 5) = ${sumResult}`}
        />

        <CodeExample
          title="Generic Arrow Functions"
          description="Arrow function dengan tipe generik untuk fleksibilitas tipe."
          code={`const processArray = <T, U>(
  arr: T[], 
  callback: (item: T, index: number) => U
): U[] => arr.map(callback);`}
          result={`processArray([1, 2, 3, 4, 5], (num) => num * 2) = [${doubledNumbers.join(", ")}]
processArray([1, 2, 3, 4, 5], (num) => \`Number: \${num}\`) = ["${numberStrings.join('", "')}"]`}
        />

        <CodeExample
          title="Object Destructuring"
          description="Arrow function dengan destructuring parameter objek."
          code={`type Person = { name: string; age: number };
const getPersonInfo = ({ name, age }: Person): string => 
  \`\${name} is \${age} years old\`;`}
          result={`getPersonInfo({ name: "Budi", age: 30 }) = "${personInfo}"`}
        />

        <CodeExample
          title="Returning Objects"
          description="Arrow function yang mengembalikan objek (perhatikan tanda kurung)."
          code={`const createPerson = (name: string, age: number): Person => ({ name, age });`}
          result={`createPerson("Ani", 25) = ${JSON.stringify(newPerson)}`}
        />

        <CodeExample
          title="IIFE (Immediately Invoked Function Expression)"
          description="Arrow function yang langsung dijalankan saat didefinisikan."
          code={`const config = (() => {
  const env = "development";
  const apiUrl = "https://api.example.com";
  return { env, apiUrl };
})();`}
          result={`config = ${JSON.stringify(config)}`}
        />

        <CodeExample
          title="Type Guards"
          description="Arrow function sebagai type guard untuk memeriksa tipe data."
          code={`const isString = (value: unknown): value is string => 
  typeof value === "string";`}
          result={`["hello", 42, true, "world"].filter(isString) = ["${stringValues.join('", "')}"]`}
        />

        <CodeExample
          title="Higher-Order Functions"
          description="Arrow function yang mengembalikan arrow function lain (currying)."
          code={`const multiply = (factor: number) => (value: number): number => 
  value * factor;`}
          result={`const double = multiply(2);
const triple = multiply(3);
double(10) = ${doubleResult}
triple(10) = ${tripleResult}`}
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