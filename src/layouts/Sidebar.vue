<template>
  <aside class="sidebar">
    <h2>Quản lý bán hàng</h2>

    <nav>
      <router-link to="/">Dashboard</router-link>
      <router-link to="/products">Sản phẩm</router-link>
      <router-link to="/employees">Nhân viên</router-link>
    </nav>
  </aside>
</template>

<style>
.sidebar {
  width: 230px;
  background: #1a1a1a;
  color: white;
  padding: 20px;
}

.sidebar a {
  display: block;
  color: white;
  margin: 10px 0;
}
</style>
