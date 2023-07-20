<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
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
import { storeToRefs } from 'pinia';
import { QSpinnerGears, useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserAuthStore } from '../stores/user-store';

const $q = useQuasar();
console.log('🚀 ~ file: MainLayout.vue:56 ~ q:', $q);
const router = useRouter();
const store = useUserAuthStore();
const { getUser } = storeToRefs(store);

if (!getUser.value) {
  $q.loading.show({
    spinner: QSpinnerGears,
    spinnerColor: 'red',
    messageColor: 'black',
    backgroundColor: 'yellow',
    message: 'Updated message',
  });
  await store.getSessionUser();
  $q.loading?.hide();
}
if (!getUser.value) router.push('/auth');
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
