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
    if (!arrayId.length >= max) {
      while (arrayId.includes(id)) {
        id = getRandom(min, max);
      }
    }
    arrayId.push(id);
    return id;
  };
};

export { getRandom, getRandomElement, getRandomId };
