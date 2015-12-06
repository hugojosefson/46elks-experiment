import {BASE_URL, VOICERSS_KEY} from '../../config';

import {Router} from 'express';
import bodyParser from 'body-parser';
const parseUrlEncoded = bodyParser.urlencoded({extended: true});

import respond200 from '../../respond200';
import log from '../../log';

import say from './say';

export default Router()
    .post('/start', [
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
    ])
    .post('/recorded', [
        parseUrlEncoded,
        log,
        respond200()
    ]);