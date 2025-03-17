import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For API calls
const apiUrl = import.meta.env.VITE_API_URL;

const WhyChooseUsSecond = () => {
  const [whyChoose2Data, setwhyChoose2Data] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(null); // Track the active slide

  // Fetch header data on component mount
  useEffect(() => {
    const fetchWhyChoose2Data = async () => {
      try {
        const res = await axios.get(`${apiUrl}/why-choose-us-2`); // adjust your backend URL here
        if (res.data.success) {
          setwhyChoose2Data(res.data.data); // Assuming you want the first header
        }
      } catch (err) {
        console.error('Error fetching header data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWhyChoose2Data();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!whyChoose2Data) {
    return <div>No data found</div>;
  }

  // Function to handle mouse over and set active slide
  const handleMouseOver = (index) => {
    setActiveSlideIndex(index); // Set the active slide index
  };

  return (
    <section className="why-choose-us">
      <div className="container w-1240">
        <div className="why-choose-us-heading">
          <h5>WHY CHOOSE US?</h5>
          <h2>Who is it made for?</h2>
          <p>Whether you’re a seasoned photographer, a creative graphic designer, an innovative marketer, or running a dynamic eCommerce store, Removal.AI will seamlessly adapt to your specific needs.</p>
        </div>
        <div className="expand-container">
          {whyChoose2Data.map((slide, index) => (
            <div
              key={index}
              className={`slide ${activeSlideIndex === index ? 'active' : ''}`} // Dynamically add 'active' class
              onMouseOver={() => handleMouseOver(index)} // Handle mouse over event
            >
              <img
                className="expand-slide-img"
                src={`${apiUrl}/why-choose-us/${slide.imageUrl}`}
                alt=""
              />
              <div className="expand-slide-ic-box">
                <div className="expand-slide-ic-box-items">
                  <img src="img/why-icon-01.png" alt="Image" />
                  <h2>
                    <a href={slide.link}>{slide.linkName}</a>
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSecond;
