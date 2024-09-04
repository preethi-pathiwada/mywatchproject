import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {TiSocialFacebook, TiSocialLinkedin} from 'react-icons/ti'
import {FaTwitter} from 'react-icons/fa'
import {Link} from 'react-router-dom'

import './index.css'

import NxtWatchContext from '../../context/NxtWatchContext'

const SideNavbar = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDark} = value
      return (
        <div
          className={isDark ? 'sidebar sidebar-dark' : 'sidebar sidebar-light'}
        >
          <ul className="nav-list-large-container">
            <Link to="/" className="nav-link">
              <li className="side-container" key="1">
                <IoMdHome className="side-icon" />
                <p
                  className={
                    isDark
                      ? 'side-text side-text side-text-dark'
                      : 'side-text side-text-light'
                  }
                >
                  Home
                </p>
              </li>
            </Link>
            <Link to="/trending" className="nav-link">
              <li className="side-container" key="2">
                <HiFire className="side-icon" />
                <p
                  className={
                    isDark
                      ? 'side-text side-text-dark'
                      : 'side-text side-text-light'
                  }
                >
                  Trending
                </p>
              </li>
            </Link>

            <Link to="/gaming" className="nav-link">
              <li className="side-container" key="3">
                <SiYoutubegaming className="side-icon" />
                <p
                  className={
                    isDark
                      ? 'side-text side-text-dark'
                      : 'side-text side-text-light'
                  }
                >
                  Gaming
                </p>
              </li>
            </Link>
            <Link to="/saved-videos" className="nav-link">
              <li className="side-container">
                <BiListPlus className="side-icon" />
                <p
                  className={
                    isDark
                      ? 'side-text side-text-dark'
                      : 'side-text side-text-light'
                  }
                >
                  Saved Videos
                </p>
              </li>
            </Link>
          </ul>
          <div>
            <p
              className={
                isDark ? 'side-contact side-contact-dark' : 'side-contact'
              }
            >
              CONTACT US
            </p>
            <div className="social-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="social-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="social-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="social-logo"
              />
            </div>
            <p className={isDark ? 'side-text side-text-dark' : 'side-text'}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SideNavbar
