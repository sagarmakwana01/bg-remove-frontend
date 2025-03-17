import React from 'react'
import './blogDetailes.js'
import './blog_details.css'
import Banner from '../../components/Banner.jsx'
import BlogContent from '../../components/BlogContent.jsx'
import BlogDetailsComments from '../../components/BlogDetailsComments.jsx'
import LeaveAComment from '../../components/LeaveAComment.jsx'

const BlogDetails = () => {
  return (
    <>
      <Banner />
      <BlogContent />
      <BlogDetailsComments />
      <LeaveAComment />
    </>
  )
}

export default BlogDetails