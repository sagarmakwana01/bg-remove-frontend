import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For API calls
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const WhyChooseUsSecond = () => {
  const [whyChoose2Data, setwhyChoose2Data] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(null); // Track the active slide

  const [whyChooseSections2, setWhyChooseSections2] = useState([]); // Holds the "Why Choose First Section" data
    const [sectionsLoading2, setSectionsLoading2] = useState(true);

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

    // Fetch "Why Choose First Section" data from API
    useEffect(() => {
      const fetchWhyChooseSections2 = async () => {
        try {
          const res = await axios.get(`${apiUrl}/get-why-choose-second-section-api`);
          if (res.data.success && Array.isArray(res.data.data)) {
            setWhyChooseSections2(res.data.data);
          } else {
            console.warn('No section data found');
          }
        } catch (error) {
          console.error('Error fetching section data:', error);
        } finally {
          setSectionsLoading2(false);
        }
      };
  
      fetchWhyChooseSections2();
    }, []);
  
    if (loading || sectionsLoading2) return <div>Loading...</div>;


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
      {whyChooseSections2.length > 0 ? (
          whyChooseSections2.map((section, index) => (
            <div key={index} className="why-choose-us-heading">
              <h5>{section.title}</h5>
              <h2>{section.title2}</h2>
              <p>
                {section.content}
              </p>
            </div>
          ))
        ) : (
          <div>No sections available</div>
        )}
        <div className="expand-container">
          {whyChoose2Data.map((slide, index) => (
            <div
              key={index}
              className={`slide ${activeSlideIndex === index ? 'active' : ''}`} // Dynamically add 'active' class
              onMouseOver={() => handleMouseOver(index)} // Handle mouse over event
            >
              <img
                className="expand-slide-img"
                src={`${apiUrl}/static/why-choose-us/${slide.imageUrl}`}
                alt=""
              />
              <div className="expand-slide-ic-box">
                <div className="expand-slide-ic-box-items">
                  <img src="img/why-icon-01.png" alt="Image" />
                  <h2>
                    <Link to={slide.link}>{slide.linkName}</Link>
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
