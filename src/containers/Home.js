import { connect } from 'react-redux'
import Home from '../components/Home'
import { clearStore } from '../actions/user'

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { clearStore })(Home)