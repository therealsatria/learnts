# TypeScript Learning Hub

Proyek pembelajaran interaktif untuk mempelajari TypeScript dan implementasinya dalam Next.js.

## Tentang Proyek

TypeScript Learning Hub adalah platform pembelajaran interaktif yang dirancang untuk membantu pengembang memahami TypeScript dan cara mengimplementasikannya dalam proyek Next.js. Proyek ini menyediakan contoh kode praktis, penjelasan konsep, dan implementasi nyata yang dapat dijalankan langsung di browser.

## Fitur

- **Modul Pembelajaran TypeScript**: Pelajari konsep-konsep dasar TypeScript seperti Generics, Interfaces, Arrow Functions, Type Assertions, Classes, Utility Types, dan Async/Await.
- **Implementasi Next.js**: Pelajari cara mengimplementasikan TypeScript dalam proyek Next.js, termasuk API Routes, CRUD dengan Fake API, Typed Components, Custom Hooks, State Management, Form Handling, dan Best Practices.
- **Contoh Interaktif**: Setiap modul dilengkapi dengan contoh kode yang dapat dijalankan langsung di browser.
- **UI Modern**: Antarmuka pengguna yang modern dan responsif dengan dukungan mode gelap.

## Struktur Proyek

```
src/
├── app/
│   ├── api/                      # API Routes
│   │   ├── posts/                # API untuk posts
│   │   └── users/                # API untuk users
│   ├── arrow-functions/          # Modul Arrow Functions
│   ├── async-await/              # Modul Async/Await & Promises
│   ├── classes-inheritance/      # Modul Classes & Inheritance
│   ├── generics-and-interfaces/  # Modul Generics & Interfaces
│   ├── nextjs-implementation/    # Implementasi Next.js
│   │   ├── api-routes/           # Modul TypeScript dengan API Routes
│   │   └── crud-fake-api/        # Modul CRUD dengan Fake API (DummyJSON)
│   ├── type-assertions-guards/   # Modul Type Assertions & Guards
│   ├── typescript-modules/       # Halaman indeks modul TypeScript
│   ├── utility-types/            # Modul Utility Types
│   ├── page.tsx                  # Halaman beranda
│   └── layout.tsx                # Layout aplikasi
```

## Cara Menjalankan Proyek

1. Clone repositori:
   ```bash
   git clone https://github.com/username/typescript-learning-hub.git
   cd typescript-learning-hub
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

4. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Teknologi yang Digunakan

- **Next.js**: Framework React untuk aplikasi web
- **TypeScript**: Bahasa pemrograman yang digunakan
- **Tailwind CSS**: Framework CSS untuk styling
- **React Icons**: Untuk ikon-ikon UI
- **DummyJSON API**: Fake API untuk contoh operasi CRUD

## Kontribusi

Kontribusi selalu diterima! Jika Anda ingin menambahkan modul baru, memperbaiki bug, atau meningkatkan dokumentasi, silakan buat pull request.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Implementasi Next.js dengan TypeScript

- [TypeScript dengan API Routes](/src/app/nextjs-implementation/api-routes/page.tsx)
- [CRUD dengan Fake API](/src/app/nextjs-implementation/crud-fake-api/page.tsx)
- [Typed Components & Props](/src/app/nextjs-implementation/typed-components/page.tsx)
- [Custom Hooks dengan TypeScript](/src/app/nextjs-implementation/custom-hooks/page.tsx)
- [State Management dengan TypeScript](/src/app/nextjs-implementation/state-management/page.tsx)
- [Form Handling & Validation](/src/app/nextjs-implementation/form-handling/page.tsx)
- [Project Structure & Best Practices](/src/app/nextjs-implementation/project-structure/page.tsx)
