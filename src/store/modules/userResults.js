import axios from 'axios';

const state = {
  userResults: [],
  topicResults: [],
};

const mutations = {
  setUserResults(state, results) {
    state.userResults = results;
  },
  setTopicResults(state, results) {
    state.topicResults = results;
  },
};

const actions = {
  async fetchUserResults({ commit, state }, userId) {
    if (!userId) return;
    try {
      const response = await axios.get(`/quiz/api/user-results/${userId}`, {
        headers: {
          'Authorization': `Bearer ${state.token}`,
        },
      });
      commit('setUserResults', response.data);
    } catch (error) {
      console.error('Error fetching user results:', error);
    }
  },
  async fetchResultsByTopic({ commit, state }, { userId, topicId }) {
    try {
      const response = await axios.get(`/quiz/api/user-results-by-topic/${userId}/${topicId}`, {
        headers: {
          'authorization': `Bearer ${state.token}`,
        },
      });
      commit('setTopicResults', response.data);
    } catch (error) {
      console.error('Error fetching results by topic:', error);
    }
  },
  async submitQuizResult({ state }, quizResult) {
    try {
      await axios.post('/quiz/api/add-quiz-result', quizResult, {
        headers: {
          'authorization': `Bearer ${state.token}`,
        },
      });
    } catch (error) {
      console.error('Error submitting quiz result:', error);
    }
  },
};

const getters = {
  userResults(state) {
    return state.userResults;
  },
  topicResults(state) {
    return state.topicResults;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
