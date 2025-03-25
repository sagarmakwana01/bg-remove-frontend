import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};
const LatestNews = () => {
  const [articles, setArticles] = useState([]);
  const [newsSectionData, setNewsSectionData] = useState([]);
  useEffect(()=>{
    (async()=>{
      const response = await axios.get(`${apiUrl}/getBlog`, {
        params: { skip: 0, take:3, category:'all', selectedCategory : undefined },
      });
      const newArticles = response.data;
    
      setArticles(newArticles)
    })()
  },[])

   // Fetch heading section data from /news-section-api
   useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${apiUrl}/news-section-api`);
        if (response.data.success && Array.isArray(response.data.data)) {
          setNewsSectionData(response.data.data);
        } else {
          console.warn('No news section data found');
        }
      } catch (error) {
        console.error('Error fetching news section data:', error);
      }
    })();
  }, []);

  return (
    <section className="latest-news">
      <div className="container w-1240">
          {/* Heading Section Loop */}
        {newsSectionData.length > 0 ? (
          newsSectionData.map((item, index) => (
            <div className="latest-news-heading" key={index}>
              <h5>{item.title || 'Latest News?'}</h5>
              <h2>{item.title2 || 'Our Article And Resources'}</h2>
            </div>
          ))
        ) : (
          <div className="latest-news-heading">
            <h5>Latest News?</h5>
            <h2>Our Article And Resources</h2>
          </div>
        )}

        <div className="row">
          {
            articles.map((article)=>{
              return <div className="col-lg-4 col-md-6" key={article.id}>
              <div className="latest-news-items">
                <div className="latest-news-items-img">
                <img src={`${apiUrl}${article.thumbnail}`} alt="Blog Thumbnail" />
                </div>
                <div className="latest-news-items-center">
                  <div className="latest-news-center-left">
                    <div className="latest-news-center-admin">
                      <img src="img/speakers5-1.png" alt="image" />
                      <h4><Link to="/">{article.author?.name || 'Admin'}</Link></h4>
                    </div>
                    <div className="latest-news-center-comment">
                      <img src="img/comment.png" alt="comment" />
                      <p>{article.comments?.length || 0} Comments</p>
                    </div>
                  </div>
                  <div className="latest-news-center-right">
                    <div className="latest-news-center-right-card">
                    <span>{formatDate(article.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="latest-news-items-bottom">
                    <h4><Link to="/">{article.title}</Link></h4>
                    <div dangerouslySetInnerHTML={{__html: article.content.substring(0,130)}}></div>
                    <Link to={`/blog/${article.id}`}>Read More <img src="img/chevron-double-right.png" alt="Read More" /></Link>

                  </div>
              </div>
            </div>
            })
          }

        </div>

        <div className="latest-news-btn">
          <Link to="/blog">Our Blog <img src="img/chevron-double-right.png" alt="" /></Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
