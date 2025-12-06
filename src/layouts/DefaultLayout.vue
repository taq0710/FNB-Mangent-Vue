<template>
  <div class="layout">
    <aside class="sidebar">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/employees">Employees</router-link>
    </aside>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 220px;
  background: #1e1e1e;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.sidebar a {
  color: white;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
}

.sidebar a.router-link-active {
  background: #42b883;
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
