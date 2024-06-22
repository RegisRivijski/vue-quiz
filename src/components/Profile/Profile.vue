<template>
  <div :class="['profile-container', currentTheme]">
    <h1>{{ $t('profile') }}</h1>
    <UserInfo :user="user" />
    <UserStats :userResults="userResults" />
    <TopicResults :topics="topics" :user="user" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UserInfo from './UserInfo.vue';
import UserStats from './UserStats.vue';
import TopicResults from './TopicResults.vue';

export default {
  components: {
    UserInfo,
    UserStats,
    TopicResults
  },
  computed: {
    ...mapState('auth', ['user', 'token']),
    ...mapState('theme', ['currentTheme']),
    ...mapState('userResults', ['userResults']),
    ...mapState('topics', ['topics']),
  },
  methods: {
    ...mapActions('userResults', ['fetchUserResults']),
    ...mapActions('topics', ['fetchTopics']),
  },
  mounted() {
    if (this.user.id) {
      this.fetchUserResults({
        userId: this.user.id,
        token: this.token,
      });
      this.fetchTopics();
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--bg-color);
  min-height: 100vh;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s, color 0.3s;
}

h1 {
  color: var(--text-color);
  margin-bottom: 20px;
}
</style>
