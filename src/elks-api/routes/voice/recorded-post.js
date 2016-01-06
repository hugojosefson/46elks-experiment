import {respond204} from 'express-respond-simple';
import bodyParser from 'body-parser';
import log from '../../../log';

export default [
    bodyParser.json(),
    log,
    respond204()
];
