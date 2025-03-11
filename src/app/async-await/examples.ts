// src/app/async-await/examples.ts

// ===== BASIC TYPES FOR EXAMPLES =====

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// ===== BASIC PROMISE =====

// Membuat Promise sederhana
export function fetchUserData(userId: number): Promise<User> {
  return new Promise((resolve, reject) => {
    // Simulasi network request
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`
        });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}

// ===== PROMISE CHAINING =====

// Menggunakan Promise chaining
export function fetchUserPosts(userId: number): Promise<Post[]> {
  return fetchUserData(userId)
    .then(user => {
      // Simulasi fetch posts
      return [
        {
          id: 1,
          title: `Post 1 by ${user.name}`,
          content: "This is the first post content",
          userId: user.id
        },
        {
          id: 2,
          title: `Post 2 by ${user.name}`,
          content: "This is the second post content",
          userId: user.id
        }
      ];
    });
}

// ===== PROMISE.ALL =====

// Menggunakan Promise.all untuk concurrent requests
export function fetchPostWithComments(postId: number): Promise<{ post: Post; comments: Comment[] }> {
  const fetchPost = new Promise<Post>((resolve) => {
    setTimeout(() => {
      resolve({
        id: postId,
        title: `Post ${postId}`,
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
}

// ===== PROMISE.RACE =====

// Menggunakan Promise.race untuk timeout
export function fetchWithTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeout}ms`));
    }, timeout);
  });

  return Promise.race([promise, timeoutPromise]);
}

// ===== ASYNC/AWAIT BASIC =====

// Menggunakan async/await
export async function getUserData(userId: number): Promise<User> {
  try {
    const user = await fetchUserData(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

// ===== ASYNC/AWAIT WITH MULTIPLE PROMISES =====

// Menggunakan async/await dengan multiple promises
export async function getUserWithPosts(userId: number): Promise<{ user: User; posts: Post[] }> {
  try {
    const user = await fetchUserData(userId);
    const posts = await fetchUserPosts(userId);
    return { user, posts };
  } catch (error) {
    console.error("Error fetching user with posts:", error);
    throw error;
  }
}

// ===== ASYNC/AWAIT WITH PROMISE.ALL =====

// Menggunakan async/await dengan Promise.all
export async function getUsersWithPosts(userIds: number[]): Promise<Array<{ user: User; posts: Post[] }>> {
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
}

// ===== ERROR HANDLING =====

// Error handling dengan async/await
export async function fetchDataWithErrorHandling(userId: number): Promise<User> {
  try {
    const user = await fetchUserData(userId);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error message: ${error.message}`);
    } else {
      console.error("Unknown error occurred");
    }
    throw new Error("Failed to fetch user data");
  } finally {
    console.log("Fetch operation completed");
  }
}

// ===== ASYNC ITERATION =====

// Async iteration
export async function processUsersSequentially(userIds: number[]): Promise<User[]> {
  const users: User[] = [];
  
  for (const id of userIds) {
    try {
      const user = await fetchUserData(id);
      users.push(user);
      console.log(`Processed user: ${user.name}`);
    } catch (error) {
      console.error(`Error processing user ID ${id}:`, error);
    }
  }
  
  return users;
}

// ===== ASYNC FUNCTION RETURNING VOID =====

// Async function returning void
export async function logUserData(userId: number): Promise<void> {
  try {
    const user = await fetchUserData(userId);
    console.log(`User data: ${JSON.stringify(user)}`);
  } catch (error) {
    console.error("Error logging user data:", error);
  }
}

// ===== ASYNC IIFE (Immediately Invoked Function Expression) =====

// Async IIFE
export const initializeApp = (async () => {
  try {
    const user = await fetchUserData(1);
    console.log(`App initialized with user: ${user.name}`);
    return { initialized: true, user };
  } catch (error) {
    console.error("Failed to initialize app:", error);
    return { initialized: false, error };
  }
})();

// ===== TYPED PROMISE CREATION =====

// Typed Promise creation
export function createTypedPromise<T>(value: T, delay: number, shouldReject = false): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (!shouldReject) {
        resolve(value);
      } else {
        reject(new Error("Promise rejected"));
      }
    }, delay);
  });
}

// ===== ASYNC GENERATORS =====

// Async generator function
export async function* generateUserIds(start: number, count: number): AsyncGenerator<number> {
  for (let i = 0; i < count; i++) {
    // Simulate some async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    yield start + i;
  }
}

// Using async generator
export async function processUserIdsWithGenerator(): Promise<number[]> {
  const ids: number[] = [];
  const generator = generateUserIds(1, 5);
  
  for await (const id of generator) {
    ids.push(id);
    console.log(`Generated ID: ${id}`);
  }
  
  return ids;
}

// ===== CANCELLABLE PROMISES WITH ABORTCONTROLLER =====

// Cancellable fetch with AbortController
export function fetchUserWithAbort(userId: number, abortSignal: AbortSignal): Promise<User> {
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
          name: `User ${userId}`,
          email: `user${userId}@example.com`
        });
      }
    }, 2000);
    
    // Clean up timeout if aborted
    abortSignal.addEventListener('abort', () => {
      clearTimeout(timeoutId);
    });
  });
}

// Example of using AbortController
export function demonstrateAbortController(): { 
  promise: Promise<User | string>;
  abort: () => void;
} {
  const controller = new AbortController();
  const signal = controller.signal;
  
  const promise = fetchUserWithAbort(1, signal)
    .then(user => `Fetched user: ${user.name}`)
    .catch(error => `Error: ${error.message}`);
  
  return {
    promise,
    abort: () => controller.abort()
  };
} 