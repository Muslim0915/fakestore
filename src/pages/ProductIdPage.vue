<script setup>
import {useRoute} from "vue-router";
import {useProductsStore} from "@/store/index.js";
import {computed, ref} from "vue";
import AppButton from "@/components/ui/AppButton.vue";

const route = useRoute();
const productId = route.params.id;

const store = useProductsStore();
const product = computed(() => store.products.find(product => product.id === Number(productId)));

const error = ref('');
</script>

<template>
  <div class="w-full h-full py-5">
    <div v-if="product">
      <div class="container flex flex-col gap-5 items-start ">
        <AppButton
            class="w-1/4 max-md:text-center self-start"
            label="&larr; Back to products"
            @click="$router.push('/products')"
        />
        <div class="flex bg-white max-md:flex-col rounded-2xl p-5 gap-5 shadow-2xl w-full">
          <div class=" flex flex-col max-w-[250px] w-full max-md:items-center h-full sm:min-w-[150px] product-image-holder">
            <img :alt="product.category" :src="product.image" class="w-full object-contain">
          </div>
          <div class="flex flex-col gap-6 self-end">
            <h1 class="font-bold text-3xl">{{ product.title }}</h1>
            <p class="font-bold text-2xl text-amber-500">{{ product.price }}</p>
            <p class="text-2xl">{{ product.description }}</p>
            <AppButton class="text-green-500 w-full py-4 px-3" label="Add to cart"
                       @click="store.addProductToCart(product)"/>
          </div>
        </div>


      </div>
    </div>
    <div v-else>
      <AppButton
          class="text-green-500 py-3 px-2 text-xl w-auto max-md:text-center self-start"
          label="&larr; Back to products"
          @click="$router.push('/products')"
      />
      <div class="w-full text-center h-full flex justify-center items-center">
        <h1 class="text-7xl my-10 w-1/2 max-xl:w-full font-bold text-red-500 text-center max-xl:text-6xl max-md:text-4xl max-sm:text-3xl">{{ error }}</h1>
      </div>
    </div>
  </div>
</template>
