import './index.css'

import NxtWatchContext from '../../context/NxtWatchContext'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDark} = value
      return (
        <div className="not-found-container">
          <img
            src={
              isDark
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
            }
            alt="not found"
            className="not-found-img"
          />
          <h1
            className={
              isDark ? 'side-contact side-contact-dark' : 'side-contact'
            }
          >
            Page Not Found
          </h1>
          <p
            className={
              isDark ? 'side-text side-text-dark' : 'side-text side-text-light'
            }
          >
            we are sorry, the page you requested could not be found.
          </p>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
