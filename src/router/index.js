import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../components/Auth.vue';
import Topics from '../components/Topics.vue';
import Quiz from '../components/Quiz.vue';
import Profile from '../components/Profile/Profile.vue';
import Settings from '../components/Settings.vue';

const routes = [
  { path: '/', component: Auth, meta: { requiresAuth: false } },
  { path: '/topics', component: Topics, meta: { requiresAuth: true } },
  { path: '/quiz/:topicId', component: Quiz, meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
