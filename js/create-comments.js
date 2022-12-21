const socialComments = document.querySelector('.social__comments');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content;
const documentFragment = document.createDocumentFragment();
const maxNumberComment = 5;
const createComments = () => {
  let number = 0;
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
    const newCommentNumber = number + maxNumberComment;
    number = newCommentNumber >= commentsCountCreate ? commentsCountCreate : newCommentNumber;

    renderComments(comments.slice(0, number));

    socialCommentCount.textContent = `${number} из ${commentsCountCreate} комментариев`;
    if (number === commentsCountCreate) {
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
    number = 0;
    commentsCountCreate = totalComments.length;
    comments = totalComments;
    commentsLoader.classList.remove('hidden');
    eventListener();
    addEventListener();
  };

  return {
    removeEventListener,
    init
  };
};
export {
  createComments
};
