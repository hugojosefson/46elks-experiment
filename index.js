import {
    PORT,
    BASE_URL,
    VOICERSS_KEY
} from './config';

console.log(`PORT: ${PORT}`);
console.log(`BASE_URL: ${BASE_URL}`);

import express from 'express';
import auth from 'basic-auth';
import _ from 'lodash';
import bodyParser from 'body-parser';
const parseUrlEncoded = bodyParser.urlencoded({extended: true});

import voiceRss from './voice-rss';
const speak = voiceRss(VOICERSS_KEY);

const app = express();

const log = (req, res, next) => {
    console.log(
        JSON.stringify(
            _.assign(_.pick(req, ['method', 'url', 'originalUrl', 'query', 'body', 'headers']), {auth: auth(req)}),
            null, 2
        )
    );
    next();
};

const respond200 = (response = '') => (req, res) => res.status(200).send(response);
const say = (text, lang = 'sv-se') => `${BASE_URL}/speak/${encodeURIComponent(lang)}/${encodeURIComponent(text)}`;

app.post('/sms', [
    parseUrlEncoded,
    log,
    respond200()
]);

app.post('/voice/start', [
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
]);

app.post('/voice/recorded', [
    parseUrlEncoded,
    log,
    respond200()
]);

app.get('/speak/:lang/:text', (req, res) => speak(req.params.text, req.params.lang)(req, res));

app.listen(PORT, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port ' + PORT);
    }
});