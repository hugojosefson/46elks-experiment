import {BASE_URL} from '../../../config';
import {respond200} from 'express-respond-simple';
import bodyParser from 'body-parser';
const parseUrlEncoded = bodyParser.urlencoded({extended: true});

import log from '../../../log';

import say from './say';

export default [
    parseUrlEncoded,
    log,
    respond200({
        play: say('Hej! Välkommen till min röstbrevlåda. Säg något.'),
        next: {
            play: 'sound/beep',
            next: {
                record: `${BASE_URL}/voice/recorded`,
                next: {
                    play: say('Tack för samtalet. Välkommen åter!')
                }
            }
        }
    })
];
