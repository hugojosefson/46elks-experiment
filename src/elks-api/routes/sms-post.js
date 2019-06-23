import ExpressRespondSimple from 'express-respond-simple'
import bodyParser from 'body-parser'
import log from '../../log'
const { respond204 } = ExpressRespondSimple

export default [
  bodyParser.json(),
  log,
  respond204()
]
