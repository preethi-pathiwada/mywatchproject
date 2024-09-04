import ReactPlayer from 'react-player'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import './index.css'
import Header from '../Header'
import SideNavbar from '../SideNavbar'
import NxtWatchContext from '../../context/NxtWatchContext'
import {Container, Button} from './styledComponents'

class VideoItemDetails extends Component {
  state = {
    item: {},
    apiStatus: 'inProgress',
    liked: false,
    disliked: false,
  }

  componentDidMount() {
    this.getItem()
  }

  getItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
    }

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    if (response.ok) {
      const data = await response.json()
      const obj = data.video_details
      const updatedItem = {
        id: obj.id,
        channel: {
          name: obj.channel.name,
          profileImageUrl: obj.channel.profile_image_url,
          subscriberCount: obj.channel.subscriber_count,
        },
        title: obj.title,
        description: obj.description,
        viewCount: obj.view_count,
        thumbnailUrl: obj.thumbnail_url,
        videoUrl: obj.video_url,
        publishedAt: obj.published_at,
      }

      this.setState({item: updatedItem, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  retry = () => {
    this.setState({apiStatus: 'inProgress'}, this.getItem)
  }

  handleClick = type => {
    if (type === 'like') {
      this.setState(prevState => ({
        liked: !prevState.liked,
        disliked: prevState.disliked && false,
      }))
    } else if (type === 'dislike') {
      this.setState(prevState => ({
        disliked: !prevState.disliked,
        liked: prevState.liked && false,
      }))
    }
  }

  clickSave = (saveVideo, saved) => {
    const {item} = this.state
    saveVideo({...item, saved: !saved})
  }

  getDuration = publishedAt => {
    const result = formatDistanceToNow(new Date(publishedAt), {addSuffix: true})
    const arr = result.split(' ')
    const duration = arr.slice(1, 4).join(' ')
    return duration
  }

  returnLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  returnSuccessView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark, saved, savedVideosList, saveVideo} = value
        const {item, liked, disliked} = this.state
        const {
          id,
          title,
          description,
          videoUrl,
          channel,
          publishedAt,
          viewCount,
          thumbnailUrl,
          subscriberCount,
        } = item
        const savedItem = savedVideosList.find(obj => obj.id === id)

        const {name, profileImageUrl} = channel
        const duration = this.getDuration(publishedAt)
        return (
          <>
            <ReactPlayer url={videoUrl} height="60%" width="100%" />
            <div className="video-details-con">
              <p className={isDark ? 'title title-dark' : 'title title-light'}>
                {title}
              </p>
              <div className="container2">
                <div className="container">
                  <p className={isDark ? 'name name-dark' : 'name name-light'}>
                    {viewCount} Views
                  </p>
                  <p className={isDark ? 'name name-dark' : 'name name-light'}>
                    {duration}
                  </p>
                </div>
                <div className="container1">
                  <Button like={liked} onClick={() => this.handleClick('like')}>
                    <BiLike className="icon" />
                    Like
                  </Button>
                  <Button
                    like={disliked}
                    onClick={() => this.handleClick('dislike')}
                  >
                    <BiDislike className="icon" />
                    Dislike
                  </Button>
                  <Button
                    like={savedItem !== undefined}
                    onClick={() => this.clickSave(saveVideo, saved)}
                  >
                    <BiListPlus className="icon" />
                    {savedItem === undefined ? 'Save' : 'Saved'}
                  </Button>
                </div>
              </div>
            </div>
            <div className="channel-container">
              <div className="container">
                <img
                  src={profileImageUrl}
                  className="thumbnail-video-item-image"
                  alt="channel logo"
                />
                <div className="container-column">
                  <p
                    className={
                      isDark ? 'title title-dark' : 'title title-light'
                    }
                  >
                    {name}
                  </p>
                  <p className={isDark ? 'name name-dark' : 'name name-light'}>
                    {subscriberCount}
                  </p>
                </div>
              </div>
              <p className={isDark ? 'name name-dark' : 'name name-light'}>
                {description}
              </p>
            </div>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

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
        We are having some trouble to complete your request. Please try again.
      </p>
      <button className="logout-desktop-btn" onClick={this.retry}>
        Retry
      </button>
    </>
  )

  returnItemDetails = (isDark, saveVideo, savedVideosList, saved) => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'inProgress':
        return this.returnLoader()
      case 'success':
        return this.returnSuccessView()
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
          const {isDark, saveVideo, savedVideosList, saved} = value

          return (
            <Container data-testid="videoItemDetails">
              <Header />
              <div className={isDark ? 'home-bg-dark' : 'home-bg-light'}>
                <div className="home-container">
                  <SideNavbar />
                  <div className="video-item-details-container">
                    {this.returnItemDetails(
                      isDark,
                      saveVideo,
                      savedVideosList,
                      saved,
                    )}
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
export default VideoItemDetails
