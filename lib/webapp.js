import express from 'express';

import smsRouter from './routers/sms';
import voiceRouter from './routers/voice';
import speakRouter from './routers/speak';

export default express()
    .use('/sms', smsRouter)
    .use('/voice', voiceRouter)
    .use('/speak', speakRouter);