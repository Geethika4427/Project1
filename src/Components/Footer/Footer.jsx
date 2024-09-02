// import './Footer.css'
// import footer_logo from '../Assets/logo_big.png'
// import instagram_icon from '../Assets/instagram_icon.png'
// import pintester_icon from '../Assets/pintester_icon.png'
// import whatsapp_icon from '../Assets/whatsapp_icon.png'
// import logo1 from '../Assets/logo1.jpeg';
// const Footer = () => {
//   return (
//     <div className="footer">
//         <div className="footer-logo">
//             <img src={logo1} alt="" />
//             <p>Fab Fashion</p>
//         </div>
//         <ul className="footer-links">
//             <li>company</li>
//             <li>products</li>
//             <li>offices</li>
//             <li>about</li>
//             <li>contact</li>
//         </ul>
//         <div className="footer-social-icon">
//             <div className="footer-icons-container">
//               <img src={instagram_icon} alt="" />
//             </div>
//             <div className="footer-icons-container">
//               <img src={pintester_icon} alt="" />
//             </div>
//             <div className="footer-icons-container">
//               <img src={whatsapp_icon} alt="" />
//             </div>
//         </div>
//         <div className="footer-copyright">
//             <hr/>
//             <p>Copyright @ 2023 - All Right Reserved.</p>
//         </div>
//     </div>
//   )
// }

// export default Footer

import React, { useState } from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import logo1 from '../Assets/logo1.jpeg';

const Footer = () => {
  // State to track the currently selected section
  const [selectedSection, setSelectedSection] = useState(null);

  // Function to get the current year
  const currentYear = new Date().getFullYear();

  // Content based on the selected section
  const renderContent = () => {
    switch (selectedSection) {
      case 'company':
        return <p>Welcome to our company page! Here you can find information about us.</p>;
      case 'products':
        return <p>Explore our range of products. We offer a variety of items to suit your needs.</p>;
      case 'offices':
        return <p>Our offices are located worldwide. Find one near you!</p>;
      case 'about':
        return <p>Learn more about our company, mission, and values.</p>;
      case 'contact':
        return <p>Contact us for more information or support.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo1} alt="Fab Fashion Logo" />
        <p>Fab Fashion</p>
      </div>
      <ul className="footer-links">
        <li><button onClick={() => setSelectedSection('company')}>company</button></li>
        <li><button onClick={() => setSelectedSection('products')}>products</button></li>
        <li><button onClick={() => setSelectedSection('offices')}>offices</button></li>
        <li><button onClick={() => setSelectedSection('about')}>about</button></li>
        <li><button onClick={() => setSelectedSection('contact')}>contact</button></li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <img src={pintester_icon} alt="Pinterest" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp_icon} alt="WhatsApp" />
          </a>
        </div>
      </div>
      <div className="footer-content">
        {renderContent()}
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright &copy; {currentYear} - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
