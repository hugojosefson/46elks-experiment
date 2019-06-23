import { BASE_URI } from '../../../config'
import ExpressRespondSimple from 'express-respond-simple'
import bodyParser from 'body-parser'
import log from '../../../log'

import say from './say'
const { respond200 } = ExpressRespondSimple

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
]
