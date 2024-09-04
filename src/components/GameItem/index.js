import {Link} from 'react-router-dom'
import './index.css'

import NxtWatchContext from '../../context/NxtWatchContext'

const GameItem = ({details}) => {
  const {id, thumbnailUrl, title, viewCount} = details
  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <Link to={`/videos/${id}`} className="nav-link-gaming">
            <li className="game-list-item">
              <img
                src={thumbnailUrl}
                className="game-thumbnail"
                alt="video thumbnail"
              />
              <p className={isDark ? 'title title-dark' : 'title title-light'}>
                {title}
              </p>
              <p className={isDark ? 'name name-dark' : 'name name-light'}>
                {viewCount} Watching Worldwide
              </p>
            </li>
          </Link>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default GameItem
