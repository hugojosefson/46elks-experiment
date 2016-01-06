# 46elks-experiment

Experimenting with using the very interesting telephony/sms API
[46elks.com](https://www.46elks.com/).

[<img src="http://www.46elks.com/images/media/46elks-horizontal.png" border="0" alt="46elks.com">](https://www.46elks.com/)

Currently what I do here is an **answering machine**, programmable with text
strings, using the [www.voicerss.org](http://www.voicerss.org/) API for
text-to-speech (TTS) conversion.

[![Build Status](https://travis-ci.org/hugojosefson/46elks-experiment.svg?branch=master)](https://travis-ci.org/hugojosefson/46elks-experiment)

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
sms_uri         = https://yourname.localtunnel.me/sms
voice_start_uri = https://yourname.localtunnel.me/voice/start
```

### An account with voicerss

Sign up for a free account at [www.voicerss.org](http://www.voicerss.org/).

Obtain an API key.

## Running

```bash
export ELKS_API_USERNAME=00000000000000  # use your actual API username from dashboard.46elks.com
export ELKS_API_PASSWORD=00000000000000  # use your actual API password from dashboard.46elks.com
export VOICERSS_KEY=0000000000000000000  # use your actual API key from www.voicerss.org
export BASE_URL=https://your.server.tld  # where 46elks can access your server, without trailing slash
export PORT=3001                         # to optionally set which port your server should listen on (default is 3001)
npm start
```

If you are using `localtunnel`, you can use `LOCALTUNNEL_SUBDOMAIN` instead of `BASE_URL` if you want:

```bash
export ELKS_API_USERNAME=00000000000000  # use your actual API username from dashboard.46elks.com
export ELKS_API_PASSWORD=00000000000000  # use your actual API password from dashboard.46elks.com
export VOICERSS_KEY=0000000000000000000  # use your actual API key from www.voicerss.org
export LOCALTUNNEL_SUBDOMAIN=yourname
export PORT=3001                         # to optionally set which port your server should listen on (default is 3001)
npm start
```

## TODO / Ideas

  * Secure this server app against non-46elks computers accessing it.
    1. ***BEST*** Can 46elks sign every request, or include some secret, so we
    know it's them?
    2. ***ACCEPTABLE*** Are all requests from 46elks guaranteed to come from a
    certain IP range, so we can firewall off everything else? Maybe fetch a list
    of 46elks IP subnets or addresses from their API?
    3. ***UGLY / NECESSARY*** Otherwise, we could hide our API under a very
    secret long "directory" which only 46elks would know about; for example
    `https://myserver.domain.tld/bw87cbw34trinw7t4irtwxi4rti8q4rxit/voice/start`
      * Use [urlsafe-base64](https://www.npmjs.com/package/urlsafe-base64) to
      generate that access secret in the url.
      * When creating a new current access secret, set a TTL on the previous
      access secret for how long it remains valid.
  * Do something with recorded voice messages, instead of simply logging their
  URI to console. Probably with [nodemailer](https://www.npmjs.com/package/nodemailer).
  * Add admin service on a port not exposed to the Internet:
    * *DONE:* ~~`GET    /numbers` lists all phone numbers in the 46elks account.~~
    * `POST   /numbers/:id/configure` configures any of the 46elks account's
    phone numbers to use this server, which means this server calls the 46elks
    API and configures the number with relevant `sms_uri` and `voice_start_uri`.
    * `GET    /numbers/configured` lists all numbers configured to use this server.
    This means the full list is filtered on the numbers which have the correct
    `sms_uri` and `voice_start_uri` fields set.
    * `GET    /numbers/unconfigured` lists all numbers not correctly configured to
    use this server. Indicates which of `sms_uri` and `voice_start_uri` need
    configuring, or both.
    * `POST   /numbers` allocates a new phone number with 46elks and configures
    it for use with this server.
    * `DELETE /numbers/:id` deallocates a phone number with 46elks.
    * `POST   /access-secrets` creates a new access secret and sets it as the
    current, reconfiguring all configured phone numbers' `sms_uri` and
    `voice_start_uri`'s. *This has consequences for `/numbers/configured` and
    `/numbers/unconfigured`, so their specification and implementations must be
    updated when this is implemented.*
    * `GET    /access-secrets` lists all active access secrets, specifying which
    one is the current.
    * `GET    /access-secrets/current` 302-redirects to the current access secret.
    * `GET    /access-secrets/:secret` full info on an access secret.
    * `DELETE /access-secrets/:secret` deletes an access secret. The current
    access secret is not allowed to be deleted.
    * Add admin GUI
      * Fetch and display phone numbers belonging to the 46elks account, and
      their configuration status. (`GET /numbers`)
      * Show phone numbers with flags, for example
      ![Flag indicating Swedish number](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/se.png)
      +46070000000
      * Click to configure a phone number to use this server.
      * Click to allocate a new phone number with 46elks.
      * Click to deallocate a phone number with 46elks.
      * Click to update access secret.
