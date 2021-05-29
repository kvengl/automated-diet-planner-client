import { connect } from 'react-redux'
import App from './App'
import { userRefresh, clearStore } from './actions/user'

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { userRefresh, clearStore })(App)