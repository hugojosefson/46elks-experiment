/*eslint-disable no-process-env*/
export const PORT = process.env.PORT || 3000;
export const ELKS_PORT = process.env.ELKS_PORT || 3001;
export const ADMIN_PORT = process.env.ADMIN_PORT || 3002;
export const VOICERSS_KEY = process.env.VOICERSS_KEY;
export const ELKS_API_USERNAME = process.env.ELKS_API_USERNAME;
export const ELKS_API_PASSWORD = process.env.ELKS_API_PASSWORD;
export const ELKS_API_URI = process.env.ELKS_API_URI || 'https://api-suggestion-46elks.herokuapp.com/v2';

const LOCALTUNNEL_SUBDOMAIN = process.env.LOCALTUNNEL_SUBDOMAIN;
export const BASE_URI = process.env.BASE_URI || LOCALTUNNEL_SUBDOMAIN ? `https://${LOCALTUNNEL_SUBDOMAIN}.localtunnel.me` : undefined;

if (!BASE_URI) {
    throw new Error("Must set BASE_URI in env to your server's public uri.");
}

if (!VOICERSS_KEY) {
    throw new Error('Must set VOICERSS_KEY in env to your API key at voicerss.org');
}

if (!ELKS_API_USERNAME) {
    throw new Error('Must set ELKS_API_USERNAME in env to your API username at dashboard.46elks.com');
}

if (!ELKS_API_PASSWORD) {
    throw new Error('Must set ELKS_API_PASSWORD in env to your API password at dashboard.46elks.com');
}

console.log(`==================================================`);
console.log(`| CONFIG                                         |`);
console.log(`+------------------------------------------------+`);
console.log(`| PORT:       ${PORT}`);
console.log(`| ELKS_PORT:  ${ELKS_PORT}`);
console.log(`| ADMIN_PORT: ${ADMIN_PORT}`);
console.log(`| BASE_URI:   ${BASE_URI}`);
console.log(`==================================================`);
