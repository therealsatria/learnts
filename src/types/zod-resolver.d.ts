declare module '@hookform/resolvers/zod' {
  import { ZodSchema } from 'zod';
  import { Resolver } from 'react-hook-form';
  
  export function zodResolver<T>(schema: ZodSchema<T>): Resolver<T>;
} 