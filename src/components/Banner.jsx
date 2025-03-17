// BlogBanner.jsx
import React from 'react';

const Banner = () => {
  return (
    <section className="blog-banner">
      <div className="container w-1240">
        <div className="blog-banner-items">
          <h1>Blog Page</h1>
          <ul>
            <li><a href="#">Home /</a></li>
            <li> About Us</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Banner;
