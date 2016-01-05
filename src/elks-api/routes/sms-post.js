import {respond200} from 'express-respond-simple';
import bodyParser from 'body-parser';
const parseUrlEncoded = bodyParser.urlencoded({extended: true});

import log from '../../log';

export default [
    parseUrlEncoded,
    log,
    respond200()
];
