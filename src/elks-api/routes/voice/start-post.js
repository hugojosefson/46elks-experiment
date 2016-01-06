import {BASE_URI} from '../../../config';
import {respond200} from 'express-respond-simple';
import bodyParser from 'body-parser';
import log from '../../../log';

import say from './say';

export default [
    bodyParser.json(),
    log,
    respond200({
        play: say('Hej! Välkommen till min röstbrevlåda. Säg något.'),
        next: {
            play: 'sound/beep',
            next: {
                record: `${BASE_URI}/voice/recorded`,
                next: {
                    play: say('Tack för samtalet. Välkommen åter!')
                }
            }
        }
    })
];
