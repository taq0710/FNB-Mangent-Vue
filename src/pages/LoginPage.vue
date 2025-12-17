<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Đăng nhập</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Tên đăng nhập</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            placeholder="Nhập tên đăng nhập"
          />
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="loading" class="login-button">
          {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
        </button>
      </form>

      <div class="demo-accounts">
        <p class="demo-title">Tài khoản demo:</p>
        <ul>
          <li>admin / admin123</li>
          <li>user1 / user123</li>
          <li>test / test123</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/authService';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);

const handleLogin = async () => {
  errorMessage.value = '';
  loading.value = true;

  try {
    const result = await login(username.value, password.value);

    if (result.success) {
      // Đăng nhập thành công, chuyển đến dashboard
      router.push('/');
    } else {
      // Đăng nhập thất bại
      errorMessage.value = result.message || 'Đăng nhập thất bại';
    }
  } catch (error) {
    errorMessage.value = 'Có lỗi xảy ra, vui lòng thử lại';
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.login-box h2 {
  margin: 0 0 30px 0;
  text-align: center;
  color: #333;
  font-size: 28px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  color: #e74c3c;
  background: #fee;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 14px;
}

.login-button {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover:not(:disabled) {
  background: #5568d3;
}

.login-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.demo-accounts {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.demo-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 600;
}

.demo-accounts ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.demo-accounts li {
  font-size: 13px;
  color: #888;
  margin-bottom: 5px;
  font-family: monospace;
}
</style>

