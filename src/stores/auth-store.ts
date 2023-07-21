/* eslint-disable camelcase */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  Provider,
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
  UserAttributes,
} from '@supabase/supabase-js';
import { AuthService } from '../services';

type DetaResponceType = {
  user: User | null,
  session: Session | null
}
type OAuthDataResponceType = {
  provider: Provider
  url: string
}

export const useAuthStore = defineStore('auth', () => {
  // STATE
  const user = ref<User | null>(null);
  const provider = ref<Provider | null>(null);
  const session = ref<Omit<Session, 'user'> | null>(null);

  // GETTERS
  const getUser = computed(() => user.value);

  const getSession = computed(() => session.value);

  const isLoggedIn = computed(() => !!getUser.value && !!getSession.value);

  // ACTIONS
  function $reset() {
    user.value = null;
    provider.value = null;
    session.value = null;
  }

  const setSession = async ({ access_token, refresh_token } : {
    access_token: string;
    refresh_token: string;
  }) => {
    const {
      user: userData,
      session: sessionData,
    } = await AuthService.setSession({ access_token, refresh_token });

    session.value = sessionData;
    user.value = userData;
  };

  const login = async ({ email, password }: SignInWithPasswordCredentials) => {
    const {
      user: userData,
      session: sessionData,
    }: DetaResponceType = await AuthService.login({ email, password });

    session.value = { ...sessionData };
    user.value = { ...userData };

    setSession({
      access_token: sessionData.access_token,
      refresh_token: sessionData.refresh_token,
    });

    return !!session.value && !!user.value;
  };

  const loginWithSocialProvider = async (providerValue: Provider) => {
    const {
      provider: providerData,
    }: OAuthDataResponceType = await AuthService.loginWithSocialProvider(providerValue);

    provider.value = providerData;

    return true;
  };

  const logout = async () => {
    const status = await AuthService.logout();

    if (status) $reset();

    return status;
  };

  const register = async ({ email, password, options }: SignUpWithPasswordCredentials) => {
    const {
      user: userData = null,
      session: sessionData = null,
    }: DetaResponceType = await AuthService.register(
      {
        email,
        password,
        ...options,
      },
    );

    session.value = sessionData;
    user.value = userData;

    return !!session.value || !!user.value;
  };

  // eslint-disable-next-line no-return-await
  const update = async (payload: UserAttributes) => await AuthService.update(payload);

  const sendPasswordRestEmail = async (email: string) => {
    const data = await AuthService.sendPasswordRestEmail(email);
    return data;
  };

  const getSessionUser = async () => {
    user.value = await AuthService.getSessionUser();
  };

  const updateSessionData = async () => {
    session.value = await AuthService.getSession();
  };

  return {
    user,
    getUser,
    getSession,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    logout,
    getSessionUser,
    updateSessionData,
  };
});
