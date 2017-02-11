import React from 'react'
import { connect } from 'react-redux'
import {
  initImages,
  fetchImages,
  updateSelectedImage,
} from './actions/actionCreators'

import leftArrow from './static/left.png'
import rightArrow from './static/right.png'

const getButtonClassname = ((selectedImageIndex, index) => {
  return `button-selector ${selectedImageIndex === index ? 'selected': ''}`
})

export class ImageSlider extends React.Component {
  constructor(props) {
    super(props)
    this.props.initImages()
  }

  componentDidMount() {
    this.props.fetchImages()
  }

  render() {
    const { images, selectedImageIndex, updateSelectedImage } = this.props
    return (
      <div className="ImageSlider">

        {images.length && (
          <div className="image-current-container">
            <img
              className="image-current"
              src={images[selectedImageIndex].thumbnail}
            />

            <span
              className="left-arrow"
              onClick={() => updateSelectedImage(selectedImageIndex-1)}
            >
              <img className="image-arrow" src={leftArrow} />
            </span>

            <span
              className="right-arrow"
              onClick={() => updateSelectedImage(selectedImageIndex+1)}
            >
              <img className="image-arrow" src={rightArrow} />
            </span>
          </div>
        )}

        <div className="image-selector">
          {images.map((image, index) => (
            <button
              className={getButtonClassname(selectedImageIndex, index)}
              key={index}
              onClick={() => updateSelectedImage(index)}
            />
          ))}
        </div>
      </div>
    )
  }
}

ImageSlider.propTypes = {
  isFetching: React.PropTypes.bool,
  images: React.PropTypes.array,
  selectedImageIndex: React.PropTypes.number,
  error: React.PropTypes.string,
  initImages: React.PropTypes.func,
  fetchImages: React.PropTypes.func,
  updateSelectedImage: React.PropTypes.func,
}

function mapStateToProps(state) {
  const { ImageSlider } = state
  return {
    isFetching: ImageSlider.isFetching || false,
    images: ImageSlider.images || [],
    selectedImageIndex: ImageSlider.selectedImageIndex || 0,
    error: ImageSlider.error || null,
  }
}

export default connect(mapStateToProps, {
  initImages,
  fetchImages,
  updateSelectedImage,
})(ImageSlider)
