import { connect } from 'react-redux'
import UserLogin from '../components/UserLogin'
import { userLogin } from '../actions/user'

export default connect(null, { userLogin })(UserLogin)