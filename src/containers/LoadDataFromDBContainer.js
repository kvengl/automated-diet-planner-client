import { connect } from 'react-redux'
import LoadDataFromDB from '../components/LoadDataFromDB'
import { getNutrientNorms, getProducts, getProductCategories } from '../actions/dictionary'

const mapStateToProps = state => ({
  user: state.user,
  nutrient_norms: state.dictionary.nutrient_norms,
  products: state.dictionary.products,
  product_categories: state.dictionary.product_categories
})

export default connect(mapStateToProps, { getNutrientNorms, getProducts, getProductCategories })(LoadDataFromDB)