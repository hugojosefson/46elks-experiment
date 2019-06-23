import { VOICERSS_KEY } from '../../../config'
import log from '../../../log'
import speak from './speak'

export default [
  log,
  speak(VOICERSS_KEY)
]
