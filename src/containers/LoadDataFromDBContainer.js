import { connect } from 'react-redux'
import LoadDataFromDB from '../components/LoadDataFromDB'
import { getNutrientNorms } from '../actions/dictionary'

const mapStateToProps = state => ({
  user: state.user,
  nutrient_norms: state.dictionary.nutrient_norms
})

export default connect(mapStateToProps, { getNutrientNorms })(LoadDataFromDB)
