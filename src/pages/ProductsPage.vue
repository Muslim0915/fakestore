<script setup>
import {  onMounted, computed } from "vue";
import {useStore} from "@/store/index.js";
import ProductItem from "@/components/ProductItem.vue";

const store = useStore();
onMounted(() => {
  store.fetchProducts(); // Вызываем fetchProducts для получения данных
});
</script>

<template>
  <div class="grid grid-cols-3 max-lg:grid-cols-2 max-md:px-1 max-md:grid-cols-1 py-6 w-full max-w-[1280px] mx-auto gap-8">
    <ProductItem
    :products="store.getProducts"
    />

  </div>
</template>