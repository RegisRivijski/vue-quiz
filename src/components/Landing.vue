<template>
  <div :class="['landing-container', currentTheme]">
    <div v-if="isAuthenticated" class="content">
      <h1>{{ $t('landingWelcome') }}, {{ user.username }}</h1>
      <p>{{ $t('landingDescription') }}</p>
      <div class="buttons">
        <router-link to="/topics" class="btn">{{ $t('topics') }}</router-link>
        <router-link to="/profile" class="btn secondary">{{ $t('profile') }}</router-link>
      </div>
    </div>
    <div v-else class="content">
      <h1>{{ $t('landingWelcome') }}</h1>
      <p>{{ $t('landingDescription') }}</p>
      <div class="buttons">
        <router-link to="/register" class="btn">{{ $t('getStarted') }}</router-link>
        <router-link to="/login" class="btn secondary">{{ $t('login') }}</router-link>
      </div>
    </div>
    <div class="features">
      <div class="feature">
        <h2>{{ $t('feature1Title') }}</h2>
        <p>{{ $t('feature1Description') }}</p>
      </div>
      <div class="feature">
        <h2>{{ $t('feature2Title') }}</h2>
        <p>{{ $t('feature2Description') }}</p>
      </div>
      <div class="feature">
        <h2>{{ $t('feature3Title') }}</h2>
        <p>{{ $t('feature3Description') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('theme', ['currentTheme']),
    ...mapState('auth', ['token', 'user']),
    isAuthenticated() {
      return !!this.token;
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.content {
  text-align: center;
  margin-bottom: 50px;
}

h1 {
  font-size: 3em;
  color: var(--primary-color);
}

p {
  font-size: 1.2em;
  margin: 20px 0;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: var(--btn-text-color);
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  background-color: var(--primary-hover-color);
  transform: scale(1.05);
}

.btn.secondary {
  background-color: var(--secondary-color);
}

.btn.secondary:hover {
  background-color: var(--secondary-hover-color);
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.feature {
  background-color: var(--card-bg-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
  transition: background-color 0.3s, color 0.3s;
}

.feature h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: var(--primary-color);
}

.feature p {
  font-size: 1em;
  color: var(--text-color);
}
</style>
