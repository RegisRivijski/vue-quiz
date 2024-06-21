<template>
  <div class="auth-container">
    <div class="tabs">
      <button :class="{'active': activeTab === 'register'}" @click="activeTab = 'register'">{{ $t('register') }}</button>
      <button :class="{'active': activeTab === 'login'}" @click="activeTab = 'login'">{{ $t('login') }}</button>
    </div>

    <div v-if="activeTab === 'register'" class="auth-box">
      <h1>{{ $t('register') }}</h1>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input v-model="email" placeholder="Email" required />
        <button type="submit" class="btn">{{ $t('register') }}</button>
      </form>
    </div>

    <div v-if="activeTab === 'login'" class="auth-box">
      <h1>{{ $t('login') }}</h1>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit" class="btn">{{ $t('login') }}</button>
      </form>
    </div>

    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      activeTab: 'register',
      username: '',
      password: '',
      email: '',
      message: '',
      messageType: '',
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  mounted() {
    this.toast = useToast();
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('register', {
          username: this.username,
          password: this.password,
          email: this.email,
        });
        this.setMessage(this.$t('registrationSuccess'), 'success');
      } catch (error) {
        this.setMessage(this.$t('registrationFailed'), 'error');
      }
    },
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
        });
        this.$router.push('/topics');
        this.setMessage(this.$t('loginSuccess'), 'success');
      } catch (error) {
        this.setMessage(this.$t('loginFailed'), 'error');
      }
    },
    setMessage(message, type) {
      this.toast[type](message);
    },
  },
  watch: {
    isAuthenticated(value) {
      if (value) {
        this.$router.push('/topics');
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  cursor: pointer;
  font-size: 16px;
  transition: border-bottom 0.3s;
}

.tabs button.active {
  border-bottom: 2px solid #007bff;
  color: #007bff;
}

.tabs button:hover {
  border-bottom: 2px solid #007bff;
}

.auth-box {
  background: white;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.btn {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  font-size: 16px;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
