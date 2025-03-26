import React, { useEffect, useState } from 'react';
import './blog.css';
import Banner from '../../components/Banner.jsx';
import LatestNewsCard from '../../components/LatestNewsCard.jsx';

const Blog = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate loading time

    jQuery(".articles-press-portfoliobtn ul li:first-child a").addClass("active-1");
    jQuery(".articles-press-portfoliobtn ul li a").click(function () {
      var value = jQuery(this).attr('data-filter');
  
      if (value == "all") {
        jQuery('.filter').show('1000');
      } else {
        jQuery(".filter").not('.' + value).hide('1000');
        jQuery('.filter').filter('.' + value).show('1000');
      }
  
      jQuery(".articles-press-portfoliobtn ul li a").removeClass("active-1");
      jQuery(this).addClass("active-1");
    });
  
    jQuery(".latest-news .filter").slice(0, 6).addClass('active-1');
    jQuery("#loadMore").on("click", function(e){
      e.preventDefault();
      jQuery(".latest-news .filter:hidden").slice(0, 3).addClass('active-1');
      if(jQuery(".latest-news .filter:hidden").length == 0) {
        jQuery("#loadMore").text("No Content").addClass("d-none");
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="loader-container-blog">
        <div className="loader-blog"></div>
      </div>
    );
  }

  return (
    <>
      <Banner page="Blog" title="Blog" />
      <LatestNewsCard />
    </>
  );
};

export default Blog;
