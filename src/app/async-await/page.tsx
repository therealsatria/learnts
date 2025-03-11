import Link from "next/link";
import { useEffect, useState } from "react";
import {
  User,
  Post,
  Comment,
  fetchUserData,
  fetchUserPosts,
  fetchPostWithComments,
  fetchWithTimeout,
  getUserData,
  getUserWithPosts,
  getUsersWithPosts,
  fetchDataWithErrorHandling,
  processUsersSequentially,
  logUserData,
  createTypedPromise,
  processUserIdsWithGenerator,
  demonstrateAbortController
} from "./examples";

export default function AsyncAwaitPage() {
  // State untuk menyimpan hasil contoh
  const [basicPromiseResult, setBasicPromiseResult] = useState<string>("");
  const [chainingResult, setChainingResult] = useState<string>("");
  const [promiseAllResult, setPromiseAllResult] = useState<string>("");
  const [promiseRaceResult, setPromiseRaceResult] = useState<string>("");
  const [asyncAwaitResult, setAsyncAwaitResult] = useState<string>("");
  const [multiplePromisesResult, setMultiplePromisesResult] = useState<string>("");
  const [promiseAllAsyncResult, setPromiseAllAsyncResult] = useState<string>("");
  const [errorHandlingResult, setErrorHandlingResult] = useState<string>("");
  const [asyncIterationResult, setAsyncIterationResult] = useState<string>("");
  const [typedPromiseResult, setTypedPromiseResult] = useState<string>("");
  const [asyncGeneratorResult, setAsyncGeneratorResult] = useState<string>("");
  const [abortControllerResult, setAbortControllerResult] = useState<string>("");

  // Menjalankan contoh-contoh saat komponen dimount
  useEffect(() => {
    // Basic Promise
    fetchUserData(1)
      .then(user => {
        setBasicPromiseResult(JSON.stringify(user, null, 2));
      })
      .catch(error => {
        setBasicPromiseResult(`Error: ${error.message}`);
      });

    // Promise Chaining
    fetchUserPosts(1)
      .then(posts => {
        setChainingResult(JSON.stringify(posts, null, 2));
      })
      .catch(error => {
        setChainingResult(`Error: ${error.message}`);
      });

    // Promise.all
    fetchPostWithComments(1)
      .then(result => {
        setPromiseAllResult(JSON.stringify(result, null, 2));
      })
      .catch(error => {
        setPromiseAllResult(`Error: ${error.message}`);
      });

    // Promise.race
    const slowPromise = new Promise<string>(resolve => {
      setTimeout(() => resolve("Slow operation completed"), 3000);
    });
    
    fetchWithTimeout(slowPromise, 1500)
      .then(result => {
        setPromiseRaceResult(result);
      })
      .catch(error => {
        setPromiseRaceResult(`Error: ${error.message}`);
      });

    // Async/Await Basic
    const fetchAsyncData = async () => {
      try {
        const user = await getUserData(1);
        setAsyncAwaitResult(JSON.stringify(user, null, 2));
      } catch (error) {
        if (error instanceof Error) {
          setAsyncAwaitResult(`Error: ${error.message}`);
        }
      }
    };
    fetchAsyncData();

    // Async/Await with Multiple Promises
    const fetchUserWithPostsData = async () => {
      try {
        const result = await getUserWithPosts(1);
        setMultiplePromisesResult(JSON.stringify(result, null, 2));
      } catch (error) {
        if (error instanceof Error) {
          setMultiplePromisesResult(`Error: ${error.message}`);
        }
      }
    };
    fetchUserWithPostsData();

    // Async/Await with Promise.all
    const fetchMultipleUsers = async () => {
      try {
        const results = await getUsersWithPosts([1, 2]);
        setPromiseAllAsyncResult(JSON.stringify(results, null, 2));
      } catch (error) {
        if (error instanceof Error) {
          setPromiseAllAsyncResult(`Error: ${error.message}`);
        }
      }
    };
    fetchMultipleUsers();

    // Error Handling
    const handleErrors = async () => {
      try {
        const user = await fetchDataWithErrorHandling(1);
        setErrorHandlingResult(JSON.stringify(user, null, 2));
      } catch (error) {
        if (error instanceof Error) {
          setErrorHandlingResult(`Error: ${error.message}`);
        }
      }
    };
    handleErrors();

    // Async Iteration
    const iterateUsers = async () => {
      try {
        const users = await processUsersSequentially([1, 2, 3]);
        setAsyncIterationResult(JSON.stringify(users, null, 2));
      } catch (error) {
        if (error instanceof Error) {
          setAsyncIterationResult(`Error: ${error.message}`);
        }
      }
    };
    iterateUsers();

    // Typed Promise
    const testTypedPromise = async () => {
      try {
        const result = await createTypedPromise("Hello TypeScript", 1000);
        setTypedPromiseResult(result);
      } catch (error) {
        if (error instanceof Error) {
          setTypedPromiseResult(`Error: ${error.message}`);
        }
      }
    };
    testTypedPromise();

    // Async Generator
    const testAsyncGenerator = async () => {
      try {
        const ids = await processUserIdsWithGenerator();
        setAsyncGeneratorResult(JSON.stringify(ids, null, 2));
      } catch (error) {
        if (error instanceof Error) {
          setAsyncGeneratorResult(`Error: ${error.message}`);
        }
      }
    };
    testAsyncGenerator();

    // AbortController
    const { promise, abort } = demonstrateAbortController();
    
    // Abort after 1 second
    setTimeout(() => {
      abort();
    }, 1000);
    
    promise.then(result => {
      setAbortControllerResult(String(result));
    });

  }, []);

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
          <h1 className="text-3xl font-bold">Async/Await & Promises di TypeScript</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          TypeScript menyediakan dukungan penuh untuk pemrograman asinkron dengan Promises dan async/await.
          Ini memungkinkan Anda untuk menulis kode asinkron yang bersih, mudah dibaca, dan dengan tipe yang aman.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Basic Promises</h2>
          
          <CodeExample
            title="Membuat Promise Sederhana"
            description="Membuat Promise yang me-resolve dengan data atau me-reject dengan error."
            code={`function fetchUserData(userId: number): Promise<User> {
  return new Promise((resolve, reject) => {
    // Simulasi network request
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: \`User \${userId}\`,
          email: \`user\${userId}@example.com\`
        });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}`}
            result={basicPromiseResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Promise Chaining</h2>
          
          <CodeExample
            title="Promise Chaining"
            description="Menghubungkan beberapa operasi asinkron secara berurutan."
            code={`function fetchUserPosts(userId: number): Promise<Post[]> {
  return fetchUserData(userId)
    .then(user => {
      // Simulasi fetch posts
      return [
        {
          id: 1,
          title: \`Post 1 by \${user.name}\`,
          content: "This is the first post content",
          userId: user.id
        },
        {
          id: 2,
          title: \`Post 2 by \${user.name}\`,
          content: "This is the second post content",
          userId: user.id
        }
      ];
    });
}`}
            result={chainingResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Promise.all</h2>
          
          <CodeExample
            title="Promise.all"
            description="Menjalankan beberapa Promise secara paralel dan menunggu semua selesai."
            code={`function fetchPostWithComments(postId: number): Promise<{ post: Post; comments: Comment[] }> {
  const fetchPost = new Promise<Post>((resolve) => {
    setTimeout(() => {
      resolve({
        id: postId,
        title: \`Post \${postId}\`,
        content: "This is the post content",
        userId: 1
      });
    }, 1000);
  });

  const fetchComments = new Promise<Comment[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          postId,
          name: "Comment 1",
          email: "commenter1@example.com",
          body: "This is comment 1"
        },
        {
          id: 2,
          postId,
          name: "Comment 2",
          email: "commenter2@example.com",
          body: "This is comment 2"
        }
      ]);
    }, 1500);
  });

  return Promise.all([fetchPost, fetchComments])
    .then(([post, comments]) => {
      return { post, comments };
    });
}`}
            result={promiseAllResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Promise.race</h2>
          
          <CodeExample
            title="Promise.race"
            description="Mengembalikan Promise pertama yang selesai (resolve atau reject)."
            code={`function fetchWithTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(\`Operation timed out after \${timeout}ms\`));
    }, timeout);
  });

  return Promise.race([promise, timeoutPromise]);
}`}
            result={promiseRaceResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Async/Await Basic</h2>
          
          <CodeExample
            title="Async/Await Dasar"
            description="Menggunakan async/await untuk menulis kode asinkron yang terlihat seperti kode sinkron."
            code={`async function getUserData(userId: number): Promise<User> {
  try {
    const user = await fetchUserData(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}`}
            result={asyncAwaitResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Async/Await dengan Multiple Promises</h2>
          
          <CodeExample
            title="Async/Await dengan Multiple Promises"
            description="Menjalankan beberapa operasi asinkron secara berurutan dengan async/await."
            code={`async function getUserWithPosts(userId: number): Promise<{ user: User; posts: Post[] }> {
  try {
    const user = await fetchUserData(userId);
    const posts = await fetchUserPosts(userId);
    return { user, posts };
  } catch (error) {
    console.error("Error fetching user with posts:", error);
    throw error;
  }
}`}
            result={multiplePromisesResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Async/Await dengan Promise.all</h2>
          
          <CodeExample
            title="Async/Await dengan Promise.all"
            description="Menggabungkan async/await dengan Promise.all untuk konkurensi."
            code={`async function getUsersWithPosts(userIds: number[]): Promise<Array<{ user: User; posts: Post[] }>> {
  try {
    const userPromises = userIds.map(id => fetchUserData(id));
    const users = await Promise.all(userPromises);
    
    const postsPromises = users.map(user => fetchUserPosts(user.id));
    const postsResults = await Promise.all(postsPromises);
    
    return users.map((user, index) => ({
      user,
      posts: postsResults[index]
    }));
  } catch (error) {
    console.error("Error fetching users with posts:", error);
    throw error;
  }
}`}
            result={promiseAllAsyncResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Error Handling</h2>
          
          <CodeExample
            title="Error Handling dengan Async/Await"
            description="Menangani error dalam fungsi async/await dengan try/catch/finally."
            code={`async function fetchDataWithErrorHandling(userId: number): Promise<User> {
  try {
    const user = await fetchUserData(userId);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error(\`Error message: \${error.message}\`);
    } else {
      console.error("Unknown error occurred");
    }
    throw new Error("Failed to fetch user data");
  } finally {
    console.log("Fetch operation completed");
  }
}`}
            result={errorHandlingResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Async Iteration</h2>
          
          <CodeExample
            title="Async Iteration"
            description="Memproses array secara berurutan dengan async/await dalam loop."
            code={`async function processUsersSequentially(userIds: number[]): Promise<User[]> {
  const users: User[] = [];
  
  for (const id of userIds) {
    try {
      const user = await fetchUserData(id);
      users.push(user);
      console.log(\`Processed user: \${user.name}\`);
    } catch (error) {
      console.error(\`Error processing user ID \${id}:\`, error);
    }
  }
  
  return users;
}`}
            result={asyncIterationResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Typed Promises</h2>
          
          <CodeExample
            title="Typed Promise Creation"
            description="Membuat Promise dengan tipe yang eksplisit."
            code={`function createTypedPromise<T>(value: T, delay: number, shouldReject = false): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (!shouldReject) {
        resolve(value);
      } else {
        reject(new Error("Promise rejected"));
      }
    }, delay);
  });
}`}
            result={typedPromiseResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Async Generators</h2>
          
          <CodeExample
            title="Async Generators"
            description="Menggunakan async generators untuk menghasilkan nilai secara asinkron."
            code={`async function* generateUserIds(start: number, count: number): AsyncGenerator<number> {
  for (let i = 0; i < count; i++) {
    // Simulate some async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    yield start + i;
  }
}

async function processUserIdsWithGenerator(): Promise<number[]> {
  const ids: number[] = [];
  const generator = generateUserIds(1, 5);
  
  for await (const id of generator) {
    ids.push(id);
    console.log(\`Generated ID: \${id}\`);
  }
  
  return ids;
}`}
            result={asyncGeneratorResult}
          />
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold mb-6">Cancellable Promises</h2>
          
          <CodeExample
            title="Cancellable Promises dengan AbortController"
            description="Membatalkan operasi asinkron yang sedang berjalan dengan AbortController."
            code={`function fetchUserWithAbort(userId: number, abortSignal: AbortSignal): Promise<User> {
  return new Promise((resolve, reject) => {
    // Setup abort handler
    abortSignal.addEventListener('abort', () => {
      reject(new Error('Fetch aborted'));
    });
    
    // Simulate fetch
    const timeoutId = setTimeout(() => {
      if (!abortSignal.aborted) {
        resolve({
          id: userId,
          name: \`User \${userId}\`,
          email: \`user\${userId}@example.com\`
        });
      }
    }, 2000);
    
    // Clean up timeout if aborted
    abortSignal.addEventListener('abort', () => {
      clearTimeout(timeoutId);
    });
  });
}

function demonstrateAbortController(): { 
  promise: Promise<User | string>;
  abort: () => void;
} {
  const controller = new AbortController();
  const signal = controller.signal;
  
  const promise = fetchUserWithAbort(1, signal)
    .then(user => \`Fetched user: \${user.name}\`)
    .catch(error => \`Error: \${error.message}\`);
  
  return {
    promise,
    abort: () => controller.abort()
  };
}`}
            result={abortControllerResult}
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
          {result || "Loading..."}
        </div>
      </div>
    </section>
  );
} 