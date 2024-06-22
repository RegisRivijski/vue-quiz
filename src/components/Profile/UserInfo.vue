<template>
  <div :class="['user-info-container', currentTheme]">
    <h2>{{ $t('userInfo') }}</h2>
    <p><strong>{{ $t('username') }}:</strong> {{ user.username }}</p>
    <p><strong>{{ $t('email') }}:</strong> {{ user.email }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['user'],
  computed: {
    ...mapState('theme', ['currentTheme']),
  },
};
</script>

<style scoped>
.user-info-container {
  background: var(--card-bg-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;
  width: 100%;
}

h2 {
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}
</style>
