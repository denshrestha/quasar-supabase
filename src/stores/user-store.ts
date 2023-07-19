import { defineStore } from 'pinia';
import useSupabase from 'boot/supabase';
import { computed, ref } from 'vue';
import { Provider, SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';

export const useUserAuthStore = defineStore('counter', () => {
  const { supabase } = useSupabase();

  const user = ref(null);

  const getUser = computed(() => user.value);

  const isLoggedIn = computed(() => !!user.value);

  const login = async ({ email, password }: SignInWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const loginWithSocialProvider = async (providerValue: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: providerValue,
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const register = async ({ email, password, ...options }: SignUpWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            ...options,
          },
        },
      },
    );

    if (error) throw error;
    return data;
  };

  const update = async (payload: any) => {
    const { data, error } = await supabase.auth.updateUser(payload);

    if (error) throw error;
    return data;
  };

  const sendPasswordRestEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) throw error;
    return data;
  };

  return {
    user,
    getUser,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    logout,
  };
});
