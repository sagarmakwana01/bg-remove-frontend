// BlogDetails.jsx
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};
const BlogContent = ({blog}) => {
  const [articles, setArticles] = useState([]);
  useEffect(()=>{
    (async()=>{
      const response = await axios.get(`${apiUrl}/getBlog`, {
        params: { skip: 0, take:3, category:'all', selectedCategory : undefined },
      });
      const newArticles = response.data;
      setArticles(newArticles)
    })()
  },[])
  return (
    <section className="blog-details">
      <div className="container w-1240">
        <div className="row">
        <div className="col-lg-8">
            <div className="blog-details-left">
              <div className="blog-details-top">
                <span>{blog.category.name}</span>
                <h1>{blog.title}</h1>
                <ul>
                  <li>
                    <img src="/img/user.png" alt="user" />
                    <span className="active">{blog.author.name}</span>
                  </li>
                  <li>
                    <img src="/img/calender.png" alt="calendar" />
                    <span>{ formatDate(blog.created_at)}</span>
                  </li>
                  <li>
                    <img src="/img/comment.png" alt="comment" />
                    <span>{blog.comments.length} comments</span>
                  </li>
                </ul>
              </div>
              <div className="blog-details-bottom">
                <div className="blog-details-bottom-img">
                  <img src={`${apiUrl}${blog.thumbnail}`} alt="blog" />
                </div>
                <div className="blog-details-bottom-text">
                  <p dangerouslySetInnerHTML={{__html:blog.content}}></p>
                </div>
              </div>
              <div className="blog-details-share">
                <h4>Share</h4>
                <ul>
                  <li><Link to="/"><img src="/img/bg-facebook.png" alt="Facebook" /></Link></li>
                  <li><Link to="/"><img src="/img/bg-twiter.png" alt="Twitter" /></Link></li>
                  <li><Link to="/"><img src="/img/bg-instgram.png" alt="Instagram" /></Link></li>
                  <li><Link to="/"><img src="/img/bg-youtube.png" alt="YouTube" /></Link></li>
                  <li><Link to="/"><img src="/img/bg-email.png" alt="Email" /></Link></li>
                </ul>
              </div>
            </div>
        </div>
          <div className="col-lg-4 col-md-6">
            <div className="blog-details-right">
              <div className="blog-details-latest-title">
                <h2>LATEST POSTS</h2>
              </div>
              <div className="blog-details-latest-card">
                {
                    articles.map((article, index)=>{
                      return  <div key={index} className="blog-details-latest-card-col">
                      <div className="blog-details-latest-card-left">
                        <img src={`${apiUrl}${article.thumbnail}`} alt="blog" />
                      </div>
                      <div className="blog-details-latest-card-right">
                        <h3><Link to={`/blog/${article.id}`}>{article.title}</Link></h3>
                        <ul>
                          <li>
                            <img src="/img/calender.png" alt="calendar" />
                            <span>{formatDate(article.created_at)}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogContent;
