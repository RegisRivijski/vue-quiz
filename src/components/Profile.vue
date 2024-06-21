<template>
  <div class="profile-container">
    <h1>{{ $t('profile') }}</h1>

    <div class="card user-info">
      <h2>{{ $t('userInfo') }}</h2>
      <p><strong>{{ $t('username') }}:</strong> {{ user.username }}</p>
      <p><strong>{{ $t('email') }}:</strong> {{ user.email }}</p>
    </div>

    <div class="card user-stats">
      <h2>{{ $t('statistics') }}</h2>
      <div class="stats-grid">
        <div class="stat-item totalQuizzes">
          <strong>{{ $t('totalQuizzes') }}</strong>
          <p>{{ totalQuizzes }}</p>
        </div>
        <div class="stat-item totalCorrect">
          <strong>{{ $t('totalCorrect') }}</strong>
          <p>{{ totalCorrect }}</p>
        </div>
        <div class="stat-item totalIncorrect">
          <strong>{{ $t('totalIncorrect') }}</strong>
          <p>{{ totalIncorrect }}</p>
        </div>
        <div :class="['stat-item', 'accuracy', accuracyClass]">
          <strong>{{ $t('accuracy') }}</strong>
          <p>{{ accuracy }}%</p>
        </div>
      </div>
    </div>

    <div class="card topics-results">
      <h2>{{ $t('quizResults') }}</h2>
      <div v-if="topics.length">
        <div class="topic-select">
          <label for="topicSelect" class="select-topic-label">{{ $t('selectTopic') }}</label>
          <div class="dropdown">
            <div class="dropdown-selected" @click="toggleDropdown">
              {{ selectedTopicName || $t('selectTopic') }}
            </div>
            <ul v-if="dropdownOpen" class="dropdown-options">
              <li v-for="topic in topics" :key="topic.id" @click="selectTopic(topic)">
                {{ topic.name }}
              </li>
            </ul>
          </div>
        </div>

        <div v-if="filteredResults.length" class="topic-results">
          <h3>{{ selectedTopicName }}</h3>
          <ul>
            <li v-for="result in filteredResults" :key="result.termId">
              <div class="term-summary" @click="toggleHistory(result.termId)">
                <strong>{{ result.term }}</strong>
                <span>{{ result.correctTotal }} / {{ result.total }}</span>
              </div>
              <ul v-if="showHistory[result.termId]" class="history-list">
                <li v-for="history in result.history" :key="history.id">
                  {{ history.userAnswer === 'No answer' ? $t('noAnswer') : history.userAnswer }} -
                  <span :class="{'correct': history.isCorrect, 'incorrect': !history.isCorrect}">
                    {{ history.isCorrect ? $t('correct') : $t('wrong') }}
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <p v-else>{{ $t('noResults') }}</p>
      </div>
      <p v-else>{{ $t('loading') }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedTopicId: null,
      dropdownOpen: false,
      showHistory: {},
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      topics: state => state.topics,
      userResults: state => state.userResults,
      topicResults: state => state.topicResults,
    }),
    totalQuizzes() {
      return this.userResults.length;
    },
    totalCorrect() {
      return this.userResults.filter(result => result.isCorrect).length;
    },
    totalIncorrect() {
      return this.totalQuizzes - this.totalCorrect;
    },
    accuracy() {
      return ((this.totalCorrect / this.totalQuizzes) * 100).toFixed(2);
    },
    accuracyClass() {
      const percentage = this.accuracy;
      if (percentage === 100) return 'excellent';
      if (percentage >= 80) return 'great';
      if (percentage >= 60) return 'good';
      if (percentage >= 40) return 'not-bad';
      if (percentage >= 20) return 'keep-trying';
      return 'better-luck';
    },
    selectedTopicName() {
      const topic = this.topics.find(t => t.id === this.selectedTopicId);
      return topic ? topic.name : '';
    },
    filteredResults() {
      const results = this.topicResults.filter(result => result.topicId === this.selectedTopicId);
      const terms = [...new Set(results.map(result => result.termId))];
      return terms.map((termId) => {
        const termResults = results.filter(result => result.termId === termId);
        const correctTotal = termResults.filter(result => result.isCorrect).length;
        return {
          termId,
          term: termResults[0].term,
          correctTotal,
          total: termResults.length,
          history: termResults,
        };
      });
    },
  },
  async created() {
    await this.fetchUserResults();
    await this.fetchTopics();
    if (this.topics.length > 0) {
      this.selectTopic(this.topics[0]);
    }
  },
  methods: {
    ...mapActions(['fetchUserResults', 'fetchTopics', 'fetchResultsByTopic']),
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    async selectTopic(topic) {
      this.selectedTopicId = topic.id;
      this.dropdownOpen = false;
      await this.fetchResultsByTopic();
    },
    toggleHistory(termId) {
      if (!this.showHistory[termId]) {
        this.showHistory[termId] = this.filteredResults.find((item) => item.termId === termId);
      } else {
        this.showHistory[termId] = null;
      }
    },
    async fetchResultsByTopic() {
      if (this.selectedTopicId) {
        await this.$store.dispatch('fetchResultsByTopic', { userId: this.user.id, topicId: this.selectedTopicId });
      }
    },
  },
  watch: {
    selectedTopicId(newTopicId) {
      this.fetchResultsByTopic(newTopicId);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

h1, h2 {
  color: #333;
  margin-bottom: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
}

.stat-item {
  flex: 1 1 30%;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 123, 255, 0.1);
}

.stat-item.totalQuizzes {
  background-color: #007bff; /* Blue for total quizzes */
  color: #ffffff;
}

.stat-item.totalCorrect {
  background-color: #28a745; /* Green for total correct */
  color: #ffffff;
}

.stat-item.totalIncorrect {
  background-color: #dc3545; /* Red for total incorrect */
  color: #ffffff;
}

.stat-item.accuracy.excellent {
  background-color: #28a745; /* Green for excellent */
}

.stat-item.accuracy.great {
  background-color: #007bff; /* Blue for great */
}

.stat-item.accuracy.good {
  background-color: #ffc107; /* Yellow for good */
}

.stat-item.accuracy.not-bad {
  background-color: #ff851b; /* Orange for not bad */
}

.stat-item.accuracy.keep-trying {
  background-color: #ff5722; /* Deep orange for keep trying */
}

.stat-item.accuracy.better-luck {
  background-color: #dc3545; /* Red for better luck */
}

.topic-select {
  margin-bottom: 20px;
  text-align: center; /* Center the select dropdown */
}

.dropdown {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto; /* Center the dropdown */
}

.dropdown-selected {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.dropdown-selected:focus,
.dropdown-selected:hover {
  border-color: #007bff;
  box-shadow: 0 2px 7px rgba(0, 123, 255, 0.3);
}

.dropdown-options {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-options li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-options li:hover {
  background-color: #f1f1f1;
}

.select-topic-label {
  font-weight: bold;
  font-size: 18px;
  display: block;
  margin-bottom: 5px;
}

.topic-results ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.topic-results li {
  padding: 10px;
  margin-bottom: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.topic-results li .term-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.topic-results li .term-summary strong {
  font-size: 1.1em;
  color: #007bff;
}

.history-list {
  margin-top: 10px;
  padding-left: 20px;
}

.correct {
  color: #28a745;
  font-weight: bold;
}

.incorrect {
  color: #dc3545;
  font-weight: bold;
}
</style>
