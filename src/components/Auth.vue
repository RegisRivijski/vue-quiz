<template>
  <div :class="['auth-container', currentTheme]">
    <div class="tabs">
      <button :class="{ 'active': activeTab === 'login' }" @click="activeTab = 'login'">{{ $t('login') }}</button>
      <button :class="{ 'active': activeTab === 'register' }" @click="activeTab = 'register'">{{ $t('register') }}</button>
    </div>

    <div v-if="activeTab === 'login'" class="auth-box">
      <h1>{{ $t('login') }}</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="username" :placeholder="$t('username')" required />
        <input v-model="password" type="password" :placeholder="$t('password')" required />
        <button type="submit" class="btn">{{ $t('login') }}</button>
      </form>
    </div>

    <div v-if="activeTab === 'register'" class="auth-box">
      <h1>{{ $t('register') }}</h1>
      <form @submit.prevent="handleRegister">
        <input v-model="username" :placeholder="$t('username')" required />
        <input v-model="password" type="password" :placeholder="$t('password')" required />
        <input v-model="email" type="email" :placeholder="$t('email')" required />
        <button type="submit" class="btn">{{ $t('register') }}</button>
      </form>
    </div>

    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { useToast } from 'vue-toastification';

export default {
  props: ['defaultTab'],
  data() {
    return {
      activeTab: 'login',
      username: '',
      password: '',
      email: '',
      message: '',
      messageType: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapState('theme', ['currentTheme']),
  },
  mounted() {
    this.toast = useToast();
    if (this.defaultTab) {
      this.activeTab = this.defaultTab;
    }
    if (this.isAuthenticated) {
      this.$router.push('/topics');
    }
  },
  methods: {
    ...mapActions('auth', ['register', 'login']),
    async handleRegister() {
      try {
        await this.register({
          username: this.username,
          password: this.password,
          email: this.email,
        });
        this.setMessage(this.$t('registrationSuccess'), 'success');
        this.$router.push('/topics');
      } catch (error) {
        this.setMessage(this.$t('registrationFailed'), 'error');
      }
    },
    async handleLogin() {
      try {
        await this.login({
          username: this.username,
          password: this.password,
        });
        this.setMessage(this.$t('loginSuccess'), 'success');
        this.$router.push('/topics');
      } catch (error) {
        this.setMessage(this.$t('loginFailed'), 'error');
      }
    },
    setMessage(message, type) {
      this.message = message;
      this.messageType = type;
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
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
  transition: border-bottom 0.3s, color 0.3s;
}

.tabs button.active {
  border-bottom: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.tabs button:not(.active) {
  color: var(--inactive-tab-color);
}

.tabs button:hover {
  border-bottom: 2px solid var(--primary-color);
}

.auth-box {
  background: var(--card-bg-color);
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  transition: background-color 0.3s, color 0.3s;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: var(--text-color);
}

form {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
  background-color: var(--input-bg-color);
  color: var(--input-text-color);
}

input:focus {
  border-color: var(--primary-color);
  outline: none;
}

.btn {
  padding: 10px;
  background-color: var(--primary-color);
  color: var(--btn-text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: var(--primary-hover-color);
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
</style>
