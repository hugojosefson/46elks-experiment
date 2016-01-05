import express from 'express';
import allowMethods from 'allow-methods';
import {respond200} from 'express-respond-simple';

import smsPost from './routes/sms-post';
import voiceStartPost from './routes/voice/start-post';
import voiceRecordedPost from './routes/voice/recorded-post';
import speak from './routes/speak';

const app = express();

app.use('/health', allowMethods('OPTIONS', 'GET'));
app.get('/health', respond200({status: 'good'}));

app.use('/health', allowMethods('OPTIONS', 'POST'));
app.post('/sms', smsPost);

app.use('/voice/start', allowMethods('OPTIONS', 'POST'));
app.post('/voice/start', voiceStartPost);

app.use('/voice/recorded', allowMethods('OPTIONS', 'POST'));
app.post('/voice/', voiceRecordedPost);

app.use('/speak/:lang/:text', allowMethods('OPTIONS', 'GET'));
app.get('/speak/:lang/:text', speak);

export default app;
