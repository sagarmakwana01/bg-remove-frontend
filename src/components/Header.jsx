import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For API calls

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  // Fetch header data on component mount
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/header'); // adjust your backend URL here
        if (res.data.success) {
          setHeaderData(res.data.data[0]); // Assuming you want the first header
        }
      } catch (err) {
        console.error('Error fetching header data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!headerData) {
    return <div>No header data found</div>;
  }

  return (
    <>
      <div className="m-overlay-bg"></div>

      <header id="h-home" className="h-home-wapper">
        <div className="h-header-main">
          <div className="container w-1240">

            <div className="h-header-nav">
              <div className="h-header-logo">
                <a href="#">
                <span>{headerData.logoText}</span>
                </a>
              </div>

              <div className="h-main-menu" id="h-sidebar-wrapper">
                <div className="h-header-card">
                  <div className="m-mobile-card">
                    <div className="m-header-logo">
                      <a href="#"><span>BackGround Remove.AI</span></a>
                    </div>
                    <div className="menu-close-icon">
                      <i className="far fa-times-circle"></i>
                    </div>
                  </div>

                  <ul>
                    {headerData.menuItems.map((menuItem) => (
                      <li key={menuItem.id}>
                        <a href={menuItem.url}>{menuItem.label}</a>
                      </li>
                    ))}
                  </ul>

                  <div className="m-login-sign h-login">
                    <a href="#">
                      Login / Sign Up
                      <img src="/img/person-sharp.png" alt="person" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="menu-right-wapper">
                <div className="h-toggle-btn" id="h-toggle-btn">
                  <div className="line-card one"></div>
                  <div className="line-card two"></div>
                  <div className="line-card three"></div>
                </div>

                <div className="h-login">
                  <a href="#">
                    Login / Sign Up
                    <img src="/img/person-sharp.png" alt="person" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
