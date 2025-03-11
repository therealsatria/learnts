"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft, FiRefreshCw, FiPlusCircle, FiEdit, FiTrash2, FiSearch, FiSave } from "react-icons/fi";

// Definisi tipe data untuk produk
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Tipe untuk request pembuatan produk
interface CreateProductRequest {
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  brand: string;
  category: string;
}

// Tipe untuk request pembaruan produk
interface UpdateProductRequest {
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export default function CrudFakeApiPage() {
  // State untuk menyimpan data produk
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State untuk form create dan update
  const [formData, setFormData] = useState<CreateProductRequest | UpdateProductRequest>({
    title: '',
    description: '',
    price: 0,
    stock: 0,
    brand: '',
    category: ''
  });

  // Fetch semua produk saat komponen dimuat
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fungsi untuk mengambil semua produk
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      
      if (data.products) {
        setProducts(data.products);
      } else {
        console.error('Format data tidak sesuai:', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mencari produk
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
      const data = await response.json();
      
      if (data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memilih produk untuk dilihat detailnya
  const handleSelectProduct = async (productId: number) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const product = await response.json();
      
      setSelectedProduct(product);
      setIsEditing(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Fungsi untuk mengedit produk
  const handleEditProduct = () => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        stock: selectedProduct.stock
      });
      setIsEditing(true);
    }
  };

  // Fungsi untuk menyimpan perubahan pada produk yang diedit
  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;
    
    try {
      const response = await fetch(`https://dummyjson.com/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const updatedProduct = await response.json();
      
      // Update state
      setSelectedProduct(updatedProduct);
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setIsEditing(false);
      
      // Tampilkan notifikasi sukses
      alert('Produk berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Terjadi kesalahan saat memperbarui produk.');
    }
  };

  // Fungsi untuk menambah produk baru
  const handleCreateProduct = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const newProduct = await response.json();
      
      // Update state
      setProducts([newProduct, ...products]);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: 0,
        stock: 0,
        brand: '',
        category: ''
      });
      
      // Tampilkan notifikasi sukses
      alert('Produk baru berhasil ditambahkan!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Terjadi kesalahan saat menambahkan produk baru.');
    }
  };

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      // Update state
      setProducts(products.filter(p => p.id !== productId));
      
      if (selectedProduct?.id === productId) {
        setSelectedProduct(null);
      }
      
      // Tampilkan notifikasi sukses
      alert('Produk berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Terjadi kesalahan saat menghapus produk.');
    }
  };

  // Handler untuk input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };

  // Form untuk menambah produk baru
  const renderCreateForm = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
      <h3 className="text-xl font-bold mb-4">Tambah Produk Baru</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input 
            type="text" 
            name="brand"
            value={(formData as CreateProductRequest).brand || ''}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <input 
            type="text" 
            name="category"
            value={(formData as CreateProductRequest).category || ''}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Harga</label>
          <input 
            type="number" 
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stok</label>
          <input 
            type="number" 
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
          ></textarea>
        </div>
      </div>
      <button 
        onClick={handleCreateProduct}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
      >
        <FiPlusCircle className="mr-2" /> Tambah Produk
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <div className="flex items-center mb-4">
          <Link 
            href="/nextjs-implementation" 
            className="text-blue-500 hover:text-blue-700 mr-4 transition-colors flex items-center"
          >
            <FiArrowLeft className="mr-1" /> Kembali ke Implementasi Next.js
          </Link>
          <h1 className="text-3xl font-bold">CRUD dengan Fake API</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Implementasi operasi CRUD (Create, Read, Update, Delete) dengan TypeScript menggunakan DummyJSON API.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daftar Produk - Kolom Kiri */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Daftar Produk</h2>
              <button 
                onClick={fetchProducts} 
                className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                title="Refresh"
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
            
            {/* Search bar */}
            <div className="flex mb-4">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l dark:bg-gray-700"
              />
              <button 
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-r"
              >
                <FiSearch />
              </button>
            </div>

            {/* Daftar produk */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
              {loading ? (
                <p className="py-3 text-center text-gray-500">Mengambil data produk...</p>
              ) : products.length > 0 ? (
                products.map(product => (
                  <div key={product.id} className="py-3">
                    <div className="flex justify-between">
                      <button 
                        onClick={() => handleSelectProduct(product.id)}
                        className="text-left font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        {product.title}
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Hapus"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>{product.brand}</span>
                      <span>${product.price}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-3 text-center text-gray-500">Tidak ada produk ditemukan.</p>
              )}
            </div>
          </div>
        </div>

        {/* Detail Produk dan Form Edit - Kolom Kanan */}
        <div className="lg:col-span-2">
          {selectedProduct ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Detail Produk</h2>
                <button 
                  onClick={handleEditProduct}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center"
                  disabled={isEditing}
                >
                  <FiEdit className="mr-1" /> Edit
                </button>
              </div>

              {isEditing ? (
                // Form Edit
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Judul</label>
                      <input 
                        type="text" 
                        name="title"
                        value={formData.title || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Harga</label>
                      <input 
                        type="number" 
                        name="price"
                        value={formData.price || 0}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Stok</label>
                      <input 
                        type="number" 
                        name="stock"
                        value={formData.stock || 0}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Deskripsi</label>
                      <textarea 
                        name="description"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button 
                      onClick={handleUpdateProduct}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                    >
                      <FiSave className="mr-2" /> Simpan Perubahan
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                // Detail Produk
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src={selectedProduct.thumbnail} 
                        alt={selectedProduct.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      
                      {/* Galeri gambar produk */}
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {selectedProduct.images.slice(0, 4).map((img, index) => (
                          <img 
                            key={index}
                            src={img} 
                            alt={`Product image ${index + 1}`}
                            className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-90"
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{selectedProduct.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedProduct.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                          <span className="block text-sm text-gray-500 dark:text-gray-400">Harga</span>
                          <span className="font-bold text-lg">${selectedProduct.price}</span>
                          {selectedProduct.discountPercentage > 0 && (
                            <span className="ml-2 text-sm text-green-600 dark:text-green-400">
                              {selectedProduct.discountPercentage}% OFF
                            </span>
                          )}
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                          <span className="block text-sm text-gray-500 dark:text-gray-400">Rating</span>
                          <span className="font-bold text-lg">{selectedProduct.rating} / 5</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                          <span className="block text-sm text-gray-500 dark:text-gray-400">Stok</span>
                          <span className="font-bold text-lg">{selectedProduct.stock}</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                          <span className="block text-sm text-gray-500 dark:text-gray-400">Brand</span>
                          <span className="font-bold text-lg">{selectedProduct.brand}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Kategori</span>
                        <span className="inline-block bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                          {selectedProduct.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <p className="text-center text-gray-500 py-12">
                Pilih produk dari daftar untuk melihat detailnya.
              </p>
            </div>
          )}
          
          {/* Form untuk menambah produk baru */}
          {renderCreateForm()}
        </div>
      </div>

      {/* Penjelasan Modul */}
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">Tentang Modul CRUD dengan Fake API</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Modul ini menunjukkan bagaimana melakukan operasi CRUD (Create, Read, Update, Delete) menggunakan TypeScript 
          dan Next.js dengan memanfaatkan DummyJSON API - sebuah Fake REST API yang tersedia untuk testing.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Dalam modul ini, Anda akan belajar:
        </p>
        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
          <li>Cara mendefinisikan tipe data untuk request dan response API</li>
          <li>Menggunakan fetch API dengan TypeScript untuk melakukan operasi CRUD</li>
          <li>Menangani state dan form input dengan tipe yang aman menggunakan TypeScript</li>
          <li>Mengimplementasikan pencarian dan filter produk</li>
          <li>Mengelola state UI untuk interaksi user yang seamless</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          API yang digunakan dalam modul ini adalah DummyJSON, yang menyediakan berbagai endpoint untuk testing aplikasi. 
          Meskipun ini adalah Fake API (tidak ada data yang benar-benar disimpan atau dihapus di server), 
          namun API ini mensimulasikan respons yang akan Anda temui di API produksi sungguhan.
        </p>
      </div>
    </div>
  );
}
