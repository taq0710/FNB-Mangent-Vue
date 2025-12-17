<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'edit' | 'delete' | 'save' | 'cancel' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
  fullWidth: false,
});

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['btn', `btn-${variant}`, `btn-${size}`, { 'btn-full-width': fullWidth }]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Sizes */
.btn-small {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-medium {
  padding: 12px;
  font-size: 16px;
}

.btn-large {
  padding: 14px 20px;
  font-size: 18px;
}

/* Variants */
.btn-primary {
  background: #42b883;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #35a372;
}

.btn-edit {
  background: #42b883;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}

.btn-edit:hover:not(:disabled) {
  background: #35a372;
}

.btn-delete {
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}

.btn-delete:hover:not(:disabled) {
  background: #dc2626;
}

.btn-save {
  background: #3b82f6;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}

.btn-save:hover:not(:disabled) {
  background: #2563eb;
}

.btn-cancel {
  background: #6b7280;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}

.btn-cancel:hover:not(:disabled) {
  background: #4b5563;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

/* Full width */
.btn-full-width {
  width: 100%;
}
</style>

