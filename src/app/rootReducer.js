import { combineReducers } from 'redux'
import UserInfo from './UserInfo/reducers/reducers'
import ImageSlider from './ImageSlider/reducers/reducers'
import ImagesGrid from './ImagesGrid/reducers/reducers'


export default combineReducers({
  UserInfo,
  ImageSlider,
  ImagesGrid,
})
