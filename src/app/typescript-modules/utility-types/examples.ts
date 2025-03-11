// src/app/utility-types/examples.ts

// ===== BASIC TYPES FOR EXAMPLES =====

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
  updatedAt: Date;
  profile?: {
    bio: string;
    avatar: string;
    socialLinks: string[];
  };
}

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ===== PARTIAL<T> =====

// Membuat semua properti menjadi opsional
export type PartialUser = Partial<User>;

// Contoh penggunaan Partial untuk update function
export function updateUser(userId: number, updates: Partial<User>): User {
  // Simulasi user dari database
  const user: User = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  };
  
  // Update user dengan properti yang diberikan
  const updatedUser: User = { ...user, ...updates, updatedAt: new Date() };
  return updatedUser;
}

// ===== REQUIRED<T> =====

// Membuat semua properti menjadi wajib
export type RequiredUser = Required<User>;

// Contoh penggunaan Required untuk validasi
export function validateCompleteUser(user: Required<User>): boolean {
  return (
    user.id !== undefined &&
    user.name !== undefined &&
    user.email !== undefined &&
    user.role !== undefined &&
    user.createdAt !== undefined &&
    user.updatedAt !== undefined &&
    user.profile !== undefined
  );
}

// ===== READONLY<T> =====

// Membuat semua properti menjadi readonly
export type ReadonlyUser = Readonly<User>;

// Contoh penggunaan Readonly
export function processUser(user: Readonly<User>): void {
  console.log(user.name);
  // Error: Cannot assign to 'name' because it is a read-only property.
  // user.name = "New Name";
}

// ===== RECORD<K, T> =====

// Membuat tipe dengan keys dan values yang ditentukan
export type UserRoles = "admin" | "editor" | "viewer";
export type RolePermissions = Record<UserRoles, string[]>;

// Contoh penggunaan Record
export const rolePermissions: RolePermissions = {
  admin: ["create", "read", "update", "delete"],
  editor: ["create", "read", "update"],
  viewer: ["read"]
};

// Contoh lain: mapping user IDs to users
export type UserMap = Record<number, User>;

// ===== PICK<T, K> =====

// Memilih properti tertentu dari tipe
export type UserCredentials = Pick<User, "email" | "id">;
export type UserProfile = Pick<User, "name" | "profile">;

// Contoh penggunaan Pick
export function getUserCredentials(user: User): UserCredentials {
  return {
    id: user.id,
    email: user.email
  };
}

// ===== OMIT<T, K> =====

// Menghilangkan properti tertentu dari tipe
export type PublicUser = Omit<User, "email" | "createdAt" | "updatedAt">;
export type PostWithoutDates = Omit<Post, "createdAt" | "updatedAt">;

// Contoh penggunaan Omit
export function getPublicUser(user: User): PublicUser {
  const { email, createdAt, updatedAt, ...publicUser } = user;
  return publicUser;
}

// ===== EXCLUDE<T, U> =====

// Mengecualikan tipe dari union type
export type UserRoleWithoutGuest = Exclude<"admin" | "user" | "guest", "guest">;
export type PrimitiveTypes = string | number | boolean | null | undefined;
export type NonNullablePrimitives = Exclude<PrimitiveTypes, null | undefined>;

// ===== EXTRACT<T, U> =====

// Mengekstrak tipe dari union type
export type StringOrNumber = string | number | boolean;
export type ExtractedStringOrNumber = Extract<StringOrNumber, string | number>;
export type AdminOrUser = Extract<"admin" | "user" | "guest", "admin" | "user">;

// ===== NONNULLABLE<T> =====

// Menghilangkan null dan undefined dari tipe
export type MaybeString = string | null | undefined;
export type DefinitelyString = NonNullable<MaybeString>;

// Contoh penggunaan NonNullable
export function processNonNullableString(value: MaybeString): string {
  const nonNullableValue: NonNullable<MaybeString> = value ?? "default";
  return nonNullableValue;
}

// ===== PARAMETERS<T> =====

// Mendapatkan tipe parameter dari function type
export function createPost(title: string, content: string, tags: string[]): Post {
  return {
    id: Math.floor(Math.random() * 1000),
    title,
    content,
    published: false,
    authorId: 1,
    tags,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

export type CreatePostParams = Parameters<typeof createPost>;

// Contoh penggunaan Parameters
export function validatePostParams(params: Parameters<typeof createPost>): boolean {
  const [title, content, tags] = params;
  return title.length > 0 && content.length > 0 && tags.length > 0;
}

// ===== RETURNTYPE<T> =====

// Mendapatkan tipe return dari function type
export type CreatePostReturn = ReturnType<typeof createPost>;

// Contoh penggunaan ReturnType
export function processPost(post: ReturnType<typeof createPost>): void {
  console.log(`Processing post: ${post.title}`);
}

// ===== INSTANCETYPE<T> =====

// Mendapatkan tipe instance dari constructor function
export class BlogPost {
  title: string;
  content: string;
  
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
  
  publish(): void {
    console.log(`Publishing: ${this.title}`);
  }
}

export type BlogPostInstance = InstanceType<typeof BlogPost>;

// ===== CONDITIONAL TYPES =====

// Tipe kondisional berdasarkan kondisi
export type IsString<T> = T extends string ? true : false;
export type IsStringResult1 = IsString<"hello">;  // true
export type IsStringResult2 = IsString<123>;      // false

// ===== MAPPED TYPES =====

// Membuat tipe baru dengan memetakan properti dari tipe yang ada
export type Nullable<T> = { [P in keyof T]: T[P] | null };
export type NullableUser = Nullable<User>;

export type Optional<T> = { [P in keyof T]?: T[P] };
export type OptionalPost = Optional<Post>;

// Kombinasi mapped types dengan modifiers
export type CreateUserInput = {
  [P in keyof User as Exclude<P, "id" | "createdAt" | "updatedAt">]: User[P]
};

// ===== TEMPLATE LITERAL TYPES =====

// Membuat tipe string dengan template literals
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type HttpRoute = "/users" | "/posts" | "/comments";
export type HttpEndpoint = `${HttpMethod} ${HttpRoute}`;

// Contoh penggunaan template literal types
export function fetchApi(endpoint: HttpEndpoint, data?: any): Promise<any> {
  const [method, route] = endpoint.split(" ");
  return Promise.resolve({ method, route, data });
} 