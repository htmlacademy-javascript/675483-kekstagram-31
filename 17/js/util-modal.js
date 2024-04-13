import { modalHiddenToggle, scrollLockToggle } from './util.js';

// let onDocumentKeydownEscapeHandler;

function openModal(modal) {
  modalHiddenToggle(modal);
  scrollLockToggle();
  // onDocumentKeydownEscapeHandler = onDocumentKeydownEscape(() => closeModal(modal));
  // document.addEventListener('keydown', onDocumentKeydownEscapeHandler);
  // console.log('ОТКРЫТО МОДАЛЬНОЕ ОКНО -->');
}

function closeModal(modal) {
  modalHiddenToggle(modal);
  scrollLockToggle();
  // document.removeEventListener('keydown', onDocumentKeydownEscapeHandler);
  // console.log('<-- ЗАКРЫТО МОДАЛЬНОЕ ОКНО');
}

export { openModal, closeModal };
