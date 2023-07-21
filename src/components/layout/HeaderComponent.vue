<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$emit('toggleLeftDrawer')"
      />

      <q-toolbar-title>
        App
      </q-toolbar-title>

      <div class="row">
        <p class="q-mb-none">{{ user.full_name }}</p>
        <p class="q-ml-sm q-mb-none text-right">({{ user.username }})</p>
      </div>
      </q-toolbar>
    </q-header>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    user: {
      full_name?: string;
      username?: string;
      email: string;
    }
    }>(),
  {
    user: () => ({
      full_name: '',
      username: '',
      email: '',
    }),
  },
);

defineEmits<{(event: 'toggleLeftDrawer'): void}>();
</script>
