<template>
  <div class="q-pa-sm full-width shadow-2" style="max-width: 500px">
    <p class="q-my-lg text-h5 text-weight-bold text-center text-primary">Create an Account</p>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-lg row justify-center items-center"
    >
      <q-input
        v-model="email"
        label="First name *"
        lazy-rules
        dense
        :rules="[(val = '') => val?.length > 0 || 'Please type something']"
        class="col-5"
      />
      <q-input
        v-model="email"
        label="Last name *"
        lazy-rules
        dense
        :rules="[
          (val = '') => val?.length > 0 || 'Please type something'
        ]"
        class="col-5"
      />
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
        class="col-5"
      />
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
        class="col-5"
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
        class="col-5"
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
        class="col-5"
      />
      <div class="q-my-lg col-10 row">
        <q-btn
        block
        label="Create "
        type="submit"
        unelevated
        rounded
        color="primary"
        class="col-12"
         />
        <q-btn
        label="Back"
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

const { login } = useUserAuthStore();

const accept = ref(false);
const password = ref('');
const email = ref('');

// eslint-disable-next-line no-useless-escape
const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const onSubmit = async () => {
  const data = { email: email.value, password: password.value };
  await login(data);
};
const onReset = () => console.log('RESET');

</script>
