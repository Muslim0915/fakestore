<script setup>
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useProductsStore } from "@/store/index.js";
import { onMounted } from "vue";

const productsStore = useProductsStore();
onMounted(() => {
  productsStore.fetchProducts(); // Вызываем fetchProducts для получения данных
});

</script>

<template>
  <div class="app h-screen w-full flex flex-col">

    <AppNavbar />
    <main class="pt-[160px] bg-main bg-cover bg-no-repeat bg-bottom flex flex-col flex-1">
      <router-view />
    </main>
<AppFooter />
  </div>
</template>