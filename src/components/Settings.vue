<template>
  <div :class="['settings-container', currentTheme]">
    <div class="tabs">
      <button :class="{ 'active': activeTab === 'email' }" @click="activeTab = 'email'">{{ $t('updateEmail') }}</button>
      <button :class="{ 'active': activeTab === 'password' }" @click="activeTab = 'password'">{{ $t('updatePassword') }}</button>
    </div>

    <div v-if="activeTab === 'email'" class="settings-box">
      <h1>{{ $t('updateEmail') }}</h1>
      <form @submit.prevent="validateEmail">
        <div class="form-group">
          <label for="newEmail">{{ $t('newEmail') }}</label>
          <input
              type="email"
              v-model="newEmail"
              id="newEmail"
              required
              :class="{'is-invalid': emailError}"
              :placeholder="$t('enterNewEmail')"
          />
          <small v-if="emailError" class="error-message">{{ emailError }}</small>
        </div>
        <button type="submit" class="btn">{{ $t('updateEmail') }}</button>
      </form>
    </div>

    <div v-if="activeTab === 'password'" class="settings-box">
      <h1>{{ $t('updatePassword') }}</h1>
      <form @submit.prevent="validatePassword">
        <div class="form-group">
          <label for="currentPassword">{{ $t('currentPassword') }}</label>
          <input
              type="password"
              v-model="currentPassword"
              id="currentPassword"
              required
              :placeholder="$t('enterCurrentPassword')"
          />
        </div>
        <div class="form-group">
          <label for="newPassword">{{ $t('newPassword') }}</label>
          <input
              type="password"
              v-model="newPassword"
              id="newPassword"
              required
              :class="{'is-invalid': passwordError}"
              :placeholder="$t('enterNewPassword')"
          />
          <small v-if="passwordError" class="error-message">{{ passwordError }}</small>
        </div>
        <button type="submit" class="btn">{{ $t('updatePassword') }}</button>
      </form>
    </div>

    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      activeTab: 'email',
      newEmail: '',
      currentPassword: '',
      newPassword: '',
      emailError: '',
      passwordError: '',
      message: '',
      messageType: '',
    };
  },
  computed: {
    ...mapState('theme', ['currentTheme']),
    ...mapState('auth', ['token']),
  },
  mounted() {
    this.toast = useToast();
  },
  methods: {
    ...mapActions('auth', ['updateEmail', 'updatePassword']),
    validateEmail() {
      this.emailError = '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.newEmail)) {
        this.emailError = this.$t('invalidEmail');
        this.toast.error(this.emailError);
        return;
      }
      this.updateEmailAction();
    },
    validatePassword() {
      this.passwordError = '';
      if (this.newPassword.length < 6) {
        this.passwordError = this.$t('passwordTooShort');
        this.toast.error(this.passwordError);
        return;
      }
      this.updatePasswordAction();
    },
    async updateEmailAction() {
      try {
        await this.updateEmail({
          email: this.newEmail,
          token: this.token,
        });
        this.setMessage(this.$t('emailUpdated'), 'success');
      } catch (error) {
        this.setMessage(this.$t('errorUpdatingEmail'), 'error');
      }
    },
    async updatePasswordAction() {
      try {
        await this.updatePassword({
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          token: this.token,
        });
        this.setMessage(this.$t('passwordUpdated'), 'success');
      } catch (error) {
        this.setMessage(this.$t('errorUpdatingPassword'), 'error');
      }
    },
    setMessage(message, type) {
      this.toast[type](message);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
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

.settings-box {
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

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.form-group input {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 0 auto 15px auto;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s, color 0.3s;
  background-color: var(--input-bg-color);
  color: var(--input-text-color);
}

.form-group input.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 5px rgba(220, 53, 69, 0.25);
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
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
