import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Banner from '../../components/Banner'
import './contact.css'
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const ContactUs = () => {
  const [supportTypes, setSupportTypes] = useState([]);
  const [loding, setLoding] = useState(true);
  const [faqs, setFaqs] = useState([]); // ✅ NEW: FAQs State
  const [getInTouchData, setGetInTouchData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    support_typeId: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchSupportTypes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/get-support-type`);
        const { success, data } = response.data;

        if (success) {
          setSupportTypes(data);
        } else {
          console.error('Failed to fetch support types');
        }
      } catch (error) {
        console.error('Error fetching support types:', error);
      }
    };

    fetchSupportTypes();
    fetchFaqs(); // ✅ NEW

  }, []);
  useEffect(() => {
    if (faqs.length === 0) return;

    // Reset FAQ accordion state
    jQuery(".faq_content").hide();
    jQuery(".faq_accordion_item").removeClass("active");

    // Open the first FAQ item
    jQuery(".faq_accordion_item:first-child").addClass("active").children(".faq_content").slideDown();

    // Remove previous click handlers and add new ones
    jQuery(".faq_accordion_item .faq_menu").off("click").on("click", function () {
      const parent = jQuery(this).parent();

      if (parent.hasClass("active")) {
        parent.removeClass("active");
        parent.find(".faq_content").slideUp();
      } else {
        jQuery(".faq_accordion_item").removeClass("active");
        jQuery(".faq_content").slideUp();

        parent.addClass("active");
        parent.find(".faq_content").slideDown();
      }
    });
  }, [faqs]);
  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get-faqs-api`); // ✅ NEW: Fetch FAQs
      const { success, data } = response.data;

      if (success) {
        setFaqs(data); // ✅ NEW
      } else {
        console.error('Failed to fetch FAQs');
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    const fetchGetInTouchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/get-in-touch-api`);
        const { success, data } = response.data;
  
        if (success && data.length > 0) {
          setGetInTouchData(data[0]);
        } else {
          console.error('Failed to fetch Get In Touch data');
        }
      } catch (error) {
        console.error('Error fetching Get In Touch data:', error);
      }
    };
  
    fetchGetInTouchData();
  }, []);

  // ✅ Validate Form Inputs
  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Email is not valid';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters';
    }

    if (!formData.support_typeId) {
      errors.support_typeId = 'Please select a support type';
    }

    return errors;
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Live validation
    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/create-contact`, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        support_typeId: parseInt(formData.support_typeId)
      });

      const { success, message } = response.data;

      if (success) {
        setSuccessMsg(message || 'Your message has been sent!');
        setFormData({
          name: '',
          email: '',
          message: '',
          support_typeId: ''
        });
        setErrors({});
      } else {
        setErrorMsg(message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to submit your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner page="ContactUs" title="Contact Us" />

      <section className="contact-us-wapper">
        <div className="container w-1240">
          <div className='row'>
            <div className='col-12 col-lg-5 mb-4 mb-lg-0'>
            <div className='get-in-touch-card'>
        <h2 className='font-weight-bold'>Get in Touch</h2>

        {getInTouchData ? (
          <>
            <div className='address-card'>
              <h3>{getInTouchData.officeName}</h3>
              <p>{getInTouchData.address}</p>
            </div>

            <div className='support-card'>
              <p>
                <b>Support:</b>{' '}
                <a href={`mailto:${getInTouchData.supportEmail}`}>
                  {getInTouchData.supportEmail}
                </a>
              </p>
            </div>

            <div className='social-icon-card'>
              <h3>Social Media</h3>
              <ul>
                {getInTouchData.socialIcon.map((icon, index) => (
                  <li key={index}>
                    <a href={icon.link} target="_blank" rel="noopener noreferrer">
                      <i className={icon.class_name}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>Loading contact information...</p>
        )}
      </div>
            </div>

            <div className='col-12 col-lg-7'>
              <div className='contact-form-wapper'>
                <h2>We’d love to hear from you</h2>

                {successMsg && <div className="alert alert-success">{successMsg}</div>}
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                <div className='contact-form-card'>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className='form-group'>
                      <label>Name</label>
                      <input
                        type='text'
                        name='name'
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder='Your name'
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>

                    <div className='form-group'>
                      <label>Email address</label>
                      <input
                        type='email'
                        name='email'
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder='Email address'
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>

                    <div className='form-group'>
                      <label>Tell us more about your use case</label>
                      <textarea
                        name='message'
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        placeholder='Your description'
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      {errors.message && <small className="text-danger">{errors.message}</small>}
                    </div>

                    <div className='form-group'>
                      <label>What type of support do you need?</label>
                      <select
                        name='support_typeId'
                        className={`form-control ${errors.support_typeId ? 'is-invalid' : ''}`}
                        value={formData.support_typeId}
                        onChange={handleChange}
                      >
                        <option value="">Select Support Type</option>
                        {supportTypes.length > 0 ? (
                          supportTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.supportName}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading...</option>
                        )}
                      </select>
                      {errors.support_typeId && <small className="text-danger">{errors.support_typeId}</small>}
                    </div>

                    <button
                      type="submit"
                      className='btn-card'
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="faqs">
        <div className="container w-1240">
          <div className="faqs-heading">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq_accordion_wapper">
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <div key={faq.id} className="faq_accordion_item">
                  <div className="faq_menu">
                    <Link to="javascript:void(0)">{faq.question}</Link>
                    <div className="faq_menu_img">
                      <img className="faq-plus-img" src="public/img/plus.png" alt="" />
                      <img className="faq-mines-img" src="public/img/minsh.png" alt="" />
                    </div>
                  </div>
                  <div className="faq_content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading FAQs...</p>
            )}

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
