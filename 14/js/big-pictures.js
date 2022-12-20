import {isEscapeKey} from './util.js';
import {createComments} from './create-comments.js';

const commentsCreateFunction = createComments();

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialCaption = document.querySelector('.social__caption');

const closeModal = (e) => {
  if (isEscapeKey(e) || e.type === 'click') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeModal);
    bigPictureCancel.removeEventListener('click', closeModal);
    commentsCreateFunction.removeEventListener();
  }
};

const openModal = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.commentsCreateFunction.length;
  socialCaption.textContent = photo.description;

  commentsCreateFunction.init(photo.commentsCreateFunction);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeModal);
  bigPictureCancel.addEventListener('click', closeModal);
};

const thumbnailClickHandler = (data) => {
  pictures.addEventListener('click', (e) => {
    const picture = e.target.closest('.picture');

    if (picture) {
      openModal(data.find((photo) => photo.id === Number(picture.dataset.index)));
    }
  });
};

export {thumbnailClickHandler, closeModal};
