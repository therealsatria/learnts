import Link from "next/link";
import {
  User,
  Post,
  PartialUser,
  updateUser,
  RequiredUser,
  validateCompleteUser,
  ReadonlyUser,
  UserRoles,
  RolePermissions,
  rolePermissions,
  UserCredentials,
  getUserCredentials,
  PublicUser,
  getPublicUser,
  UserRoleWithoutGuest,
  PrimitiveTypes,
  NonNullablePrimitives,
  StringOrNumber,
  ExtractedStringOrNumber,
  AdminOrUser,
  MaybeString,
  DefinitelyString,
  processNonNullableString,
  createPost,
  CreatePostParams,
  validatePostParams,
  CreatePostReturn,
  processPost,
  BlogPost,
  BlogPostInstance,
  IsString,
  IsStringResult1,
  IsStringResult2,
  Nullable,
  NullableUser,
  Optional,
  OptionalPost,
  CreateUserInput,
  HttpMethod,
  HttpRoute,
  HttpEndpoint,
  fetchApi
} from "./examples";

export default function UtilityTypesPage() {
  // Contoh data
  const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  };

  // Partial
  const partialUser: PartialUser = { name: "Jane Doe" };
  const updatedUser = updateUser(1, partialUser);

  // Required
  const requiredUserExample: Partial<RequiredUser> = {
    id: 2,
    name: "Complete User",
    email: "complete@example.com",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    profile: {
      bio: "This is a complete user",
      avatar: "avatar.jpg",
      socialLinks: ["https://twitter.com", "https://facebook.com"]
    }
  };

  // Readonly
  const readonlyUser: ReadonlyUser = { ...user };
  // Akan error jika mencoba mengubah: readonlyUser.name = "New Name";

  // Record
  const rolePermissionsExample = { ...rolePermissions };

  // Pick
  const userCredentials = getUserCredentials(user);

  // Omit
  const publicUser = getPublicUser(user);

  // NonNullable
  const nullableString: MaybeString = null;
  const processedString = processNonNullableString(nullableString);
  const definiteString = processNonNullableString("Hello");

  // Parameters & ReturnType
  const postParams: CreatePostParams = ["My Post", "Content here", ["tag1", "tag2"]];
  const isValidParams = validatePostParams(postParams);
  const post: CreatePostReturn = createPost(...postParams);

  // InstanceType
  const blogPost = new BlogPost("TypeScript Basics", "Learn about TypeScript...");
  const blogPostInstance: BlogPostInstance = blogPost;

  // Template Literal Types
  const endpoint: HttpEndpoint = "GET /users";
  const apiResult = fetchApi(endpoint);

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
          <h1 className="text-3xl font-bold">Utility Types di TypeScript</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          TypeScript menyediakan beberapa utility types bawaan yang membantu transformasi tipe umum.
          Utility types ini memungkinkan Anda memanipulasi tipe dengan cara yang fleksibel dan ekspresif.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Partial&lt;T&gt;</h2>
          
          <CodeExample
            title="Partial<T>"
            description="Membuat tipe dengan semua properti T menjadi opsional."
            code={`interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
  updatedAt: Date;
}

type PartialUser = Partial<User>;

// Contoh penggunaan Partial untuk update function
function updateUser(userId: number, updates: Partial<User>): User {
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
}`}
            result={`const partialUser: PartialUser = { name: "Jane Doe" };
// Hanya perlu memberikan sebagian properti

const updatedUser = updateUser(1, partialUser);
// Result: ${JSON.stringify(updatedUser, (key, value) => 
              value instanceof Date ? value.toISOString() : value, 2)}`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Required&lt;T&gt;</h2>
          
          <CodeExample
            title="Required<T>"
            description="Membuat tipe dengan semua properti T menjadi wajib (tidak opsional)."
            code={`type RequiredUser = Required<User>;

// Contoh penggunaan Required untuk validasi
function validateCompleteUser(user: Required<User>): boolean {
  return (
    user.id !== undefined &&
    user.name !== undefined &&
    user.email !== undefined &&
    user.role !== undefined &&
    user.createdAt !== undefined &&
    user.updatedAt !== undefined &&
    user.profile !== undefined
  );
}`}
            result={`// Dengan Required<User>, profile yang tadinya opsional menjadi wajib
// Ini akan error jika tidak menyediakan semua properti termasuk profile

const requiredUserExample: Partial<RequiredUser> = {
  id: 2,
  name: "Complete User",
  email: "complete@example.com",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
  profile: {
    bio: "This is a complete user",
    avatar: "avatar.jpg",
    socialLinks: ["https://twitter.com", "https://facebook.com"]
  }
};`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Readonly&lt;T&gt;</h2>
          
          <CodeExample
            title="Readonly<T>"
            description="Membuat tipe dengan semua properti T menjadi readonly."
            code={`type ReadonlyUser = Readonly<User>;

// Contoh penggunaan Readonly
function processUser(user: Readonly<User>): void {
  console.log(user.name);
  // Error: Cannot assign to 'name' because it is a read-only property.
  // user.name = "New Name";
}`}
            result={`const readonlyUser: ReadonlyUser = { 
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "user",
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-01-01")
};

// Akan error jika mencoba mengubah: 
// readonlyUser.name = "New Name";`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Record&lt;K, T&gt;</h2>
          
          <CodeExample
            title="Record<K, T>"
            description="Membuat tipe dengan properti dari K dengan nilai tipe T."
            code={`type UserRoles = "admin" | "editor" | "viewer";
type RolePermissions = Record<UserRoles, string[]>;

// Contoh penggunaan Record
const rolePermissions: RolePermissions = {
  admin: ["create", "read", "update", "delete"],
  editor: ["create", "read", "update"],
  viewer: ["read"]
};

// Contoh lain: mapping user IDs to users
type UserMap = Record<number, User>;`}
            result={`// Record memastikan semua key yang ditentukan ada
const rolePermissionsExample = ${JSON.stringify(rolePermissionsExample, null, 2)};

// UserMap akan menjadi:
// {
//   [id: number]: User
// }`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Pick&lt;T, K&gt;</h2>
          
          <CodeExample
            title="Pick<T, K>"
            description="Membuat tipe dengan hanya properti K dari T."
            code={`type UserCredentials = Pick<User, "email" | "id">;
type UserProfile = Pick<User, "name" | "profile">;

// Contoh penggunaan Pick
function getUserCredentials(user: User): UserCredentials {
  return {
    id: user.id,
    email: user.email
  };
}`}
            result={`const userCredentials = getUserCredentials(user);
// Result: ${JSON.stringify(userCredentials, null, 2)}

// UserCredentials hanya memiliki properti id dan email dari User
// UserProfile hanya memiliki properti name dan profile dari User`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Omit&lt;T, K&gt;</h2>
          
          <CodeExample
            title="Omit<T, K>"
            description="Membuat tipe dengan semua properti T kecuali K."
            code={`type PublicUser = Omit<User, "email" | "createdAt" | "updatedAt">;
type PostWithoutDates = Omit<Post, "createdAt" | "updatedAt">;

// Contoh penggunaan Omit
function getPublicUser(user: User): PublicUser {
  const { email, createdAt, updatedAt, ...publicUser } = user;
  return publicUser;
}`}
            result={`const publicUser = getPublicUser(user);
// Result: ${JSON.stringify(publicUser, null, 2)}

// PublicUser memiliki semua properti User kecuali email, createdAt, dan updatedAt`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Exclude&lt;T, U&gt; & Extract&lt;T, U&gt;</h2>
          
          <CodeExample
            title="Exclude<T, U> & Extract<T, U>"
            description="Exclude mengecualikan tipe dari union type. Extract mengekstrak tipe dari union type."
            code={`// Exclude
type UserRoleWithoutGuest = Exclude<"admin" | "user" | "guest", "guest">;
type PrimitiveTypes = string | number | boolean | null | undefined;
type NonNullablePrimitives = Exclude<PrimitiveTypes, null | undefined>;

// Extract
type StringOrNumber = string | number | boolean;
type ExtractedStringOrNumber = Extract<StringOrNumber, string | number>;
type AdminOrUser = Extract<"admin" | "user" | "guest", "admin" | "user">;`}
            result={`// UserRoleWithoutGuest = "admin" | "user"
// NonNullablePrimitives = string | number | boolean
// ExtractedStringOrNumber = string | number
// AdminOrUser = "admin" | "user"`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">NonNullable&lt;T&gt;</h2>
          
          <CodeExample
            title="NonNullable<T>"
            description="Membuat tipe dengan mengecualikan null dan undefined dari T."
            code={`type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;

// Contoh penggunaan NonNullable
function processNonNullableString(value: MaybeString): string {
  const nonNullableValue: NonNullable<MaybeString> = value ?? "default";
  return nonNullableValue;
}`}
            result={`const nullableString: MaybeString = null;
const processedString = processNonNullableString(nullableString);
// Result: "${processedString}"

const definiteString = processNonNullableString("Hello");
// Result: "${definiteString}"

// DefinitelyString = string (tanpa null atau undefined)`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Parameters&lt;T&gt; & ReturnType&lt;T&gt;</h2>
          
          <CodeExample
            title="Parameters<T> & ReturnType<T>"
            description="Parameters mendapatkan tipe parameter dari function type. ReturnType mendapatkan tipe return dari function type."
            code={`function createPost(title: string, content: string, tags: string[]): Post {
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

// Parameters
type CreatePostParams = Parameters<typeof createPost>;

function validatePostParams(params: Parameters<typeof createPost>): boolean {
  const [title, content, tags] = params;
  return title.length > 0 && content.length > 0 && tags.length > 0;
}

// ReturnType
type CreatePostReturn = ReturnType<typeof createPost>;

function processPost(post: ReturnType<typeof createPost>): void {
  console.log(\`Processing post: \${post.title}\`);
}`}
            result={`const postParams: CreatePostParams = ["My Post", "Content here", ["tag1", "tag2"]];
const isValidParams = validatePostParams(postParams);
// Result: ${isValidParams}

const post: CreatePostReturn = createPost(...postParams);
// CreatePostParams = [string, string, string[]]
// CreatePostReturn = Post`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">InstanceType&lt;T&gt;</h2>
          
          <CodeExample
            title="InstanceType<T>"
            description="Mendapatkan tipe instance dari constructor function."
            code={`class BlogPost {
  title: string;
  content: string;
  
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
  
  publish(): void {
    console.log(\`Publishing: \${this.title}\`);
  }
}

type BlogPostInstance = InstanceType<typeof BlogPost>;`}
            result={`const blogPost = new BlogPost("TypeScript Basics", "Learn about TypeScript...");
const blogPostInstance: BlogPostInstance = blogPost;

// BlogPostInstance = {
//   title: string;
//   content: string;
//   publish(): void;
// }`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Conditional Types</h2>
          
          <CodeExample
            title="Conditional Types"
            description="Tipe yang bergantung pada kondisi menggunakan sintaks extends dan ternary."
            code={`type IsString<T> = T extends string ? true : false;
type IsStringResult1 = IsString<"hello">;  // true
type IsStringResult2 = IsString<123>;      // false`}
            result={`// IsStringResult1 = true
// IsStringResult2 = false

// Conditional types berguna untuk membuat tipe yang fleksibel
// berdasarkan kondisi tipe lainnya`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Mapped Types</h2>
          
          <CodeExample
            title="Mapped Types"
            description="Membuat tipe baru dengan memetakan properti dari tipe yang ada."
            code={`type Nullable<T> = { [P in keyof T]: T[P] | null };
type NullableUser = Nullable<User>;

type Optional<T> = { [P in keyof T]?: T[P] };
type OptionalPost = Optional<Post>;

// Kombinasi mapped types dengan modifiers
type CreateUserInput = {
  [P in keyof User as Exclude<P, "id" | "createdAt" | "updatedAt">]: User[P]
};`}
            result={`// NullableUser = {
//   id: number | null;
//   name: string | null;
//   email: string | null;
//   ...
// }

// OptionalPost = {
//   id?: number;
//   title?: string;
//   content?: string;
//   ...
// }

// CreateUserInput = {
//   name: string;
//   email: string;
//   role: "admin" | "user" | "guest";
//   profile?: { bio: string; avatar: string; socialLinks: string[] };
// }`}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Template Literal Types</h2>
          
          <CodeExample
            title="Template Literal Types"
            description="Membuat tipe string dengan template literals."
            code={`type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type HttpRoute = "/users" | "/posts" | "/comments";
type HttpEndpoint = \`\${HttpMethod} \${HttpRoute}\`;

// Contoh penggunaan template literal types
function fetchApi(endpoint: HttpEndpoint, data?: any): Promise<any> {
  const [method, route] = endpoint.split(" ");
  return Promise.resolve({ method, route, data });
}`}
            result={`const endpoint: HttpEndpoint = "GET /users";
// HttpEndpoint = "GET /users" | "GET /posts" | "GET /comments" | "POST /users" | ...

const apiResult = fetchApi(endpoint);
// Hanya menerima kombinasi yang valid dari HttpMethod dan HttpRoute`}
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