import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <ul className="footer-contacts-list">
      <li className="footer-list-item">
        <FaGoogle className="footer-icon" />
      </li>
      <li className="footer-list-item">
        <FaTwitter className="footer-icon" />
      </li>
      <li className="footer-list-item">
        <FaInstagram className="footer-icon" />
      </li>
      <li className="footer-list-item">
        <FaYoutube className="footer-icon" />
      </li>
    </ul>
    <p className="contact-us">Contact us</p>
  </div>
)

export default Footer
