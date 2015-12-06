import request from 'request';

export default key => lang => text => request({
    uri: 'https://api.voicerss.org/',
    qs: {
        key,
        src: text,
        hl: lang
    }
});