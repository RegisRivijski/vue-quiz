<template>
  <div id="app" :class="currentTheme">
    <header>
      <div class="header-content">
        <router-link to="/" class="logo-container">
          <img src="/quiz/logo.png" alt="Logo" class="logo">
          <h1>{{ $t('appName') }}</h1>
        </router-link>
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
    return {};
  },
  computed: {
    ...mapState('auth', ['token']),
    ...mapState('theme', ['currentTheme']),
    isAuthenticated() {
      return !!this.token;
    },
  },
  watch: {
    currentTheme(newTheme) {
      document.body.className = newTheme;
    },
  },
  methods: {
    ...mapMutations('theme', ['setTheme']),
    ...mapMutations('auth', ['clearAuthData']),
    switchLocale(locale) {
      this.$i18n.locale = locale;
    },
    switchTheme(theme) {
      this.setTheme(theme + '-theme');
    },
    logout() {
      this.clearAuthData();
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

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

header {
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
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
  text-decoration: none;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

header h1 {
  color: var(--text-color);
  margin: 0;
  font-size: 1.8em;
}

nav {
  display: flex;
  align-items: center;
}

nav a {
  color: var(--text-color);
  padding: 10px 20px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 5px;
  margin: 0 10px;
  font-size: 1.1em;
}

nav a:hover {
  background-color: var(--secondary-hover-color);
}

nav a.active-link {
  background-color: var(--secondary-color);
  color: var(--btn-text-color);
}

.logout-btn {
  padding: 10px 20px;
  border: none;
  color: var(--text-color);
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s, transform 0.2s;
  background-color: var(--link-color);
  margin-left: 10px;
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
  padding: 40px;
}

footer {
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--footer-bg-color);
  color: var(--footer-text-color);
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
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
  padding: 20px 40px;
}

footer p {
  margin: 20px 0;
  text-align: center;
  font-size: 1.2em;
}

.social-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.social-links h3 {
  margin-bottom: 10px;
  font-size: 1.4em;
}

footer a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.3s;
  margin-bottom: 5px;
  font-size: 1.1em;
}

footer a:hover {
  color: var(--link-hover-color);
}

.locale-switcher,
.theme-switcher {
  display: flex;
  gap: 20px;
  align-items: center;
}

.locale-switcher button,
.theme-switcher button {
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  color: var(--link-color);
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
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
    padding: 20px;
  }

  .header-content {
    flex-direction: column;
    align-items: center;
  }

  nav {
    flex-direction: column;
    width: 100%;
  }

  nav a {
    margin: 5px 0;
    flex: 1;
    text-align: center;
    width: calc(100% - 20px); /* Almost full width */
  }

  .logout-btn {
    margin: 5px 0;
    width: calc(100% - 20px); /* Almost full width */
    text-align: center;
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
