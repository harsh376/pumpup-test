import React from 'react'
import { connect } from 'react-redux'
import { fetchImages } from './actions/actionCreators'
import ImageList from './components/ImageList'

export class ImagesGrid extends React.Component {
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
          <ImageList images={this.props.data} />
        )}
      </div>
    )
  }
}

ImagesGrid.propTypes = {
  isFetching: React.PropTypes.bool,
  data: React.PropTypes.array,
  error: React.PropTypes.string,
  fetchImages: React.PropTypes.func,
}

function mapStateToProps(state) {
  const { ImagesGrid } = state
  return {
    isFetching: ImagesGrid.isFetching || false,
    data: ImagesGrid.data || [],
    error: ImagesGrid.error || null,
  }
}

export default connect(mapStateToProps, {
  fetchImages,
})(ImagesGrid)
