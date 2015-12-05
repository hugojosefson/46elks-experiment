import request from 'request';

export default key => (text, lang = 'sv-se') => (req, res) => {
    console.log(`${lang}: ${text}`);
    request({
        uri: 'https://api.voicerss.org/',
        qs: {
            key,
            src: text,
            hl: lang
        }
    }).pipe(res);
}