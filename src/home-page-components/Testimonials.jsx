import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Testimonial.css';
import { Link } from 'react-router-dom';
// In any component or file
const apiUrl = import.meta.env.VITE_API_URL;



const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [sectionData, setSectionData] = useState(null);
  const [sectionLoading, setSectionLoading] = useState(true);
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
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/testimonial-section-api`);
        if (res.data.success && res.data.data) {
          setSectionData(res.data.data); // Assuming it's a single object, not an array
        } else {
          console.warn('No testimonial section data found');
        }
      } catch (error) {
        console.error('Error fetching testimonial section data:', error);
      } finally {
        setSectionLoading(false);
      }
    };

    fetchSectionData();
  }, []);

  if (loading || sectionLoading) return <div>Loading testimonials...</div>;

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
      {sectionData.map((section, index) => (
            <div className="testimonials-heading">
          <h5>{section?.title || 'TESTIMONIALS'}</h5>
          <h2>{section?.title2 || "From startups to established brands, you'll be in good company."}</h2>
        </div>
      ))}

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
                            src={`${apiUrl}/static/testimonial/${item.author_image}`}
                            alt={item.author_name}
                          />
                        </div>
                        <div className="owl-testimonials-bottom-text">
                          <h4>
                            <Link to={item.link || '/'}>{item.author_name}</Link>
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
