import React from 'react'
import { shallow } from 'enzyme'
import { UserInfo } from '../UserInfo'

function setup() {
  const props = {
    addItem: jest.fn(),
  }

  const enzymeWrapper = shallow(<UserInfo {...props} />)

  return {
    props,
    enzymeWrapper,
  }
}


describe('UserInfo', () => {
  it('Does something', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('.some').text()).toEqual('This is some Component')
  })
})
