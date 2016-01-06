import traverson from 'traverson';
import JsonHalAdapter from 'traverson-hal';

import {ELKS_API_URI, ELKS_API_USERNAME, ELKS_API_PASSWORD} from './config';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

export const fromUri = uri => traverson
    .from(uri)
    .withRequestOptions({
        headers: {'content-type': 'application/json'},
        auth: {
            user: ELKS_API_USERNAME,
            password: ELKS_API_PASSWORD,
            sendImmediately: true
        }
    });

const baseApi = () => fromUri(ELKS_API_URI).newRequest();

export const root = (...rels) => baseApi().follow(...rels);
export const me = (...rels) => root('me', ...rels);
