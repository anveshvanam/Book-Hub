import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {showNavbar: false}

  render() {
    const {showNavbar} = this.state

    return (
      <div className="header-container">
        <img
          src="https://res.cloudinary.com/dq9eefxnb/image/upload/v1677406294/logo_r0zrx8.png"
          className="website-logo"
          alt="website-logo"
        />
        <div className="nav-links-container">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/" className="nav-link">
            Bookshelves
          </Link>
          <button type="button" className="logout-button">
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default Header
