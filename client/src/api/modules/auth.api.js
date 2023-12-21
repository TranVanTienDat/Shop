import privateClient from '../client/private.client';
import publicClient from '../client/public.client';

const authEndpoints = {
  signUp: 'user/sign-up',
  signIn: 'user/sign-in',
  updateUser: 'user/update-user',
  updatePassword: 'user/update-password',
  forgotPassword: 'user/forgot-password',
  resetPassword: 'user/reset-password',
  remoteUser: 'user/remote-user',
  getInfo: 'user/get-user',
};

const userApi = {
  signIn: async (payload) => {
    try {
      const res = await publicClient.post(authEndpoints.signIn, payload);

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },

  signUp: async (payload) => {
    try {
      const res = await publicClient.post(authEndpoints.signUp, payload);

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
  forgotPassword: async (payload) => {
    try {
      const res = await publicClient.post(
        authEndpoints.forgotPassword,
        payload
      );

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
  resetPassword: async (payload) => {
    try {
      const res = await publicClient.post(authEndpoints.resetPassword, payload);

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },

  updateUser: async (payload) => {
    try {
      const res = await privateClient.put(authEndpoints.updateUser, payload);

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
  updatePassword: async (payload) => {
    try {
      const res = await privateClient.put(
        authEndpoints.updatePassword,
        payload
      );

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
  remoteUser: async () => {
    try {
      const res = await privateClient.delete(authEndpoints.remoteUser);

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
  getInfoUser: async () => {
    try {
      const res = await privateClient.get(authEndpoints.getInfo);

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
};

export default userApi;
