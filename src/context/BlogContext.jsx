import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const BlogContext = createContext(null);

// Custom hook for using the blog context
export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

// Provider component
export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and how to create your first component. We'll cover components, props, state, and more in this comprehensive guide to React development.",
      author: {
        name: "John Doe",
        avatar: "https://ui-avatars.com/api/?name=John+Doe"
      },
      category: "React",
      readTime: "5 min read",
      likes: 10,
      imageUrl: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F096baapsqqt9fks0us99.png",
      isLiked: false
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      excerpt: "Discover how to build beautiful interfaces with Tailwind CSS. Learn utility-first CSS and create responsive designs efficiently.",
      author: {
        name: "Jane Smith",
        avatar: "https://ui-avatars.com/api/?name=Jane+Smith"
      },
      category: "CSS",
      readTime: "7 min read",
      likes: 15,
      imageUrl: "https://media.licdn.com/dms/image/v2/D4D12AQHw9SjCddUhjQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1715021638881?e=1740614400&v=beta&t=9Ts67Rua8KssmavpVkCZR_OzadJgTH6vdD4hyEVqXMM",
      isLiked: false
    },
    {
      id: 3,
      title: "JavaScript ES6+ Features",
      excerpt: "Explore the modern features of JavaScript ES6 and beyond. Learn about arrow functions, destructuring, async/await, and more.",
      author: {
        name: "Mike Johnson",
        avatar: "https://ui-avatars.com/api/?name=Mike+Johnson"
      },
      category: "JavaScript",
      readTime: "8 min read",
      likes: 20,
      imageUrl: "https://miro.medium.com/v2/resize:fit:1400/1*ahpxPO0jLGb9EWrY2qQPhg.jpeg",
      isLiked: false
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      excerpt: "Build scalable backend applications with Node.js. Learn about Express.js, REST APIs, and database integration.",
      author: {
        name: "Sarah Wilson",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson"
      },
      category: "Backend",  
      readTime: "10 min read",
      likes: 12,
      imageUrl: "https://www.smartsight.in/wp-content/uploads/2021/09/NodeJS-300x175.jpg",
      isLiked: false
    },
    {
      id: 5,
      title: "TypeScript Fundamentals",
      excerpt: "Get started with TypeScript and learn how to add static typing to your JavaScript applications for better development experience.",
      author: {
        name: "Alex Brown",
        avatar: "https://ui-avatars.com/api/?name=Alex+Brown"
      },
      category: "TypeScript",
      readTime: "6 min read",
      likes: 8,
      imageUrl: "https://miro.medium.com/v2/resize:fit:1400/1*mn6bOs7s6Qbao15PMNRyOA.png",
      isLiked: false
    }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchBlogs = async () => {
      setLoading(true);
      // Fetch blogs from an API or other source
      // After fetching, set loading to false
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const likeBlog = (blogId) => {
    setBlogs(blogs.map(blog =>
      blog.id === blogId
        ? {
            ...blog,
            likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1,
            isLiked: !blog.isLiked
          }
        : blog
    ));
  };

  const shareBlog = (blogId) => {
    const blog = blogs.find(b => b.id === blogId);
    if (blog) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.origin + '/blog/' + blogId,
      }).catch(console.error);
    }
  };

  const addBlog = (newBlog) => {
    setBlogs(prevBlogs => [{
      ...newBlog,
      author: {
        name: newBlog.author.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newBlog.author.name)}`
      }
    }, ...prevBlogs]);
  };

  const value = {
    blogs,
    loading,
    likeBlog,
    shareBlog,
    addBlog
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
}; 
