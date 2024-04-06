<script setup>
import AppInput from "@/components/ui/AppInput.vue";
import {ref, watch} from "vue";
import AppButton from "@/components/ui/AppButton.vue";
import {useProductsStore} from "@/store/index.js";

const username = ref('');
const email = ref('');
const password = ref('');

const store = useProductsStore();

const logIn = (event) => {
  watch(() => store.isSuccess, () => {
    if (store.isSuccess) {
      return event.target.reset();
    }
  });
  store.logIn(username.value, email.value, password.value);
}


</script>

<template>
  <div class="container flex items-center justify-center h-full">
    <form
        id="form"
        class="flex flex-col gap-6 w-1/2 border-2 p-5 shadow-xl rounded-xl shadow-black bg-white backdrop-blur-2xl"
        @submit.prevent="logIn($event)"
    >
      <div class="flex flex-col gap-4 w-full">
        <AppInput
            id="username"
            v-model="username"
            class="border rounded text-green-500"
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
            class="border rounded text-green-500"
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
        />
      </div>

      <div class="flex flex-col gap-4 w-full">
        <AppInput
            v-model="password"
            id="password"
            class="border rounded text-green-500"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
        />
      </div>

      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <input id="remember" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 type="checkbox">
          <label class="ms-2 text-sm font-medium text-gray-900" for="remember">Remember me</label>
        </div>
        <div>
          <a class="text-white hover:underline transition-all hover:text-blue-500" href="#">Lost Password?</a>
        </div>

      </div>

      <AppButton
          class="uppercase text-white py-3"
          label="Login"
          type="submit"
      />
      <p class="text-center text-gray-900">
        Don't have an account?
        <router-link class=" text-white hover:underline" to="/signup">
          Sign up
        </router-link>
      </p>
    </form>
  </div>
</template>