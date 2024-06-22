import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    appName: 'LexiLearn',
    profile: 'Profile',
    topics: 'Topics',
    totalQuizzes: 'Total Quizzes Taken',
    totalCorrect: 'Total Correct Answers',
    totalIncorrect: 'Total Incorrect Answers',
    accuracy: 'Accuracy',
    quizResults: 'Quiz Results',
    selectTopic: 'Select a topic',
    term: 'Term',
    correctTotal: 'Correct / Total',
    yourAnswer: 'Your Answer',
    correctAnswer: 'Correct Answer',
    correct: 'Correct',
    wrong: 'Wrong',
    noResults: 'No results for the selected topic.',
    history: 'History',
    backToTopics: 'Back to Topics',
    excellent: 'Excellent! You got all answers correct!',
    great: 'Great job! You got most of the answers correct!',
    good: 'Good effort! You got more than half correct!',
    notBad: 'Not bad! You got some answers correct.',
    keepTrying: 'Keep trying! Practice makes perfect.',
    betterLuck: 'Better luck next time! Don\'t give up!',
    terms: 'Terms',
    startQuiz: 'Start Quiz',
    register: 'Register',
    login: 'Login',
    username: 'Username',
    password: 'Password',
    email: 'Email',
    registrationSuccess: 'Registration successful!',
    registrationFailed: 'Registration failed.',
    loginFailed: 'Login failed.',
    loginSuccess: 'Login success.',
    loading: 'Loading...',
    timeLeft: 'Time left',
    outOf: 'out of',
    noAnswer: 'No answer',
    logout: 'Logout',
    userInfo: 'Users information',
    statistics: 'Statistics',
    forTopic: 'Topic',
    settings: 'Settings',
    updateEmail: 'Update Email',
    newEmail: 'New Email',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    emailUpdated: 'Email updated successfully!',
    errorUpdatingEmail: 'Error updating email',
    passwordUpdated: 'Password updated successfully!',
    errorUpdatingPassword: 'Error updating password',
    invalidEmail: 'Invalid email format',
    passwordTooShort: 'Password must be at least 6 characters long',
    enterNewEmail: 'Enter new email',
    enterCurrentPassword: 'Enter current password',
    enterNewPassword: 'Enter new password',
    updatePassword: 'Update password',
    appDescription: 'This application helps you learn and test your knowledge of IT vocabulary through quizzes and term definitions.',
    lightTheme: 'Light theme',
    darkTheme: 'Dark theme',
    contactDeveloper: 'Developer contacts',
  },
  uk: {
    appName: 'LexiLearn',
    profile: 'Профіль',
    topics: 'Теми',
    totalQuizzes: 'Всього пройдено тестів',
    totalCorrect: 'Всього правильних відповідей',
    totalIncorrect: 'Всього неправильних відповідей',
    accuracy: 'Точність',
    quizResults: 'Результати тестів',
    selectTopic: 'Виберіть тему',
    term: 'Термін',
    correctTotal: 'Правильно / Всього',
    yourAnswer: 'Ваша відповідь',
    correctAnswer: 'Правильна відповідь',
    correct: 'Правильно',
    wrong: 'Неправильно',
    noResults: 'Немає результатів для вибраної теми.',
    history: 'Історія',
    backToTopics: 'Назад до тем',
    excellent: 'Відмінно! Всі відповіді правильні!',
    great: 'Молодець! Більшість відповідей правильні!',
    good: 'Хороша робота! Більше половини відповідей правильні!',
    notBad: 'Непогано! Деякі відповіді правильні.',
    keepTrying: 'Продовжуйте старатися! Практика веде до досконалості.',
    betterLuck: 'Наступного разу пощастить більше! Не здавайтеся!',
    terms: 'Терміни',
    startQuiz: 'Почати тест',
    register: 'Реєстрація',
    login: 'Вхід',
    username: 'Ім\'я користувача',
    password: 'Пароль',
    email: 'Електронна пошта',
    registrationSuccess: 'Реєстрація успішна!',
    registrationFailed: 'Реєстрація не вдалася.',
    loginFailed: 'Вхід не вдався.',
    loginSuccess: 'Вхід успішний.',
    loading: 'Завантаження...',
    timeLeft: 'Залишилося часу',
    outOf: 'з',
    noAnswer: 'Немає відповіді',
    logout: 'Вийти',
    userInfo: 'Інформація про користувача',
    statistics: 'Статистика',
    forTopic: 'Тема',
    settings: 'Налаштування',
    updateEmail: 'Оновити електронну пошту',
    newEmail: 'Нова електронна пошта',
    currentPassword: 'Поточний пароль',
    newPassword: 'Новий пароль',
    emailUpdated: 'Електронну пошту оновлено успішно!',
    errorUpdatingEmail: 'Помилка оновлення електронної пошти',
    passwordUpdated: 'Пароль оновлено успішно!',
    errorUpdatingPassword: 'Помилка оновлення пароля',
    invalidEmail: 'Недійсний формат електронної пошти',
    passwordTooShort: 'Пароль повинен бути щонайменше 6 символів',
    enterNewEmail: 'Введіть нову електронну пошту',
    enterCurrentPassword: 'Введіть поточний пароль',
    enterNewPassword: 'Введіть новий пароль',
    updatePassword: 'Оновити пароль',
    appDescription: 'Цей додаток допомагає вивчати та перевіряти знання ІТ лексики за допомогою тестів та визначень термінів.',
    lightTheme: 'Світла тема',
    darkTheme: 'Темна тема',
    contactDeveloper: 'Контакти розробника',
  },
};

const i18n = createI18n({
  locale: 'en', // default locale
  fallbackLocale: 'en',
  messages,
});

export default i18n;
