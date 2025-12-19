<template>
  <div class="flex h-screen">
    <Sidebar />

    <main class="flex-1 p-5 overflow-auto [&::-webkit-scrollbar]:hidden">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
</script>
