<template>
  <div :class="['topics-container', currentTheme]">
    <h1>{{ $t('topics') }}</h1>
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

    <h2>{{ $t('terms') }}</h2>
    <ul class="terms-list">
      <li v-for="term in terms" :key="term.id" class="term-item">
        <span class="term">{{ term.term }}</span>
        <span class="definition">{{ term.definition }}</span>
      </li>
    </ul>

    <button @click="startQuiz" :disabled="terms.length === 0" class="start-quiz-btn">{{ $t('startQuiz') }}</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedTopic: null,
      dropdownOpen: false,
    };
  },
  computed: {
    ...mapState('auth', ['token']),
    ...mapState('theme', ['currentTheme']),
    ...mapState('topics', ['topics', 'terms']),
    selectedTopicName() {
      const topic = this.topics.find(topic => topic.id === this.selectedTopic);
      return topic ? topic.name : '';
    },
  },
  async created() {
    await this.fetchTopics();
    if (this.topics.length > 0) {
      this.selectTopic(this.topics[0]);
    }
  },
  methods: {
    ...mapActions('topics', ['fetchTopics', 'fetchTerms', 'setCurrentTopic']),
    async selectTopic(topic) {
      this.selectedTopic = topic.id;
      this.dropdownOpen = false;
      await this.setCurrentTopic(topic.id);
      await this.fetchTerms({
        topicId: topic.id,
        token: this.token,
      });
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    startQuiz() {
      if (this.terms.length > 0) {
        this.$router.push(`/quiz/${this.selectedTopic}`);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.topics-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  min-height: 100vh;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
}

h1, h2 {
  color: var(--text-color);
  margin-bottom: 10px;
}

.dropdown {
  position: relative;
  width: 80%;
  max-width: 500px;
  margin-bottom: 10px;
}

.dropdown-selected {
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  font-size: 16px;
  background-color: var(--dropdown-bg-color);
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
  background: var(--dropdown-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 3px;
  z-index: 1000;
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-options li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-options li:hover {
  background-color: var(--hover-bg-color);
}

.terms-list {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  width: 100%;
  max-width: 800px;
}

.term-item {
  padding: 10px;
  margin-bottom: 5px;
  background: var(--term-bg-color);
  border-radius: 3px;
  border: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.term {
  font-weight: bold;
  color: var(--primary-color);
  flex: 1;
  text-align: center;
}

.definition {
  color: var(--text-color);
  flex: 2;
  text-align: left;
}

.start-quiz-btn {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: var(--btn-text-color);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-top: 10px;
  font-family: 'Montserrat', sans-serif;
}

.start-quiz-btn:hover {
  background-color: var(--primary-hover-color);
}

.start-quiz-btn:disabled {
  background-color: var(--disabled-bg-color);
  cursor: not-allowed;
}
</style>
