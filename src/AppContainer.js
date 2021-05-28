import { connect } from 'react-redux'
import App from './App'
import { userRefresh } from './actions/user'

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { userRefresh })(App)