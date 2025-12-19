<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/authService";
import Button from "../components/common/Button.vue";

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const handleLogin = async () => {
  errorMessage.value = "";
  loading.value = true;
  try {
    const result = await login(username.value, password.value);
    if (result.success) {
      router.push("/");
    } else {
      errorMessage.value = result.message || "Đăng nhập thất bại";
    }
  } catch (error) {
    errorMessage.value = "Có lỗi xảy ra, vui lòng thử lại";
    console.error("Login error:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600"
  >
    <div class="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
      <h2 class="m-0 mb-8 text-center text-gray-800 text-3xl font-bold">
        Đăng nhập
      </h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-5">
          <label for="username" class="block mb-2 text-gray-600 font-medium">Tên đăng nhập</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            placeholder="Nhập tên đăng nhập"
            class="w-full p-3 border border-gray-300 rounded-md text-base box-border transition-colors focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div class="mb-5">
          <label for="password" class="block mb-2 text-gray-600 font-medium">Mật khẩu</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Nhập mật khẩu"
            class="w-full p-3 border border-gray-300 rounded-md text-base box-border transition-colors focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div
          v-if="errorMessage"
          class="text-red-600 bg-red-50 p-2.5 rounded-md mb-4 text-sm"
        >
          {{ errorMessage }}
        </div>

        <Button type="submit" :disabled="loading" full-width>
          {{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}
        </Button>
      </form>

      <div class="mt-8 pt-5 border-t border-gray-200">
        <p class="text-sm text-gray-600 mb-2.5 font-semibold">
          Tài khoản demo:
        </p>
        <ul class="list-none p-0 m-0">
          <li class="text-xs text-gray-500 mb-1 font-mono">admin / admin123</li>
          <li class="text-xs text-gray-500 mb-1 font-mono">user1 / user123</li>
          <li class="text-xs text-gray-500 mb-1 font-mono">test / test123</li>
        </ul>
      </div>
    </div>
  </div>
</template>
