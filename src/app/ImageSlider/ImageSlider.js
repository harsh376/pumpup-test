import React from 'react'
import { connect } from 'react-redux'
import { fetchImages } from './actions/actionCreators'

export class ImageSlider extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchImages()
  }

  render() {
    return (
      <div>
        {this.props.isFetching && (
          <div>
            Fetching images
          </div>
        )}

        {!this.props.isFetching && this.props.data.length && (
          <div className="ImageSliderContainer">
            <img
              className="image-current"
              src={this.props.data[4].thumbnail}
            />
            <div className="image-selector">
            </div>
          </div>
        )}
      </div>
    )
  }
}

ImageSlider.propTypes = {
  isFetching: React.PropTypes.bool,
  data: React.PropTypes.array,
  error: React.PropTypes.string,
  fetchImages: React.PropTypes.func,
}

function mapStateToProps(state) {
  const { ImageSlider } = state
  return {
    isFetching: ImageSlider.isFetching || false,
    data: ImageSlider.data || [],
    error: ImageSlider.error || null,
  }
}

export default connect(mapStateToProps, {
  fetchImages,
})(ImageSlider)
