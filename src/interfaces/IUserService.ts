import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '../types';

export interface UserServiceInterface {
  api: SupabaseClient;
  create(payload: Partial<User>): Promise<User>;
  getUser(id: string): Promise<User>;
  getAll(): Promise<User[]>;
  update(id: string, payload: Partial<User>): Promise<User[]>;
  delete(id: string): Promise<boolean>;
}
