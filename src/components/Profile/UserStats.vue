<template>
  <div :class="['user-stats-container', currentTheme]">
    <h2>{{ $t('statistics') }}</h2>
    <div class="stat-box">
      <p>{{ $t('totalQuizzes') }}</p>
      <p>{{ userResults.length }}</p>
    </div>
    <div class="stat-box">
      <p>{{ $t('totalCorrect') }}</p>
      <p>{{ totalCorrect }}</p>
    </div>
    <div class="stat-box">
      <p>{{ $t('totalIncorrect') }}</p>
      <p>{{ totalIncorrect }}</p>
    </div>
    <div class="stat-box">
      <p>{{ $t('accuracy') }}</p>
      <p>{{ accuracy }}%</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['userResults'],
  computed: {
    ...mapState('theme', ['currentTheme']),
    totalCorrect() {
      return this.userResults.filter(result => result.isCorrect).length;
    },
    totalIncorrect() {
      return this.userResults.filter(result => !result.isCorrect).length;
    },
    accuracy() {
      const total = this.userResults.length;
      if (total === 0) return 0;
      return ((this.totalCorrect / total) * 100).toFixed(2);
    },
  },
};
</script>

<style scoped>
.user-stats-container {
  background: var(--card-bg-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;
  width: 100%;
}

h2 {
  margin-bottom: 20px;
}

.stat-box {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: var(--stat-bg-color);
}

.stat-box p {
  margin: 0;
  font-size: 1.2em;
}
</style>
