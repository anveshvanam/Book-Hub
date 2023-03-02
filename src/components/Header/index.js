import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {showNavbar: false}

  onClickHeaderMenuButton = () => {
    this.setState(prevState => ({showNavbar: !prevState.showNavbar}))
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {showNavbar} = this.state
    const {home, bookshelves} = this.props
    // console.log(home)
    // console.log('test')
    // console.log(bookshelves)

    const activeHome = home ? 'active-tab' : ''
    const activeBookshelves = bookshelves ? 'active-tab' : ''

    return (
      <>
        <div className="header-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dq9eefxnb/image/upload/v1677406294/logo_r0zrx8.png"
              className="website-logo"
              alt="website-logo"
            />
          </Link>
          <ul className="tabs-container">
            <Link to="/" className="nav-link">
              <li className={`tab-list-item ${activeHome}`}>Home</li>
            </Link>
            <Link to="/bookshelf" className="nav-link">
              <li className={`tab-list-item ${activeBookshelves} `}>
                Bookshelves
              </li>
            </Link>
            <li className="tab-list-item">
              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="hamburger-menu-button"
            onClick={this.onClickHeaderMenuButton}
          >
            <GiHamburgerMenu className="menu-icon" />
          </button>
        </div>

        {showNavbar && (
          <ul className="responsive-menu-tabs-container">
            <Link to="/" className="nav-link">
              <li className={`tab-list-item ${activeHome}`}>Home</li>
            </Link>
            <Link to="/bookshelf" className="nav-link">
              <li className={`tab-list-item ${activeBookshelves} `}>
                Bookshelves
              </li>
            </Link>
            <li className="tab-list-item">
              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
            <li className="tab-list-item">
              <button
                type="button"
                className="hamburger-menu-button"
                onClick={this.onClickHeaderMenuButton}
              >
                <AiFillCloseCircle className="menu-icon" />
              </button>
            </li>
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(Header)
