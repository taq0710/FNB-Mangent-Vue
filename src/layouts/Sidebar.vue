<template>
  <aside class="sidebar">
    <h2>Quản lý bán hàng</h2>

    <nav>
      <router-link to="/">Dashboard</router-link>
      <router-link to="/products">Sản phẩm</router-link>
      <router-link to="/employees">Nhân viên</router-link>
    </nav>

    <div class="user-section">
      <div v-if="currentUser" class="user-info">
        <p class="user-name">{{ currentUser.name }}</p>
        <p class="user-username">{{ currentUser.username }}</p>
      </div>
      <button @click="handleLogout" class="logout-button">Đăng xuất</button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { logout, getCurrentUser } from '../services/authService';

const router = useRouter();
const currentUser = ref(null);

onMounted(async () => {
  currentUser.value = await getCurrentUser();
});

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<style scoped>
.sidebar {
  width: 230px;
  background: #1a1a1a;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sidebar h2 {
  margin-top: 0;
}

.sidebar a {
  display: block;
  color: white;
  margin: 10px 0;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.3s;
}

.sidebar a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar a.router-link-active {
  background: #42b883;
}

.user-section {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  margin-bottom: 15px;
}

.user-name {
  margin: 0 0 5px 0;
  font-weight: 600;
  font-size: 14px;
}

.user-username {
  margin: 0;
  font-size: 12px;
  color: #aaa;
}

.logout-button {
  width: 100%;
  padding: 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.3s;
}

.logout-button:hover {
  background: #c0392b;
}
</style>
