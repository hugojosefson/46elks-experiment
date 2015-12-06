import {Router} from 'express';

import {VOICERSS_KEY} from '../../config';
import log from '../../log';
import speak from './speak';

const router = Router();

router
    .route('/:lang/:text')
    .all(log)
    .get(speak(VOICERSS_KEY));

export default router;