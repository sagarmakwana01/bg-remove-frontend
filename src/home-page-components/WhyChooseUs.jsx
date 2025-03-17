import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WhyChoose.css';
const apiUrl = import.meta.env.VITE_API_URL;
const WhyChooseUs = () => {
  const [tabs, setTabs] = useState([]); // Holds the fetched tab data
  const [activeTab, setActiveTab] = useState(''); // Holds the current active tab name
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from API
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const res = await axios.get(`${apiUrl}/get-why-choose-first-api`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setTabs(res.data.data);
          if (res.data.data.length > 0) {
            setActiveTab(res.data.data[0].tabName.toLowerCase()); // Set first tab as active by default
          }
        }
      } catch (error) {
        console.error('Error fetching tab data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTabs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!tabs.length) return <div>No tabs available</div>;

  // Handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName.toLowerCase());
  };

  return (
    <section className="why-choose-us">
      <div className="container w-1240">
        <div className="why-choose-us-heading">
          <h5>WHY CHOOSE US?</h5>
          <h2>Amazing image quality for various scenarios</h2>
          <p>
            Create designs with our background remover tool. Turn your images into art, stunning banners,
            visual presentations, product catalog, and graphics—fully customizable for your needs.
          </p>
        </div>

        {/* Tab Menu */}
        <div className="why-choose-d-tab-wrapper">
          <div className="why-choose-tab-menu">
            <ul>
              {tabs.map((tab, index) => (
                <li key={index}>
                  <button
                    className={`why-choose-tab-a ${activeTab === tab.tabName.toLowerCase() ? 'why-choose-active-a' : ''}`}
                    onClick={() => handleTabClick(tab.tabName)}
                  >
                    {tab.tabName.charAt(0).toUpperCase() + tab.tabName.slice(1)} {/* Capitalize */}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tab Content */}
          <div className="why-choose-tab-container">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`why-choose-tab ${activeTab === tab.tabName.toLowerCase() ? 'why-choose-tab-active' : ''}`}
                data-id={tab.tabName}
              >
                <div className="why-choose-tab-img">
                  {tab.tabImages.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={`${apiUrl}/why-choose-us/${img}`}
                      alt={`Tab ${tab.tabName} Image ${imgIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
