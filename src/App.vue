<template>
  <div id="app">
    <header>
      <div class="header-content">
        <div class="logo-container">
          <img src="img.png" alt="Logo" class="logo">
          <h1>{{ $t('appName') }}</h1>
        </div>
        <nav>
          <router-link v-if="isAuthenticated" to="/topics" active-class="active-link">{{ $t('topics') }}</router-link>
          <router-link v-if="isAuthenticated" to="/profile" active-class="active-link">{{ $t('profile') }}</router-link>
          <router-link v-if="isAuthenticated" to="/settings" active-class="active-link">{{ $t('settings') }}</router-link>
          <div class="locale-switcher">
            <button @click="switchLocale('en')" :class="{'active': $i18n.locale === 'en'}">EN</button>
            <button @click="switchLocale('uk')" :class="{'active': $i18n.locale === 'uk'}">UK</button>
          </div>
          <button v-if="isAuthenticated" @click="logout" class="logout-btn">{{ $t('logout') }}</button>
        </nav>
      </div>
    </header>
    <router-view/>
    <footer>
      <div class="footer-container">
        <p>{{ $t('appDescription') }}</p>
        <div class="social-links">
          <a href="https://t.me/artur_petrov_29" target="_blank">Telegram</a>
          <a href="https://www.instagram.com/yonko_0415" target="_blank">Instagram</a>
          <a href="https://www.linkedin.com/in/artur-petrov-a28818211" target="_blank">LinkedIn</a>
          <a href="mailto:petrov0397@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
    };
  },
  watch: {
    $route() {
      this.isAuthenticated = !!localStorage.getItem('token');
    },
  },
  methods: {
    switchLocale(locale) {
      this.$i18n.locale = locale;
    },
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.$router.push('/');
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #007bff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

header h1 {
  color: white;
  margin: 0;
  font-size: 1.5em;
}

nav {
  display: flex;
  align-items: center;
}

nav a {
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 5px;
  margin: 0 10px;
}

nav a:hover {
  background-color: #0056b3;
}

nav a.active-link {
  background-color: #0056b3;
  color: white;
}

.locale-switcher {
  display: flex;
  gap: 10px;
  margin-right: 20px;
}

.locale-switcher button {
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
}

.locale-switcher button.active {
  background-color: #0056b3;
  color: white;
}

.locale-switcher button:hover {
  background-color: #0056b3;
  color: white;
  transform: scale(1.05);
}

.logout-btn {
  padding: 10px 15px;
  border: none;
  background-color: #dc3545;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.2s;
}

.logout-btn:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

.logout-btn:active {
  transform: scale(1);
}

router-view {
  flex: 1;
  padding: 20px;
}

footer {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

footer p {
  margin: 10px 0;
  color: #333;
  text-align: center;
}

.social-links {
  display: flex;
  gap: 20px;
}

footer a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

footer a:hover {
  color: #0056b3;
}
</style>
