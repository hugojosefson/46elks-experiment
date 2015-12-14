import express from 'express';
import subroute from 'express-subroute';

import respond200 from '../respond200';

import smsRoute from './subroutes/sms';
import voiceRoute from './subroutes/voice';
import speakRoute from './subroutes/speak';

const app = express();
subroute.install(app);

app
    .get('/health', respond200({status: 'good'}))
    .subroute('/sms', smsRoute)
    .subroute('/voice', voiceRoute)
    .subroute('/speak', speakRoute);

export default app;