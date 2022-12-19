import './util.js';
import {createThumbnails} from './thumbnails.js';
import './form-validate.js';
import {getData} from './api.js';
import './big-pictures.js';
import {showError, showSuccess} from './alerts.js';

getData((photos) => {
    createThumbnails(photos);
    applyFilters(
      debounce(() => createThumbnails(photos)),
      RENDER_DELAY
    );
  },
  () => {
    renderLoadError('Не удалось загрузить фотографии(');
  });



