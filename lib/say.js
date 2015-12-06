import {BASE_URL} from './config';

export default (text, lang = 'sv-se') => `${BASE_URL}/speak/${encodeURIComponent(lang)}/${encodeURIComponent(text)}`;