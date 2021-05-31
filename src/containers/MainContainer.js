import { connect } from 'react-redux'
import Main from '../components/Main'
import { updateUser } from '../actions/user'

const mapStateToProps = state => ({
  user: state.user,
  nutrient_norms: state.dictionary.nutrient_norms,
  products: state.dictionary.products,
  product_categories: state.dictionary.product_categories
})

export default connect(mapStateToProps, { updateUser })(Main)