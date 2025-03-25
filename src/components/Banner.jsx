// BlogBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ title, page }) => {
  return (
    <section className="blog-banner">
      <div className="container w-1240">
        <div className="blog-banner-items">
          <h1>{title}</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>{page}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Banner;
