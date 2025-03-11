"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiCode, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

// Example 1: Basic Props Types
type ButtonProps = {
  label: string;
  primary?: boolean;
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
};

function Button({ 
  label, 
  primary = false, 
  onClick, 
  size = 'medium', 
  disabled = false,
  className = ""
}: ButtonProps) {
  const baseClasses = "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg"
  };
  
  const colorClasses = primary 
    ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500" 
    : "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500";
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${colorClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

// Example 2: Props with Children
type CardProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

function Card({ title, children, footer, className = "" }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow ${className}`}>
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
}

// Example 3: Generic Components
type ListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  emptyMessage?: string;
};

function List<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  emptyMessage = "Tidak ada item" 
}: ListProps<T>) {
  if (items.length === 0) {
    return <p className="text-gray-500 text-center py-4">{emptyMessage}</p>;
  }
  
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)} className="py-3">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Example 4: Discriminated Union for Props
type SuccessMessageProps = {
  type: 'success';
  message: string;
  details?: string;
};

type ErrorMessageProps = {
  type: 'error';
  message: string;
  code: string;
  retry?: () => void;
};

type MessageProps = SuccessMessageProps | ErrorMessageProps;

function Message(props: MessageProps) {
  if (props.type === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start">
        <FiCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-green-800 dark:text-green-300">{props.message}</h4>
          {props.details && <p className="mt-1 text-green-700 dark:text-green-400 text-sm">{props.details}</p>}
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
        <FiAlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-red-800 dark:text-red-300">{props.message}</h4>
          <p className="mt-1 text-red-700 dark:text-red-400 text-sm">Kode Error: {props.code}</p>
          {props.retry && (
            <button 
              onClick={props.retry}
              className="mt-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              Coba lagi
            </button>
          )}
        </div>
      </div>
    );
  }
}

// Main Page Component
export default function TypedComponentsPage() {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState<'success' | 'error' | null>(null);
  
  // Example data for List component
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
  ];
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="flex items-center mb-4">
          <Link 
            href="/nextjs-implementation" 
            className="text-blue-500 hover:text-blue-700 mr-4 transition-colors flex items-center"
          >
            <FiArrowLeft className="mr-1" /> Kembali ke Implementasi Next.js
          </Link>
          <h1 className="text-3xl font-bold">Typed Components & Props</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Membuat komponen React dengan props yang diketik dengan baik menggunakan TypeScript dalam Next.js.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sidebar with navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sticky top-4">
            <h2 className="text-lg font-medium mb-3">Daftar Isi</h2>
            <nav className="space-y-1">
              <a href="#basic-props" className="block px-3 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded">Basic Props</a>
              <a href="#children-props" className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">Children Props</a>
              <a href="#generic-components" className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">Generic Components</a>
              <a href="#discriminated-unions" className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">Discriminated Unions</a>
              <a href="#best-practices" className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">Best Practices</a>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-4 space-y-12">
          {/* Section 1: Basic Props */}
          <section id="basic-props" className="scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4">Basic Props dengan TypeScript</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              TypeScript memungkinkan kita mendefinisikan tipe data untuk props komponen React, yang memberikan keamanan tipe
              dan autocomplete yang lebih baik.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Contoh Penggunaan</h3>
                <div className="space-y-3">
                  <Button 
                    label="Tombol Primary" 
                    primary 
                    onClick={() => setCount(count + 1)} 
                  />
                  <div className="mt-2" />
                  <Button 
                    label="Tombol Secondary" 
                    onClick={() => setCount(count - 1)} 
                  />
                  <div className="mt-2" />
                  <Button 
                    label="Tombol Besar" 
                    primary 
                    size="large" 
                    onClick={() => setCount(0)} 
                  />
                  <div className="mt-2" />
                  <Button 
                    label="Tombol Disabled" 
                    primary 
                    disabled 
                    onClick={() => alert('Tidak akan dipanggil')} 
                  />
                  <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                    <p className="font-medium">Counter: {count}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Kode</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-auto max-h-96">
                  <pre>{`type ButtonProps = {
  label: string;
  primary?: boolean;
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

function Button({ 
  label, 
  primary = false, 
  onClick, 
  size = 'medium', 
  disabled = false 
}: ButtonProps) {
  // implementasi komponen
  return (
    <button
      className={/* styling classes */}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}`}</pre>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">
                <FiCode className="inline mr-2" /> Poin Kunci
              </h3>
              <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-300">
                <li>Gunakan <strong>type</strong> atau <strong>interface</strong> untuk mendefinisikan bentuk props</li>
                <li>Tanda <strong>?</strong> menunjukkan prop yang opsional</li>
                <li>Berikan nilai default untuk prop opsional dalam parameter fungsi</li>
                <li>Gunakan literal union types (<code>&apos;small&apos; | &apos;medium&apos; | &apos;large&apos;</code>) untuk membatasi nilai yang valid</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Children Props */}
          <section id="children-props" className="scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4">Komponen dengan Children Props</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Saat membuat komponen yang menampung elemen anak (children), TypeScript membantu mendefinisikan
              tipe yang tepat untuk children dan prop lainnya.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Contoh Penggunaan</h3>
                <Card 
                  title="Contoh Card Component" 
                  footer={<div className="flex justify-end"><Button label="OK" onClick={() => {}} size="small" /></div>}
                >
                  <p className="text-gray-600 dark:text-gray-300">
                    Ini adalah contoh konten yang bisa berupa JSX apapun, termasuk teks, komponen, atau elemen HTML.
                  </p>
                  <div className="mt-3">
                    <Button label="Lihat Detail" primary onClick={() => {}} size="small" />
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Kode</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-auto max-h-96">
                  <pre>{`type CardProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

function Card({ 
  title, 
  children, 
  footer, 
  className = "" 
}: CardProps) {
  return (
    <div className={/* styling */}>
      <div className="header">
        <h3>{title}</h3>
      </div>
      <div className="content">
        {children}
      </div>
      {footer && (
        <div className="footer">
          {footer}
        </div>
      )}
    </div>
  );
}`}</pre>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">
                <FiCode className="inline mr-2" /> Poin Kunci
              </h3>
              <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-300">
                <li>Gunakan <strong>React.ReactNode</strong> untuk children yang bisa berupa JSX apapun</li>
                <li>Manfaatkan conditional rendering untuk prop opsional seperti footer</li>
                <li>Prop className biasanya memiliki nilai default untuk memudahkan penggunaan</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Generic Components */}
          <section id="generic-components" className="scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4">Generic Components</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Generic components memungkinkan kita membuat komponen yang fleksibel terhadap berbagai tipe data
              tetapi tetap menjaga keamanan tipe.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Contoh Penggunaan</h3>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h4 className="font-medium mb-3">Daftar Pengguna</h4>
                  <List
                    items={users}
                    keyExtractor={(user) => user.id}
                    renderItem={(user) => (
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <Button 
                          label="Lihat" 
                          size="small" 
                          onClick={() => alert(`Melihat detail ${user.name}`)}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Kode</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-auto max-h-96">
                  <pre>{`type ListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  emptyMessage?: string;
};

function List<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  emptyMessage = "Tidak ada item" 
}: ListProps<T>) {
  if (items.length === 0) {
    return <p>{emptyMessage}</p>;
  }
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Contoh penggunaan:
<List
  items={users}
  keyExtractor={(user) => user.id}
  renderItem={(user) => (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  )}
/>`}</pre>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">
                <FiCode className="inline mr-2" /> Poin Kunci
              </h3>
              <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-300">
                <li>Gunakan type parameter <strong>&lt;T&gt;</strong> untuk membuat komponen generic</li>
                <li>Tipe parameter disediakan implisit saat komponen digunakan</li>
                <li>Pattern ini sangat berguna untuk komponen daftar, tabel, atau seleksi</li>
                <li>Render props pattern dengan typings yang kuat meningkatkan fleksibilitas dan keamanan tipe</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Discriminated Unions */}
          <section id="discriminated-unions" className="scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4">Discriminated Unions untuk Props</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Discriminated unions memungkinkan komponen menangani berbagai jenis prop yang berbeda dengan cara yang type-safe.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Contoh Penggunaan</h3>
                <div className="space-y-4">
                  <div>
                    <Button 
                      label="Tampilkan Sukses" 
                      primary 
                      onClick={() => setShowMessage('success')} 
                      size="small"
                    />
                    <Button 
                      label="Tampilkan Error" 
                      onClick={() => setShowMessage('error')} 
                      size="small"
                      className="ml-2"
                    />
                  </div>
                  
                  {showMessage === 'success' && (
                    <Message
                      type="success"
                      message="Data berhasil disimpan!"
                      details="Perubahan akan terlihat dalam beberapa saat."
                    />
                  )}
                  
                  {showMessage === 'error' && (
                    <Message
                      type="error"
                      message="Gagal menyimpan data"
                      code="ERR_NETWORK_FAIL"
                      retry={() => setShowMessage('success')}
                    />
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Kode</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-auto max-h-96">
                  <pre>{`type SuccessMessageProps = {
  type: 'success';
  message: string;
  details?: string;
};

type ErrorMessageProps = {
  type: 'error';
  message: string;
  code: string;
  retry?: () => void;
};

type MessageProps = SuccessMessageProps | ErrorMessageProps;

function Message(props: MessageProps) {
  if (props.type === 'success') {
    return (
      <div className="success-message">
        <h4>{props.message}</h4>
        {props.details && <p>{props.details}</p>}
      </div>
    );
  } else {
    return (
      <div className="error-message">
        <h4>{props.message}</h4>
        <p>Kode Error: {props.code}</p>
        {props.retry && (
          <button onClick={props.retry}>
            Coba lagi
          </button>
        )}
      </div>
    );
  }
}`}</pre>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">
                <FiCode className="inline mr-2" /> Poin Kunci
              </h3>
              <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-300">
                <li>Gunakan properti diskriminator (misal: <code>type</code>) untuk membedakan varian props</li>
                <li>TypeScript akan menyempitkan tipe sesuai dengan nilai properti diskriminator</li>
                <li>Ideal untuk komponen yang memiliki beberapa mode atau tampilan berbeda</li>
                <li>Properti berbeda bisa tersedia tergantung pada varian yang dipilih</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Best Practices */}
          <section id="best-practices" className="scroll-mt-8">
            <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Berikut beberapa praktik terbaik saat menggunakan TypeScript dengan komponen React di Next.js.
            </p>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-medium mb-4">Panduan Typed Components</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">1. Type vs Interface</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Gunakan <code>type</code> untuk props komponen jika Anda memerlukan union atau intersection types.
                    Gunakan <code>interface</code> jika Anda membutuhkan inheritance atau memperluas definisi tipe.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">2. Ekstrak Tipe yang Digunakan Berulang</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Kelompokkan tipe yang digunakan di banyak komponen ke dalam file terpisah (misalnya <code>types.ts</code>).
                    Ini meningkatkan reusabilitas dan konsistensi.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">3. Dokumentasikan Props</h4>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-2 text-sm font-mono overflow-auto">
                    <pre>{`/** 
 * Komponen Button yang dapat dikustomisasi
 * @param label - Teks yang ditampilkan pada button
 * @param primary - Jika true, menerapkan styling primary
 * @param size - Ukuran button: 'small', 'medium', atau 'large'
 * @param onClick - Handler yang dipanggil saat button diklik
 */
type ButtonProps = {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick: () => void;
};`}</pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">4. Default Props vs Parameter Default</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Gunakan parameter default dalam destructuring parameter daripada defaultProps untuk
                    nilai default yang lebih jelas dan type-safe.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">5. Hindari any</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Hindari penggunaan <code>any</code>. Jika Anda tidak mengetahui tipe yang tepat, gunakan <code>unknown</code> dan lakukan type narrowing saat diperlukan.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">6. Function Component vs Arrow Function</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm font-mono overflow-auto">
                      <pre>{`// Function declaration dengan tipe yang eksplisit
function Button(props: ButtonProps): JSX.Element {
  // ...implementation
}`}</pre>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm font-mono overflow-auto">
                      <pre>{`// Arrow function dengan tipe yang eksplisit
const Button: React.FC<ButtonProps> = (props) => {
  // ...implementation
};`}</pre>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Function declaration biasanya lebih direkomendasikan karena tidak memaksa children 
                    menjadi opsional seperti yang terjadi dengan React.FC.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 