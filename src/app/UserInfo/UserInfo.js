import React from 'react'
import { connect } from 'react-redux'
import { fetchUserInfo } from './actions/actionCreators'

export class UserInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUserInfo()
  }

  render() {
    return (
      <div>
        {this.props.isFetching && (
          <div className="UserInfoFetching">
            Fetching user info
          </div>
        )}

        {!this.props.isFetching && (
          <div className="UserInfoContainer">
            <div className="left">
              <img
                className="profile-pic"
                src={this.props.data.profileThumbnail}
                alt="Profile Photo"
              />
            </div>
            <div className="right">
              <h4>{this.props.data.name}</h4>
              <div className="bio">{this.props.data.bio}</div>
            </div>
          </div>
        )}
      </div>
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
    isFetching: UserInfo.isFetching || false,
    data: UserInfo.data || {},
    error: UserInfo.error || null,
  }
}

export default connect(mapStateToProps, {
  fetchUserInfo,
})(UserInfo)
