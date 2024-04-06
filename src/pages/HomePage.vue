<script setup>

import AppButton from "@/components/ui/AppButton.vue";
</script>

<template>
  <section class="h-full w-full flex flex-col py-5">
    <div class="container h-full w-full grid grid-cols-2 max-md:flex max-md:flex-col-reverse max-md:items-center max-md:justify-center max-md:text-center place-items-center gap-5">
      <div class="flex flex-col gap-8 xl:w-3/4 max-md:text-center max-md:items-center ">
        <h2 class="uppercase text-gray-700 text-xl font-bold">best online store of the year</h2>
        <h1 class="text-6xl max-md:text-5xl max-sm:text-[2.7rem] font-extrabold leading-snug max-md:leading-tight max-w-[500px]">We don't do fashion, we are fashion😍</h1>
        <AppButton
            class="uppercase"
            label="Shop now"
            @click="$router.push('/products')"
        />
      </div>
      <img src="@/assets/images/fashion.png" alt="fashion">

    </div>
  </section>
</template>