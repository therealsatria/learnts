// src/app/typescript-modules/generics-and-interfaces/functions.ts
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

export function sortBy<T, K extends keyof T>(array: T[], key: K, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function reduceArray<T, U>(array: T[], callback: (accumulator: U, currentItem: T, index: number, array: T[]) => U, initialValue: U): U {
  return array.reduce(callback, initialValue);
}

export function findItem<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
  return array.find(predicate);
}

export function removeItem<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(item => !predicate(item));
}

export function updateItem<T>(array: T[], predicate: (item: T) => boolean, newItem: T): T[] {
  return array.map(item => predicate(item) ? newItem : item);
}

export function paginateArray<T>(array: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
}

export function pipe<T>(...fns: ((arg: T) => T)[]) {
  return (x: T) => fns.reduce((v, f) => f(v), x);
}
