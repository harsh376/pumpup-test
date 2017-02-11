import React from 'react'
import UserInfo from '../UserInfo/UserInfo'

require('./stylesheets/App.scss')
require('../UserInfo/stylesheets/UserInfo.scss')

function App(props) {
  return (
    <div className="app-container">
      <UserInfo />
    </div>
  )
}

export default App
