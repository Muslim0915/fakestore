<script setup>
import { useProductsStore } from "@/store/index.js";
import { ref } from 'vue';
import {initializeApp} from "firebase/app";
import { getDatabase, ref as dbRef, set, get } from 'firebase/database'
import {useToast} from "vue-toastification";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);
const db = getDatabase();
const successMsg = () => {
  return  toast.success("Your account has been created");
}

const errorMsg = () => {
  return  toast.error("Please fill all the fields");
}

const checkValidation = () => {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let error = false;

  if (username.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
    toast.error("Please fill all the fields");
    error = true;
  }

  if (!emailRe.test(email.value)) {
    toast.error("Please enter a valid email address example@example.com");
    error = true;
  }

  if (message.value.length < 6) {
    toast.error("Message must be at least 6 characters");
    error = true;
  }

  return error;
};




const handleSubmit = (e) => {
  e.preventDefault();

  if (checkValidation()) {
    return;
  }

  const useRef = dbRef(db, 'users/' + username.value);
  get(useRef).then((snapshot) => {
    if (snapshot.exists()) {
      toast.error("User already exists");
    }
    else{
      set(dbRef(db, 'users/' + username.value), {
        username: username.value,
        email: email.value,
        message: message.value
      }).then(() => {
        successMsg();
        clearInputsFields();
      }).catch(error => {
        errorMsg();
        console.error(error);
      });
    }

  })
};

const productsStore = useProductsStore();

const toast = useToast();

// Data properties to hold form input values
const username = ref('');
const email = ref('');
const message = ref('');

const clearInputsFields = () => {
  username.value = '';
  email.value = '';
  message.value = '';
};


</script>

<template>
  <div class="app flex justify-center items-center h-full">

    <form
        @submit.prevent="handleSubmit"
        class="flex flex-col gap-4 w-1/2 max-md:w-full max-md:p-2 max-md:my-5 p-8 shadow-md shadow-blue-200 rounded-xl bg-white text-black text-2xl font-bold">
      <h1 class="text-green-400 text-center mb-3 font-black text-5xl border-none bg-transparent">Get in Touch</h1>
      <div class="flex flex-col gap-4">
        <label class="text-green-500 font-bold capitalize" for="username">Username</label>
        <input
            v-model="username"
            id="username"
            autocomplete="off"
            class="px-2 py-3 border border-black rounded outline-green-400"
            type="text"
            name="username"
            placeholder="Enter your username"
        />
      </div>

      <div class="flex flex-col gap-4">
        <label class="text-green-500 font-bold capitalize" for="email">Email</label>
        <input
            v-model="email"
            id="email"
            autocomplete="off"
            class="px-2 py-3 border border-black rounded outline-green-400"
            type="text"
            name="email"
            placeholder="Enter your email"
        />
      </div>
      <div class="flex flex-col gap-4">
        <label class="text-green-500 font-bold capitalize" for="message">your message</label>
        <textarea
            v-model="message"
            id="message"
            name="message"
            rows="3"
            class="outline-green-400 px-2 py-3 border border-black rounded resize-none"
            placeholder="Enter your message">

        </textarea>
      </div>
      <button
          class="px-2 py-3 border border-green-500 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
          type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>
