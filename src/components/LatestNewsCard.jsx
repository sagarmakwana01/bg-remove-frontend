import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const LatestNewsCard = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [skip, setSkip] = useState(0);
  const take = 5;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchBlogs = async (reset = false) => {
    if (loading) return; // Prevent multiple calls
    setLoading(true);

    try {
      const response = await axios.get(`${apiUrl}/getBlog`, {
        params: { skip: reset ? 0 : skip, take, category: selectedCategory !== 'all' ? selectedCategory : undefined },
      });

      const newArticles = response.data;

      if (reset) {
        setArticles(newArticles);
        setSkip(take);
        setHasMore(newArticles.length === take);
      } else {
        setArticles(prev => [...prev, ...newArticles]);
        setSkip(prevSkip => prevSkip + take);
        if (newArticles.length < take) setHasMore(false);
      }

      // Extract unique categories
      const uniqueCategories = [];
      const categoryMap = {};

      [...newArticles, ...articles].forEach(article => {
        if (article.category && article.category.id && !categoryMap[article.category.id]) {
          categoryMap[article.category.id] = true;
          uniqueCategories.push(article.category);
        }
      });

      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(true); // Fetch blogs on first load
  }, [selectedCategory]); // Re-fetch when category changes

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const getFilteredArticles = () => {
    return selectedCategory === 'all' ? articles : articles.filter(article => article.category?.slug === selectedCategory);
  };

  return (
    <section className="latest-news">
      <div className="container w-1240">
        {/* Categories Filter */}
        <div className="articles-press-portfoliobtn">
          <ul>
            <li>
              <a
                className={selectedCategory === 'all' ? 'active-1' : ''}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </a>
            </li>
            {categories.map(category => (
              <li key={category.id}>
                <a
                  className={selectedCategory === category.slug ? 'active-1' : ''}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.categoryName}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Articles List */}
        <div className="articles-press-grid">
          {getFilteredArticles().length === 0 ? (
            <p>No blogs found for this category.</p>
          ) : (
            getFilteredArticles().map((article) => (
              <div key={article.id} className="articles-press-grid-item">
                <div className="latest-news-items">
                  <div className="latest-news-items-img">
                    <img src={`${apiUrl}${article.thumbnail}`} alt="Blog Thumbnail" />
                  </div>
                  <div className="latest-news-items-center">
                    <div className="latest-news-center-left">
                      <div className="latest-news-center-admin">
                        <img src='img/speakers5-1.png' alt="Admin" />
                        <h4><a href="#">{article.author?.name || 'Admin'}</a></h4>
                      </div>
                      <div className="latest-news-center-comment">
                        <img src="img/comment.png" alt="Comments" />
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
                    <div dangerouslySetInnerHTML={{__html: article.content}}></div>
                    <Link to={`/blog/${article.id}`}>Read More <img src="img/chevron-double-right.png" alt="Read More" /></Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="latest-news-btn">
            <button onClick={() => fetchBlogs()} disabled={loading}>
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
        {!hasMore && articles.length > 0 && <p>No more blogs to load.</p>}
      </div>
    </section>
  );
};

export default LatestNewsCard;
