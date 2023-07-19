<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserAuthStore } from './stores/user-store';

const router = useRouter();
const { isLoggedIn } = useUserAuthStore();

if (!isLoggedIn) router.push('/auth');
</script>
