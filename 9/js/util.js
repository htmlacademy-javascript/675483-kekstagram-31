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

// Проверяем, нажата ли клавиша ENTER при открытии модального окна

// const isEnterKey = function(evt) {
//   return evt.key === 'Enter';
// };

// Открытие и закрытие модального окна

const modalHiddenToggle = (modal) => {
  modal.classList.toggle('hidden');
};

// Блокировка и разбокировка скролла

const scrollLockToggle = () => {
  document.body.classList.toggle('modal-open');
};

export { getRandom, getRandomElement, getRandomId, isEscapeKey, modalHiddenToggle, scrollLockToggle };
