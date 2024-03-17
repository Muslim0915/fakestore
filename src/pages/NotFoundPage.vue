<script setup>

import AppButton from "@/components/ui/AppButton.vue";
</script>

<template>
  <div class="w-full h-full py-5">
    <div class="container flex flex-col gap-5 items-start ">
      <h1 class="font-bold text-3xl">
        404
      </h1>
      <p class="font-bold text-2xl text-gray-900">
        Page not found
      </p>
      <AppButton
          label="&larr; Back to products"
          class="text-green-500 py-3 px-2 text-xl w-2/12 max-md:text-center self-start max-xl:w-3/6 max-sm:w-3/4"
          @click="$router.push('/products')"
      />
    </div>
  </div>
</template>

<style scoped>

</style>