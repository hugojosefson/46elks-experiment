export const PORT = process.env.PORT || 3000;
export const ELKS_PORT = process.env.ELKS_PORT || 3001;
export const ADMIN_PORT = process.env.ADMIN_PORT || 3002;
export const VOICERSS_KEY = process.env.VOICERSS_KEY;

const LOCALTUNNEL_SUBDOMAIN = process.env.LOCALTUNNEL_SUBDOMAIN;
export const BASE_URL = process.env.BASE_URL || LOCALTUNNEL_SUBDOMAIN ? `https://${LOCALTUNNEL_SUBDOMAIN}.localtunnel.me` : undefined;

if (!BASE_URL) {
    throw new Error("Must set BASE_URL in env to your server's public url.");
}

if (!VOICERSS_KEY) {
    throw new Error("Must set VOICERSS_KEY in env to your API key at voicerss.org.");
}

console.log(`==================================================`);
console.log(`| CONFIG                                         |`);
console.log(`+------------------------------------------------+`);
console.log(`| PORT:       ${PORT}`);
console.log(`| ELKS_PORT:  ${ELKS_PORT}`);
console.log(`| ADMIN_PORT: ${ADMIN_PORT}`);
console.log(`| BASE_URL:   ${BASE_URL}`);
console.log(`==================================================`);