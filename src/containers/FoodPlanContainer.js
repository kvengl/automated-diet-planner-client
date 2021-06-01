import { connect } from 'react-redux'
import FoodPlan from '../components/FoodPlan'
import { clearStore } from '../actions/user'

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { clearStore })(FoodPlan)