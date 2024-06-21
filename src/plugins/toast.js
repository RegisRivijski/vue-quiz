import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
};

export default (app) => {
  app.use(Toast, options);
};
