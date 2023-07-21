<template>
  <q-layout view="lHh Lpr lFf">
    <header-component
      :user="me"
      @toggle-left-drawer="toggleLeftDrawer"
    />
    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      mini
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <div
          v-for="link in 10"
          :key="link"
        >{{ link }}</div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-skeleton height="200px" square />
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import HeaderComponent from 'components/layout/HeaderComponent.vue';
import { useUserStore } from '../stores/user-store';
import { useAuthStore } from '../stores/auth-store';

const userStore = useUserStore();
const authStore = useAuthStore();
const { getUser: user } = storeToRefs(userStore);
const { getUser } = storeToRefs(authStore);

const me = computed(() => user.value);
const userData = computed(() => getUser.value);

if (userData.value) await userStore.getMe(userData.value.id);

console.log('🚀 ~ file: MainLayout.vue:44 ~ user:', user.value);
const drawer = ref(false);

function toggleLeftDrawer() {
  drawer.value = !drawer.value;
}
</script>
