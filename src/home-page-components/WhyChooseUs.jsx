import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WhyChoose.css';

const apiUrl = import.meta.env.VITE_API_URL;

const WhyChooseUs = () => {
  const [tabs, setTabs] = useState([]); // Holds the fetched tab data
  const [activeTab, setActiveTab] = useState(''); // Holds the current active tab name
  const [loading, setLoading] = useState(true); // Loading state

  const [whyChooseSections, setWhyChooseSections] = useState([]); // Holds the "Why Choose First Section" data
  const [sectionsLoading, setSectionsLoading] = useState(true);

  // Fetch data from API for tabs
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

  // Fetch "Why Choose First Section" data
  useEffect(() => {
    const fetchWhyChooseSections = async () => {
      try {
        const res = await axios.get(`${apiUrl}/get-why-choose-first-section-api`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setWhyChooseSections(res.data.data);
        } else {
          console.warn('No section data found');
        }
      } catch (error) {
        console.error('Error fetching section data:', error);
      } finally {
        setSectionsLoading(false);
      }
    };

    fetchWhyChooseSections();
  }, []);

  // Loading state
  // if (loading || sectionsLoading) {
  //   return (
  //     <div>Loading...</div>
  //   );
  // }

  // Handle no data
  if (!tabs.length || !whyChooseSections.length) return <div>No data available</div>;

  // Handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName.toLowerCase());
  };

  return (
    <section className="why-choose-us">
      <div className="container w-1240">
        {whyChooseSections.length > 0 ? (
          whyChooseSections.map((section, index) => (
            <div key={section.id || index} className="why-choose-us-heading">
              <h5>{section.title}</h5>
              <h2>{section.title2}</h2>
              <p>{section.content}</p>
            </div>
          ))
        ) : (
          <div>No sections available</div>
        )}

        {/* Tab Menu */}
        <div className="why-choose-d-tab-wrapper">
          <div className="why-choose-tab-menu">
            <ul>
              {tabs.map((tab) => (
                <li key={tab.tabName}>
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
            {tabs.map((tab) => (
              <div
                key={tab.tabName}
                className={`why-choose-tab ${activeTab === tab.tabName.toLowerCase() ? 'why-choose-tab-active' : ''}`}
                data-id={tab.tabName}
              >
                <div className="why-choose-tab-img">
                  {tab.tabImages.length > 0 ? (
                    tab.tabImages.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={`${apiUrl}/static/why-choose-us/${img}`}
                        alt={`Tab ${tab.tabName} Image ${imgIndex + 1}`}
                      />
                    ))
                  ) : (
                    <div>No images available</div>
                  )}
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
