import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import SideNavbar from '../SideNavbar'
import Banner from '../Banner'
import VideoItem from '../VideoItem'
import NxtWatchContext from '../../context/NxtWatchContext'
import {Container} from './styledComponents'

class Home extends Component {
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
      `https://apis.ccbp.in/videos/all?search=${searchInput}`,
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

  returnSuccessView = isDark => {
    const {videosList} = this.state
    if (videosList.length > 0) {
      return (
        <ul className="videos-list-container">
          {videosList.map(obj => (
            <VideoItem key={obj.id} details={obj} />
          ))}
        </ul>
      )
    }
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          className="failure-image"
          alt="no videos"
        />
        <h1
          className={isDark ? 'side-contact side-contact-dark' : 'side-contact'}
        >
          No Search Results Found
        </h1>
        <p
          className={
            isDark ? 'side-text side-text-dark' : 'side-text side-text-light'
          }
        >
          Try different key words or remove search filter
        </p>
        <button className="retry-button" onClick={this.retry}>
          Retry
        </button>
      </>
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

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    this.getVideos()
  }

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
    const {videosList, searchInput} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <Container data-testid="home" isDark={isDark}>
                <Header />

                <div className="home-container">
                  <SideNavbar />
                  <div className="common-container">
                    <Banner />
                    <div className="results-container">
                      <div className="search-container">
                        <input
                          type="search"
                          value={searchInput}
                          className={
                            isDark
                              ? 'search-input search-input-dark'
                              : 'search-input'
                          }
                          placeholder="Search"
                          onChange={this.onChangeInput}
                        />
                        <button
                          type="button"
                          data-testid="searchButton"
                          onClick={this.onClickSearch}
                          className={
                            isDark
                              ? 'search-icon-button search-icon-button-dark'
                              : 'search-icon-button'
                          }
                          aria-label="Search"
                        >
                          <BsSearch
                            className={
                              isDark ? 'search-icon-dark' : 'search-icon'
                            }
                          />
                        </button>
                      </div>
                      {this.renderVideos(isDark)}
                    </div>
                  </div>
                </div>
              </Container>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
