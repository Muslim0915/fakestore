<script setup>

const props = defineProps({
  label: {
    type: String,
    required: true
  }
})

</script>

<template>
  <button
      class="text-white bg-green-500 px-4 py-4 font-bold text-3xl rounded-2xl hover:opacity-75 transition-opacity duration-300 shadow-2xl"
  >
    {{label}}
  </button>
</template>

<style scoped>

</style>