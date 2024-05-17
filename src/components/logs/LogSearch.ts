import { getSearchText, updateSearchText } from '../../store/logs';
import { connect } from '../StateProvider';
import Search from './GeneralSearch';

const mapState = (s) => ({ searchText: getSearchText(s), updateSearchText });
export default connect(mapState)(Search);
