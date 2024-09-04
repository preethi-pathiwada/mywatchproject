import {Component} from 'react'
import {IoClose} from 'react-icons/io5'
import './index.css'
import {BannerContainer} from './styledComponents'

class Banner extends Component {
  state = {bannerOpen: true}

  closeButton = () => {
    this.setState({bannerOpen: false})
  }

  render() {
    const {bannerOpen} = this.state
    return (
      <BannerContainer bannerOpen={bannerOpen} data-testid="banner">
        <button
          type="button"
          className="nav-button close-button"
          onClick={this.closeButton}
          data-testid="close"
          aria-label="close"
        >
          <IoClose className="banner-close" />
        </button>
        <div className="banner-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="header-logo"
            alt="nxt watch logo"
          />
          <p className="banner-heading">Buy Nxt Watch Premium with the UPI</p>
          <button type="button" className="banner-button">
            GET IT NOW
          </button>
        </div>
      </BannerContainer>
    )
  }
}

export default Banner
