<template>
  <div class="quiz-container">
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
            {{ result.term.term }} -
            <span :class="{'correct-text': result.is_correct, 'incorrect-text': !result.is_correct}">
              {{ result.is_correct ? $t('correct') : $t('wrong') }}
            </span>
            ({{ $t('yourAnswer') }}: {{ result.userAnswer ? result.userAnswer.definition : $t('noAnswer') }}, {{ $t('correctAnswer') }}: {{ result.term.definition }})
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
    ...mapState(['terms', 'currentTopic']),
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
    ...mapActions(['setCurrentTopic', 'fetchTerms', 'submitQuizResult']),
    async initializeQuiz() {
      const topicId = this.$route.params.topicId;
      await this.setCurrentTopic(topicId);
      if (this.terms.length === 0) {
        await this.fetchTerms(topicId);
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
      const user = JSON.parse(localStorage.getItem('user'));
      const isCorrect = selectedOptionId === this.currentTerm.id;
      const result = {
        term: this.currentTerm,
        userAnswer: this.options.find(option => option.id === selectedOptionId),
        is_correct: isCorrect,
      };
      this.results.push(result);
      await this.submitQuizResult({
        termId: this.currentTerm.id,
        userId: user.id,
        isCorrect: isCorrect,
        userAnswer: selectedOptionId
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
  background-color: #f9f9f9;
  min-height: 100vh;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

h1 {
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
}

.term-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
}

.term {
  font-size: 1.5em;
  color: #007bff;
  margin-bottom: 20px;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-btn {
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2em;
  text-align: left;
  transition: background-color 0.3s, transform 0.2s;
}

.option-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.option-btn:active {
  transform: scale(1);
}

.timer {
  font-size: 1.2em;
  color: #333;
  margin-top: 20px;
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
  background-color: #007bff;
  transition: width 0.3s ease;
}

p {
  color: #555;
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
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.results-list li.correct {
  border-left: 5px solid #28a745;
}

.results-list li.incorrect {
  border-left: 5px solid #dc3545;
}

.correct-text {
  color: #28a745;
  font-weight: bold;
}

.incorrect-text {
  color: #dc3545;
  font-weight: bold;
}

.summary {
  font-size: 1.2em;
  color: #333;
  margin-top: 20px;
}

.score {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 20px;
}

.back-btn {
  align-self: flex-start;
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  font-family: 'Montserrat', sans-serif;
}

.back-btn:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}

.back-btn:active {
  transform: scale(1);
}
</style>
