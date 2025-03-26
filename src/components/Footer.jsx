import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // For API calls
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const apiUrl = import.meta.env.VITE_API_URL;
const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/footers`);
        if (res.data.success) {
          setFooterData(res.data.data[0]);
        }
      } catch (err) {
        console.error('Error fetching footer data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFooterData();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter an email address.');
      return;
    }
    try {
      const res = await axios.post(`${apiUrl}/create-subscription`, { email });
      if (res.data.success) {
        toast.success('Subscription successful!');
        setEmail('');
      } else {
        toast.error(res.data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      toast.error(err.response?.data?.message || 'Server error.');
    }
  };

  return (
    <footer className="footer-wapper">
      <ToastContainer />
      <div className="footer-top">
        <div className="container w-1240">
          <div className="footer-top-row">
            <div className="footer-top-left">
              <h2>Get Updates</h2>
              <p>Sign up for our mailing list and we will let you know when we release new features or updates.</p>
            </div>
            <div className="footer-top-right">
              <form onSubmit={handleSubscribe} className="footer-top-right">
                <input
                  type="email"
                  placeholder="your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-center">
        <div className="container w-1240">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-center-item">
                <div className="footer-logo">
                  <Link to="/">
                    <span>{loading ? <Skeleton width={100} /> : footerData.logoText}</span>
                  </Link>
                </div>
                <div className="footer-social-media">
                  <h3>Social Media</h3>
                  <ul>
                    {loading ? (
                      <Skeleton count={3} width={40} height={40} />
                    ) : (
                      footerData.socialMedia.map((socialItem, index) => (
                        <li key={index}>
                          <Link to={socialItem.link}>
                            <img src={`${apiUrl}/static/socialMedia/${socialItem.image}`} style={{ width: '100%' }} alt="Social Media" />
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-center-item">
                <div className="footer-center-title">
                  <h3>Tools & API</h3>
                  <ul>
                    {loading ? <Skeleton count={3} /> : footerData.toolsAPI.map((toolItem, index) => (
                      <li key={index}>
                        <Link to={toolItem.url}>{toolItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="footer-center-title">
                  <h3>Company</h3>
                  <ul>
                    {loading ? <Skeleton count={3} /> : footerData.companyLinks.map((companyItem, index) => (
                      <li key={index}>
                        <Link to={companyItem.url}>{companyItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-center-item">
                <div className="footer-center-title">
                  <h3>How To Use</h3>
                  <ul>
                    {loading ? <Skeleton count={3} /> : footerData.howToUse.map((howToUseItem, index) => (
                      <li key={index}>
                        <Link to={howToUseItem.url}>{howToUseItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-center-item">
                <div className="footer-center-title">
                  <h3>Support</h3>
                  <ul>
                    {loading ? <Skeleton count={3} /> : footerData.support.map((supportItem, index) => (
                      <li key={index}>
                        <Link to={supportItem.url}>{supportItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{loading ? <Skeleton width={200} /> : footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;