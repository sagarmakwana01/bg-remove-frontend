import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './blogDetailes.js';
import './blog_details.css';
import Banner from '../../components/Banner.jsx';
import BlogContent from '../../components/BlogContent.jsx';
import BlogDetailsComments from '../../components/BlogDetailsComments.jsx';
import LeaveAComment from '../../components/LeaveAComment.jsx';
import { useParams } from "react-router-dom";
import Commentsection from "../../components/Commentsection.jsx"
const apiUrl = import.meta.env.VITE_API_URL;
const BlogDetails = () => {
  const { id } = useParams(); // Get the blog ID from URL
  const [blog, setBlog] = useState(null); // Store blog details
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch blog details by ID using Axios
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blog/${id}`); // Assuming the API is set at '/api/blogs/:id'
        setBlog(response.data.blog);
        setLoading(false); // Data is loaded
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setLoading(false); // Even if there's an error, stop loading
      }
    };

    fetchBlogDetails();
  }, [id]); // Only run when `id` changes

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (!blog) {
    return <div>Blog not found</div>; // Show if blog is not found
  }

  return (
    <>
      <Banner page="Blog" title={blog.title} />
      <BlogContent blog={blog} />
      <Commentsection blogId={id} />
    </>
  );
};

export default BlogDetails;
