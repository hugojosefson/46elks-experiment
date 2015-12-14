import {Router} from 'express';
import bodyParser from 'body-parser';
const parseUrlEncoded = bodyParser.urlencoded({extended: true});

import respond200 from '../../respond200';
import log from '../../log';

export default Router()
    .post('/', [
        parseUrlEncoded,
        log,
        respond200()
    ]);