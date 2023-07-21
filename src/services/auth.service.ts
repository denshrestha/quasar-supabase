/* eslint-disable camelcase */
import {
  AuthResponse,
  AuthTokenResponse,
  OAuthResponse,
  Provider,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  SupabaseClient,
  UserAttributes,
  UserResponse,
} from '@supabase/supabase-js';
import useSupabase from 'boot/supabase';
import { IAuthService } from '../interfaces';

const { supabase } = useSupabase();

class AuthService implements IAuthService {
  api: SupabaseClient;

  constructor(api: SupabaseClient) {
    this.api = api;
  }

  async login(payload: SignInWithPasswordCredentials) {
    const { data, error }: AuthTokenResponse = await this.api.auth.signInWithPassword(payload);

    if (error) throw error;

    return data;
  }

  async loginWithSocialProvider(providerValue: Provider) {
    const { data, error }: OAuthResponse = await this.api.auth.signInWithOAuth({
      provider: providerValue,
    });
    if (error) throw error;
    return data;
  }

  async logout() {
    const { error } = await this.api.auth.signOut();
    if (error) throw error;
    return true;
  }

  async register(payload: SignUpWithPasswordCredentials) {
    const { data, error }: AuthResponse = await this.api.auth.signUp(
      payload,
    );

    if (error) throw error;

    return data;
  }

  async update(payload: UserAttributes) {
    const { data: { user }, error }: UserResponse = await this.api.auth.updateUser(payload);

    if (error) throw error;

    return user;
  }

  async sendPasswordRestEmail(email: string) {
    const { data, error } = await this.api.auth.resetPasswordForEmail(email);

    if (error) throw error;
    return data;
  }

  async getSession() {
    const { data: { session }, error } = await this.api.auth.getSession();

    if (error) throw error;

    return session;
  }

  async setSession(
    {
      access_token,
      refresh_token,
    } : {
      access_token: string,
      refresh_token: string
    },
  ) {
    const { data, error }: AuthResponse = await this.api.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) throw error;

    return data;
  }

  async refreshToken(refresh_token: string) {
    const { data, error } = await this.api.auth.refreshSession({ refresh_token });

    if (error) throw error;

    return data;
  }

  async getSessionUser() {
    const { data: { user }, error } = await this.api.auth.getUser();

    if (error) throw error;

    return user;
  }
}

export default new AuthService(supabase);
