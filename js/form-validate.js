import {isEscapeKey} from './util.js';
import {addScaleControlHandlers, setDefaultScaleValue} from './image-zoom.js';
import {addPictureEffectsControl, removePictureEffectsControl} from './image-effect.js';
import {sendData} from './api.js';

const TAG_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/i;
const hashtagsCount = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const hashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

pristine.addValidator(hashtags, (value) => {
  if (value !== '') {
    const hashTagsArray = value.toLowerCase().split(' ');
    const hashTagsSet = new Set(hashTagsArray);

    if (hashTagsSet.size !== hashTagsArray.length) {
      return false;
    }
  }
  return true;
}, 'Хештеги регистронезависимы и не должны повторяться');

pristine.addValidator(hashtags, (value) => {
  if (value !== '') {
    const hashTagsArray = value.toLowerCase().split(' ');

    if (hashTagsArray.length > hashtagsCount) {
      return false;
    }
  }
  return true;
}, `Максимальное число хештегов - ${hashtagsCount}`);

pristine.addValidator(hashtags, (value) => {
  if (value === '') {
    return true;
  }

  const hashTagsArray = value.toLowerCase().split(' ');
  return hashTagsArray.every((hashtag) => TAG_REGEX.test(hashtag));
}, 'Один из введённых вами хештегов некорректен');

const closeUploadFileForm = (value = null, clear = true) => {
  if ((isEscapeKey(value) && document.activeElement !== hashtags && document.activeElement !== textDescription)||( value === null )|| (value.type === 'click')) {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeUploadFileForm);
    uploadCancel.removeEventListener('click', closeUploadFileForm);

    if (clear) {
      imgUploadForm.reset();
      scaleUploadImage.init();
      applyChanges('none');
    }
  }
};


uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeUploadFileForm);
  uploadCancel.addEventListener('click', closeUploadFileForm);
  setDefaultScaleValue();
  removePictureEffectsControl();
});

imgUploadForm.addEventListener('submit', (e) => {
  if (!pristine.validate()) {
    e.preventDefault();
    setDefaultScaleValue();
    addScaleControlHandlers();
    addPictureEffectsControl();
  }
});
