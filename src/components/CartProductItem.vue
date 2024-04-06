<script setup>
import AppRoundedButton from "@/components/ui/AppRoundedButton.vue";
import {useProductsStore} from "@/store/index.js";


const props = defineProps({
  products: {
    type: Array,
    default: [],
    required: true,
  }
});




const productsStore = useProductsStore();
</script>

<template>
  <div
      v-for="product of props.products"
      :key="product.id"
      class="w-full p-5 rounded-2xl chosen-card shadow-2xl bg-white flex gap-8 relative flex-col items-center sm:items-start text-center sm:text-left sm:flex-row">
    <div class="max-w-[150px]">

      <img :alt="product.category" :src="product.image" class="w-full object-contain">

    </div>

    <div class="flex flex-col justify-center gap-6">
      <h3 class="text-xl font-bold text-gray-900 w-full max-w-[300px]">
        {{product.title}}
      </h3>
      <p class="text-gray-500 font-bold text-xl">$ {{ product.price }}</p>
      <div class="flex gap-8 items-center">
        <AppRoundedButton @click="productsStore.decreaseProduct(product)" class="p-2 bg-red-500 hover:bg-red-600 w-[40px] h-[40px]">
          <i class="pi pi-minus text-white"></i>
        </AppRoundedButton>
        <div>{{product.quantity}}</div>
        <AppRoundedButton @click="productsStore.addProductToCart(product)" class="p-2 bg-green-500 hover:bg-green-600 w-[40px] h-[40px]">
          <i class="pi pi-plus"></i>
        </AppRoundedButton>
      </div>
    </div>
    <div class="h-full flex w-full flex-col justify-between items-end">

        <AppRoundedButton
            class="p-2 bg-red-500 hover:bg-red-600 w-[28px] h-[28px]"
            @click="productsStore.removeProductFromCart(product.id)"
        >
          <i class="pi pi-times"></i>
        </AppRoundedButton>
        <p class="font-bold text-2xl text-amber-500">${{(product.price * product.quantity).toFixed(2)}}</p>
    </div>
  </div>
</template>