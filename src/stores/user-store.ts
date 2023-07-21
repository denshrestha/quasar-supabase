/* eslint-disable @typescript-eslint/no-shadow */
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { User } from '../types';
import { UserService } from '../services';

export const useUserStore = defineStore('user', () => {
  // STATE
  const user = ref<User | null>(null);
  const users = ref<User[] | []>([]);

  // GETTERS
  const getUser = computed(() => user.value);
  const getUsers = computed(() => users.value);

  // ACTIONS
  const create = async (payload: Partial<User>) => {
    user.value = await UserService.create(payload);
  };

  const getMe = async (id: string) => {
    user.value = await UserService.getUser(id);
  };

  const fetchAllUsers = async () => {
    users.value = await UserService.getAll();
  };

  const deleteUser = async (id: string) => {
    const result = await UserService.delete(id);
    if (result) {
      const userIndex = users.value.findIndex((user: User) => user.id === id);
      if (userIndex > -1) {
        users.value.splice(userIndex, 1);
      }

      if (id === user.value?.id) {
        user.value = null;
      }
    }
  };

  const updateUser = async (id: string, payload: Partial<User>) => {
    const updateData = await UserService.update(id, payload);
    if (updateData) {
      const userIndex = users.value.findIndex((user: User) => user.id === id);
      if (userIndex > -1) {
        users.value.splice(userIndex, 1, updateData);
      }

      if (id === user.value?.id) {
        user.value = updateData;
      }
    }
  };

  // WATCHER
  watch(user, (val) => {
    console.log('🚀 ~ file: user-store.ts:20 ~ watch ~ val:', val);
  });

  return {
    getUser,
    getUsers,
    create,
    getMe,
    fetchAllUsers,
    deleteUser,
    updateUser,
  };
});
