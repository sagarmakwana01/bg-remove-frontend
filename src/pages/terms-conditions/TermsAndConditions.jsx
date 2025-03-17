// TermsAndConditions.jsx
import React from 'react';
import './terms.js'
import './termsConditions.css'
import Banner from '../../components/Banner.jsx';
const TermsAndConditions = () => {
  return (
    <>
<Banner/>
    <div className="terms-condition">
      <div className="container w-1240">
        <div className="terms-condition-items">
          <h3>1. PREAMBLE</h3>
          <p>
            Removal.AI (hereinafter referred to as the Operator) operates and manages the website Removal.AI
            (Platform), a web-based photo editing application. Please read these Terms & Conditions (“Agreement”
            or “Terms of Use”) before using any of the services being offered by Removal.AI. This agreement
            legally binds the Operator and all users of the platform Removal.AI (hereinafter referred to as the
            User). Using the site in any manner, including but not limited to using the service, browsing the
            features and content, and exploring the application means that the User agrees to be bound by these
            Terms of Use. The Agreement will apply to all users of the site and the service.
          </p>

          <h3>2. RIGHTS OF USER</h3>
          <p>
            2.1 The User may access and use the Platform for both commercial and non-commercial purposes. This
            would make all the results after using the Platform to be used only privately. There is the exclusion in
            the use for both direct and indirect commercial purposes.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default TermsAndConditions;
