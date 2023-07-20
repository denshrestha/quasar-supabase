<template>
  <div class="q-pa-md full-width shadow-2" style="max-width: 500px">
    <p class="q-mb-lg text-h5 text-weight-bold text-center text-primary">Welcome back!</p>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        v-model="email"
        label="Your E-mail *"
        hint="Valid email address (e.g., example@email.com)"
        lazy-rules
        dense
        :rules="[
          (val = '') => val?.length > 0 || 'Please type something',
          (val = '') => val?.match(re)
            || 'Should be a valid email address (e.g., example@email.com)'
        ]"
      />

      <q-input
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
        dense
        :rules="[
          val => val !== null && val !== '' || 'This field i required'
        ]"
      />

      <q-checkbox dense v-model="accept" label="Remember me" />

      <div class="row">
        <q-btn
        block
        label="Login"
        type="submit"
        unelevated
        rounded
        color="primary"
        class="col-12"
         />
        <q-btn
        label="Register"
        color="primary"
        outline
        rounded
        to="/auth/register"
        class="q-mt-sm col-12"
         />
      </div>
    </q-form>

  </div>
</template>
<script setup lang="ts">
import { useUserAuthStore } from 'stores/user-store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { login } = useUserAuthStore();
const router = useRouter();
const accept = ref(false);
const password = ref('');
const email = ref('');

// eslint-disable-next-line no-useless-escape
const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const onSubmit = async () => {
  const data = { email: email.value, password: password.value };
  const result = await login(data);
  if (result) router.push('/');
};
</script>
