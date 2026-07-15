import { BaseAPI } from './base-api';

export type UpdateProfileRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UpdateProfileResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  phone: string;
  login: string;
  avatar: string | null;
  email: string;
};

export type UpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

class UserAPI extends BaseAPI {
  updateProfile<UpdateProfileResponse>(request: UpdateProfileRequest) {
    return this.put<UpdateProfileResponse>('/profile', {
      data: request,
    });
  }

  updateAvatar<UpdateProfileResponse>(request: FormData) {
    return this.put<UpdateProfileResponse>('/profile/avatar', {
      data: request,
    });
  }

  updatePassword(request: UpdatePasswordRequest) {
    return this.put('/password', { data: request });
  }
}

export default new UserAPI('user');
