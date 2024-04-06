<script setup>
import { useProductsStore } from "@/store/index.js";
import AppInput from "@/components/ui/AppInput.vue";
import {ref, watch} from "vue";
import AppButton from "@/components/ui/AppButton.vue";
const store = useProductsStore();

const message = ref('');
const username = ref('');
const email = ref('');

const sendMessage = (event) => {
  watch(() => store.isSuccess, () => {
    if (store.isSuccess) {
      return event.target.reset();
    }
  })
  store.sendMessage(username.value, email.value, message.value);
}
</script>

<template>
  <div class="app flex justify-center items-center h-full">
    <form
        @submit.prevent="sendMessage($event)"
        class="flex flex-col gap-4 w-1/2 max-md:w-full max-md:p-2 max-md:my-5 p-8 shadow-md shadow-blue-200 rounded-xl bg-white text-black text-2xl font-bold"
    >
      <h1 class="text-center mb-3 font-black text-5xl border-none bg-transparent">Get in Touch</h1>
      <div class="flex flex-col gap-4">
        <AppInput
            v-model="username"
            label="Username"
            type="text"
            id="username"
            placeholder="Enter your username"
            name="username"
            class="px-2 py-3 border rounded"
            :model-value="username"
            @update:modelValue="username = $event"
        />
      </div>

      <div class="flex flex-col gap-4">
        <AppInput
            v-model="email"
            label="Email"
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            class="px-2 py-3 border rounded"
            :model-value="email"
            @update:modelValue="email = $event"
        />
      </div>

      <div class="flex flex-col gap-4">
        <label class="font-bold capitalize" for="message">Enter your message</label>
        <textarea
            v-model="message"
            id="message"
            name="message"
            rows="3"
            class="px-2 py-3 border rounded resize-none"
            placeholder="Enter your message"
        >
        </textarea>
      </div>
      <AppButton
          label="Submit"
          class="border rounded-xl font-bold hover:bg-green-600 transition-colors"
          type="submit"
      />
    </form>
  </div>
</template>
