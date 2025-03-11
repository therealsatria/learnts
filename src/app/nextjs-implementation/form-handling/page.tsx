"use client";

import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// ==========================================
// BAGIAN 1: FORM SEDERHANA DENGAN REACT HOOK FORM
// ==========================================

// Mendefinisikan tipe untuk form login
type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

// Komponen form login sederhana
function SimpleLoginForm() {
  // Inisialisasi React Hook Form
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormInputs>();

  // State untuk menampilkan hasil submit
  const [formData, setFormData] = useState<LoginFormInputs | null>(null);

  // Handler untuk submit form
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    setFormData(data);
    // Dalam aplikasi nyata, di sini Anda akan mengirim data ke server
  };

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4">Form Login Sederhana</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { 
              required: "Email wajib diisi",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Format email tidak valid"
              }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", { 
              required: "Password wajib diisi",
              minLength: {
                value: 8,
                message: "Password minimal 8 karakter"
              }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            {...register("rememberMe")}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm">Ingat saya</label>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      
      {formData && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <h4 className="font-medium mb-2">Form Data:</h4>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// ==========================================
// BAGIAN 2: FORM VALIDASI DENGAN ZOD
// ==========================================

// Mendefinisikan schema validasi dengan Zod
const registerSchema = z.object({
  name: z.string()
    .min(2, "Nama minimal 2 karakter")
    .max(50, "Nama maksimal 50 karakter"),
  email: z.string()
    .email("Format email tidak valid"),
  password: z.string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus memiliki minimal 1 huruf kapital")
    .regex(/[0-9]/, "Password harus memiliki minimal 1 angka")
    .regex(/[^a-zA-Z0-9]/, "Password harus memiliki minimal 1 karakter khusus"),
  confirmPassword: z.string(),
  age: z.number()
    .min(18, "Usia minimal 18 tahun")
    .max(100, "Usia maksimal 100 tahun"),
  terms: z.boolean()
    .refine(val => val === true, "Anda harus menyetujui syarat dan ketentuan")
}).refine(data => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"]
});

// Mendapatkan tipe dari schema Zod
type RegisterFormInputs = z.infer<typeof registerSchema>;

// Komponen form registrasi dengan validasi Zod
function ZodValidationForm() {
  // Inisialisasi React Hook Form dengan resolver Zod
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    control,
    reset
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: 18,
      terms: false
    }
  });

  // State untuk menampilkan hasil submit
  const [formData, setFormData] = useState<RegisterFormInputs | null>(null);

  // Handler untuk submit form
  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    setFormData(data);
    // Dalam aplikasi nyata, di sini Anda akan mengirim data ke server
  };

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4">Form Registrasi dengan Validasi Zod</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Konfirmasi Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Usia</label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                className="w-full p-2 border rounded"
              />
            )}
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            {...register("terms")}
            className="mr-2"
          />
          <label htmlFor="terms" className="text-sm">Saya menyetujui syarat dan ketentuan</label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
        
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Daftar
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </form>
      
      {formData && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
          <h4 className="font-medium mb-2">Form Data:</h4>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// ==========================================
// BAGIAN 3: FORM MULTI-STEP
// ==========================================

// Mendefinisikan schema validasi untuk setiap step
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Nama depan minimal 2 karakter"),
  lastName: z.string().min(2, "Nama belakang minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().regex(/^\d{10,12}$/, "Nomor telepon harus 10-12 digit angka")
});

const addressSchema = z.object({
  street: z.string().min(5, "Alamat minimal 5 karakter"),
  city: z.string().min(2, "Kota minimal 2 karakter"),
  state: z.string().min(2, "Provinsi minimal 2 karakter"),
  zipCode: z.string().regex(/^\d{5}$/, "Kode pos harus 5 digit angka")
});

