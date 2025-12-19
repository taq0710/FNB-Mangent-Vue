<script setup lang="ts">
import { computed } from 'vue';

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

const buttonClasses = computed(() => {
  const base = 'border-none rounded font-medium cursor-pointer transition-all duration-300 inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed';
  
  const sizes = {
    none: 'p-0 text-inherit',
    small: 'px-3 py-1.5 text-xs',
    medium: 'p-3 text-base',
    large: 'px-5 py-3.5 text-lg',
  };
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    edit: 'bg-primary text-white hover:bg-primary-dark px-3 py-1.5 text-xs',
    delete: 'bg-danger text-white hover:bg-danger-dark px-3 py-1.5 text-xs',
    save: 'bg-info text-white hover:bg-info-dark px-3 py-1.5 text-xs',
    cancel: 'bg-secondary text-white hover:bg-gray-600 px-3 py-1.5 text-xs',
    secondary: 'bg-secondary text-white hover:bg-gray-600',
    ghost: 'bg-transparent text-inherit hover:bg-black/5',
  };
  
  const width = props.fullWidth ? 'w-full' : '';
  
  return `${base} ${sizes[props.size]} ${variants[props.variant]} ${width}`;
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

