import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'

import Header from '../Header'
import SideNavbar from '../SideNavbar'
import Banner from '../Banner'
import VideoItem from '../VideoItem'
import NxtWatchContext from '../../context/NxtWatchContext'
import {Container} from './styledComponents'

class Trending extends Component {
  state = {videosList: [], apiStatus: 'inProgress', searchInput: ''}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {searchInput} = this.state
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
    }
    const response = await fetch(
      'https://apis.ccbp.in/videos/trending',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(obj => ({
        id: obj.id,
        channel: {
          name: obj.channel.name,
          profileImageUrl: obj.channel.profile_image_url,
        },
        title: obj.title,
        viewCount: obj.view_count,
        thumbnailUrl: obj.thumbnail_url,
        publishedAt: obj.published_at,
      }))
      this.setState({videosList: updatedData, apiStatus: 'success'})
    } else {
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

    return (
      <ul className="trending-list-container">
        {videosList.map(obj => (
          <VideoItem key={obj.id} details={obj} trending />
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
      <button className="retry-button" onClick={this.retry}>
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
            <Container data-testid="trending" isDark={isDark}>
              <Header />

              <div
                className={isDark ? 'trending-bg-dark' : 'trending-bg-light'}
              >
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
                          <HiFire className="header-icon" />
                        </div>
                        <h1
                          className={
                            isDark ? 'header-dark' : 'header-light-theme'
                          }
                        >
                          Trending
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

export default Trending
