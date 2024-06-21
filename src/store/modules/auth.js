import axios from 'axios';

const state = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('token') || '',
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  setToken(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },
  clearAuthData(state) {
    state.user = {};
    state.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
};

const actions = {
  async login({ commit }, authData) {
    try {
      const response = await axios.post('/quiz/api/login', authData);
      commit('setUser', response.data.user);
      commit('setToken', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  async register(_, authData) {
    try {
      await axios.post('/quiz/api/register', authData);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  async logout({ commit }) {
    commit('clearAuthData');
    delete axios.defaults.headers.common['Authorization'];
  },
  async updateEmail({ state, commit }, { email }) {
    try {
      await axios.put('/quiz/api/update-email', { email }, {
        headers: {
          'Authorization': `Bearer ${state.token}`,
        }
      });
      const updatedUser = { ...state.user, email };
      commit('setUser', updatedUser);
    } catch (error) {
      console.error('Error updating email:', error);
      throw error;
    }
  },
  async updatePassword({ state }, { currentPassword, newPassword }) {
    try {
      await axios.put('/quiz/api/update-password', { currentPassword, newPassword }, {
        headers: {
          'Authorization': `Bearer ${state.token}`,
        }
      });
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },
};

const getters = {
  isAuthenticated(state) {
    return !!state.token;
  },
  user(state) {
    return state.user;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
