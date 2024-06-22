import axios from 'axios';

const state = {
  topics: [],
  currentTopic: null,
  terms: [],
};

const mutations = {
  setTopics(state, topics) {
    state.topics = topics;
  },
  setCurrentTopic(state, topic) {
    state.currentTopic = topic;
  },
  setTerms(state, terms) {
    state.terms = terms;
  },
};

const actions = {
  async fetchTopics({ commit }) {
    try {
      const response = await axios.get('/quiz/api/topics');
      commit('setTopics', response.data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  },
  async fetchTerms({ commit }, { topicId, token }) {
    try {
      const response = await axios.get(`/quiz/api/terms/${topicId}`, {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      });
      if (response.data) {
        commit('setTerms', response.data);
      }
    } catch (error) {
      console.error('Error fetching terms:', error);
    }
  },
  async setCurrentTopic({ commit, dispatch }, { topicId, token }) {
    try {
      const response = await axios.get(`/quiz/api/topic/${topicId}`);
      commit('setCurrentTopic', response.data);
      await dispatch('fetchTerms', { topicId, token });
    } catch (error) {
      console.error('Error setting current topic:', error);
    }
  },
};

const getters = {
  topics(state) {
    return state.topics;
  },
  currentTopic(state) {
    return state.currentTopic;
  },
  terms(state) {
    return state.terms;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
