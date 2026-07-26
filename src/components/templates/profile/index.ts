import { selectUser } from '../../../services/user/user-selectors.ts';
import { connect } from '../../core/connect.ts';
import './profile.scss';
import Profile from './profile.ts';

export default connect(Profile, (state) => ({
  user: selectUser(state),
}));
