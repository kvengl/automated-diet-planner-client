import { connect } from 'react-redux'
import Main from '../components/Main'
import { updateUser } from '../actions/user'

const mapStateToProps = state => ({
    user: state.user
  })  

export default connect(mapStateToProps, { updateUser })(Main)