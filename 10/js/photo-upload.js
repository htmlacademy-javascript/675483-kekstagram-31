import { isEscapeKey, modalHiddenToggle, scrollLockToggle } from './util.js';
import { changeEffect, resetEffect } from './photo-effects.js';

const form = document.querySelector('.img-upload__form');
const formInput = form.querySelector('.img-upload__input');
const formOverlay = form.querySelector('.img-upload__overlay');
const formCancel = form.querySelector('.img-upload__cancel');

const photoEffectsList = document.querySelector('.effects__list');

const formHashtag = form.querySelector('.text__hashtags');
const formComment = form.querySelector('.text__description');

// Обработчик, который вызывает функцию закрытия модального окна клавишей ESC
const onDocumentKeydownEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === formHashtag || document.activeElement === formComment) {
      evt.stopPropagation();
    } else {
      closeModal();
    }
  }
};

function openModal () {
  modalHiddenToggle(formOverlay);
  scrollLockToggle();

  photoEffectsList.addEventListener('change', changeEffect);
  document.addEventListener('keydown', onDocumentKeydownEscape);
  resetEffect();
  // console.log('ЗАГРУЗКА КАРТИНКИ -->');
}

function closeModal () {
  modalHiddenToggle(formOverlay);
  scrollLockToggle();

  photoEffectsList.removeEventListener('change', changeEffect);
  document.removeEventListener('keydown', onDocumentKeydownEscape);
  formInput.value = '';
  // console.log('<-- ЗАКРЫТО МОДАЛЬНОЕ ОКНО');
}

formInput.addEventListener('change', () => {
  openModal();
});

formCancel.addEventListener('click', () => {
  closeModal();
});
