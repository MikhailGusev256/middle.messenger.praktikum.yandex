import authApi, { type SignUpRequest } from '../../api/auth-api.ts';
import userApi from '../../api/user-api.ts';
import router from '../../router/router.ts';
import store from '../../store/store.ts';
import { toUser } from './user.ts';

class UserService {
  public async login(login: string, password: string) {
    await authApi.login({ login: login, password: password });
    await this.fetchUser();
    router.instance().go('chats');
  }

  public async fetchUser() {
    const data = await authApi.user();
    const user = toUser(data);
    store.setState('user', user);
  }

  public async register(request: SignUpRequest) {
    const response = await authApi.register(request);
    console.log(response);
    await this.fetchUser();
    router.instance().go('chats');
  }

  public async logout() {
    await authApi.logout();
    store.setState('user', null);
    router.instance().go('login');
  }

  public async updatePassword(oldPassword: string, newPassword: string) {
    await userApi.updatePassword({ oldPassword, newPassword });
  }

  public async updateProfile(
    email: string,
    login: string,
    firstName: string,
    secondName: string,
    displayName: string,
    phone: string,
  ) {
    await userApi.updateProfile({
      email,
      login,
      first_name: firstName,
      second_name: secondName,
      display_name: displayName,
      phone,
    });
    await this.fetchUser();
  }

  public async updateAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    await userApi.updateAvatar(formData);
    await this.fetchUser();
  }

  public getUsersByLogin(login: string) {
    return userApi.search({ login });
  }
}

export default new UserService();
