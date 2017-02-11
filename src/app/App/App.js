import React from 'react'
import UserInfo from '../UserInfo/UserInfo'
import ImageSlider from '../ImageSlider/ImageSlider'
import ImagesGrid from '../ImagesGrid/ImagesGrid'

require('./stylesheets/App.scss')
require('../UserInfo/stylesheets/UserInfo.scss')
require('../ImageSlider/stylesheets/ImageSlider.scss')
require('../ImagesGrid/stylesheets/ImagesGrid.scss')

function App(props) {
  return (
    <div className="app-container">
      <UserInfo />
      <ImageSlider />
      <ImagesGrid />
    </div>
  )
}

export default App
