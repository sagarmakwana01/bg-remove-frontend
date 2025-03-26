import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const apiUrl = import.meta.env.VITE_API_URL;

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/header`);
        if (res.data.success) {
          setHeaderData(res.data.data[0]);
        }
      } catch (err) {
        console.error('Error fetching header data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  return (
    <>
      <div className="m-overlay-bg"></div>

      <header id="h-home" className="h-home-wapper">
        <div className="h-header-main">
          <div className="container w-1240">
            <div className="h-header-nav">
              {/* Logo */}
              <div className="h-header-logo">
                <Link to="/">
                  {loading ? <Skeleton width={180} height={30} /> : <span>{headerData.logoText}</span>}
                </Link>
              </div>

              {/* Navigation */}
              <div className="h-main-menu" id="h-sidebar-wrapper">
                <div className="h-header-card">
                  <div className="m-mobile-card">
                    <div className="m-header-logo">
                      <Link to="/">
                        {loading ? <Skeleton width={200} height={30} /> : <span>BackGround Remove.AI</span>}
                      </Link>
                    </div>
                    <div className="menu-close-icon">
                      <i className="far fa-times-circle"></i>
                    </div>
                  </div>

                  <ul>
                    {loading
                      ? [...Array(4)].map((_, index) => (
                          <li key={index}>
                            <Skeleton width={120} height={20} />
                          </li>
                        ))
                      : headerData.menuItems.map((menuItem) => (
                          <li key={menuItem.id}>
                            <Link to={menuItem.url}>{menuItem.label}</Link>
                          </li>
                        ))}
                  </ul>

                  {/* Login Button */}
                  <div className="m-login-sign h-login">
                    {loading ? (
                      <Skeleton width={150} height={40} />
                    ) : (
                      <Link to="javascript:void(0)">
                        Login / Sign Up
                        <img src="/img/person-sharp.png" alt="person" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section (Menu Toggle + Login Button) */}
              <div className="menu-right-wapper">
                <div className="h-toggle-btn" id="h-toggle-btn">
                  <div className="line-card one"></div>
                  <div className="line-card two"></div>
                  <div className="line-card three"></div>
                </div>

                <div className="h-login">
                  {loading ? (
                    <Skeleton width={150} height={40} />
                  ) : (
                    <Link to="#">
                      Login / Sign Up
                      <img src="/img/person-sharp.png" alt="person" />
                    </Link>
                  )}
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
