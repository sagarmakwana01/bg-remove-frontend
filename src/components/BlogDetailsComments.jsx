// BlogDetailsComments.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BlogDetailsComments = ({comments}) => {
  return (
    <section className="blog-details-comments">
      <div className="container w-1240">
        <div className="blog-details-comments-items">
          <div className="blog-details-comments-items-img">
            <img src="/img/comment-img.png" alt="comment-img" />
          </div>
          <div className="blog-details-comments-content">
            <div className="blog-details-comments-content-top">
              <div className="blog-details-comments-content-top-title">
                <h5><Link to="/">Valeria</Link></h5>
                <p>NOV 3, 2021</p>
              </div>
              <div className="blog-details-comments-content-top-right">
                <img src="/img/comment-icon.png" alt="comment" />
                <span>Reply</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="blog-details-comments-items">
          <div className="blog-details-comments-items-img">
            <img src="/img/comment-img.png" alt="comment-img" />
          </div>
          <div className="blog-details-comments-content">
            <div className="blog-details-comments-content-top">
              <div className="blog-details-comments-content-top-title">
                <h5><Link to="#">Valeria</Link></h5>
                <p>NOV 3, 2021</p>
              </div>
              <div className="blog-details-comments-content-top-right">
                <img src="/img/comment-icon.png" alt="comment" />
                <span>Reply</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="blog-details-comments-items">
          <div className="blog-details-comments-items-img">
            <img src="/img/comment-img.png" alt="comment-img" />
          </div>
          <div className="blog-details-comments-content">
            <div className="blog-details-comments-content-top">
              <div className="blog-details-comments-content-top-title">
                <h5><Link to="/">Valeria</Link></h5>
                <p>NOV 3, 2021</p>
              </div>
              <div className="blog-details-comments-content-top-right">
                <img src="/img/comment-icon.png" alt="comment" />
                <span>Reply</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsComments;
