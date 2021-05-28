import { connect } from 'react-redux'
import UserRegister from '../components/UserRegister'
import { createUser } from '../actions/user'

export default connect(null, { createUser })(UserRegister)