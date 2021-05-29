import { connect } from 'react-redux'
import UserProfile from '../components/UserProfile'
import { updateUser } from '../actions/user'

const mapStateToProps = state => ({
    user: state.user
  })  

export default connect(mapStateToProps, { updateUser })(UserProfile)