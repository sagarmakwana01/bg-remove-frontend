import React, { useEffect, useState } from 'react';
import './termsConditions.css';
import Banner from '../../components/Banner.jsx';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

const TermsAndConditions = () => {
    const [termAndConditionData, setTermAndConditionData] = useState([]);
    const [loading, setLoading] = useState(true);

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
                console.error('Error fetching term and condition data:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            <Banner page="Terms & Conditions" title="Terms & Conditions" />
            <div className="terms-condition">
                <div className="container w-1240">
                    <div className="terms-condition-items">
                        {termAndConditionData.map((item, index) => (
                            <div key={index}>
                                <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;