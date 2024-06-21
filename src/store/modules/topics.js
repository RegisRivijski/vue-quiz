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
  async fetchTerms({ commit, state }, topicId) {
    try {
      const response = await axios.get(`/quiz/api/terms/${topicId}`, {
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
  setCurrentTopic({ commit, state }, topicId) {
    const topic = state.topics.find(topic => topic.id === topicId);
    if (topic) {
      commit('setCurrentTopic', topic);
      if (topic.terms) {
        commit('setTerms', topic.terms);
      }
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
