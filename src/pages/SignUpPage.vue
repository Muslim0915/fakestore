<script setup>
import AppInput from "@/components/ui/AppInput.vue";
import AppButton from "@/components/ui/AppButton.vue";
import {useProductsStore} from "@/store/index.js";
import { ref, watch} from "vue";

const store = useProductsStore();

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const terms = ref(false);




const signUp = (event) => {
  watch(() => store.isSuccess, () => {
    if (store.isSuccess) {
      return event.target.reset();
    }
  });
  store.signUp(username.value, email.value, password.value, confirmPassword.value);
}
</script>

<template>
  <div class="container flex items-center justify-center h-full">
    <form
        id="form"
        class="flex flex-col gap-6 w-1/2 border-2 p-5 shadow-xl rounded-xl shadow-black bg-white backdrop-blur-2xl"
        @submit.prevent="signUp($event)"
    >
      <div

          class="flex flex-col gap-4 w-full"
      >
        <AppInput
            id="username"
            v-model="username"
            label="Username"
            name="username"
            placeholder="Enter your username"
            type="text"
        />
      </div>

      <div class="flex flex-col gap-4 w-full">
        <AppInput
            v-model="email"
            id="email"
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="text"
        />
      </div>
      <div class="flex flex-col gap-4 w-full">
        <AppInput
            v-model="password"
            id="password"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
        />
      </div>
      <div class="flex flex-col gap-4 w-full">
        <AppInput
            id="confirmPassword"
            v-model="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type="password"
        />
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <input
              id="terms"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              name="terms"
              type="checkbox"
              v-model="terms"
              @change="store.isDisabled = !store.isDisabled"
          >
          <label class="ms-2 text-sm font-medium text-gray-900" for="terms">I agree to the
            <span class="text-blue-600 hover:underline transition-all hover:text-blue-500" @click="$router.push('/terms')">terms and conditions</span></label>
        </div>
      </div>
      <AppButton
          class="uppercase"
          label="Sign up"
          type="submit"
          :disabled="store.isDisabled"
          :class="store.isDisabled ? 'bg-gray-400' : 'bg-green-600 hover:bg-blue-500 transition-colors'"

      />
      <p class="text-center text-gray-900">
        Already have an account?
        <router-link class=" text-white hover:underline" to="/login">
          Login
        </router-link>
      </p>
    </form>
  </div>
</template>