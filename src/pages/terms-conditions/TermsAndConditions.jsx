// TermsAndConditions.jsx
import React,{useEffect, useState} from 'react';import './terms.js'
import './termsConditions.css'
import Banner from '../../components/Banner.jsx';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
const TermsAndConditions = () => {
    const [termAndConditionData, setTermAndConditionData] = useState([]);

       // Fetch heading section data from /news-section-api
   useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${apiUrl}/term-and-condition-api`);
        if (response.data.success && Array.isArray(response.data.data)) {
          setTermAndConditionData(response.data.data);
        } else {
          console.warn('No term and condition data found');
        }
      } catch (error) {
        console.error('Error fetching news sterm and condition data:', error);
      }
    })();
  }, []);

  return (
    <>
<Banner page="Terms & conditions" title="Terms & conditions" />
    <div className="terms-condition">
      <div className="container w-1240">
        <div className="terms-condition-items">
        {
          termAndConditionData.map((item, index) => (
            <div className="" key={index}>
             
              {/* <p>{item.description}</p> */}
              <div dangerouslySetInnerHTML={{__html: item.description}}></div>
            </div>
          ))
        }
          
        </div>
      </div>
    </div>
    </>
  );
};

export default TermsAndConditions;
