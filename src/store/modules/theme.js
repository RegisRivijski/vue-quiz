const state = {
  currentTheme: localStorage.getItem('theme') || 'light-theme',
};

const mutations = {
  setTheme(state, theme) {
    state.currentTheme = theme;
    localStorage.setItem('theme', theme);
  },
};

const actions = {
  toggleTheme({ commit, state }) {
    const newTheme = state.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    commit('setTheme', newTheme);
  },
};

const getters = {
  currentTheme(state) {
    return state.currentTheme;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
