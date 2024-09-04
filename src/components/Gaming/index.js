import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'
import SideNavbar from '../SideNavbar'
import Banner from '../Banner'
import GameItem from '../GameItem'
import NxtWatchContext from '../../context/NxtWatchContext'
import {Container} from './styledComponents'

class Gaming extends Component {
  state = {videosList: [], apiStatus: 'inProgress', searchInput: ''}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
    }
    const response = await fetch('https://apis.ccbp.in/videos/gaming', options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(obj => ({
        id: obj.id,
        title: obj.title,
        viewCount: obj.view_count,
        thumbnailUrl: obj.thumbnail_url,
      }))
      this.setState({videosList: updatedData, apiStatus: 'success'})
    } else {
      console.log(response)
      this.setState({apiStatus: 'failed'})
    }
  }

  retry = () => {
    this.setState({apiStatus: 'inProgress'}, this.getVideos)
  }

  returnLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  returnSuccessView = () => {
    const {videosList} = this.state
    console.log(videosList)

    return (
      <ul className="gaming-list-container">
        {videosList.map(obj => (
          <GameItem key={obj.id} details={obj} />
        ))}
      </ul>
    )
  }

  returnFailureView = isDark => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1
        className={isDark ? 'side-contact side-contact-dark' : 'side-contact'}
      >
        Oops! Something Went Wrong
      </h1>
      <p
        className={
          isDark ? 'side-text side-text-dark' : 'side-text side-text-light'
        }
      >
        We are having some trouble to complete your request. Please try Again
      </p>
      <button type="button" className="retry-button" onClick={this.retry}>
        Retry
      </button>
    </>
  )

  renderVideos = isDark => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'inProgress':
        return this.returnLoader()
      case 'success':
        return this.returnSuccessView(isDark)
      case 'failed':
        return this.returnFailureView(isDark)
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <Container data-testid="gaming" isDark={isDark}>
              <Header />
              <div className={isDark ? 'home-bg-dark' : 'home-bg-light'}>
                <div className="home-container">
                  <SideNavbar />
                  <div className="common-container">
                    <Banner />

                    <div className="results-container-trending">
                      <div
                        className={
                          isDark
                            ? 'trending-header-dark'
                            : 'trending-header-light'
                        }
                      >
                        <div
                          className={
                            isDark
                              ? 'icon-container-dark'
                              : 'icon-container-light'
                          }
                        >
                          <SiYoutubegaming className="header-icon" />
                        </div>
                        <h1
                          className={
                            isDark ? 'header-dark' : 'header-light-theme'
                          }
                        >
                          Gaming
                        </h1>
                      </div>
                      {this.renderVideos(isDark)}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Gaming
