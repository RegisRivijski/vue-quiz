<template>
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
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    topics: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedTopicId: null,
      dropdownOpen: false,
      showHistory: {},
    };
  },
  computed: {
    ...mapState('userResults', ['topicResults']),
    ...mapState('theme', ['currentTheme']),
    ...mapState('auth', ['token']),
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
  methods: {
    ...mapActions('userResults', ['fetchResultsByTopic']),
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    async selectTopic(topic) {
      this.selectedTopicId = topic.id;
      this.dropdownOpen = false;
      await this.fetchResultsByTopic({
        userId: this.user.id,
        topicId: this.selectedTopicId,
        token: this.token,
      });
    },
    toggleHistory(termId) {
      this.showHistory[termId] = !this.showHistory[termId];
    },
  },
};
</script>

<style scoped>
.card {
  background: var(--card-bg-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  transition: background-color 0.3s, color 0.3s;
}

.topic-select {
  margin-bottom: 20px;
  text-align: center;
}

.dropdown {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.dropdown-selected {
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 16px;
  background-color: var(--dropdown-bg);
  cursor: pointer;
}

.dropdown-selected:hover {
  border-color: var(--primary-color);
}

.dropdown-options {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  background: var(--dropdown-bg);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  z-index: 1000;
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-options li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-options li:hover {
  background-color: var(--dropdown-hover-bg);
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
  background: var(--card-bg-color);
  border-radius: 10px;
}

.topic-results li .term-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.topic-results li .term-summary strong {
  font-size: 1.1em;
  color: var(--primary-color);
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

h2 {
  color: var(--text-color);
  margin-bottom: 20px;
}

h3 {
  color: var(--text-color);
  margin-bottom: 10px;
}
</style>
