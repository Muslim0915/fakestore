<script setup>
import { useProductsStore } from "@/store/index.js";
import CartProductItem from "@/components/CartProductItem.vue";
import AppButton from "@/components/ui/AppButton.vue";
import { useToast } from "vue-toastification";
const store = useProductsStore();

const toast = useToast();

const purchase = () => {
  if (store.getCartTotal > 0) {
    toast.success("Purchase successful");
  } else {
    toast.error("Cart is empty");
  }
};
</script>

<template>
  <section class="h-full w-full flex flex-col">
    <div class="container grid grid-cols-2 gap-8 py-5 max-lg:grid-cols-1">
      <div class="flex flex-col justify-center gap-5">
        <CartProductItem
          v-if="store.cart.length > 0"
          :products="store.cart"
        />
        <AppButton
          v-else
          label="Get product"
          class="capitalize px-4 py-4 text-green-300 hover:opacity-75 transition-opacity duration-300 w-1/2 mx-auto"
          @click="$router.push('/products')"
        />
      </div>
      <div
        class="w-full max-h-[200px] rounded-2xl flex bg-white flex-col justify-between p-5 gap-5 shadow-2xl buy"
      >
        <h2
          class="font-bold text-3xl text-gray-900 sm:text-left sm:text-5xl self-center"
        >
          Total: $ {{ store.getCartTotal }}
        </h2>
        <AppButton
          label="Purchase"
          class="capitalize px-4 py-4 text-green-300 hover:opacity-75 transition-opacity duration-300"
          @click="purchase()"
        />
      </div>
    </div>
  </section>
</template>
