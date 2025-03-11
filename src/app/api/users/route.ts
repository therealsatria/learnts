import { NextRequest, NextResponse } from 'next/server';

// Tipe data untuk User
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Database simulasi
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
];

// GET handler - Mendapatkan semua users atau user berdasarkan ID
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
}

// POST handler - Membuat user baru
export async function POST(request: NextRequest) {
  try {
    // Mendapatkan data dari body request
    const body = await request.json();
    
    // Validasi data
    if (!body.name || !body.email || !body.role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validasi role
    if (body.role !== 'admin' && body.role !== 'user') {
      return NextResponse.json(
        { error: 'Invalid role. Must be "admin" or "user"' },
        { status: 400 }
      );
    }
    
    // Membuat user baru
    const newUser: User = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
      role: body.role,
    };
    
    // Menambahkan ke database
    users.push(newUser);
    
    // Mengembalikan user baru
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// PUT handler - Memperbarui user yang ada
export async function PUT(request: NextRequest) {
  try {
    // Mendapatkan data dari body request
    const body = await request.json();
    
    // Validasi ID
    if (!body.id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Mencari user
    const userIndex = users.findIndex(u => u.id === body.id);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Memperbarui user
    const updatedUser: User = {
      ...users[userIndex],
      ...body,
      id: users[userIndex].id, // Memastikan ID tidak berubah
    };
    
    users[userIndex] = updatedUser;
    
    // Mengembalikan user yang diperbarui
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// DELETE handler - Menghapus user
export async function DELETE(request: NextRequest) {
  // Mendapatkan parameter dari URL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }
  
  const userId = parseInt(id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }
  
  // Menghapus user
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  
  // Mengembalikan user yang dihapus
  return NextResponse.json(deletedUser);
} 