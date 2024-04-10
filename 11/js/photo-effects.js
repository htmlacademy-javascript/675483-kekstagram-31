import { formInput } from './upload-form';

const photoEffectsList = document.querySelector('.effects__list');
const photoEffectPreview = document.querySelector('.img-upload__preview img');
const photoEffectRange = document.querySelector('.img-upload__effect-level');
const photoEffectRangeValue = photoEffectRange.querySelector('.effect-level__value');
const photoEffectRangeSlider = photoEffectRange.querySelector('.effect-level__slider');

const EFFECTS = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

const UNITS = {
  px: 'px',
  persent: '%'
};

const slider = noUiSlider.create(photoEffectRangeSlider, {
  range: {
    'min': 0,
    'max': 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const updateOptionsAndEffects = (min, max, start, step, effect, unit = '') => {
  slider.updateOptions({
    range: {
      min,
      max
    },
    start,
    step
  });
  slider.on('update', () => {
    photoEffectRangeValue.value = slider.get();
    photoEffectPreview.style.filter = `${effect}(${photoEffectRangeValue.value}${unit})`;
  });
};

const changeEffect = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    photoEffectPreview.style.filter = 'none';
    photoEffectRange.classList.add('hidden');
    console.log('Выбрано оригинальное изображение');
  } else {
    photoEffectRange.classList.remove('hidden');
  }

  switch (effect) {
    case 'chrome':
      updateOptionsAndEffects(0, 1, 1, 0.1, EFFECTS[effect]);
      console.log(`Выбран эффект - ${effect}. Значение в CSS: ${EFFECTS[effect]}`);
      // updateEffect(EFFECTS[effect]);
      break;
    case 'sepia':
      updateOptionsAndEffects(0, 1, 1, 0.1, EFFECTS[effect]);
      console.log(`Выбран эффект - ${effect}. Значение в CSS: ${EFFECTS[effect]}`);
      // updateEffect(EFFECTS[effect]);
      break;
    case 'marvin':
      updateOptionsAndEffects(0, 100, 100, 1, EFFECTS[effect], UNITS.persent);
      console.log(`Выбран эффект - ${effect}. Значение в CSS: ${EFFECTS[effect]}`);
      // updateEffect(EFFECTS[effect]);
      break;
    case 'phobos':
      updateOptionsAndEffects(0, 3, 3, 0.1, EFFECTS[effect], UNITS.px);
      console.log(`Выбран эффект - ${effect}. Значение в CSS: ${EFFECTS[effect]}`);
      // updateEffect(EFFECTS[effect]);
      break;
    case 'heat':
      updateOptionsAndEffects(1, 3, 3, 0.1, EFFECTS[effect]);
      console.log(`Выбран эффект - ${effect}. Значение в CSS: ${EFFECTS[effect]}`);
      // updateEffect(EFFECTS[effect]);
      break;
  }
};

const resetEffect = () => {
  photoEffectPreview.style.filter = 'none';
  photoEffectRange.classList.add('hidden');
};

formInput.addEventListener('change', () => {
  photoEffectPreview.style.filter = 'none';
  photoEffectRange.classList.add('hidden');
  photoEffectsList.addEventListener('change', changeEffect);
});

export { changeEffect, resetEffect };
