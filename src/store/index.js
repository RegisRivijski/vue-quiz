import { createStore } from 'vuex';
import auth from './modules/auth';
import topics from './modules/topics';
import userResults from './modules/userResults';
import theme from './modules/theme';

export default createStore({
  modules: {
    auth,
    topics,
    userResults,
    theme,
  },
});
