import React from 'react';
import { Link } from 'react-router-dom';
const LatestNews = () => {
  return (
    <section className="latest-news">
      <div className="container w-1240">
        <div className="latest-news-heading">
          <h5>Latest News?</h5>
          <h2>Our Article And Resources</h2>
        </div>

        <div className="row">
          {/* News Item 1 */}
          <div className="col-lg-4 col-md-6">
            <div className="latest-news-items">
              <div className="latest-news-items-img">
                <img src="img/GP-166-Temporary-cover.png" alt="image" />
              </div>
              <div className="latest-news-items-center">
                <div className="latest-news-center-left">
                  <div className="latest-news-center-admin">
                    <img src="img/speakers5-1.png" alt="image" />
                    <h4><a href="#">Admin</a></h4>
                  </div>
                  <div className="latest-news-center-comment">
                    <img src="img/comment.png" alt="comment" />
                    <p>0 Comments</p>
                  </div>
                </div>
                <div className="latest-news-center-right">
                  <div className="latest-news-center-right-card">
                    <span>28</span>
                    <span> Jan </span>
                  </div>
                </div>
              </div>
              <div className="latest-news-items-bottom">
                <h4><a href="#">What’s New In Removal.AI?</a></h4>
                <p>The arrival of a new year always encourages a time for fresh starts, renewed goals, and
                  bold aspirations.…</p>
                <a href="#">Read More <img src="img/chevron-double-right.png" alt="" /></a>
              </div>
            </div>
          </div>

          {/* News Item 2 */}
          <div className="col-lg-4 col-md-6">
            <div className="latest-news-items">
              <div className="latest-news-items-img">
                <img src="img/GP-166-Temporary-cover.png" alt="image" />
              </div>
              <div className="latest-news-items-center">
                <div className="latest-news-center-left">
                  <div className="latest-news-center-admin">
                    <img src="img/speakers5-1.png" alt="image" />
                    <h4><a href="#">Admin</a></h4>
                  </div>
                  <div className="latest-news-center-comment">
                    <img src="img/comment.png" alt="comment" />
                    <p>0 Comments</p>
                  </div>
                </div>
                <div className="latest-news-center-right">
                  <div className="latest-news-center-right-card">
                    <span>28</span>
                    <span> Jan </span>
                  </div>
                </div>
              </div>
              <div className="latest-news-items-bottom">
                <h4><a href="#">What’s New In Removal.AI?</a></h4>
                <p>The arrival of a new year always encourages a time for fresh starts, renewed goals, and
                  bold aspirations.…</p>
                <a href="#">Read More <img src="img/chevron-double-right.png" alt="" /></a>
              </div>
            </div>
          </div>

          {/* News Item 3 */}
          <div className="col-lg-4 col-md-6">
            <div className="latest-news-items">
              <div className="latest-news-items-img">
                <img src="img/GP-166-Temporary-cover.png" alt="image" />
              </div>
              <div className="latest-news-items-center">
                <div className="latest-news-center-left">
                  <div className="latest-news-center-admin">
                    <img src="img/speakers5-1.png" alt="image" />
                    <h4><a href="#">Admin</a></h4>
                  </div>
                  <div className="latest-news-center-comment">
                    <img src="img/comment.png" alt="comment" />
                    <p>0 Comments</p>
                  </div>
                </div>
                <div className="latest-news-center-right">
                  <div className="latest-news-center-right-card">
                    <span>28</span>
                    <span> Jan </span>
                  </div>
                </div>
              </div>
              <div className="latest-news-items-bottom">
                <h4><a href="#">What’s New In Removal.AI?</a></h4>
                <p>The arrival of a new year always encourages a time for fresh starts, renewed goals, and
                  bold aspirations.…</p>
                <a href="#">Read More <img src="img/chevron-double-right.png" alt="" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="latest-news-btn">
          <Link to="/blog">Our Blog <img src="img/chevron-double-right.png" alt="" /></Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
