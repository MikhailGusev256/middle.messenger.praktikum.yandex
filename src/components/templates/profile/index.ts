import type { User } from '../../../services/user/user.ts';
import { connect } from '../../core/connect.ts';
import './profile.scss';
import Profile from './profile.ts';

export default connect(Profile, (state) => ({
  user: state['user'] as User,
}));
