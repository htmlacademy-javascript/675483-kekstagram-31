import { isEscapeKey, modalHiddenToggle, scrollLockToggle } from './util.js';
import { pictures, picturesList } from './gallery.js';
import { START_COMMENTS, COMMENTS_STEP } from './data.js';

// Ищем модальное окно
const modalPicture = document.querySelector('.big-picture');
// Ищем изображение модального окна
const modalPictureImg = modalPicture.querySelector('.big-picture__img').querySelector('img');
// Ищем лайки изображения
const modalPictureLikes = modalPicture.querySelector('.likes-count');
// Ищем описание изображения
const modalPictureDescription = modalPicture.querySelector('.social__caption');

// Ищем блок с счетчиком и кол-вом комментариев
const modalPictureCommentCount = modalPicture.querySelector('.social__comment-count');
const modalPictureCommentShown = modalPictureCommentCount.querySelector('.social__comment-shown-count');
const modalPictureCommentTotal = modalPictureCommentCount.querySelector('.social__comment-total-count');

// Ищем блок со списком комментариев
const modalPictureComments = modalPicture.querySelector('.social__comments');
// Ищем шаблон комментария
const modalPictureCommentTemplate = modalPictureComments.querySelector('.social__comment');
// Ищем кнопку загрузки комментариев
const modalPictureCommentsLoader = modalPicture.querySelector('.social__comments-loader');

// Ищем кнопку закрытия
const modalPictureClose = modalPicture.querySelector('.big-picture__cancel');

let picture = {};
let startComment = START_COMMENTS;

const commentsFragment = document.createDocumentFragment();

// Функция очистки комментариев при закрытии модального окна
// Обнуляет переменную, которая отвечает за тот индекс с которого начинается рендер комменатриев
// Очищает DOM-список комментариев
const clearComments = () => {
  startComment = 0;
  modalPictureComments.innerHTML = '';
};

// Функция рендера комментария и добавления его в DOM-список комментариев
const renderComment = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    const comment = modalPictureCommentTemplate.cloneNode(true);
    const commentAvatar = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');

    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentText.textContent = message;

    commentsFragment.append(comment);
  });

  modalPictureComments.append(commentsFragment);
};

// Функция проверки и рендера всех комментариев
// Проверяем сколько комментов уже отрендерено и обновляем счетчик комментариев
// Если отрендерены все комменты - скрывает кнопку "Загрузить еще"
// Если нет - рендерим дальше
const renderComments = (comments) => {
  // console.log('МАССИВ КОММЕНТАРИЕВ ЭТОГО DOM-ЭЛЕМЕНТА');
  // console.log(comments); // Вывод массива объектов-комментариев

  modalPictureComments.innerHTML = '';

  startComment += COMMENTS_STEP;
  if (startComment >= comments.length) {
    startComment = comments.length;

    modalPictureCommentShown.textContent = comments.length;
    modalPictureCommentTotal.textContent = comments.length;

    renderComment(comments);

    modalPictureCommentsLoader.classList.add('hidden');
    // console.log('КОММЕНТОВ МЕНЬШЕ ИЛИ РАВНО 5');
  } else {
    modalPictureCommentsLoader.classList.remove('hidden');
    // console.log('КОММЕНТОВ БОЛЬШЕ 5');

    const commentsShown = comments.slice(0, startComment);
    const commentsShownLength = commentsShown.length;

    renderComment(commentsShown);

    modalPictureCommentShown.textContent = commentsShownLength;
    modalPictureCommentTotal.textContent = comments.length;
  }
};

const onCommentsLoaderHandler = (evt) => {
  evt.preventDefault();
  const comments = picture.comments;
  // console.log(comments);
  renderComments(comments);
};

const renderModal = (currentPicture) => {
  // В массиве объектов миниаютюр pictures ищем элемент item со значением ключа id
  // Значение ключа id должно быть таким же, как и значение атрибута data-index DOM-элемента currentPicture
  const picturesIndex = pictures.findIndex((item) => Number(item.id) === Number(currentPicture.dataset.index));
  picture = pictures[picturesIndex];

  // console.log('ОБЪЕКТ К ЭТОМУ DOM-ЭЛЕМЕНТУ -->'); // Вывод объекта по клику
  // console.log(picture); // Вывод объекта по клику

  modalPictureImg.src = picture.url;
  modalPictureLikes.textContent = picture.likes;
  modalPictureDescription.textContent = picture.description;

  renderComments(picture.comments);
};

// Обработчик, который вызывает функцию закрытия модального окна клавишей ESC
const onDocumentKeydownEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

// Функция, которая проверяет клик на DOM-элементе миниатюры
// Если true — вызывается функция открытия молального окна
// Удаляется обработчик клика по секции pictures
const onModalPictureHandler = (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    openModal(currentPicture);

    picturesList.removeEventListener('click', onModalPictureHandler);
  }
};

function openModal (currentPicture) {
  // console.log('ОТКРЫТО МОДАЛЬНОЕ ОКНО -->'); // Вывод сообщения об открытии окна
  // console.log(currentPicture); // Вывод DOM-элемента миниатюры по клику

  renderModal(currentPicture);

  modalHiddenToggle(modalPicture);
  scrollLockToggle();

  document.addEventListener('keydown', onDocumentKeydownEscape);
}

function closeModal () {
  // console.log('<-- ЗАКРЫТО МОДАЛЬНОЕ ОКНО'); // Вывод сообщения о закрытии окна

  clearComments();
  modalHiddenToggle(modalPicture);
  scrollLockToggle();

  document.removeEventListener('keydown', onDocumentKeydownEscape);
  picturesList.addEventListener('click', onModalPictureHandler);
}

// Добавляем обрабочик секции pictures
// При клике на секцию pictures вызываем функцию проверки клика
picturesList.addEventListener('click', onModalPictureHandler);

modalPictureCommentsLoader.addEventListener('click', onCommentsLoaderHandler);

// Добавляем обрабочик закрытия модального окна по крестику
modalPictureClose.addEventListener('click', () => {
  closeModal();
});
