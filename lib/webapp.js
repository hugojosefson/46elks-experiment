import {BASE_URL, VOICERSS_KEY} from './config';

import express from 'express';
import auth from 'basic-auth';
import bodyParser from 'body-parser';
const parseUrlEncoded = bodyParser.urlencoded({extended: true});

import log from './log';
import voiceRss from './voice-rss';
const speak = voiceRss(VOICERSS_KEY);

const app = express();

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

export default app;