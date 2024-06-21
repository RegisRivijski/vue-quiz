<template>
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
</template>

<script>
export default {
  props: {
    userResults: {
      type: Array,
      required: true,
    },
  },
  computed: {
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
    }
  }
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
  transition: background-color 0.3s, color 0.3s;
}

.stat-item.totalQuizzes {
  background-color: var(--total-quizzes-bg);
  color: var(--text-color);
}

.stat-item.totalCorrect {
  background-color: var(--total-correct-bg);
  color: var(--text-color);
}

.stat-item.totalIncorrect {
  background-color: var(--total-incorrect-bg);
  color: var(--text-color);
}

.stat-item.accuracy.excellent {
  background-color: var(--excellent-bg);
}

.stat-item.accuracy.great {
  background-color: var(--great-bg);
}

.stat-item.accuracy.good {
  background-color: var(--good-bg);
}

.stat-item.accuracy.not-bad {
  background-color: var(--not-bad-bg);
}

.stat-item.accuracy.keep-trying {
  background-color: var(--keep-trying-bg);
}

.stat-item.accuracy.better-luck {
  background-color: var(--better-luck-bg);
}

h2 {
  color: var(--text-color);
  margin-bottom: 20px;
}
</style>
