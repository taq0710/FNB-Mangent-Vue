<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { logout, getCurrentUser } from '../services/authService';
import Button from '../components/common/Button.vue';

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

<template>
  <aside class="w-[230px] bg-gray-900 text-white p-5 flex flex-col h-screen">
    <h2 class="mt-0 mb-4">Quản lý bán hàng</h2>

    <nav class="flex-1">
      <router-link 
        to="/" 
        class="block text-white my-2.5 no-underline p-2 rounded transition-colors hover:bg-white/10"
        active-class="bg-primary"
      >
        Dashboard
      </router-link>
      <router-link 
        to="/products" 
        class="block text-white my-2.5 no-underline p-2 rounded transition-colors hover:bg-white/10"
        active-class="bg-primary"
      >
        Sản phẩm
      </router-link>
      <router-link 
        to="/employees" 
        class="block text-white my-2.5 no-underline p-2 rounded transition-colors hover:bg-white/10"
        active-class="bg-primary"
      >
        Nhân viên
      </router-link>
    </nav>

    <div class="mt-auto pt-5 border-t border-white/10">
      <div v-if="currentUser" class="mb-4">
        <p class="m-0 mb-1 font-semibold text-sm">{{ currentUser.name }}</p>
        <p class="m-0 text-xs text-gray-400">@{{ currentUser.username }} ({{ currentUser.role }})</p>
      </div>
      <Button @click="handleLogout" variant="delete" full-width>
        Đăng xuất
      </Button>
    </div>
  </aside>
</template>
