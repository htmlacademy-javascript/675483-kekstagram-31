const ALERT_SHOW_TIME = 5000;

// Получаем случайное число из диапазона от min до max

const getRandom = function(min, max) {
  const randomMin = Math.ceil(min);
  const randomMax = Math.floor(max);
  const result = Math.floor(Math.random() * (randomMax - randomMin + 1) + randomMin);
  return result;
};

// Получаем значение случайного элемента массива "element"

const getRandomElement = function(element) {
  return element[getRandom(0, element.length - 1)];
};

// Создаем массив из неповторимых ID в диапазоне от min до max
// Получаем уникальный ID

const getRandomId = function(min, max) {
  const arrayId = [];
  return function() {
    let id = getRandom(min, max);
    if (arrayId.length < max) {
      while (arrayId.includes(id)) {
        id = getRandom(min, max);
      }
    }
    arrayId.push(id);
    return id;
  };
};

// Проверяем, нажата ли клавиша ESC при закрытии модального окна

const isEscapeKey = (evt) => evt.key === 'Escape';

// Обработчик, который вызывает функцию закрытия модального окна клавишей ESC
const onDocumentKeydownEscape = (callback) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

// // Обработчик, который отменяет функцию закрытия модального окна клавишей ESC
// const onKeyStopPropagation = (evt) => {
//   if (isEscapeKey) {
//     evt.stopPropagation();
//   }
// };

// Открытие и закрытие модального окна

const modalHiddenToggle = (modal) => {
  modal.classList.toggle('hidden');
};

// Блокировка и разбокировка скролла

const scrollLockToggle = () => {
  document.body.classList.toggle('modal-open');
};

const showAlert = (message) => {
  const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const alertElement = alertTemplate.cloneNode(true);

  alertElement.querySelector('.data-error__title').textContent = message;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const showError = (message) => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  // const errorButton = errorElement.querySelector('.error__button');

  errorElement.querySelector('.error__title').textContent = message;

  document.body.append(errorElement);
};

export { getRandom, getRandomElement, getRandomId, isEscapeKey, onDocumentKeydownEscape, modalHiddenToggle, scrollLockToggle, showAlert, showError };
