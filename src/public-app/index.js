import express from 'express'
import allowMethods from 'allow-methods'
import ExpressRespondSimple from 'express-respond-simple'
const { respond200 } = ExpressRespondSimple

const app = express()

app.use('/health', allowMethods(['OPTIONS', 'GET']))
app.get('/health', respond200({ status: 'good' }))

export default app
