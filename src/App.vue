<template>
  <div id="app" :class="currentTheme">
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
          <button v-if="isAuthenticated" @click="logout" class="logout-btn">{{ $t('logout') }}</button>
        </nav>
      </div>
    </header>
    <router-view/>
    <footer>
      <div class="footer-container">
        <div class="footer-content">
          <div class="social-links">
            <h3>{{ $t('contactDeveloper') }}</h3>
            <a href="https://t.me/artur_petrov_29" target="_blank">Telegram</a>
            <a href="https://www.instagram.com/yonko_0415" target="_blank">Instagram</a>
            <a href="https://www.linkedin.com/in/artur-petrov-a28818211" target="_blank">LinkedIn</a>
            <a href="mailto:petrov0397@gmail.com">Email</a>
          </div>
          <div class="locale-switcher">
            <button @click="switchLocale('en')" :class="{'active': $i18n.locale === 'en'}">EN</button>
            <button @click="switchLocale('uk')" :class="{'active': $i18n.locale === 'uk'}">UK</button>
          </div>
          <div class="theme-switcher">
            <button @click="switchTheme('light')" :class="{'active': currentTheme === 'light-theme'}">{{ $t('lightTheme') }}</button>
            <button @click="switchTheme('dark')" :class="{'active': currentTheme === 'dark-theme'}">{{ $t('darkTheme') }}</button>
          </div>
        </div>
        <p>{{ $t('appDescription') }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
    };
  },
  computed: {
    ...mapState('theme', ['currentTheme']),
  },
  watch: {
    $route() {
      this.isAuthenticated = !!localStorage.getItem('token');
    },
    currentTheme(newTheme) {
      document.body.className = newTheme;
    },
  },
  methods: {
    ...mapMutations('theme', ['setTheme']),
    switchLocale(locale) {
      this.$i18n.locale = locale;
    },
    switchTheme(theme) {
      this.setTheme(theme + '-theme');
    },
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.$router.push('/');
    },
  },
  mounted() {
    document.body.className = this.currentTheme;
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

body.light-theme {
  --bg-color: #f9f9f9;
  --text-color: #333;
  --header-bg-color: #007bff;
  --header-text-color: #fff;
  --card-bg-color: #fff;
  --card-text-color: #333;
  --footer-bg-color: #f9f9f9;
  --footer-text-color: #333;
  --link-color: #007bff;
  --link-hover-color: #0056b3;
}

body.dark-theme {
  --bg-color: #121212;
  --text-color: #fff;
  --header-bg-color: #1f1f1f;
  --header-text-color: #fff;
  --card-bg-color: #1f1f1f;
  --card-text-color: #fff;
  --footer-bg-color: #1f1f1f;
  --footer-text-color: #fff;
  --link-color: #bb86fc;
  --link-hover-color: #3700b3;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

header {
  background-color: var(--header-bg-color);
  padding: 10px 20px;
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
  color: var(--header-text-color);
  margin: 0;
  font-size: 1.5em;
}

nav {
  display: flex;
  align-items: center;
}

nav a {
  color: var(--header-text-color);
  padding: 10px 15px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 5px;
  margin: 0 10px;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

nav a.active-link {
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--header-text-color);
}

.logout-btn {
  padding: 10px 15px;
  border: none;
  color: var(--header-text-color);
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.2s;
  background-color: var(--link-color);
}

.logout-btn:hover {
  background-color: var(--link-hover-color);
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
  background-color: var(--footer-bg-color);
  color: var(--footer-text-color);
}

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
}

footer p {
  margin: 10px 0;
  text-align: center;
}

.social-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.social-links h3 {
  margin-bottom: 10px;
}

footer a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.3s;
}

footer a:hover {
  color: var(--link-hover-color);
}

.locale-switcher,
.theme-switcher {
  display: flex;
  gap: 10px;
  align-items: center;
}

.locale-switcher button,
.theme-switcher button {
  padding: 10px 15px;
  border: none;
  background-color: transparent;
  color: var(--link-color);
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
}

.locale-switcher button.active,
.theme-switcher button.active {
  background-color: var(--link-color);
  color: var(--header-text-color);
}

.locale-switcher button:hover,
.theme-switcher button:hover {
  background-color: var(--link-hover-color);
  color: var(--header-text-color);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    padding: 10px;
  }

  .header-content {
    flex-direction: column;
    align-items: center;
  }

  nav {
    flex-direction: column;
  }

  nav a {
    margin: 5px 0;
  }

  .logout-btn {
    margin: 5px 0;
  }

  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .social-links {
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }

  .locale-switcher,
  .theme-switcher {
    margin-top: 10px;
    justify-content: center;
  }
}
</style>
