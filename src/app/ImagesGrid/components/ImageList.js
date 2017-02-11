import React from 'react'

function ImageList({ images }) {
  const imageNodes = images.map(image =>
    <img
      key={image.objectId}
      className="image-single"
      src={image.thumbnail}
    />
  )

  return (
    <div className="ImagesGridContainer">
      {imageNodes}
    </div>
  )
}

ImageList.propTypes = {
  images: React.PropTypes.array,
}
ImageList.defaultProps = {
  images: [],
}

export default ImageList
