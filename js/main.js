import './util.js';
import {createImages} from './data.js';
import {createThumbnails} from './thumbnails.js';
import './form-validate.js';
import './image-effects.js';
import './big-pictures.js';
import {getData} from './api.js';
import {showError, showSuccess} from './notifications.js';
createThumbnails(createImages());




