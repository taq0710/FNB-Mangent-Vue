<script setup>
defineProps({
  modelValue: {
    type: String,
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
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      type="date"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      class="base-input"
    />
  </div>
</template>

<style scoped>
.input-wrapper {
  margin-bottom: 12px;
}

.input-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.base-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.base-input:focus {
  outline: none;
  border-color: #42b883;
}

.base-input::placeholder {
  color: #999;
}
</style>

