<template>
  <div :class="['topics-container', currentTheme]">
    <h1>{{ $t('topics') }}</h1>
    <ul class="topics-list">
      <li v-for="topic in topics" :key="topic.id" @click="selectTopic(topic.id)" class="topic-item">
        {{ topic.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('theme', ['currentTheme']),
    ...mapState('topics', ['topics']),
  },
  methods: {
    ...mapActions('topics', ['fetchTopics']),
    selectTopic(topicId) {
      this.$router.push(`/topics/${topicId}`);
    },
  },
  async created() {
    await this.fetchTopics();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.topics-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
}

h1 {
  color: var(--text-color);
  margin-bottom: 20px;
}

.topics-list {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  width: 100%;
  max-width: 800px;
}

.topic-item {
  padding: 10px;
  margin-bottom: 5px;
  background: var(--card-bg-color);
  border-radius: 5px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.topic-item:hover {
  background-color: var(--hover-bg-color);
  transform: scale(1.02);
}
</style>
