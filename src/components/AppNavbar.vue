<script setup>

import AppRoundedButton from "@/components/ui/AppRoundedButton.vue";
import {useProductsStore} from "@/store/index.js";

const store = useProductsStore();
</script>

<template>
  <nav class="w-full fixed top-0 z-50 shadow-2xl  min-h-[160px] bg-gray-900 flex items-center justify-around max-md:p-1 px-5 py-4 sm:px-10">
    <div class="container flex items-center justify-between">
      <button
          class="text-green-300 text-7xl max-lg:text-4xl font-black max-md:text-5xl border-none bg-transparent"
          @click="$router.push('/')"
      >
        Fake Store
      </button>
      <button
          class="hidden z-50 max-md:flex items-end justify-center text-green-300 relative flex-col gap-1"
          @click="store.toggleMenu()"
      >
        <i class="pi pi-bars w-full h-full text-3xl"></i>
      </button>
      <div
          class="flex items-center transition-all header__nav justify-between max-lg:gap-5 gap-16 text-2xl flex-wrap max-md:flex-col max-md:w-full max-md:h-screen max-md:items-start max-md:bg-gray-900 max-md:p-5 max-md:justify-start max-md:absolute max-md:top-0"
          :class="store.isMenuOpen ? 'max-md:left-0' : 'max-md:left-full'"
      >
      <router-link exact @click="store.toggleMenu()" class="text-2xl text-white hover:text-green-300 transition-colors" to="/">
        Home
      </router-link>
      <router-link @click="store.toggleMenu()" class="text-2xl text-white hover:text-green-300 transition-colors" to="/products">
        Products
      </router-link>
      <router-link @click="store.toggleMenu()" class="text-2xl text-white hover:text-green-300 transition-colors" to="/contact">
        Contact
      </router-link>
        <router-link to="/login" class="text-2xl text-white hover:text-green-300 transition-colors">Login</router-link>
        <button @click="$router.push('/signup')" class="rounded-xl bg-green-600 text-white px-5 py-2 hover:opacity-50 transition-all">Sign up</button>
      <button
          class="text-2xl text-white hover:opacity-50 w-[50px] relative h-[50px] transition-all bg-green-400 rounded-full flex items-center justify-center"
          @click="$router.push('/cart') && store.toggleMenu()"
      >
        <i class="pi pi-shopping-cart text-2xl font-bold"></i>
        <AppRoundedButton class='absolute bg-amber-400 text-gray-900 bottom-[-25px] left-[-15px] w-10 h-10 text-center flex items-center justify-center p-2 rounded-[50%] font-bold'>
          {{store.getCartTotalCount}}
        </AppRoundedButton>
      </button>

      </div>
    </div>
  </nav>
</template>