import { createContext, type ReactNode, useContext } from "react";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const BlogContext = createContext<BlogPost[] | undefined>(undefined);

const posts: BlogPost[] = [
  {
    id: "1",
    title: "Welcome to Bob's Blog",
    content: "This is the first post on Bob's blog",
    author: "Bob Bobskin",
    createdAt: "2025-06-01",
  },
  {
    id: "2",
    title: "React Router Tips",
    content: "In this post, Bob explores useful React Router tips.",
    author: "Bob Bobskin",
    createdAt: "2025-06-10",
  },
  {
    id: "3",
    title: "Understanding Context API",
    content: "He's going to dive deep into React's Context API.",
    author: "Bob Bobskin",
    createdAt: "2025-06-15",
  },
];

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  return <BlogContext.Provider value={posts}>{children}</BlogContext.Provider>;
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlog must be used within BlogProvider");
  return context;
};