import express from 'express'
import allowMethods from 'allow-methods'
import ExpressRespondSimple from 'express-respond-simple'

import log from '../log'

import smsPost from './routes/sms-post'
import voiceStartPost from './routes/voice/start-post'
import voiceRecordedPost from './routes/voice/recorded-post'
import speak from './routes/speak'
const { respond200 } = ExpressRespondSimple

const app = express()

app.use(log)

app.use('/health', allowMethods(['OPTIONS', 'GET']))
app.get('/health', respond200({ status: 'good' }))

app.use('/health', allowMethods(['OPTIONS', 'POST']))
app.post('/sms', smsPost)

app.use('/voice/start', allowMethods(['OPTIONS', 'POST']))
app.post('/voice/start', voiceStartPost)

app.use('/voice/recorded', allowMethods(['OPTIONS', 'POST']))
app.post('/voice/recorded', voiceRecordedPost)

app.use('/speak/:lang/:text', allowMethods(['OPTIONS', 'GET']))
app.get('/speak/:lang/:text', speak)

export default app
