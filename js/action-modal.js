import { isEscapeKey, modalHiddenToggle, scrollLockToggle } from './util.js';
import { modalPicture, renderModal } from './render-modal.js';
import { clearComments } from './render-modal.js';

// Ищем кнопку закрытия
const modalPictureClose = modalPicture.querySelector('.big-picture__cancel');

// Функция закрывает модальное окно, если нажата клавиша ESC
const onDocumentKeydownEscape = (evt, pictures) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalHiddenToggle(modalPicture);
    scrollLockToggle();
    clearComments(pictures);
    document.removeEventListener('keydown', onDocumentKeydownEscape);
  }
};

const modalHandler = (modal) => {
  modalHiddenToggle(modal);
  scrollLockToggle();
  // clearComments(modal);
  document.addEventListener('keydown', onDocumentKeydownEscape);
};

const addModalHandler = (pictureList, pictures) => {
  pictureList.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');
    if (currentPicture) {
      modalHandler(modalPicture);
      console.log(modalPicture);
      const pictureIndex = pictures.findIndex((item) => Number(item.id) === Number(currentPicture.dataset.index));
      renderModal(pictures[pictureIndex]);
    }
  });
  // pictureList.addEventListener('keydown', (evt) => {
  //   const currentPicture = evt.target.closest('.picture');
  //   if (currentPicture && isEnterKey(evt)) {
  //     modalHandler(currentPicture.dataset.index);
  //   }
  // });
};

modalPictureClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalHandler(modalPicture);
  clearComments(modalPicture);
  document.removeEventListener('keydown', onDocumentKeydownEscape);
});

export { addModalHandler };
