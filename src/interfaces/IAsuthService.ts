import {
  Provider,
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
  UserAttributes,
} from '@supabase/supabase-js';

export interface IAuthService {
  login(payload: SignInWithPasswordCredentials): Promise<{
    user: User;
    session: Session;
  }>;
  loginWithSocialProvider(providerValue: Provider): Promise<{
    provider: Provider;
    url: string;
  }>;
  logout(): Promise<boolean>;
  register(payload: SignUpWithPasswordCredentials): Promise<{
    user: User | null;
    session: Session | null;
  }>;
  update(payload: UserAttributes): Promise<User | null>;
  sendPasswordRestEmail(email: string): Promise<object | null>;
  getSession(): Promise<Session | null>;
  setSession({
    access_token,
    refresh_token,
  }: {
    access_token: string;
    refresh_token: string;
  }): Promise<{
    user: User | null;
    session: Session | null;
  }>;
  refreshToken(refresh_token: string): Promise<{
    user: User | null;
    session: Session | null;
  }>;
  getSessionUser(): Promise<User | null>;
}
