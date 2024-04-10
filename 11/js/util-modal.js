// import { isEscapeKey, modalHiddenToggle, scrollLockToggle, onDocumentKeydownEscape } from './util.js';
import { modalHiddenToggle, scrollLockToggle } from './util.js';

// const formHashtag = form.querySelector('.text__hashtags');
// const formComment = form.querySelector('.text__description');

// // Обработчик, который вызывает функцию закрытия модального окна клавишей ESC
// const onDocumentKeydownEscape = (callback) = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();

//     if (document.activeElement === formHashtag || document.activeElement === formComment) {
//       evt.stopPropagation();
//     } else {
//       // closeModal();
//       callback();
//     }
//   }
// };

// let onDocumentKeydownEscapeHandler;

function openModal(modal) {
  modalHiddenToggle(modal);
  scrollLockToggle();
  // onDocumentKeydownEscapeHandler = onDocumentKeydownEscape(() => closeModal(modal));

  // document.addEventListener('keydown', onDocumentKeydownEscapeHandler);
  console.log('ОТКРЫТО МОДАЛЬНОЕ ОКНО -->');
}

function closeModal(modal) {
  modalHiddenToggle(modal);
  scrollLockToggle();

  // document.removeEventListener('keydown', onDocumentKeydownEscapeHandler);
  console.log('<-- ЗАКРЫТО МОДАЛЬНОЕ ОКНО');
}

// function openModal () {
//   photoEffectsList.addEventListener('change', changeEffect);
//   resetEffect();
//   // console.log('ЗАГРУЗКА КАРТИНКИ -->');
// }

// function closeModal (modal) {
//   photoEffectsList.removeEventListener('change', changeEffect);
//   // console.log('<-- ЗАКРЫТО МОДАЛЬНОЕ ОКНО');
// }

export { openModal, closeModal };
