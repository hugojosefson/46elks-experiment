import {VOICERSS_KEY} from '../../../config';
import log from '../../../log';
import speak from './speak';

export default app => app
    .route('/:lang/:text')
    .all(log)
    .get(speak(VOICERSS_KEY));