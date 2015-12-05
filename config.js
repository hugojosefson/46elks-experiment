export const PORT = process.env.PORT || 3001;
export const VOICERSS_KEY = process.env.VOICERSS_KEY;

const LOCALTUNNEL_SUBDOMAIN = process.env.LOCALTUNNEL_SUBDOMAIN;
export const BASE_URL = process.env.BASE_URL || LOCALTUNNEL_SUBDOMAIN ? `https://${LOCALTUNNEL_SUBDOMAIN}.localtunnel.me` : undefined;

if (!BASE_URL) {
    throw new Error("Must set BASE_URL in env to your server's public url.");
}

if (!VOICERSS_KEY) {
    throw new Error("Must set VOICERSS_KEY in env to your API key at voicerss.org.");
}