<template>
  <div :class="['quiz-container', currentTheme]">
    <h1>{{ $t('forTopic') }} "{{ currentTopic.name }}"</h1>
    <div v-if="currentTerm" class="term-container">
      <p class="term">{{ currentTerm.term }}</p>
      <div class="options-container">
        <button v-for="option in options" :key="option.id" @click="checkAnswer(option.id)" class="option-btn">
          {{ option.definition }}
        </button>
      </div>
      <div class="timer">
        {{ $t('timeLeft') }}: {{ timeLeft }}
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
    <div v-else>
      <div v-if="results.length">
        <h2>{{ $t('quizResults') }}</h2>
        <p class="summary">{{ summaryMessage }}</p>
        <p class="score">{{ correctAnswers }} {{ $t('outOf') }} {{ totalQuestions }} {{ $t('correct') }}</p>
        <ul class="results-list">
          <li v-for="result in results" :key="result.term.id" :class="{'correct': result.is_correct, 'incorrect': !result.is_correct}">
            <span class="term">{{ result.term.term }}</span> -
            <span :class="{'correct-text': result.is_correct, 'incorrect-text': !result.is_correct}">
              {{ result.is_correct ? $t('correct') : $t('wrong') }}
            </span>
            <div class="answers">
              <div class="user-answer">
                <strong>{{ $t('yourAnswer') }}:</strong> {{ result.userAnswer ? result.userAnswer.definition : $t('noAnswer') }}
              </div>
              <div class="correct-answer">
                <strong>{{ $t('correctAnswer') }}:</strong> {{ result.term.definition }}
              </div>
            </div>
          </li>
        </ul>
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
      currentTermIndex: 0,
      currentTerm: null,
      options: [],
      results: [],
      timeLeft: 60,
      timer: null,
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      terms: state => state.topics.terms,
      currentTopic: state => state.topics.currentTopic,
      currentTheme: state => state.theme.currentTheme,
      token: state => state.auth.token,
    }),
    correctAnswers() {
      return this.results.filter(result => result.is_correct).length;
    },
    totalQuestions() {
      return this.results.length;
    },
    summaryMessage() {
      const percentage = (this.correctAnswers / this.totalQuestions) * 100;
      if (percentage === 100) return this.$t('excellent');
      if (percentage >= 80) return this.$t('great');
      if (percentage >= 60) return this.$t('good');
      if (percentage >= 40) return this.$t('notBad');
      if (percentage >= 20) return this.$t('keepTrying');
      return this.$t('betterLuck');
    },
    progress() {
      return ((this.currentTermIndex / this.terms.length) * 100).toFixed(2);
    }
  },
  created() {
    this.initializeQuiz();
  },
  methods: {
    ...mapActions('topics', ['setCurrentTopic', 'fetchTerms', 'submitQuizResult']),
    ...mapActions('userResults', ['submitQuizResult']),
    async initializeQuiz() {
      const topicId = this.$route.params.topicId;
      await this.setCurrentTopic({
        topicId: topicId,
        token: this.token,
      });
      if (this.terms.length === 0) {
        await this.fetchTerms({
          topicId,
          token: this.token,
        });
      }
      this.terms = this.terms.sort(() => Math.random() - 0.5); // Shuffle terms
      this.nextTerm();
    },
    nextTerm() {
      clearInterval(this.timer);
      if (this.currentTermIndex >= this.terms.length) {
        this.currentTerm = null;
        return;
      }
      this.currentTerm = this.terms[this.currentTermIndex];
      this.options = this.generateOptions(this.currentTerm);
      this.currentTermIndex++;
      this.timeLeft = 60;
      this.startTimer();
    },
    generateOptions(correctTerm) {
      const terms = this.terms.map(term => ({ id: term.id, definition: term.definition }));
      const options = [{ id: correctTerm.id, definition: correctTerm.definition }];
      while (options.length < 4) {
        const randomTerm = terms[Math.floor(Math.random() * terms.length)];
        if (!options.some(option => option.id === randomTerm.id)) {
          options.push(randomTerm);
        }
      }
      return options.sort(() => Math.random() - 0.5);
    },
    async checkAnswer(selectedOptionId) {
      const isCorrect = selectedOptionId === this.currentTerm.id;
      const result = {
        term: this.currentTerm,
        userAnswer: this.options.find(option => option.id === selectedOptionId),
        is_correct: isCorrect,
      };
      this.results.push(result);
      await this.submitQuizResult({
        quizResult: {
          termId: this.currentTerm.id,
          userId: this.user.id,
          isCorrect: isCorrect,
          userAnswer: selectedOptionId
        },
        token: this.token,
      });
      this.nextTerm();
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.checkAnswer(null); // Time is up, treat as incorrect answer
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: var(--text-color);
}

.term-container {
  background: var(--card-bg-color);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  transition: background-color 0.3s, color 0.3s;
}

.term {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-btn {
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2em;
  text-align: left;
  transition: background-color 0.3s, transform 0.2s;
}

.option-btn:hover {
  background-color: var(--primary-hover-color);
  transform: scale(1.05);
}

.option-btn:active {
  transform: scale(1);
}

.timer {
  font-size: 1.2em;
  margin-top: 20px;
  color: var(--text-color);
}

.progress-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
}

.progress-bar {
  height: 20px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

p {
  color: var(--text-color);
}

.results-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
}

.results-list li {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: var(--card-bg-color);
  transition: background-color 0.3s, color 0.3s;
}

.results-list li.correct {
  border-left: 5px solid #28a745;
}

.results-list li.incorrect {
  border-left: 5px solid #dc3545;
}

.term {
  font-weight: bold;
  color: var(--primary-color);
}

.correct-text {
  color: #28a745;
  font-weight: bold;
  margin-left: 5px;
}

.incorrect-text {
  color: #dc3545;
  font-weight: bold;
  margin-left: 5px;
}

.answers {
  margin-top: 10px;
}

.user-answer, .correct-answer {
  margin-top: 5px;
}

.user-answer strong, .correct-answer strong {
  font-weight: bold;
}

.summary {
  font-size: 1.2em;
  margin-top: 20px;
  color: var(--text-color);
}

.score {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: var(--text-color);
}
</style>
