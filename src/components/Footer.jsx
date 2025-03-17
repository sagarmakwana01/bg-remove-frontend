import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For API calls
import { toast,ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Fetch header data on component mount
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/footers'); // adjust your backend URL here
        if (res.data.success) {
          setFooterData(res.data.data[0]); // Assuming you want the first header
        }
      } catch (err) {
        console.error('Error fetching header data:', err);
      } finally {
        setLoading(false);
      }
    };
   
fetchFooterData();
  }, []);


  
 
  // Handle subscription form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Check if email is empty
    if (!email) {
      toast.error('Please enter an email address.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/create-subscription', { email });

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


  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!footerData) {
    return <div>No footer data found</div>;
  }


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
              <button type="submit" >Subscribe</button>
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
                  <a href="#"><span>{footerData.logoText}</span></a>
                </div>

                <div className="footer-social-media">
                  <h3>Social Media</h3>
                  <ul>
                  {footerData.socialMedia.map((socialItem,index) => (
                      <li key={index}>
                        <a href={socialItem.link}>
                       <img src={`http://localhost:3000/socialMedia/${socialItem.image}`} style={{width:'100%'}} alt="Facebook" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-center-item">
                <div className="footer-center-title">
                  <h3>Tools & API</h3>
                  <ul>
                  {footerData.toolsAPI.map((toolItem,index) => (
                      <li key={index}>
                        <a href={toolItem.url}>{toolItem.title}</a>
                      </li>
                    ))}
                    
                  </ul>
                </div>
                <div className="footer-center-title">
                  <h3>Company</h3>
                  <ul>
                  {footerData.companyLinks.map((companyItem, index) => (
                      <li key={index}>
                        <a href={companyItem.url}>{companyItem.title}</a>
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
                  {footerData.howToUse.map((howToUseItem,index) => (
                      <li key={index}>
                        <a href={howToUseItem.url}>{howToUseItem.title}</a>
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
                  {footerData.support.map((supportItem,index) => (
                      <li key={index}>
                        <a href={supportItem.url}>{supportItem.title}</a>
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
        <p>{footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
