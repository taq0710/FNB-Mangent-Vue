<script setup lang="ts">
import Button from "./Button.vue";

defineProps<{
  show: boolean;
  title: string;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <Transition name="modal">
    <div 
      v-if="show" 
      class="fixed z-[9998] inset-0 bg-black/50 flex justify-center items-center transition-opacity duration-300 ease-in-out"
      @click="$emit('close')"
    >
      <div 
        class="w-[500px] max-w-[90%] bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out flex flex-col modal-container"
        @click.stop
      >
        <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="m-0 text-[#42b883]">{{ title }}</h3>
          <Button
            variant="ghost"
            size="none"
            class="text-2xl w-8 h-8 text-gray-400 hover:text-gray-700"
            @click="$emit('close')"
          >
            &times;
          </Button>
        </div>

        <div class="p-5 max-h-[70vh] overflow-y-auto">
          <slot></slot>
        </div>

        <div class="px-5 py-4 border-t border-gray-200 flex justify-end">
          <slot name="footer">
            <Button @click="$emit('close')">Đóng</Button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
