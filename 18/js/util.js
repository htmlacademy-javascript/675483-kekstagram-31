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

const isEscapeKey = function(evt) {
  return evt.key === 'Escape';
};

// Обработчик, который вызывает функцию закрытия модального окна клавишей ESC

const onDocumentKeydownEscape = (callback) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

// Обработчик, который вызывает функцию предотвращения закрытия модального окна клавишей ESC
// Если фокус на этих полях, окно не закрывается

const onKeyStopPropagation = (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
};

// Открытие и закрытие модального окна

const modalHiddenToggle = (modal) => {
  modal.classList.toggle('hidden');
};

// Блокировка и разбокировка скролла

const scrollLockToggle = () => {
  document.body.classList.toggle('modal-open');
};

// Функция отображения сообщение при успешной отправке данных

const showSuccess = (message) => {
  const formSuccessTemplate = document.querySelector('#success');
  const formSuccess = formSuccessTemplate.content.querySelector('.success');

  const success = formSuccess.cloneNode(true);
  const successTitle = success.querySelector('.success__title');
  const successButton = success.querySelector('.success__button');

  successTitle.textContent = message;
  document.body.append(success);

  success.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeSuccess();
    }
  });

  successButton.addEventListener('click', () => {
    closeSuccess();
  });
  // const closeSuccessHandler = () => {
  //   closeSuccess();
  // };

  const onSuccessKeydownEscapeHandler = onDocumentKeydownEscape(closeSuccess);
  document.addEventListener('keydown', onSuccessKeydownEscapeHandler);

  function closeSuccess() {
    success.remove();
    document.removeEventListener('keydown', onSuccessKeydownEscapeHandler);
  }
  // successButton.addEventListener('click', closeSuccessHandler);
};

// Функция отображения ошибки при некорректной загрузке данных

const showAlert = (message) => {
  const formAlertTemplate = document.querySelector('#data-error');
  const formAlert = formAlertTemplate.content.querySelector('.data-error');

  const alert = formAlert.cloneNode(true);
  const alertTitle = alert.querySelector('.data-error__title');

  alertTitle.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

// Функция отображения ошибки при некорректной отправке данных

const showError = (message) => {
  const formErrorTemplate = document.querySelector('#error');
  const formError = formErrorTemplate.content.querySelector('.error');

  const error = formError.cloneNode(true);
  const errorTitle = error.querySelector('.error__title');
  const errorButton = error.querySelector('.error__button');

  errorTitle.textContent = message;
  document.body.append(error);

  error.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeError();
    }
  });

  errorButton.addEventListener('click', () => {
    closeError();
  });

  const onErrorKeydownEscapeHandler = onDocumentKeydownEscape(closeError);
  document.addEventListener('keydown', onErrorKeydownEscapeHandler);

  function closeError() {
    error.remove();
    document.removeEventListener('keydown', onErrorKeydownEscapeHandler);
  }
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export { getRandom, getRandomElement, getRandomId, isEscapeKey, onDocumentKeydownEscape, onKeyStopPropagation, modalHiddenToggle, scrollLockToggle, showSuccess, showAlert, showError, debounce };
