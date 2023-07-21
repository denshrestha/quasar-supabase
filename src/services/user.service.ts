import { SupabaseClient } from '@supabase/supabase-js';
import useSupabase from 'boot/supabase';
import { UserServiceInterface } from '../interfaces';
import { User } from '../types';

const { supabase } = useSupabase();

class UserService implements UserServiceInterface {
  api: SupabaseClient;

  constructor(api: SupabaseClient) {
    this.api = api;
  }

  async create(payload: Partial<User>) {
    const { data, error } = await this.api
      .from('users')
      .insert({
        id: payload.id,
        username: payload.username,
        full_name: payload.full_name,
        email: payload.email,
        avatar: payload.avatar || '',
      })
      .select();

    if (error) throw error;

    return data[0];
  }

  async getUser(id: string) {
    const { data, error } = await this.api
      .from('users')
      .select()
      .eq('id', id);

    if (error) throw error;

    return data[0];
  }

  async getAll() {
    const { data, error } = await this.api
      .from('users')
      .select('*');

    if (error) throw error;

    return data;
  }

  async update(id: string, payload: Partial<User>) {
    const { data, error } = await this.api
      .from('users')
      .update(payload)
      .eq('id', id)
      .select();

    if (error) throw error;

    return data[0] as User;
  }

  async delete(id: string) {
    const { error } = await this.api
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return true;
  }
}

export default new UserService(supabase);
