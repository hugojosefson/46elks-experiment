import {BASE_URI} from '../../../config';

export default (text, lang = 'sv-se') => `${BASE_URI}/speak/${encodeURIComponent(lang)}/${encodeURIComponent(text)}`;
