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
      class="bg-gray-900 font-bold text-3xl rounded-2xl hover:opacity-75 transition-opacity duration-300 shadow-2xl"
  >
    {{label}}
  </button>
</template>

<style scoped>

</style>