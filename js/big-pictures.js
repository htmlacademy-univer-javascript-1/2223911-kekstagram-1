import {isEscapeKey} from './util.js';
const maxNumberComment = 5;

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialCaption = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content;
const documentFragment = document.createDocumentFragment();

const createComments = () => {
  let commentsNumber = 0;
  let comments = [];
  let commentsCountCreate = 0;

  const renderComments = (messageActive) => {
    socialComments.innerHTML = '';

    messageActive.forEach((comment) => {
      const commentNode = commentTemplate.cloneNode(true);
      commentNode.querySelector('.social__picture').src = comment.avatar;
      commentNode.querySelector('.social__picture').alt = comment.name;
      commentNode.querySelector('.social__text').textContent = comment.message;
      documentFragment.append(commentNode);
    });

    socialComments.append(documentFragment);
  };

  const eventListener = () => {
    const newCommentNumber = commentsNumber + maxNumberComment;
    commentsNumber = newCommentNumber >= commentsCountCreate ? commentsCountCreate : newCommentNumber;

    renderComments(comments.slice(0, commentsNumber));

    socialCommentCount.textContent = `${commentsNumber} из ${commentsCountCreate} комментариев`;

    if (commentsNumber === commentsCountCreate) {
      commentsLoader.classList.add('hidden');
    }
  };

  const addEventListener = () => {
    commentsLoader.addEventListener('click', eventListener);
  };

  const removeEventListener = () => {
    commentsLoader.removeEventListener('click', eventListener);
  };

  const init = (totalComments) => {
    commentsCountCreate = totalComments.length;
    comments = totalComments;
    commentsNumber = 0;
    commentsLoader.classList.remove('hidden');
    eventListener();
    addEventListener();
  };

  return {
    removeEventListener,
    init
  };
};

const commentsCreateFunction = createComments();

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
  //let commentsNumberModal = maxNumberComment;
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.commentsCreateFunction.length;
  socialCaption.textContent = photo.description;

  commentsCreateFunction.init(photo.comments);

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
