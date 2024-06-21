<template>
  <div class="card user-info">
    <h2>{{ $t('userInfo') }}</h2>
    <p><strong>{{ $t('username') }}:</strong> {{ user.username }}</p>
    <p><strong>{{ $t('email') }}:</strong> {{ user.email }}</p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
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

h2 {
  color: var(--text-color);
  margin-bottom: 20px;
}
</style>
