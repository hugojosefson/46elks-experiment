import express from 'express';

import respond200 from './respond200';

import smsRouter from './routers/sms';
import voiceRouter from './routers/voice';
import speakRouter from './routers/speak';

export default express()
    .get('/health', respond200({status: 'good'}))
    .use('/sms', smsRouter)
    .use('/voice', voiceRouter)
    .use('/speak', speakRouter);