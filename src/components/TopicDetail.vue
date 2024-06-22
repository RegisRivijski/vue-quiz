<template>
  <div :class="['topic-detail-container', currentTheme]">
    <h1 v-if="currentTopic">{{ currentTopic.name }}</h1>
    <h2 v-if="currentTopic">{{ $t('terms') }}</h2>
    <ul v-if="currentTopic" class="terms-list">
      <li v-for="term in terms" :key="term.id" class="term-item">
        <span class="term">{{ term.term }}</span>
        <span class="definition">{{ term.definition }}</span>
      </li>
    </ul>
    <button v-if="currentTopic" @click="startQuiz" :disabled="terms.length === 0" class="start-quiz-btn">{{ $t('startQuiz') }}</button>
    <p v-else>{{ $t('loading') }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['token']),
    ...mapState('theme', ['currentTheme']),
    ...mapState('topics', ['currentTopic', 'terms']),
  },
  methods: {
    ...mapActions('topics', ['fetchTerms', 'setCurrentTopic']),
    startQuiz() {
      if (this.terms.length > 0) {
        this.$router.push(`/quiz/${this.currentTopic.id}`);
      }
    },
  },
  async created() {
    const topicId = this.$route.params.topicId;
    await this.setCurrentTopic({
      topicId: topicId,
      token: this.token,
    });
    await this.fetchTerms({
      topicId: topicId,
      token: this.token,
    });
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.topic-detail-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
}

h1, h2 {
  color: var(--text-color);
  margin-bottom: 20px;
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
  background: var(--card-bg-color);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--border-color);
  transition: background-color 0.3s, transform 0.2s;
}

.term-item:hover {
  background-color: var(--hover-bg-color);
  transform: scale(1.02);
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
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: var(--btn-text-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
}

.start-quiz-btn:hover {
  background-color: var(--primary-hover-color);
  transform: scale(1.05);
}

.start-quiz-btn:disabled {
  background-color: var(--disabled-bg-color);
  cursor: not-allowed;
}
</style>
