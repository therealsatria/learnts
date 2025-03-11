// src/app/generics-and-interfaces/functions.ts
export function identity<T>(arg: T): T {
    return arg;
  }
  
  export function getFirstElement<T>(list: T[]): T | undefined {
    return list[0];
  }
  
  export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
  
  export function mapArray<T, U>(array: T[], callback: (item: T) => U): U[] {
    return array.map(callback);
  }
  
  export function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
    return array.filter(predicate);
  }
  