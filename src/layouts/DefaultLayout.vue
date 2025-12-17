<template>
  <div class="layout">
    <Sidebar />

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
.content::-webkit-scrollbar {
  display: none;
}
</style>