const accountSchema = z.object({
  username: z.string()
    .min(4, "Username minimal 4 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh berisi huruf, angka, dan underscore"),
  password: z.string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus memiliki minimal 1 huruf kapital")
    .regex(/[0-9]/, "Password harus memiliki minimal 1 angka"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"]
});

// Menggabungkan semua schema
const multiStepFormSchema = z.object({
  personalInfo: personalInfoSchema,
  address: addressSchema,
  account: accountSchema
});

type MultiStepFormData = z.infer<typeof multiStepFormSchema>;

// Komponen form multi-step
function MultiStepForm() {
  // State untuk melacak step saat ini
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MultiStepFormData>>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    account: {
      username: "",
      password: "",
      confirmPassword: ""
    }
  });
  const [submittedData, setSubmittedData] = useState<MultiStepFormData | null>(null);

  // Form untuk personal info (step 1)
  const {
    register: registerPersonalInfo,
    handleSubmit: handleSubmitPersonalInfo,
    formState: { errors: errorsPersonalInfo }
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData.personalInfo
  });

  // Form untuk address (step 2)
  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    formState: { errors: errorsAddress }
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: formData.address
  });

  // Form untuk account (step 3)
  const {
    register: registerAccount,
    handleSubmit: handleSubmitAccount,
    formState: { errors: errorsAccount }
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: formData.account
  });

  // Handler untuk step 1
  const onSubmitStep1 = (data: any) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: data
    }));
    setCurrentStep(2);
  };

  // Handler untuk step 2
  const onSubmitStep2 = (data: any) => {
    setFormData(prev => ({
      ...prev,
      address: data
    }));
    setCurrentStep(3);
  };

  // Handler untuk step 3 (final)
  const onSubmitStep3 = (data: any) => {
    const completeFormData = {
      ...formData,
      account: data
    } as MultiStepFormData;
    
    setFormData(completeFormData);
    setSubmittedData(completeFormData);
    // Dalam aplikasi nyata, di sini Anda akan mengirim data ke server
  };

  // Handler untuk kembali ke step sebelumnya
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4">Form Multi-Step</h3>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between">
          <div className={`text-sm ${currentStep >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
            Informasi Pribadi
          </div>
          <div className={`text-sm ${currentStep >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
            Alamat
          </div>
          <div className={`text-sm ${currentStep >= 3 ? 'text-blue-500' : 'text-gray-400'}`}>
            Akun
          </div>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step 1: Personal Info */}
      {currentStep === 1 && (
        <form onSubmit={handleSubmitPersonalInfo(onSubmitStep1)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Depan</label>
              <input
                type="text"
                {...registerPersonalInfo("firstName")}
                className="w-full p-2 border rounded"
              />
              {errorsPersonalInfo.firstName && (
                <p className="text-red-500 text-sm mt-1">{errorsPersonalInfo.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nama Belakang</label>
              <input
                type="text"
                {...registerPersonalInfo("lastName")}
                className="w-full p-2 border rounded"
              />
              {errorsPersonalInfo.lastName && (
                <p className="text-red-500 text-sm mt-1">{errorsPersonalInfo.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...registerPersonalInfo("email")}
              className="w-full p-2 border rounded"
            />
            {errorsPersonalInfo.email && (
              <p className="text-red-500 text-sm mt-1">{errorsPersonalInfo.email.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
            <input
              type="tel"
              {...registerPersonalInfo("phone")}
              className="w-full p-2 border rounded"
            />
            {errorsPersonalInfo.phone && (
              <p className="text-red-500 text-sm mt-1">{errorsPersonalInfo.phone.message}</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Selanjutnya
            </button>
          </div>
        </form>
      )}
      
      {/* Step 2: Address */}
      {currentStep === 2 && (
        <form onSubmit={handleSubmitAddress(onSubmitStep2)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Alamat</label>
            <input
              type="text"
              {...registerAddress("street")}
              className="w-full p-2 border rounded"
            />
            {errorsAddress.street && (
              <p className="text-red-500 text-sm mt-1">{errorsAddress.street.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Kota</label>
              <input
                type="text"
                {...registerAddress("city")}
                className="w-full p-2 border rounded"
              />
              {errorsAddress.city && (
                <p className="text-red-500 text-sm mt-1">{errorsAddress.city.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Provinsi</label>
              <input
                type="text"
                {...registerAddress("state")}
                className="w-full p-2 border rounded"
              />
              {errorsAddress.state && (
                <p className="text-red-500 text-sm mt-1">{errorsAddress.state.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Kode Pos</label>
            <input
              type="text"
              {...registerAddress("zipCode")}
              className="w-full p-2 border rounded"
            />
            {errorsAddress.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errorsAddress.zipCode.message}</p>
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Selanjutnya
            </button>
          </div>
        </form>
      )}
      
      {/* Step 3: Account */}
      {currentStep === 3 && (
        <form onSubmit={handleSubmitAccount(onSubmitStep3)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              {...registerAccount("username")}
              className="w-full p-2 border rounded"
            />
            {errorsAccount.username && (
              <p className="text-red-500 text-sm mt-1">{errorsAccount.username.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...registerAccount("password")}
              className="w-full p-2 border rounded"
            />
            {errorsAccount.password && (
              <p className="text-red-500 text-sm mt-1">{errorsAccount.password.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Konfirmasi Password</label>
            <input
              type="password"
              {...registerAccount("confirmPassword")}
              className="w-full p-2 border rounded"
            />
            {errorsAccount.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errorsAccount.confirmPassword.message}</p>
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Selesai
            </button>
          </div>
        </form>
      )}
      
      {/* Submitted Data */}
      {submittedData && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h4 className="font-medium mb-2">Data Terkirim:</h4>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// ==========================================
// HALAMAN UTAMA
// ==========================================

export default function FormHandlingPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Form Handling & Validation dengan TypeScript</h1>
      
      {/* Penjelasan */}
      <section className="mb-8">
        <p className="mb-4">
          Form handling dan validasi adalah aspek penting dalam pengembangan aplikasi web. 
          Dengan TypeScript, kita dapat membuat form yang type-safe dan validasi yang lebih robust.
          Pada modul ini, kita akan mempelajari beberapa teknik form handling dan validasi menggunakan
          React Hook Form dan Zod.
        </p>
      </section>
      
      {/* Form Sederhana */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Form Sederhana dengan React Hook Form</h2>
        <p className="mb-4">
          React Hook Form adalah library yang populer untuk menangani form di React.
          Dengan TypeScript, kita dapat mendefinisikan tipe data untuk input form.
        </p>
        
        <div className="bg-gray-100 p-4 rounded mb-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`
// Mendefinisikan tipe untuk form login
type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

// Inisialisasi React Hook Form
const { 
  register, 
  handleSubmit, 
  formState: { errors } 
} = useForm<LoginFormInputs>();
            `}</code>
          </pre>
        </div>
        
        <SimpleLoginForm />
      </section>
      
      {/* Form dengan Zod */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. Form Validasi dengan Zod</h2>
        <p className="mb-4">
          Zod adalah library validasi schema yang type-safe. Dengan Zod, kita dapat mendefinisikan
          schema validasi yang kompleks dan mengintegrasikannya dengan React Hook Form.
        </p>
        
        <div className="bg-gray-100 p-4 rounded mb-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`
// Mendefinisikan schema validasi dengan Zod
const registerSchema = z.object({
  name: z.string()
    .min(2, "Nama minimal 2 karakter")
    .max(50, "Nama maksimal 50 karakter"),
  email: z.string()
    .email("Format email tidak valid"),
  password: z.string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus memiliki minimal 1 huruf kapital")
    // ...
});

// Mendapatkan tipe dari schema Zod
type RegisterFormInputs = z.infer<typeof registerSchema>;

// Inisialisasi React Hook Form dengan resolver Zod
const { 
  register, 
  handleSubmit, 
  formState: { errors } 
} = useForm<RegisterFormInputs>({
  resolver: zodResolver(registerSchema)
});
            `}</code>
          </pre>
        </div>
        
        <ZodValidationForm />
      </section>
      
      {/* Form Multi-Step */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. Form Multi-Step</h2>
        <p className="mb-4">
          Form multi-step adalah teknik untuk membagi form yang kompleks menjadi beberapa langkah.
          Dengan TypeScript, kita dapat mendefinisikan tipe data untuk setiap langkah dan menggabungkannya.
        </p>
        
        <div className="bg-gray-100 p-4 rounded mb-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`
// Mendefinisikan schema validasi untuk setiap step
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Nama depan minimal 2 karakter"),
  // ...
});

const addressSchema = z.object({
  street: z.string().min(5, "Alamat minimal 5 karakter"),
  // ...
});

// Menggabungkan semua schema
const multiStepFormSchema = z.object({
  personalInfo: personalInfoSchema,
  address: addressSchema,
  account: accountSchema
});

type MultiStepFormData = z.infer<typeof multiStepFormSchema>;
            `}</code>
          </pre>
        </div>
        
        <MultiStepForm />
      </section>
      
      {/* Kesimpulan */}
      <section className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">Kesimpulan</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Form handling dan validasi dengan TypeScript memberikan keuntungan berupa type safety dan
          developer experience yang lebih baik. Dengan menggunakan library seperti React Hook Form dan Zod,
          kita dapat membuat form yang kompleks dengan validasi yang robust.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Beberapa praktik terbaik yang perlu diperhatikan:
        </p>
        <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300">
          <li>Selalu mendefinisikan tipe data untuk input form</li>
          <li>Gunakan schema validasi untuk validasi yang kompleks</li>
          <li>Pisahkan form yang kompleks menjadi beberapa langkah</li>
          <li>Berikan feedback yang jelas kepada pengguna saat validasi gagal</li>
          <li>Gunakan controlled components untuk input yang kompleks</li>
        </ul>
      </section>
    </div>
  );
} 