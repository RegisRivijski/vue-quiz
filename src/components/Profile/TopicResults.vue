<template>
  <div :class="['topic-results-container', currentTheme]">
    <h2>{{ $t('quizResults') }}</h2>
    <div v-if="userResults.length">
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
      <div class="overall-stats">
        <h3>{{ $t('overallStats') }}</h3>
        <ul>
          <li v-for="termStat in termStats" :key="termStat.term">
            {{ termStat.term }}: {{ termStat.correctAttempts }} / {{ termStat.totalAttempts }} ({{ (termStat.correctAttempts / termStat.totalAttempts * 100).toFixed(2) }}%)
          </li>
        </ul>
      </div>
    </div>
    <p v-else>{{ $t('noResults') }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      selectedTopic: '',
      filteredResults: [],
      dropdownOpen: false,
    };
  },
  computed: {
    ...mapState('theme', ['currentTheme']),
    ...mapState('userResults', ['userResults']),
    ...mapState('topics', ['topics']),
    selectedTopicName() {
      const topic = this.topics.find(topic => topic.id === this.selectedTopic);
      return topic ? topic.name : '';
    },
    termStats() {
      const stats = {};
      this.filteredResults.forEach(result => {
        if (!stats[result.term]) {
          stats[result.term] = { term: result.term, totalAttempts: 0, correctAttempts: 0 };
        }
        stats[result.term].totalAttempts++;
        if (result.isCorrect) {
          stats[result.term].correctAttempts++;
        }
      });
      return Object.values(stats);
    },
  },
  methods: {
    filterResults() {
      this.filteredResults = this.userResults.filter(result => result.topicId === this.selectedTopic);
    },
    selectTopic(topic) {
      this.selectedTopic = topic.id;
      this.dropdownOpen = false;
      this.filterResults();
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
  watch: {
    userResults: 'filterResults',
    selectedTopic: 'filterResults',
  },
  mounted() {
    if (this.topics.length > 0) {
      this.selectedTopic = this.topics[0].id;
    }
    this.filterResults();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.topic-results-container {
  background: var(--card-bg-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
  color: var(--text-color);
}

.dropdown {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.dropdown-selected {
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: var(--input-bg-color);
  color: var(--input-text-color);
  cursor: pointer;
  transition: border-color 0.3s;
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
  transition: background-color 0.3s;
}

.dropdown-options li:hover {
  background-color: var(--dropdown-hover-bg);
}

.overall-stats {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  background: var(--card-bg-color);
  transition: background-color 0.3s, color 0.3s;
}

.overall-stats h3 {
  margin-bottom: 10px;
}

.overall-stats ul {
  list-style-type: none;
  padding: 0;
}

.overall-stats li {
  padding: 5px 0;
}
</style>
