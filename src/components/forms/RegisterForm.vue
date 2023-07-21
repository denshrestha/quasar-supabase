<template>
  <div class="q-pa-sm full-width shadow-2" style="max-width: 500px">
    <p class="q-my-lg text-h5 text-weight-bold text-center text-primary">Create an Account</p>
    <q-form
      ref="form"
      @submit="onSubmit"
      class="q-gutter-lg row justify-center items-center"
    >
      <q-input
        v-model="registerData.firstName"
        label="First name *"
        lazy-rules
        dense
        :rules="[(val = '') => val?.length > 0 || 'Please type something']"
        class="col-5"
      />
      <q-input
        v-model="registerData.lastName"
        label="Last name *"
        lazy-rules
        dense
        :rules="[
          (val = '') => val?.length > 0 || 'Please type something'
        ]"
        class="col-5"
      />
      <q-input
        v-model="registerData.email"
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
        v-model="registerData.username"
        label="Usersname *"
        hint="Valid email address (e.g., example@email.com)"
        lazy-rules
        dense
        :rules="[
          (val = '') => val?.length > 0 || 'Please type something'
        ]"
        class="col-5"
      />

      <q-input
        type="password"
        v-model="registerData.password"
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
        v-model="passwordRepeat"
        label="Password"
        lazy-rules
        dense
        :rules="[
          val => val !== null && val !== '' || 'This field i required',
          val => val === registerData.password || 'Passwords should be equal'
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
import { useAuthStore } from 'stores/auth-store';
import { useUserStore } from 'stores/user-store';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const { register } = useAuthStore();
const { create } = useUserStore();

const { getUser } = storeToRefs(useAuthStore());

const registerData = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  username: '',
});

const passwordRepeat = ref('');

const form = ref(null);

const fullName = computed(() => `${registerData.value.firstName} ${registerData.value.lastName}`);

// eslint-disable-next-line no-useless-escape
const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const onSubmit = async () => {
  await form?.value?.validate()
    .then(async (success: boolean) => {
      if (success) {
        const result = await register({
          email: registerData.value.email,
          password: registerData.value.password,
          options: {
            data: {
              fullName: fullName.value,
              username: registerData.value.username,
            },
          },
        });

        return result;
      }

      return false;
    })
    .then(async (resp: boolean) => {
      if (resp) {
        await create({
          id: getUser.value?.id,
          email: registerData.value.email,
          full_name: fullName.value,
          username: registerData.value.username,
        });
      }
      router.push('/auth');
    });
};
</script>
