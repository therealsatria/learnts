import { NextRequest, NextResponse } from 'next/server';

// Tipe data untuk Post
export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  tags: string[];
  createdAt: string;
}

// Tipe untuk request pembuatan post
export interface CreatePostRequest {
  title: string;
  content: string;
  authorId: number;
  tags?: string[];
}

// Tipe untuk request pembaruan post
export interface UpdatePostRequest {
  id: number;
  title?: string;
  content?: string;
  published?: boolean;
  tags?: string[];
}

// Database simulasi
const posts: Post[] = [
  {
    id: 1,
    title: 'Memulai dengan TypeScript',
    content: 'TypeScript adalah superset dari JavaScript yang menambahkan tipe statis...',
    authorId: 1,
    published: true,
    tags: ['typescript', 'javascript', 'tutorial'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'API Routes di Next.js',
    content: 'Next.js menyediakan cara mudah untuk membuat API endpoints...',
    authorId: 1,
    published: true,
    tags: ['nextjs', 'api', 'tutorial'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Menggunakan Generics di TypeScript',
    content: 'Generics memungkinkan Anda membuat komponen yang dapat bekerja dengan berbagai tipe...',
    authorId: 2,
    published: false,
    tags: ['typescript', 'generics', 'advanced'],
    createdAt: new Date().toISOString(),
  },
];

// GET handler - Mendapatkan semua posts atau post berdasarkan ID
export async function GET(request: NextRequest) {
  // Mendapatkan parameter dari URL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const authorId = searchParams.get('authorId');
  const tag = searchParams.get('tag');
  
  // Filter berdasarkan parameter
  let filteredPosts = [...posts];
  
  // Filter berdasarkan ID
  if (id) {
    const postId = parseInt(id);
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  }
  
  // Filter berdasarkan authorId
  if (authorId) {
    const authorIdNum = parseInt(authorId);
    filteredPosts = filteredPosts.filter(p => p.authorId === authorIdNum);
  }
  
  // Filter berdasarkan tag
  if (tag) {
    filteredPosts = filteredPosts.filter(p => p.tags.includes(tag));
  }
  
  // Kembalikan posts yang sudah difilter
  return NextResponse.json(filteredPosts);
}

// POST handler - Membuat post baru
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
}

// PUT handler - Memperbarui post yang ada
export async function PUT(request: NextRequest) {
  try {
    // Mendapatkan data dari body request
    const body: UpdatePostRequest = await request.json();
    
    // Validasi ID
    if (!body.id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    // Mencari post
    const postIndex = posts.findIndex(p => p.id === body.id);
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Memperbarui post
    const updatedPost: Post = {
      ...posts[postIndex],
      ...body,
      id: posts[postIndex].id, // Memastikan ID tidak berubah
    };
    
    posts[postIndex] = updatedPost;
    
    // Mengembalikan post yang diperbarui
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// DELETE handler - Menghapus post
export async function DELETE(request: NextRequest) {
  // Mendapatkan parameter dari URL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'Post ID is required' },
      { status: 400 }
    );
  }
  
  const postId = parseInt(id);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }
  
  // Menghapus post
  const deletedPost = posts[postIndex];
  posts.splice(postIndex, 1);
  
  // Mengembalikan post yang dihapus
  return NextResponse.json(deletedPost);
} 