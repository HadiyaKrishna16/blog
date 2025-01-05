import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

const BlogContext = createContext(null);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const { user } = useUser();
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "The Complete Guide to Modern JavaScript Features",
      excerpt: "Explore the latest JavaScript features including ES6+ syntax, async/await, destructuring, and more. Learn how to write cleaner, more efficient code with modern JavaScript.",
      author: {
        name: "Sarah Wilson",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson&background=6366f1&color=fff",
        role: "Senior JavaScript Developer",
        bio: "JavaScript enthusiast and tech blogger with 8+ years of experience"
      },
      category: "JavaScript",
      tags: ["JavaScript", "ES6", "Web Development"],
      readTime: "8 min read",
      likes: 245,
      views: 1234,
      comments: [
        {
          id: 1,
          author: "Mike Johnson",
          avatar: "https://ui-avatars.com/api/?name=Mike+Johnson",
          content: "This is exactly what I needed! Great explanation of modern JS features.",
          timestamp: new Date("2024-03-20").toISOString(),
          likes: 12
        }
      ],
      imageUrl: "https://miro.medium.com/v2/resize:fit:1400/1*ahpxPO0jLGb9EWrY2qQPhg.jpeg",
      isLiked: false,
      isBookmarked: false,
      createdAt: new Date("2024-03-20").toISOString(),
      updatedAt: new Date("2024-03-20").toISOString()
    },
    {
      id: 2,
      title: "Building Scalable React Applications with Next.js",
      excerpt: "Learn how to leverage Next.js features to build fast, SEO-friendly React applications. Includes practical examples and best practices for production.",
      author: {
        name: "Alex Chen",
        avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=8b5cf6&color=fff",
        role: "Full Stack Developer",
        bio: "Building the web, one component at a time"
      },
      category: "React",
      tags: ["React", "Next.js", "Web Development"],
      readTime: "12 min read",
      likes: 189,
      views: 892,
      comments: [
        {
          id: 1,
          author: "Lisa Park",
          avatar: "https://ui-avatars.com/api/?name=Lisa+Park",
          content: "Great insights on Next.js! The examples are very helpful.",
          timestamp: new Date("2024-03-19").toISOString(),
          likes: 8
        }
      ],
      imageUrl: "https://www.rlogical.com/wp-content/uploads/2023/03/Rlogical-Blog-Images-thumbnail.webp",
      isLiked: false,
      isBookmarked: false,
      createdAt: new Date("2024-03-19").toISOString(),
      updatedAt: new Date("2024-03-19").toISOString()
    },
    {
      id: 3,
      title: "Mastering CSS Grid and Flexbox",
      excerpt: "A comprehensive guide to modern CSS layouts. Learn how to create responsive, dynamic layouts using CSS Grid and Flexbox with practical examples.",
      author: {
        name: "Emma Thompson",
        avatar: "https://ui-avatars.com/api/?name=Emma+Thompson&background=ec4899&color=fff",
        role: "UI/UX Designer",
        bio: "Passionate about creating beautiful, user-friendly interfaces"
      },
      category: "CSS",
      tags: ["CSS", "Web Design", "Responsive Design"],
      readTime: "10 min read",
      likes: 156,
      views: 723,
      comments: [
        {
          id: 1,
          author: "David Kim",
          avatar: "https://ui-avatars.com/api/?name=David+Kim",
          content: "Finally understood CSS Grid! Thanks for the clear explanations.",
          timestamp: new Date("2024-03-18").toISOString(),
          likes: 6
        }
      ],
      imageUrl: "https://ishadeed.com/assets/grid-flex/grid-vs-flex.png",
      isLiked: false,
      isBookmarked: false,
      createdAt: new Date("2024-03-18").toISOString(),
      updatedAt: new Date("2024-03-18").toISOString()
    },
    {
      id: 4,
      title: "TypeScript Best Practices for 2024",
      excerpt: "Discover the latest TypeScript features and best practices. Learn how to write type-safe code and improve your development workflow.",
      author: {
        name: "James Rodriguez",
        avatar: "https://ui-avatars.com/api/?name=James+Rodriguez&background=06b6d4&color=fff",
        role: "TypeScript Expert",
        bio: "TypeScript evangelist and software architect"
      },
      category: "TypeScript",
      tags: ["TypeScript", "JavaScript", "Programming"],
      readTime: "15 min read",
      likes: 203,
      views: 945,
      comments: [
        {
          id: 1,
          author: "Sophie Chen",
          avatar: "https://ui-avatars.com/api/?name=Sophie+Chen",
          content: "These TypeScript tips have really improved my code quality!",
          timestamp: new Date("2024-03-17").toISOString(),
          likes: 15
        }
      ],
      imageUrl: "https://miro.medium.com/v2/resize:fit:1400/1*mn6bOs7s6Qbao15PMNRyOA.png",
      isLiked: false,
      isBookmarked: false,
      createdAt: new Date("2024-03-17").toISOString(),
      updatedAt: new Date("2024-03-17").toISOString()
    },
    {
      id: 5,
      title: "Building RESTful APIs with Node.js and Express",
      excerpt: "Step-by-step guide to creating robust REST APIs using Node.js and Express. Includes authentication, error handling, and best practices.",
      author: {
        name: "Michael Brown",
        avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=84cc16&color=fff",
        role: "Backend Developer",
        bio: "Specializing in Node.js and API development"
      },
      category: "Backend",
      tags: ["Node.js", "Express", "API"],
      readTime: "20 min read",
      likes: 178,
      views: 856,
      comments: [
        {
          id: 1,
          author: "Rachel Lee",
          avatar: "https://ui-avatars.com/api/?name=Rachel+Lee",
          content: "Excellent tutorial on REST APIs! Very comprehensive.",
          timestamp: new Date("2024-03-16").toISOString(),
          likes: 9
        }
      ],
      imageUrl: "https://www.section.io/engineering-education/rest-api-nodejs-express-mongodb/header.png",
      isLiked: false,
      isBookmarked: false,
      createdAt: new Date("2024-03-16").toISOString(),
      updatedAt: new Date("2024-03-16").toISOString()
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'latest',
    searchQuery: ''
  });
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In real app, fetch from API
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const likeBlog = async (blogId) => {
    try {
      setBlogs(blogs.map(blog =>
        blog.id === blogId
          ? {
              ...blog,
              likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1,
              isLiked: !blog.isLiked
            }
          : blog
      ));
      
      toast.success(blogs.find(b => b.id === blogId)?.isLiked 
        ? 'Removed like'
        : 'Added like');
        
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const bookmarkBlog = async (blogId) => {
    try {
      const blog = blogs.find(b => b.id === blogId);
      if (!blog) return;

      if (bookmarks.includes(blogId)) {
        setBookmarks(bookmarks.filter(id => id !== blogId));
        toast.success('Removed from bookmarks');
      } else {
        setBookmarks([...bookmarks, blogId]);
        toast.success('Added to bookmarks');
      }
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  const shareBlog = async (blogId) => {
    const blog = blogs.find(b => b.id === blogId);
    if (blog) {
      try {
        if (navigator.share) {
          await navigator.share({
            title: blog.title,
            text: blog.excerpt,
            url: window.location.origin + '/blog/' + blogId,
          });
          toast.success('Blog shared successfully!', {
            icon: '🎉',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        } else {
          // Fallback for browsers that don't support native sharing
          await navigator.clipboard.writeText(window.location.origin + '/blog/' + blogId);
          toast.success('Link copied to clipboard!', {
            icon: '📋',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        }
      } catch (error) {
        toast.error('Failed to share blog', {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    }
  };

  const addBlog = async (newBlog) => {
    try {
      const blogToAdd = {
        ...newBlog,
        id: Date.now(),
        author: {
          name: user?.fullName || user?.username,
          avatar: user?.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(newBlog.author.name)}`,
          role: "Author",
          bio: user?.publicMetadata?.bio || "Blog author"
        },
        comments: [],
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readingProgress: 0,
        isBookmarked: false
      };

      setBlogs(prevBlogs => [blogToAdd, ...prevBlogs]);
      toast.success('Blog published successfully');
      return blogToAdd;
    } catch (error) {
      toast.error('Failed to publish blog');
      throw error;
    }
  };

  const getFilteredBlogs = () => {
    let filtered = [...blogs];

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(blog => blog.category === filters.category);
    }

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.author.name.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'mostLiked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
    }

    return filtered;
  };

  const addComment = async (blogId, comment) => {
    try {
      const newComment = {
        id: Date.now(),
        author: user?.fullName || user?.username,
        avatar: user?.imageUrl,
        content: comment,
        timestamp: new Date().toISOString(),
        likes: 0
      };

      setBlogs(blogs.map(blog =>
        blog.id === blogId
          ? { ...blog, comments: [...blog.comments, newComment] }
          : blog
      ));

      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const updateReadingProgress = (blogId, progress) => {
    setBlogs(blogs.map(blog =>
      blog.id === blogId
        ? { ...blog, readingProgress: progress }
        : blog
    ));
  };

  const value = {
    blogs: getFilteredBlogs(),
    loading,
    filters,
    setFilters,
    bookmarks,
    likeBlog,
    shareBlog,
    addBlog,
    bookmarkBlog,
    addComment,
    updateReadingProgress
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
}; 
