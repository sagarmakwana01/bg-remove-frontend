import React,{useEffect} from 'react'
import './blog.css'
import Banner from '../../components/Banner.jsx'
import LatestNewsCard from '../../components/LatestNewsCard.jsx'

const Blog = () => {
  useEffect(()=>{
    jQuery(".articles-press-portfoliobtn ul li:first-child a").addClass("active-1");
    jQuery(".articles-press-portfoliobtn ul li a").click(function () {
      var value = jQuery(this).attr('data-filter');
  
      if (value == "all") {
        jQuery('.filter').show('1000');
      } else {
        jQuery(".filter").not('.' + value).hide('1000');
        jQuery('.filter').filter('.' + value).show('1000');
      }
  
      // Remove the class from all and add it to the clicked element
      jQuery(".articles-press-portfoliobtn ul li a").removeClass("active-1");
      jQuery(this).addClass("active-1");
    });
      
    // jQuery(".blog-categories-card #all").addClass("blog-active-1");
    // load more js
     jQuery(".latest-news .filter").slice(0, 6).addClass('active-1');
      jQuery("#loadMore").on("click", function(e){
        e.preventDefault();
        jQuery(".latest-news .filter:hidden").slice(0, 3).addClass('active-1');
         if(jQuery(".latest-news .filter:hidden").length == 0) {
           jQuery("#loadMore").text("No Content").addClass("d-none");
         }
      });
  },[])
  return (
   <>
   <Banner page="Blog" title="Blog" />
   <LatestNewsCard />
   </>
  )
}

export default Blog