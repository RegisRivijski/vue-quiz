<template>
  <div class="topics-container">
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
    ...mapState(['topics', 'terms']),
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
    ...mapActions(['fetchTopics', 'fetchTerms', 'setCurrentTopic']),
    async selectTopic(topic) {
      this.selectedTopic = topic.id;
      this.dropdownOpen = false;
      await this.setCurrentTopic(topic.id);
      await this.fetchTerms(topic.id);
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
  background-color: #f9f9f9;
  min-height: 100vh;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

h1, h2 {
  color: #333;
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
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s, transform 0.2s;
}

.term-item:hover {
  background-color: #f1f1f1;
  transform: scale(1.02);
}

.term {
  font-weight: bold;
  color: #007bff;
  flex: 1;
  text-align: center;
}

.definition {
  color: #555;
  flex: 2;
  text-align: left;
}

.start-quiz-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 10px;
  font-family: 'Montserrat', sans-serif;
}

.start-quiz-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.start-quiz-btn:active {
  transform: scale(1);
}

.start-quiz-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
