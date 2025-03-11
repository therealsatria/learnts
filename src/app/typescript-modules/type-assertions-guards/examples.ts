// src/app/type-assertions-guards/examples.ts

// ===== TYPE ASSERTIONS =====

// Basic type assertion using 'as'
export function getLength(obj: any): number {
  const str = obj as string;
  return str.length;
}

// Type assertion with angle bracket syntax (tidak direkomendasikan dalam JSX)
export function getLengthAlternative(obj: any): number {
  const str = <string>obj;
  return str.length;
}

// Type assertion untuk konversi antara tipe yang kompatibel
export function convertToNumber(value: string | number): number {
  return (value as number);
}

// Type assertion dengan const assertion
export const COLORS = ["red", "green", "blue"] as const;
export type Color = typeof COLORS[number]; // "red" | "green" | "blue"

// Double assertion (kadang diperlukan untuk kasus khusus)
export function doubleAssertion(obj: any): string {
  return obj as unknown as string;
}

// ===== TYPE GUARDS =====

// Type guard menggunakan typeof
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

// Type guard menggunakan instanceof
export class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class Dog extends Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
  
  bark(): string {
    return "Woof!";
  }
}

export class Cat extends Animal {
  color: string;
  constructor(name: string, color: string) {
    super(name);
    this.color = color;
  }
  
  meow(): string {
    return "Meow!";
  }
}

export function makeSound(animal: Animal): string {
  if (animal instanceof Dog) {
    return animal.bark();
  } else if (animal instanceof Cat) {
    return animal.meow();
  }
  return "Unknown animal sound";
}

// Type guard menggunakan property check
export interface Car {
  make: string;
  model: string;
  year: number;
}

export interface Boat {
  make: string;
  model: string;
  length: number;
}

export function isCar(vehicle: Car | Boat): vehicle is Car {
  return 'year' in vehicle;
}

export function isBoat(vehicle: Car | Boat): vehicle is Boat {
  return 'length' in vehicle;
}

export function getVehicleInfo(vehicle: Car | Boat): string {
  if (isCar(vehicle)) {
    return `Car: ${vehicle.make} ${vehicle.model} (${vehicle.year})`;
  } else {
    return `Boat: ${vehicle.make} ${vehicle.model} (${vehicle.length}ft)`;
  }
}

// Type guard menggunakan discriminated union
export type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

export function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

// Type guard menggunakan user-defined type guard function
export interface User {
  id: number;
  name: string;
  email?: string;
}

export interface Admin extends User {
  role: "admin";
  permissions: string[];
}

export function isAdmin(user: User): user is Admin {
  return (user as Admin).role === "admin";
}

export function getUserPermissions(user: User): string[] {
  if (isAdmin(user)) {
    return user.permissions;
  }
  return ["read"];
} 