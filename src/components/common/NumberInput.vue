<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  min: {
    type: Number,
    default: undefined,
  },
  max: {
    type: Number,
    default: undefined,
  },
  class:{
    type: String,
    default: "",
  }
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div :class="class">
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-800">{{ label }}</label>
    <input
      type="number"
      :value="modelValue"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full p-2.5 border border-gray-300 rounded text-sm transition-colors focus:outline-none focus:border-primary placeholder:text-gray-400"
    />
  </div>
</template>

