import { connect } from 'react-redux'
import FoodPlan from '../components/FoodPlan'
import { updateUser } from '../actions/user'
import { start_optimization } from '../actions/optimization'

const mapStateToProps = state => ({
    user: state.user,
    true_products: state.user.data.diet_settings.true_products,
    products: state.dictionary.products,
    optimal_products: state.optimization.optimal_products,
    status: state.optimization.status
})

export default connect(mapStateToProps, { updateUser, start_optimization })(FoodPlan)