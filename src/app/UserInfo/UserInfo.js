import React from 'react'
import { connect } from 'react-redux'
import { fetchUserInfo } from './actions/action_creators'


export class UserInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUserInfo()
  }

  render() {
    return (
      <div className="some">This is some Component</div>
    )
  }
}

UserInfo.propTypes = {
  isFetching: React.PropTypes.bool,
  data: React.PropTypes.object,
  error: React.PropTypes.string,
  fetchUserInfo: React.PropTypes.func,
}

function mapStateToProps(state) {
  const { UserInfo } = state
  return {
    isFetching: UserInfo.isFetching,
    data: UserInfo.data,
    error: UserInfo.error,
  }
}

export default connect(mapStateToProps, {
  fetchUserInfo,
})(UserInfo)
