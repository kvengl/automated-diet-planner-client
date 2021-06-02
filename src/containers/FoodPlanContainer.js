import { connect } from 'react-redux'
import FoodPlan from '../components/FoodPlan'
import { updateUser } from '../actions/user'

const mapStateToProps = state => ({
    user: state.user,
    true_products: state.user.data.diet_settings.true_products,
    products: state.dictionary.products
})

export default connect(mapStateToProps, { updateUser })(FoodPlan)