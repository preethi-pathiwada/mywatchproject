import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import './index.css'

import NxtWatchContext from '../../context/NxtWatchContext'

const VideoItem = ({details, trending}) => {
  const {id, title, thumbnailUrl, publishedAt, viewCount, channel} = details
  const {name, profileImageUrl} = channel
  const getDate = () => {
    const result = formatDistanceToNow(new Date(publishedAt), {addSuffix: true})
    const arr = result.split(' ')
    const duration = arr.slice(1, 4).join(' ')
    //  if (title.includes("Innovation drives India into future") ){
    //    console.log(publishedAt)
    //   console.log(new Date(publishedAt))
    //  }
    return duration
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const duration = getDate()
        return (
          <li className={trending ? 'list-item-trending' : 'list-item'}>
            <Link
              to={`/videos/${id}`}
              className={!trending ? 'nav-link' : 'nav-link-home'}
            >
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className={
                  trending ? 'trending-thumbnail-image' : 'thumbnail-image'
                }
              />
              <div className="details-container">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className={
                    trending
                      ? 'profile-channel-image-trending'
                      : 'profile-channel-image'
                  }
                />
                <div className="about-container">
                  {!trending && (
                    <p
                      className={
                        isDark ? 'title title-dark' : 'title title-light'
                      }
                    >
                      {title}
                    </p>
                  )}
                  <div className="views-con">
                    <p
                      className={isDark ? 'name name-dark' : 'name name-light'}
                    >
                      {name}
                    </p>

                    {!trending ? (
                      <BsDot
                        className={isDark ? 'dot-icon-dark' : 'dot-icon-light'}
                      />
                    ) : null}
                    <p
                      className={isDark ? 'name name-dark' : 'name name-light'}
                    >
                      {viewCount} views
                    </p>

                    <BsDot
                      className={isDark ? 'dot-icon-dark' : 'dot-icon-light'}
                    />

                    <p
                      className={isDark ? 'name name-dark' : 'name name-light'}
                    >
                      {duration}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default VideoItem
