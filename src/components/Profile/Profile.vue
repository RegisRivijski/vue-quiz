<template>
  <div :class="['profile-container', currentTheme]">
    <div class="profile-content">
      <UserInfo :user="user" />
      <UserStats :userResults="userResults" />
    </div>
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
    TopicResults,
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
    if (this.user?.id) {
      this.fetchUserResults({
        userId: this.user.id,
        token: this.token,
      });
    }
    this.fetchTopics();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.profile-container {
  padding: 20px;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
}

.profile-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  gap: 20px;
}

@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
  }
}
</style>
