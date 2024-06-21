<template>
  <div class="settings-container">
    <h1>{{ $t('settings') }}</h1>
    <div class="settings-cards">
      <div class="card settings-card">
        <h2>{{ $t('updateEmail') }}</h2>
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
          <button type="submit" class="update-btn">{{ $t('updateEmail') }}</button>
        </form>
      </div>

      <div class="card settings-card">
        <h2>{{ $t('updatePassword') }}</h2>
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
          <button type="submit" class="update-btn">{{ $t('updatePassword') }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      newEmail: '',
      currentPassword: '',
      newPassword: '',
      emailError: '',
      passwordError: '',
    };
  },
  mounted() {
    this.toast = useToast();
  },
  methods: {
    ...mapActions(['updateEmail', 'updatePassword']),
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
        await this.updateEmail({ email: this.newEmail });
        this.toast.success(this.$t('emailUpdated'));
      } catch (error) {
        this.toast.error(this.$t('errorUpdatingEmail'));
      }
    },
    async updatePasswordAction() {
      try {
        await this.updatePassword({ currentPassword: this.currentPassword, newPassword: this.newPassword });
        this.toast.success(this.$t('passwordUpdated'));
      } catch (error) {
        this.toast.error(this.$t('errorUpdatingPassword'));
      }
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
  background-color: #f9f9f9;
  min-height: 100vh;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

h1, h2 {
  color: #333;
  margin-bottom: 20px;
}

.settings-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
}

.settings-card {
  flex: 1 1 calc(50% - 40px); /* 50% width minus gap */
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
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
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

.update-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
}

.update-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.update-btn:active {
  transform: scale(1);
}
</style>
