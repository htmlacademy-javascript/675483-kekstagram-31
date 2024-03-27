import { START_COMMENTS, COMMENTS_STEP } from './data.js';

// Ищем модальное окно
const modalPicture = document.querySelector('.big-picture');
// Ищем изображение модального окна
const modalPictureImg = modalPicture.querySelector('.big-picture__img').querySelector('img');
// Ищем лайки изображения
const modalPictureLikes = modalPicture.querySelector('.likes-count');
// Ищем описание изображения
const modalPictureDescription = modalPicture.querySelector('.social__caption');
// Ищем кол-во показываемых и всего комментариев
const modalPictureCommentCount = modalPicture.querySelector('.social__comment-count');
const modalPictureCommentShown = modalPictureCommentCount.querySelector('.social__comment-shown-count');
const modalPictureCommentTotal = modalPictureCommentCount.querySelector('.social__comment-total-count');
// Ищем блок комментариев
const modalPictureComments = modalPicture.querySelector('.social__comments');
// Ищем шаблон комментария
const modalPictureCommentTemplate = modalPictureComments.querySelector('.social__comment');
// Ищем кнопку загрузки комментариев
const modalPictureCommentsLoader = document.querySelector('.social__comments-loader');

modalPictureComments.innerHTML = '';
let startComment = START_COMMENTS;
// let arr = [];

const renderComments = (comments) => {
  console.log(comments);

  const commentsFragment = document.createDocumentFragment();

  const commentsArray = comments.slice(startComment, startComment + COMMENTS_STEP);
  const commentsArrayLength = commentsArray.length + startComment;
  console.log(startComment);
  console.log(startComment + COMMENTS_STEP);
  console.log(commentsArray);

  modalPictureCommentShown.textContent = commentsArrayLength;
  modalPictureCommentTotal.textContent = comments.length;

  if (commentsArrayLength >= comments.length) {
    modalPictureCommentsLoader.classList.add('hidden');
    modalPictureCommentShown.textContent = comments.length;
  }

  commentsArray.forEach((comment) => {
    const commentItem = modalPictureCommentTemplate.cloneNode(true);
    const commentAvatar = commentItem.querySelector('.social__picture');
    const commentText = commentItem.querySelector('.social__text');

    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;

    console.log(comment);

    commentsFragment.append(commentItem);
  });
  modalPictureComments.append(commentsFragment);

  startComment += COMMENTS_STEP;

  // if (commentsArrayLength >= arr.length) {
  //   modalPictureCommentsLoader.classList.add('hidden');
  //   modalPictureCommentShown.textContent = arr.length;
  // }
  // startComment += COMMENTS_STEP;
  // // console.log(commentsArray);
  // // console.log(startComment + COMMENTS_STEP);
};

// const renderCommentsLoader = (comments) => {
//   console.log(comments);
//   renderComments(comments);
//   // modalPictureCommentsLoader.removeEventListener('click', renderCommentsLoader);
// };

const clearComments = () => {
  startComment = 0;
  console.log(startComment);
  console.log('---');
  modalPictureComments.innerHTML = '';
  modalPictureCommentsLoader.classList.remove('hidden');
  // modalPictureCommentsLoader.removeEventListener('click', () => {
  //   renderComments(comments);
  // });
  modalPictureCommentsLoader.removeEventListener('click', renderComments);
};

const renderModal = (picture) => {
  modalPictureImg.src = picture.url;
  modalPictureLikes.textContent = picture.likes;
  modalPictureDescription.textContent = picture.description;

  console.log(picture);

  // arr = picture.comments;
  // console.log(arr);

  const comments = picture.comments;

  renderComments(comments);
  // modalPictureCommentsLoader.addEventListener('click', () => {
  //   // renderComments(picture.comments);
  //   renderComments(comments);
  // });
  modalPictureCommentsLoader.addEventListener('click', renderComments);
};

export { modalPicture, renderModal };
export { clearComments };
