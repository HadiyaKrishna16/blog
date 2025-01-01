import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from './BlogContext';

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs, likeBlog, shareBlog } = useBlog();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div>
        <p>Blog not found.</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>Back to Blogs</button>
      <h1>{blog.title}</h1>
      <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <p>{blog.excerpt}</p>
      <div>
        <strong>Author:</strong> {blog.author.name}
      </div>
      <div>
        <strong>Category:</strong> {blog.category}
      </div>
      <div>
        <strong>Read Time:</strong> {blog.readTime}
      </div>
      <div>
        <strong>Likes:</strong> {blog.likes}
      </div>
      <button onClick={() => likeBlog(blog.id)}>
        {blog.isLiked ? 'Unlike' : 'Like'}
      </button>
      <button onClick={() => shareBlog(blog.id)}>Share</button>
    </div>
  );
};

export default BlogDetails;
