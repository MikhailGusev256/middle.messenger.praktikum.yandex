import { BaseAPI } from './base-api.ts';

export type SignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpResponse = {
  id: number;
};

export type SignInRequest = {
  login: string;
  password: string;
};

export type UserResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  phone: string;
  login: string;
  avatar: string | null;
  email: string;
};

class AuthAPI extends BaseAPI {
  register(request: SignUpRequest) {
    return this.post<SignUpResponse>('/signup', {
      data: request,
    });
  }
  login(request: SignInRequest) {
    return this.post('/signin', {
      data: request,
    });
  }
  user() {
    return this.get<UserResponse>('/user');
  }
  logout() {
    return this.post('/logout');
  }
}

export default new AuthAPI('auth');
