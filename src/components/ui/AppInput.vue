<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

function updateModelValue(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<template>
  <label :for="id" class="font-bold text-xl">{{ label }}</label>
  <input
      autocomplete="off"
      class="bg-transparent py-4 px-3 border rounded-2xl"
      :class="props.class"
      :id="id"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateModelValue"
  />
</template>