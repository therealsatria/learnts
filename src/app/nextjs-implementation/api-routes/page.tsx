"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "@/app/api/users/route";
import { Post } from "@/app/api/posts/route";

export default function ApiRoutesPage() {
  // State untuk menyimpan data
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk form
  const [newUser, setNewUser] = useState<{ name: string; email: string; role: 'admin' | 'user' }>({
    name: '',
    email: '',
    role: 'user'
  });

  // Fetch data saat komponen dimount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();
        
        // Fetch posts
        const postsResponse = await fetch('/api/posts');
        const postsData = await postsResponse.json();
        
        setUsers(usersData);
        setPosts(postsData);
        setError(null);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handler untuk memilih user
  const handleSelectUser = async (userId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users?id=${userId}`);
      const data = await response.json();
      setSelectedUser(data);
      
      // Fetch posts by user
      const postsResponse = await fetch(`/api/posts?authorId=${userId}`);
      const postsData = await postsResponse.json();
      setPosts(postsData);
    } catch (err) {
      setError('Error fetching user details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handler untuk memilih post
  const handleSelectPost = async (postId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts?id=${postId}`);
      const data = await response.json();
      setSelectedPost(data);
    } catch (err) {
      setError('Error fetching post details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handler untuk membuat user baru
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      
      const createdUser = await response.json();
      
      // Update users list
      setUsers([...users, createdUser]);
      
      // Reset form
      setNewUser({
        name: '',
        email: '',
        role: 'user'
      });
      
      setError(null);
    } catch (err) {
      setError('Error creating user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="flex items-center mb-4">
          <Link 
            href="/" 
            className="text-blue-500 hover:text-blue-700 mr-4 transition-colors"
          >
            &larr; Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-bold">TypeScript dengan API Routes di Next.js</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Pelajari cara menggunakan TypeScript dengan API Routes di Next.js untuk membuat API endpoints dengan tipe yang aman.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Struktur API Routes</h2>
          <div className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-lg overflow-x-auto mb-4">
            <pre>{`// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Tipe data untuk User
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// GET handler
export async function GET(request: NextRequest) {
  // ...implementation
}

// POST handler
export async function POST(request: NextRequest) {
  // ...implementation
}

// PUT handler
export async function PUT(request: NextRequest) {
  // ...implementation
}

// DELETE handler
export async function DELETE(request: NextRequest) {
  // ...implementation
}`}</pre>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Next.js App Router menggunakan konvensi file <code>route.ts</code> untuk mendefinisikan API endpoints.
            Dengan TypeScript, Anda dapat menambahkan tipe yang aman untuk request dan response.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Setiap HTTP method (GET, POST, PUT, DELETE) diimplementasikan sebagai fungsi terpisah yang diekspor dari file route.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Keuntungan TypeScript dengan API Routes</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <strong>Type Safety:</strong> Mendefinisikan tipe untuk request dan response mencegah kesalahan tipe saat runtime.
            </li>
            <li>
              <strong>Autocomplete:</strong> Editor memberikan saran kode dan dokumentasi untuk objek request dan response.
            </li>
            <li>
              <strong>Refactoring yang Aman:</strong> Perubahan pada tipe data akan menyebabkan error kompilasi jika ada kode yang perlu diperbarui.
            </li>
            <li>
              <strong>Dokumentasi Inline:</strong> Tipe berfungsi sebagai dokumentasi untuk struktur data API Anda.
            </li>
            <li>
              <strong>Validasi:</strong> Memudahkan validasi data dengan tipe yang jelas.
            </li>
          </ul>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Demo API Users</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Daftar Users</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {users.map(user => (
                  <li key={user.id} className="py-2">
                    <button
                      onClick={() => handleSelectUser(user.id)}
                      className="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded"
                    >
                      <span className="font-medium">{user.name}</span>
                      <span className="text-gray-500 ml-2">({user.email})</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {user.role}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Tambah User Baru</h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nama
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as 'admin' | 'user'})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Loading...' : 'Tambah User'}
              </button>
            </form>
          </div>
          
          {selectedUser && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xl font-semibold mb-2">Detail User</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Nama:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
              </div>
            </div>
          )}
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Demo API Posts</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Daftar Posts</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {posts.map(post => (
                  <li key={post.id} className="py-2">
                    <button
                      onClick={() => handleSelectPost(post.id)}
                      className="w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded"
                    >
                      <span className="font-medium">{post.title}</span>
                      <div className="flex mt-1">
                        <span className="text-gray-500 text-sm">Author ID: {post.authorId}</span>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {selectedPost && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xl font-semibold mb-2">Detail Post</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                <p><strong>ID:</strong> {selectedPost.id}</p>
                <p><strong>Title:</strong> {selectedPost.title}</p>
                <p><strong>Content:</strong> {selectedPost.content}</p>
                <p><strong>Author ID:</strong> {selectedPost.authorId}</p>
                <p><strong>Published:</strong> {selectedPost.published ? 'Yes' : 'No'}</p>
                <p><strong>Created At:</strong> {new Date(selectedPost.createdAt).toLocaleString()}</p>
                <div>
                  <strong>Tags:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="bg-gray-200 dark:bg-gray-600 px-2 py-1 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Implementasi API Route dengan TypeScript</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">1. Mendefinisikan Tipe Data</h3>
            <div className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-lg overflow-x-auto">
              <pre>{`// Tipe data untuk User
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Tipe untuk request pembuatan post
export interface CreatePostRequest {
  title: string;
  content: string;
  authorId: number;
  tags?: string[];
}`}</pre>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">2. Implementasi Handler GET</h3>
            <div className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-lg overflow-x-auto">
              <pre>{`// GET handler - Mendapatkan semua users atau user berdasarkan ID
export async function GET(request: NextRequest) {
  // Mendapatkan parameter dari URL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // Jika ID disediakan, kembalikan user spesifik
  if (id) {
    const userId = parseInt(id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  }
  
  // Jika tidak ada ID, kembalikan semua users
  return NextResponse.json(users);
}`}</pre>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">3. Implementasi Handler POST</h3>
            <div className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-lg overflow-x-auto">
              <pre>{`// POST handler - Membuat post baru
export async function POST(request: NextRequest) {
  try {
    // Mendapatkan data dari body request
    const body: CreatePostRequest = await request.json();
    
    // Validasi data
    if (!body.title || !body.content || !body.authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Membuat post baru
    const newPost: Post = {
      id: posts.length + 1,
      title: body.title,
      content: body.content,
      authorId: body.authorId,
      published: false, // Default ke false
      tags: body.tags || [],
      createdAt: new Date().toISOString(),
    };
    
    // Menambahkan ke database
    posts.push(newPost);
    
    // Mengembalikan post baru
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}`}</pre>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">4. Menggunakan API dari Client</h3>
            <div className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-lg overflow-x-auto">
              <pre>{`// Fetch users
const fetchUsers = async () => {
  const response = await fetch('/api/users');
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  const users: User[] = await response.json();
  return users;
};

// Create user
const createUser = async (userData: Omit<User, 'id'>) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  
  const newUser: User = await response.json();
  return newUser;
};`}</pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 