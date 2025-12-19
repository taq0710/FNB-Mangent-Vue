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
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
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
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full p-2.5 border border-gray-300 rounded text-sm transition-colors focus:outline-none focus:border-primary placeholder:text-gray-400"
    />
  </div>
</template>

