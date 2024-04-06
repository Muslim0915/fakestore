<script setup>
import AppButton from "@/components/ui/AppButton.vue";
import {useProductsStore} from "@/store/index.js";

const props = defineProps({
  products: {
    type: Array,
    default: [],
    required: true,
  }
});

const store = useProductsStore();
</script>

<template>
<div v-for="product of props.products"
     :key="product.id"
    class="w-full bg-white rounded-2xl p-5 flex flex-col justify-between gap-6 shadow-2xl border border-gray-600 border-solid hover:cursor-pointer"

>

  <div class="w-full flex items-center justify-center min-h-[250px]" @click="$router.push(`/products/${product.id}`)">
    <img :src="product.image" :alt="product.category" class="w-full max-w-[150px] block object-contain">
  </div>
  <hr>
  <div class="flex flex-col gap-4">
  <h3 class="text-xl font-bold text-gray-900 min-h-[90px]">
    {{product.title}}
  </h3>
  <p class="font-bold text-2xl text-amber-500">$ {{product.price}}</p>
  <AppButton
      label="Add to cart"
      @click="store.addProductToCart(product)"
  />
  </div>
</div>
</template>

<style scoped>

</style>