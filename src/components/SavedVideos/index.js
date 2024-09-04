import {HiFire} from 'react-icons/hi'
import './index.css'

import Header from '../Header'
import SideNavbar from '../SideNavbar'
import NxtWatchContext from '../../context/NxtWatchContext'
import VideoItem from '../VideoItem'
import {Container} from '../Gaming/styledComponents'

const SavedVideos = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDark, savedVideosList} = value
      console.log(savedVideosList)
      return (
        <Container isDark={isDark} data-testid="savedVideos">
          <Header />
          <div className={isDark ? 'home-bg-dark' : 'home-bg-light'}>
            <div className="home-container">
              <SideNavbar />
              <div className="results-container-trending">
                <div
                  className={
                    isDark ? 'trending-header-dark' : 'trending-header-light'
                  }
                >
                  <div
                    className={
                      isDark ? 'icon-container-dark' : 'icon-container-light'
                    }
                  >
                    <HiFire className="header-icon" />
                  </div>
                  <h1 className={isDark ? 'header-dark' : 'header-light-theme'}>
                    Saved Videos
                  </h1>
                </div>
                {savedVideosList.length < 1 && (
                  <div className="failure-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                      className="failure-image"
                    />
                    <h1
                      className={
                        isDark
                          ? 'side-contact side-contact-dark'
                          : 'side-contact'
                      }
                    >
                      No Saved Videos Found
                    </h1>
                    <p
                      className={
                        isDark
                          ? 'side-text side-text-dark'
                          : 'side-text side-text-light'
                      }
                    >
                      You can save your videos while watching them
                    </p>
                  </div>
                )}

                <ul className="trending-list-container">
                  {savedVideosList.map(obj => (
                    <VideoItem key={obj.id} details={obj} trending />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SavedVideos
