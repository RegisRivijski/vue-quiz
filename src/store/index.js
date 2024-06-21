// store/index.js

import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    topics: [],
    userResults: [],
    currentTopic: null,
    terms: [],
    topicResults: [],
  },
  mutations: {
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
    setTopics(state, topics) {
      state.topics = topics;
    },
    setUserResults(state, results) {
      state.userResults = results;
    },
    setTerms(state, terms) {
      state.terms = terms;
    },
    setCurrentTopic(state, topic) {
      state.currentTopic = topic;
    },
    setTopicResults(state, results) {
      state.topicResults = results;
    }
  },
  actions: {
    async login({commit}, authData) {
      try {
        const response = await axios.post('/api/login', authData);
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async register({commit}, authData) {
      try {
        const response = await axios.post('/api/register', authData);
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
    async fetchTopics({commit}) {
      try {
        const response = await axios.get('/api/topics');
        commit('setTopics', response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    },
    async fetchTerms({commit, state}, topicId) {
      try {
        const response = await axios.get(`/api/terms/${topicId}`, {
          headers: {
            'authorization': `Bearer ${state.token}`,
          },
        });
        if (response.data) {
          commit('setTerms', response.data);
        }
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    },
    async fetchUserResults({commit, state}) {
      if (!state.user.id) return;
      try {
        const response = await axios.get(`/api/user-results/${state.user.id}`, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          },
        });
        commit('setUserResults', response.data);
      } catch (error) {
        console.error('Error fetching user results:', error);
      }
    },
    async logout({commit}) {
      commit('clearAuthData');
      delete axios.defaults.headers.common['Authorization'];
    },
    setCurrentTopic({commit, state}, topicId) {
      const topic = state.topics.find(topic => topic.id === topicId);
      if (topic) {
        commit('setCurrentTopic', topic);
        if (topic.terms) {
          commit('setTerms', topic.terms);
        }
      }
    },
    async submitQuizResult({state}, quizResult) {
      try {
        await axios.post('/api/add-quiz-result', quizResult, {
          headers: {
            'authorization': `Bearer ${state.token}`,
          }
        });
      } catch (error) {
        console.error('Error submitting quiz result:', error);
      }
    },
    async fetchResultsByTopic({commit, state}, {userId, topicId}) {
      try {
        const response = await axios.get(`/api/user-results-by-topic/${userId}/${topicId}`, {
          headers: {
            'authorization': `Bearer ${state.token}`,
          },
        });
        commit('setTopicResults', response.data);
      } catch (error) {
        console.error('Error fetching results by topic:', error);
      }
    },
    async updateEmail({state, commit}, {email}) {
      try {
        await axios.put('/api/update-email', {email}, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          }
        });
        const updatedUser = {...state.user, email};
        commit('setUser', updatedUser);
      } catch (error) {
        console.error('Error updating email:', error);
        throw error;
      }
    },
    async updatePassword({state}, {currentPassword, newPassword}) {
      try {
        await axios.put('/api/update-password', {currentPassword, newPassword}, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
          }
        });
      } catch (error) {
        console.error('Error updating password:', error);
        throw error;
      }
    },
    validateEmail(_, email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email)
        ? { isValid: true, message: '' }
        : { isValid: false, message: 'Invalid email format' };
    },
    validatePassword(_, password) {
      return password.length >= 6
        ? { isValid: true, message: '' }
        : { isValid: false, message: 'Password must be at least 6 characters long' };
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    user(state) {
      return state.user;
    },
    topics(state) {
      return state.topics;
    },
    userResults(state) {
      return state.userResults;
    },
    terms(state) {
      return state.terms;
    },
    currentTopic(state) {
      return state.currentTopic;
    },
  },
});
