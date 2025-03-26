import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For API calls
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default styles for Skeleton

const apiUrl = import.meta.env.VITE_API_URL;

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch header data on component mount
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/header`); // adjust your backend URL here
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

  // If loading, show skeletons
  if (loading) {
    return (
      <div>
        <Skeleton height={100} width={2000} /> {/* Skeleton for logo */}
        <div className="h-header-nav">
          <ul>
            {[...Array(5)].map((_, index) => (
              <li key={index}>
                <Skeleton width="100%" height={30} /> {/* Skeleton for menu items */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // If no data, show a message
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
                <Link to="/">
                  <span>{headerData.logoText}</span> {/* Display the real logo text */}
                </Link>
              </div>

              <div className="h-main-menu" id="h-sidebar-wrapper">
                <div className="h-header-card">
                  <div className="m-mobile-card">
                    <div className="m-header-logo">
                      <Link to="/"><span>BackGround Remove.AI</span></Link>
                    </div>
                    <div className="menu-close-icon">
                      <i className="far fa-times-circle"></i>
                    </div>
                  </div>

                  <ul>
                    {headerData.menuItems.map((menuItem) => (
                      <li key={menuItem.id}>
                        <Link to={menuItem.url}>{menuItem.label}</Link> {/* Real menu items */}
                      </li>
                    ))}
                  </ul>

                  <div className="m-login-sign h-login">
                    <Link to="javascript:void(0)">
                      Login / Sign Up
                      <img src="/img/person-sharp.png" alt="person" />
                    </Link>
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
                  <Link to="#">
                    Login / Sign Up
                    <img src="/img/person-sharp.png" alt="person" />
                  </Link>
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
