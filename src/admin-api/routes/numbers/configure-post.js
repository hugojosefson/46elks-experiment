import {decode} from 'urlsafe-base64';

import {BASE_URI} from '../../../config';
import {fromUri} from '../../../api';

export default (req, res) => {
    const uri = decode(req.params.uri).toString();
    console.log(uri);
    fromUri(uri).patch({
        sms_uri: BASE_URI + '/sms',
        voice_start_uri: BASE_URI + '/voice/start'
    }, (error, response) => {
        if (error) {
            res.status(500).send(error);
        } else {
            delete response.body._links;
            res.status(response.statusCode).set(response.headers).send(response.body);
        }
    });
};
