import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Testimonial.css';
// In any component or file
const apiUrl = import.meta.env.VITE_API_URL;



const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${apiUrl}/get-testimonial`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setTestimonialData(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <div>Loading testimonials...</div>;
  if (!testimonialData.length) return <div>No testimonials found</div>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex)
  };

  return (
    <section className="testimonials">
      <div className="container w-1240">
        <div className="testimonials-heading">
          <h5>TESTIMONIALS</h5>
          <h2>From startups to established brands, you'll be in good company.</h2>
        </div>

        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {testimonialData.map((item, index) => {
              const centerIndex = currentSlide + 1 >= testimonialData.length
                ? 0
                : currentSlide + 1;

              const isCenter = index === centerIndex;

              return (
                <div className="item" key={index}>
                  <div className={`owl-testimonials-col ${isCenter ? 'center-slide' : ''}`}>
                    <div className="owl-testimonials-items">
                      <div className="owl-testimonials-text">
                        <p>{item.description}</p>
                      </div>
                      <div className="owl-testimonials-bottom">
                        <div className="owl-testimonials-img">
                          <img
                            src={`${apiUrl}/testimonial/${item.author_image}`}
                            alt={item.author_name}
                          />
                        </div>
                        <div className="owl-testimonials-bottom-text">
                          <h4>
                            <a href={item.link || '#'}>{item.author_name}</a>
                          </h4>
                          <p>{item.author_designation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>

          {/* Arrows */}
          <div className="arrow-container">
            <div
              className="custom-arrow"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <img src="img/testimonials-right.png" alt="Prev" />
            </div>
            <div
              className="custom-arrow"
              onClick={() => sliderRef.current.slickNext()}
            >
              <img src="img/testimonials-left.png" alt="Next" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
