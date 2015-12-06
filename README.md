# 46elks-experiment

Experiment with telephony/sms API [46elks.com](https://www.46elks.com/).

Currently this is an **answering machine**, programmable with text strings,
using the [www.voicerss.org](http://www.voicerss.org/) API for text-to-speech
(TTS) conversion.

*Note: When this server receives a recorded voice message from 46elks, it is
currently logged, and not sent anywhere.*

## TODO

  * Secure the app against non-46elks computers accessing it.
  * Do something with recorded voice messages, instead of simply logging their
  URI to console. Probably with [nodemailer](https://www.npmjs.com/package/nodemailer).

## Installation

```bash
git clone https://github.com/hugojosefson/46elks-experiment
cd 46elks-experiment
npm install
```

## Prerequisites

### A public hosting URL

The app needs to be publicly accessible (at least for 46elks).

One way of achieving this during development or for quick testing, is by
running the app locally on your laptop, and using
[localtunnel.me](https://localtunnel.me/) to let anyone access it:

```bash
export LOCALTUNNEL_SUBDOMAIN=yourname
npm run localtunnel
```

### An account with 46elks

Sign up for an account at [46elks.com](https://www.46elks.com/) and purchase a
phone number. You will need it for the incoming calls :)

Configure the correct urls for the phone number:
 
[https://dashboard.46elks.com/numbers](https://dashboard.46elks.com/numbers)

If you have set up localtunnel as per above with the name `yourname`, these are
the correct urls:

```
sms_url     = https://yourname.localtunnel.me/sms
voice_start = https://yourname.localtunnel.me/voice/start
```

## Running

```bash
export VOICERSS_KEY=0000000000000000000  # use your actual API key from www.voicerss.org
export BASE_URL=https://your.server.tld  # where 46elks can access your server, without trailing slash
export PORT=3001                         # to optionally set which port your server should listen on (default is 3001)
npm start
```

If you are using `localtunnel`, you can use `LOCALTUNNEL_SUBDOMAIN` instead of `BASE_URL` if you want:

```bash
export VOICERSS_KEY=0000000000000000000  # use your actual API key from www.voicerss.org
export LOCALTUNNEL_SUBDOMAIN=yourname
export PORT=3001                         # to optionally set which port your server should listen on (default is 3001)
npm start
```