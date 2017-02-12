import React from 'react'
import { shallow } from 'enzyme'
import ImageList from '../../components/ImageList'

describe('/ImageList', () => {

  it('renders a list of images', () => {
    const images = [
      {objectId: 1, thumbnail: 'a.jpg'},
      {objectId: 2, thumbnail: 'b.jpg'},
      {objectId: 3, thumbnail: 'c.jpg'},
      {objectId: 4, thumbnail: 'd.jpg'},
    ]

    const imageList = shallow(
      <ImageList images={images} />
    )

    expect(imageList.find('img').length).toEqual(4)
  })
})
