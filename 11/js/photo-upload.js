// // import { isEscapeKey, modalHiddenToggle, scrollLockToggle } from './util.js';
// import { openModal, closeModal } from './util-modal.js';
// // import { changeEffect, resetEffect } from './photo-effects.js';

// const form = document.querySelector('.img-upload__form');
// const formInput = form.querySelector('.img-upload__input');
// const formOverlay = form.querySelector('.img-upload__overlay');
// const formCancel = form.querySelector('.img-upload__cancel');

// // const photoEffectsList = document.querySelector('.effects__list');

// // const formHashtag = form.querySelector('.text__hashtags');
// // const formComment = form.querySelector('.text__description');

// function openUploadFormModal(modal) {
//   modalHiddenToggle(modal);
//   scrollLockToggle();

//   photoEffectsList.addEventListener('change', changeEffect);
//   document.addEventListener('keydown', onDocumentKeydownEscape);
//   resetEffect();
//   // console.log('ЗАГРУЗКА КАРТИНКИ -->');
// }

// // function closeModal(modal) {
// //   modalHiddenToggle(modal);
// //   scrollLockToggle();

// //   photoEffectsList.removeEventListener('change', changeEffect);
// //   document.removeEventListener('keydown', onDocumentKeydownEscape);
// //   formInput.value = '';
// //   // console.log('<-- ЗАКРЫТО МОДАЛЬНОЕ ОКНО');
// // }

// formInput.addEventListener('change', () => {
//   // openModal(formOverlay);
//   openUploadFormModal(modal);
// });

// formCancel.addEventListener('click', () => {
//   closeModal(formOverlay);
// });

// export { formOverlay };
