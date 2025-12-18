<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'edit' | 'delete' | 'save' | 'cancel' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large' | 'none';
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
.btn-none {
  padding: 0;
  font-size: inherit;
}

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
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
}

.btn-edit {
  background: var(--primary-color);
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}

.btn-edit:hover:not(:disabled) {
  background: var(--primary-dark);
}

.btn-delete {
  background: var(--danger-color);
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}

.btn-delete:hover:not(:disabled) {
  background: var(--danger-dark);
}

.btn-save {
  background: var(--info-color);
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}

.btn-save:hover:not(:disabled) {
  background: var(--info-dark);
}

.btn-cancel {
  background: var(--secondary-color);
  color: white;
  padding: 6px 12px;
  font-size: 12px;
}

.btn-cancel:hover:not(:disabled) {
  background: #4b5563;
}

.btn-secondary {
  background: var(--secondary-color);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

.btn-ghost {
  background: transparent;
  color: inherit;
}

.btn-ghost:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.05);
}

/* Full width */
.btn-full-width {
  width: 100%;
}
</style>

