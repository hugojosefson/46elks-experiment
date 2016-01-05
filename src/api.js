import traverson from 'traverson';
import JsonHalAdapter from 'traverson-hal';

import {ELKS_API_URI, ELKS_API_USERNAME, ELKS_API_PASSWORD} from './config';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

const baseApi = () => traverson
    .from(ELKS_API_URI)
    .withRequestOptions({
        auth: {
            user: ELKS_API_USERNAME,
            password: ELKS_API_PASSWORD,
            sendImmediately: true
        }
    })
    .newRequest();

const root = (...rels) => baseApi().follow(...rels);
export default root;
export const me = (...rels) => root('me', ...rels);
