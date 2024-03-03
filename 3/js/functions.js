/*
Функция для проверки длины строки.
Функция имеет два параметра: строку и максимальную длину. Проверяет длину строки.
Возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
*/

function stringChecked(string, number) {
  return string.length <= number;
}

// Строка короче 20 символов
stringChecked('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
stringChecked('проверяемая строка', 18); // true
// Строка длиннее 10 символов
stringChecked('проверяемая строка', 10); // false

/*-----*/

/*
Функция для проверки, является ли строка палиндромом.
Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
*/

function isPalindrome(string) {
  const normalize = string.toLowerCase().replaceAll(' ',''); // Приводим строку к нижнему регистру и убираем пробелы
  let result = '';
  for (let i = normalize.length - 1; i >= 0; i--) {
    // result += normalize[i]; // Способ получить символ через квадратные скобки
    result += normalize.at(i); // Способ получить символ через метод at()
  }
  return normalize === result;
}

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true

/*-----*/

/*
Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN
*/

function getNumber(string) {
  let result = '';
  if (!(typeof(string) === 'string')) {
    string = string.toString(); // Преобразуем вводные данные в строку
  }

  for (let i = 0; i < string.length; i++) {
    const item = parseInt(string.at(i), 10); // Пробуем преобразовать символ строки в число
    if (!Number.isNaN(item)) {
      result += item; // Условие "символ строки 'не является не числом'" должно выполняться, записываем в result
    }
  }
  return parseInt(result, 10);
}

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN

getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15
