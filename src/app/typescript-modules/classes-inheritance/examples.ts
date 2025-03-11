// src/app/classes-inheritance/examples.ts

// ===== BASIC CLASS =====

// Class dasar dengan properties dan methods
export class Person {
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
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }

  // Method dengan parameter
  celebrateBirthday(): void {
    this.age++;
    console.log(`Happy Birthday! ${this.name} is now ${this.age} years old.`);
  }
}

// ===== ACCESS MODIFIERS =====

// Class dengan access modifiers
export class BankAccount {
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
  
  // Public method
  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }
    if (amount > this._balance) {
      throw new Error("Insufficient funds");
    }
    this._balance -= amount;
  }
  
  // Public getter
  public get balance(): number {
    return this._balance;
  }
  
  // Private method
  private logTransaction(type: string, amount: number): void {
    console.log(`[${new Date().toISOString()}] ${type}: ${amount}`);
  }
}

// ===== INHERITANCE =====

// Class turunan (inheritance)
export class SavingsAccount extends BankAccount {
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
    console.log(`Added interest: ${interest}`);
  }
  
  // Override method dari parent class
  public withdraw(amount: number): void {
    const fee = 2;
    super.withdraw(amount + fee);
    console.log(`Withdrawal fee: ${fee}`);
  }
  
  // Mengakses protected property dari parent class
  public getOwnerInfo(): string {
    return `Account owned by: ${this.owner}`;
  }
}

// ===== ABSTRACT CLASSES =====

// Abstract class (tidak dapat diinstansiasi langsung)
export abstract class Shape {
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
    return `This is a ${this.color} ${this.name} with area: ${this.calculateArea()}`;
  }
}

// Implementasi abstract class
export class Circle extends Shape {
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
}

export class Rectangle extends Shape {
  color: string;
  width: number;
  height: number;
  
  constructor(color: string, width: number, height: number) {
    super("rectangle");
    this.color = color;
    this.width = width;
    this.height = height;
  }
  
  calculateArea(): number {
    return this.width * this.height;
  }
}

// ===== STATIC MEMBERS =====

// Class dengan static members
export class MathUtils {
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
}

// ===== INTERFACES WITH CLASSES =====

// Interface untuk class
export interface Vehicle {
  make: string;
  model: string;
  year: number;
  
  start(): string;
  stop(): string;
}

// Class yang mengimplementasikan interface
export class Car implements Vehicle {
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
    return `${this.make} ${this.model} engine started.`;
  }
  
  stop(): string {
    this.isRunning = false;
    return `${this.make} ${this.model} engine stopped.`;
  }
  
  // Method tambahan yang tidak ada di interface
  honk(): string {
    return "Beep beep!";
  }
}

// ===== SINGLETON PATTERN =====

// Singleton class (hanya satu instance)
export class Database {
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
    return `Connected to database at ${this.connectionString}`;
  }
  
  query(sql: string): string {
    return `Executing query: ${sql}`;
  }
} 