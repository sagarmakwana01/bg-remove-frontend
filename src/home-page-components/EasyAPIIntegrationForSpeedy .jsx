import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const EasyAPIIntegrationForSpeedy = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch header data on component mount
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/get-easy-service-api`); // adjust your backend URL here
        if (res.data.success) {
          setService(res.data.data[0]); // Assuming you want the first header
        }
      } catch (err) {
        console.error('Error fetching service data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <section className="remove-bg-instantly easy-api-integration-for-speedy">
      <div className="container w-1240">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="remove-bg-instantly-items">
              <h2>{service?.title}</h2>
              <p>{service?.description}</p>
              <ul>
                {service?.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))
                }
              </ul>
              <Link to={service?.btnLink || '/'}>
                {service?.btnName || 'Try our free background remover'}{' '}
                <img src="img/chevron-double-right.png" alt="chevron" />
              </Link>
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="remove-bg-instantly-img">
              <img
                src={`${apiUrl}/static/background-remove-service/${service?.ctaImage3}`

                }
                alt="CTA Image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasyAPIIntegrationForSpeedy;
