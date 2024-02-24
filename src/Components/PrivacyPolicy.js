import React from 'react';
import './PrivacyPolicy.css'; 
import { Link } from 'react-router-dom';


function PrivacyPolicy() {
  return (
    <div className="container-privacy">
    <div className="privacypolicy">
        <h1>Privacy and Policy Terms for Trip 2Share</h1>
      <p>
      Welcome to Trip 2Share! We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our services. This Privacy Policy applies to Trip 2Share website and its associated services and explains how we collect, use, and share information about you. By using our website, you agree to the terms of this policy.
    </p>
    <h2>Information Collection</h2> 
    <p></p>
     We collect personal information that you voluntarily provide to us, such as your name, email address, profile picture, and preferences related to travel. This information is used to help you find compatible travel partners. <br/>
    <br />  
    The information we collect is used in various ways, including to:<br/>
    <br />
<p>
    Provide, operate, and maintain our website.<br/>
    Improve, personalize, and expand our website.<br/>
    Understand and analyze how you use our website.<br/>
    Develop new products, services, features, and functionality.<br/>
    Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.<br/>
    Send you emails.<br/>
    Find and prevent fraud.<br/>
</p>
<h2>Sharing of Information</h2>
<p>Travel Partners: We may share your information with potential travel partners based on your shared preferences and travel interests.<br/>
Service Providers: We may share your information with third-party companies and individuals that provide service to us, including companies that assist with our business activities such as hosting, analytics, customer service, etc.<br/>
Compliance with Laws: We may disclose your information where required to do so by law or subpoena or if we believe that such action is necessary to comply with the law and the reasonable requests of law enforcement or to protect the security or integrity of our Service.
<h2>Security</h2>
The security of your personal information is important to us. We use a variety of security technologies and procedures to help protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
</p>
<h2>Children's Privacy</h2>
<p> Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from children without verification of parental consent, we take steps to remove that information from our servers.

    Changes to This Privacy Policy
    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

      </p>
      <h2> Contact us </h2>
      <p>
      If you have any questions about this Privacy Policy, please contact us at <Link to="/contact">Contact</Link>
      </p>
  
    </div>
    </div>

  );
}

export default PrivacyPolicy;
