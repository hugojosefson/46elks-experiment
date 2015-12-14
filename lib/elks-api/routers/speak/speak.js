import request from 'request';

import voiceRss from './voice-rss';

export default key => (req, res) =>
    voiceRss
    (key)
    (req.params.lang)
    (req.params.text)
        .pipe(res);