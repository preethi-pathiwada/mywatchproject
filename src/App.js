import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import './App.css'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import NxtWatchContext from './context/NxtWatchContext'

// Replace your code here
class App extends Component {
  state = {isDark: false, savedVideosList: [], saved: false}

  changeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  saveVideo = item => {
    const {savedVideosList} = this.state
    const videoItem = savedVideosList.find(obj => obj.id === item.id)
    if (videoItem === undefined && item.saved) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, item],
        saved: !prevState.saved,
      }))
    } else {
      const filteredList = savedVideosList.filter(obj => obj.id !== item.id)
      this.setState(prevState => ({
        savedVideosList: filteredList,
        saved: !prevState.saved,
      }))
    }
  }

  render() {
    const {isDark, savedVideosList, saved} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          isDark,
          changeTheme: this.changeTheme,
          savedVideosList,
          saveVideo: this.saveVideo,
          saved,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route component={NotFound} />
          </Switch>
        </>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
