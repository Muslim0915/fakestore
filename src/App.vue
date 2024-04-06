<script setup>
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useProductsStore } from "@/store/index.js";
import { onMounted } from "vue";

const store = useProductsStore();
onMounted(async () => {
  await store.fetchProducts();
});
</script>

<template>
  <div class="app h-screen w-full flex flex-col">
    <AppNavbar />
    <main class="pt-[160px] bg-main bg-cover bg-no-repeat bg-bottom flex flex-col flex-1">
      <router-view v-if="!store.isLoading" />
      <div v-if="store.isLoading" class="absolute left-0 top-0 bg-black bg-opacity-50 w-full h-screen flex justify-center items-center">
        <i class="pi pi-spin pi-spinner text-7xl font-bold text-white"></i>
      </div>
    </main>
<AppFooter />
  </div>
</template>