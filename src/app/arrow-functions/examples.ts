// src/app/arrow-functions/examples.ts

// Basic arrow function
export const add = (a: number, b: number): number => a + b;

// Arrow function with multiple statements
export const calculateArea = (width: number, height: number): number => {
  const area = width * height;
  return area;
};

// Arrow function with default parameters
export const greet = (name: string = "Guest"): string => `Hello, ${name}!`;

// Arrow function with rest parameters
export const sum = (...numbers: number[]): number => 
  numbers.reduce((total, num) => total + num, 0);

// Arrow function as callback
export const processArray = <T, U>(
  arr: T[], 
  callback: (item: T, index: number) => U
): U[] => arr.map(callback);

// Arrow function with object destructuring
export type Person = { name: string; age: number };
export const getPersonInfo = ({ name, age }: Person): string => 
  `${name} is ${age} years old`;

// Arrow function returning an object (note the parentheses)
export const createPerson = (name: string, age: number): Person => ({ name, age });

// Immediately Invoked Function Expression (IIFE) with arrow function
export const config = (() => {
  const env = "development";
  const apiUrl = "https://api.example.com";
  return { env, apiUrl };
})();

// Arrow function with type guard
export const isString = (value: unknown): value is string => 
  typeof value === "string";

// Higher-order function returning an arrow function
export const multiply = (factor: number) => (value: number): number => 
  value * factor; 