import {Link, withRouter} from 'react-router-dom'
import {BsBoxArrowRight} from 'react-icons/bs'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoSunny, IoClose} from 'react-icons/io5'
import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import Cookies from 'js-cookie'

import './index.css'

import NxtWatchContext from '../../context/NxtWatchContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark, changeTheme} = value
        return (
          <nav
            className={
              isDark
                ? 'nav-header nav-header-dark'
                : 'nav-header nav-header-light'
            }
          >
            <Link to="/" className="nav-link">
              <img
                className="header-logo"
                src={
                  isDark
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
              />
            </Link>
            <ul className="nav-mobile-container">
              <li className="nav-item">
                <button
                  data-testid="theme"
                  className="nav-button"
                  onClick={() => changeTheme()}
                >
                  {isDark ? (
                    <IoSunny className="navbar-icon-dark" />
                  ) : (
                    <FaMoon className="navbar-icon" />
                  )}
                </button>
              </li>

              <li className="nav-item">
                <Popup
                  modal
                  trigger={
                    <button
                      className="nav-button"
                      type="button"
                      aria-label="hamburger"
                    >
                      <GiHamburgerMenu
                        className={isDark ? 'navbar-icon-dark' : 'navbar-icon'}
                      />
                    </button>
                  }
                >
                  {close => (
                    <>
                      <div
                        className={
                          isDark
                            ? 'menu-modal-container-dark'
                            : 'menu-modal-container-light'
                        }
                      >
                        <button className="close-button" onClick={close}>
                          <IoClose
                            className={
                              isDark ? 'close-icon-dark' : 'close-icon-light'
                            }
                          />
                        </button>
                        <div
                          className={
                            isDark
                              ? 'modal-container-dark'
                              : 'modal-container-light'
                          }
                        >
                          <Link to="/" className="nav-link">
                            <div className="side-container">
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
                            </div>
                          </Link>
                          <Link to="/trending" className="nav-link">
                            <div className="side-container">
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
                            </div>
                          </Link>

                          <Link to="/gaming" className="nav-link">
                            <div className="side-container">
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
                            </div>
                          </Link>
                          <Link to="/saved-videos" className="nav-link">
                            <div className="side-container">
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
                            </div>
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </Popup>
              </li>

              <li className="nav-item">
                <Popup
                  modal
                  trigger={
                    <button type="button" className="nav-mobile-btn">
                      <BsBoxArrowRight
                        className={isDark ? 'navbar-icon-dark' : 'navbar-icon'}
                        aria-label="Logout"
                      />
                    </button>
                  }
                >
                  {close => (
                    <div
                      className={
                        isDark
                          ? 'modal-container-dark'
                          : 'modal-container-light'
                      }
                    >
                      <h1
                        className={
                          isDark ? 'modal-heading-dark' : 'modal-heading-light'
                        }
                      >
                        Are you sure you want to logout?
                      </h1>
                      <div className="buttons-container">
                        <button className="cancel-button" onClick={close}>
                          Cancel
                        </button>
                        <button
                          className="confirm-button"
                          onClick={onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </li>
            </ul>

            <ul className="nav-large-container">
              <li className="nav-item">
                <button
                  className="nav-button"
                  onClick={() => changeTheme()}
                  data-testid="theme"
                >
                  {isDark ? (
                    <IoSunny className="navbar-icon-dark" />
                  ) : (
                    <FaMoon className="navbar-icon" />
                  )}
                </button>
              </li>

              <li className="nav-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  className="profile-icon"
                  alt="profile"
                />
              </li>

              <li className="nav-item">
                <Popup
                  modal
                  trigger={
                    <button type="button" className="logout-button">
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div
                      className={
                        isDark
                          ? 'modal-container-dark'
                          : 'modal-container-light'
                      }
                    >
                      <h1
                        className={
                          isDark ? 'modal-heading-dark' : 'modal-heading-light'
                        }
                      >
                        Are you sure you want to logout?
                      </h1>
                      <div className="buttons-container">
                        <button className="cancel-button" onClick={close}>
                          Cancel
                        </button>
                        <button
                          className="confirm-button"
                          onClick={onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </li>
            </ul>
          </nav>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

// const Header = props => {
// const onClickLogout = () => {
//   const {history} = props
//   Cookies.remove('jwt_token')
//   history.replace('/login')
// }

//   return (
//     <NxtWatchContext.Consumer>
//       {value => {
//         const {isDark, changeTheme} = value
//         return (
//           <nav
//             className={
//               isDark
//                 ? 'nav-header nav-header-dark'
//                 : 'nav-header nav-header-light'
//             }
//           >
//             <div className="nav-content">
//               <div className="nav-bar-mobile-logo-container">
//                 <Link to="/">

// <img
//   className="header-logo"
//   src={
//     isDark
//       ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
//       : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
//   }
//   alt="website logo"
// />
//                 </Link>
//               </div>
//               <div className="nav-menu-mobile">
//                 <ul className="nav-menu-list-mobile">
//                   <li className="nav-menu-item-mobile">
// <button
//   className="nav-mobile-btn"
//   onClick={() => changeTheme()}
// >
//   {isDark ? (
//     <IoSunny className="navbar-icon-dark" />
//   ) : (
//     <FaMoon className="navbar-icon" />
//   )}
// </button>
//                   </li>

//                   <li className="nav-menu-item-mobile">
// <button className="nav-mobile-btn">
//   <GiHamburgerMenu
//     className={isDark ? 'navbar-icon-dark' : 'navbar-icon'}
//   />
// </button>
//                   </li>
//                   <li className="nav-menu-item-mobile">
//                     <Link to="/login" className="nav-link">
// <Popup
//   modal
//   trigger={
//     <button type="button" className="nav-mobile-btn">
//       <BsBoxArrowRight
//         className={
//           isDark ? 'navbar-icon-dark' : 'navbar-icon'
//         }
//         aria-label="Logout"
//       />
//     </button>
//   }
// >
//   <h1>Helloo</h1>
// </Popup>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="nav-bar-large-container">
//                 <Link to="/">
//                   <img
//                     className="header-logo"
//                     src={
//                       isDark
//                         ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
//                         : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
//                     }
//                     alt="website logo"
//                   />
//                 </Link>
//                 <ul className="nav-menu">
//                   <li>
//                     <button
//                       className="large-button"
//                       onClick={() => changeTheme()}
//                     >
//                       {isDark ? (
//                         <IoSunny className="navbar-icon-dark" />
//                       ) : (
//                         <FaMoon className="navbar-icon" />
//                       )}
//                     </button>
//                   </li>

//                   <li>
// <img
//   src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
//   className="profile-icon"
//   alt="profile"
// />
//                   </li>
//                   <li>
//                     <Popup
//                       modal
//                       trigger={
//                         <button type="button" className="logout-desktop-btn">
//                           Logout
//                         </button>
//                       }
//                     >
//                       <h1>Helloooo</h1>
//                     </Popup>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </nav>
//         )
//       }}
//     </NxtWatchContext.Consumer>
//   )
// }

export default withRouter(Header)
