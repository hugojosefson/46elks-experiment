# 46elks-experiment

Experimenting with using the very interesting telephony/sms API
[46elks.com](https://www.46elks.com/).

[<img src="http://www.46elks.com/images/media/46elks-horizontal.png" border="0" alt="46elks.com">](https://www.46elks.com/)

Currently what I do here is an **answering machine**, programmable with text
strings, using the [www.voicerss.org](http://www.voicerss.org/) API for
text-to-speech (TTS) conversion.

*Note: When this answering machine server receives a recorded voice message
from 46elks, it is currently simply logged, and not sent anywhere.*

See below for *TODO / Ideas*.

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

## TODO / Ideas

  * Secure the app against non-46elks computers accessing it.
    * Can 46elks sign every request so we know it's them?
    * Are all requests from 46elks guaranteed to come from a certain IP range,
    so we can firewall it?
    * Otherwise, let's hide our API under a very secret long "directory" which
    only 46elks know about; for example
    `https://myserver.domain.tld/bw87cbw34trinw7t4irtwxi4rti8q4rxit/voice/start`
      * How do we handle switching secret directory, and not loosing any
      traffic?
        * Do 46elks change their behavior quickly enough if we simply
        reconfigure via their API and switch?
        * Perhaps allow previous secret to be valid for a certain period, while
        the change takes place?
  * Do something with recorded voice messages, instead of simply logging their
  URI to console. Probably with [nodemailer](https://www.npmjs.com/package/nodemailer).
  * Add admin service
    * `GET /numbers` lists all numbers in the 46elks account. 
    * `GET /numbers/configured` lists all numbers configured to use this server.
    This means the full list is filtered on the numbers which have the correct
    `sms_url` and `voice_start` fields set. (Could be partial, if only one of
    the fields are set correctly. Indicate each of `sms` and `voice`.)
    * `POST /numbers/:number/configure` configures any of the 46elks account's
    numbers to use this server, which means this server calls the 46elks API and
    configures the number with relevant `sms_url` and `voice_start`.
    * `POST /secret/new` assigns a new secret, reconfiguring all configured
    phone numbers' `sms_url` and `voice_start`'s. This has consequences for
    `/numbers/configured`, so its implementation and specification must be
    updated.
    * Add admin GUI
      * Fetch and display numbers belonging to the elk46 account, and their
      configuration status.
      * Show numbers with flags, for example
      ![Flag indicating Swedish number](http://www.flag-cdn.com/flags/16/se.png)
      +46070000000
      * Click to configure a number to use this server.
      * Click to update secret.
