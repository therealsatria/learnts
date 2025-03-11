import Link from "next/link";
import {
  Person,
  BankAccount,
  SavingsAccount,
  Circle,
  Rectangle,
  MathUtils,
  Car,
  Database
} from "./examples";

export default function ClassesInheritancePage() {
  // Basic Class
  const person = new Person("Budi", 30);
  const greetResult = person.greet();
  
  // Access Modifiers
  const account = new BankAccount("123456789", 1000, "Siti");
  account.deposit(500);
  // Tidak bisa mengakses private property: account._balance
  const accountBalance = account.balance;
  
  // Inheritance
  const savingsAccount = new SavingsAccount("987654321", 2000, "Rudi", 0.05);
  savingsAccount.deposit(1000);
  savingsAccount.addInterest();
  const savingsBalance = savingsAccount.balance;
  const ownerInfo = savingsAccount.getOwnerInfo();
  
  // Abstract Classes
  const circle = new Circle("red", 5);
  const rectangle = new Rectangle("blue", 4, 6);
  const circleInfo = circle.displayInfo();
  const rectangleInfo = rectangle.displayInfo();
  
  // Static Members
  const squareResult = MathUtils.square(4);
  const cubeResult = MathUtils.cube(3);
  const circleAreaResult = MathUtils.calculateCircleArea(5);
  
  // Interfaces with Classes
  const car = new Car("Toyota", "Corolla", 2020);
  const startResult = car.start();
  const stopResult = car.stop();
  const honkResult = car.honk();
  
  // Singleton Pattern
  const db1 = Database.getInstance("mongodb://localhost:27017");
  const db2 = Database.getInstance("mongodb://localhost:27017");
  const isSameInstance = db1 === db2;
  const connectResult = db1.connect();
  const queryResult = db1.query("SELECT * FROM users");

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
          <h1 className="text-3xl font-bold">Classes & Inheritance di TypeScript</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          TypeScript mendukung pemrograman berorientasi objek dengan class, inheritance, dan fitur OOP lainnya.
          Ini memungkinkan Anda untuk membuat kode yang terstruktur dan dapat digunakan kembali.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Basic Class</h2>
          
          <CodeExample
            title="Class Dasar"
            description="Mendefinisikan class dengan properties, constructor, dan methods."
            code={`class Person {
  // Properties
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet(): string {
    return \`Hello, my name is \${this.name} and I am \${this.age} years old.\`;
  }

  // Method dengan parameter
  celebrateBirthday(): void {
    this.age++;
    console.log(\`Happy Birthday! \${this.name} is now \${this.age} years old.\`);
  }
}`}
            result={`const person = new Person("Budi", 30);
person.greet() = "${greetResult}"`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Access Modifiers</h2>
          
          <CodeExample
            title="Public, Private, dan Protected"
            description="Mengontrol akses ke properties dan methods dalam class."
            code={`class BankAccount {
  // Public property (default)
  public accountNumber: string;
  
  // Private property (hanya dapat diakses di dalam class)
  private _balance: number;
  
  // Protected property (dapat diakses di class turunan)
  protected owner: string;
  
  constructor(accountNumber: string, initialBalance: number, owner: string) {
    this.accountNumber = accountNumber;
    this._balance = initialBalance;
    this.owner = owner;
  }
  
  // Public method
  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this._balance += amount;
  }
  
  // Public getter
  public get balance(): number {
    return this._balance;
  }
}`}
            result={`const account = new BankAccount("123456789", 1000, "Siti");
account.deposit(500);
// Tidak bisa mengakses private property: account._balance
account.balance = ${accountBalance}`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Inheritance</h2>
          
          <CodeExample
            title="Class Inheritance"
            description="Membuat class turunan yang mewarisi properties dan methods dari class induk."
            code={`class SavingsAccount extends BankAccount {
  private interestRate: number;
  
  constructor(accountNumber: string, initialBalance: number, owner: string, interestRate: number) {
    // Memanggil constructor parent class
    super(accountNumber, initialBalance, owner);
    this.interestRate = interestRate;
  }
  
  // Method baru di class turunan
  public addInterest(): void {
    const interest = this.balance * this.interestRate;
    this.deposit(interest);
    console.log(\`Added interest: \${interest}\`);
  }
  
  // Override method dari parent class
  public withdraw(amount: number): void {
    const fee = 2;
    super.withdraw(amount + fee);
    console.log(\`Withdrawal fee: \${fee}\`);
  }
  
  // Mengakses protected property dari parent class
  public getOwnerInfo(): string {
    return \`Account owned by: \${this.owner}\`;
  }
}`}
            result={`const savingsAccount = new SavingsAccount("987654321", 2000, "Rudi", 0.05);
savingsAccount.deposit(1000);
savingsAccount.addInterest();
savingsAccount.balance = ${savingsBalance}
savingsAccount.getOwnerInfo() = "${ownerInfo}"`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Abstract Classes</h2>
          
          <CodeExample
            title="Abstract Class"
            description="Class yang tidak dapat diinstansiasi langsung dan harus diimplementasikan oleh class turunan."
            code={`abstract class Shape {
  // Abstract properties
  abstract color: string;
  
  // Regular property
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  // Abstract method (harus diimplementasikan di class turunan)
  abstract calculateArea(): number;
  
  // Regular method
  displayInfo(): string {
    return \`This is a \${this.color} \${this.name} with area: \${this.calculateArea()}\`;
  }
}

class Circle extends Shape {
  color: string;
  radius: number;
  
  constructor(color: string, radius: number) {
    super("circle");
    this.color = color;
    this.radius = radius;
  }
  
  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}`}
            result={`const circle = new Circle("red", 5);
const rectangle = new Rectangle("blue", 4, 6);
circle.displayInfo() = "${circleInfo}"
rectangle.displayInfo() = "${rectangleInfo}"`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Static Members</h2>
          
          <CodeExample
            title="Static Properties dan Methods"
            description="Properties dan methods yang terkait dengan class itu sendiri, bukan instance-nya."
            code={`class MathUtils {
  // Static property
  static PI: number = 3.14159;
  
  // Static method
  static square(x: number): number {
    return x * x;
  }
  
  static cube(x: number): number {
    return x * x * x;
  }
  
  // Static method yang menggunakan static property
  static calculateCircleArea(radius: number): number {
    return MathUtils.PI * radius * radius;
  }
}`}
            result={`MathUtils.square(4) = ${squareResult}
MathUtils.cube(3) = ${cubeResult}
MathUtils.calculateCircleArea(5) = ${circleAreaResult}`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Interfaces with Classes</h2>
          
          <CodeExample
            title="Implementing Interfaces"
            description="Class yang mengimplementasikan interface harus menyediakan implementasi untuk semua members interface."
            code={`interface Vehicle {
  make: string;
  model: string;
  year: number;
  
  start(): string;
  stop(): string;
}

class Car implements Vehicle {
  make: string;
  model: string;
  year: number;
  private isRunning: boolean = false;
  
  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  
  start(): string {
    this.isRunning = true;
    return \`\${this.make} \${this.model} engine started.\`;
  }
  
  stop(): string {
    this.isRunning = false;
    return \`\${this.make} \${this.model} engine stopped.\`;
  }
  
  // Method tambahan yang tidak ada di interface
  honk(): string {
    return "Beep beep!";
  }
}`}
            result={`const car = new Car("Toyota", "Corolla", 2020);
car.start() = "${startResult}"
car.stop() = "${stopResult}"
car.honk() = "${honkResult}"`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Design Patterns</h2>
          
          <CodeExample
            title="Singleton Pattern"
            description="Pattern yang memastikan class hanya memiliki satu instance dan menyediakan akses global ke instance tersebut."
            code={`class Database {
  private static instance: Database;
  private connectionString: string;
  
  private constructor(connectionString: string) {
    this.connectionString = connectionString;
  }
  
  static getInstance(connectionString: string): Database {
    if (!Database.instance) {
      Database.instance = new Database(connectionString);
    }
    return Database.instance;
  }
  
  connect(): string {
    return \`Connected to database at \${this.connectionString}\`;
  }
  
  query(sql: string): string {
    return \`Executing query: \${sql}\`;
  }
}`}
            result={`const db1 = Database.getInstance("mongodb://localhost:27017");
const db2 = Database.getInstance("mongodb://localhost:27017");
db1 === db2 = ${isSameInstance}
db1.connect() = "${connectResult}"
db1.query("SELECT * FROM users") = "${queryResult}"`}
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