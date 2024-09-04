import React from 'react'

const NxtWatchContext = React.createContext({
  isDark: false,
  changeTheme: () => {},
  savedVideosList: [],
  saveVideo: () => {},
  saved: false,
})

export default NxtWatchContext
