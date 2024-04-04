const form = document.querySelector('.img-upload__form');
const formHashtag = form.querySelector('.text__hashtags');
const formComment = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Функция проверки хэштега по условию
// По ТЗ хэштег начинается с символа '#', строка после '#' должна состоять из букв и чисел
// Хэштэг не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи
// Хэштэг не может состоять только из одной решётки и быть длиннее 20 символов, включая решётку
// Хэштэги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом
const isValidateHashtag = (hashtag) => {
  const hashtagItem = /^#[a-zа-я0-9ё]{1,19}$/i;
  return hashtagItem.test(hashtag);
};

// console.log(isValidateHashtag('#Хэштег')); // true
// console.log(isValidateHashtag('#Хэште!г')); // false
// console.log(isValidateHashtag('Хэштег')); // false
// console.log(isValidateHashtag('#Я')); // false

// Функция проверки всех хэштегов на соблюдение условий регулярного выражения в функции 'isValidateHashtag'
const isValidateAllHashtags = (hashtags) => hashtags.trim().split(/\s+/).every(isValidateHashtag);

// Функция проверки длины массива, полученного из строки методом split
// По ТЗ в поле ввода хэштеги разделяются пробелами, хэштегов должно быть не больше 5
// Выводит true - если хэштегов меньше или равно 5 и false - если хэштегов больше 5
const isValidateTotalHashtags = (hashtags) => hashtags.trim().split(/\s+/).filter((hashtag) => hashtag !== '').length <= 5;

// Функция проверки длины комментария
// По ТЗ длина комментария должна быть не больше 140 символов
// Выводит true - если комментарий короче 140 символов и false - если длиннее
const isValidateComment = (comment) => comment.length <= 140;

// Функция проверки дубликатов хэштегов
// Метод 'size' возвращает длину массива 'hashtags' без учета повторений
// Сравниваем длину массива без повторения с длиной исходного массива
// Выводит true - если длины совпадают,а дубликатов нет и false - если дубликаты есть
const hasDuplicateValidate = (hashtags) => {
  const setHashtags = new Set(hashtags.toLowerCase().split(/\s+/));
  return setHashtags.size === hashtags.split(/\s+/).length;
};

pristine.addValidator((formHashtag), isValidateAllHashtags, 'Введен невалидный хештег');
pristine.addValidator((formHashtag), hasDuplicateValidate, 'Хэштеги повторяются');
pristine.addValidator((formHashtag), isValidateTotalHashtags, 'Превышено количество хэштегов');
pristine.addValidator((formComment), isValidateComment, 'Максимальная длина 140 символов');

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    // console.log('НЕ ВАЛИДНО');
  } else {
    form.submit();
    // console.log('ВАЛИДНО');
  }
});
