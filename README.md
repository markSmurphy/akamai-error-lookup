# akamai-error-lookup

## Quick Start

- Install globally using `npm install -g akamai-error-lookup`
- Configure your Akamai API credentials in `auth.edgerc`
- Run `hashref [errorReference]`

## Overview

**A command line utility to lookup Akamai error reference numbers (e.g. `Reference #18.2d351ab8.1557333295.a4e16ab`).**

If you work on a website hosted behind Akamai's CDN you will, on occasion, see an Akamai **Reference #** error number.  These occur when Akamai catches an error, as opposed to the origin serving an error, such as a DNS resolution failure or an origin connection error.

In these scenarios Akamai reports an error reference number:

![error - Service Unavailable - DNS failure](https://user-images.githubusercontent.com/9842107/57924537-4091b400-789d-11e9-8d04-1be9a9c06bad.png)

Using `hashref` you can lookup the details of the #Ref error number to diagnose the root cause of the error:

```text
hashref 11.2e373217.1558103133.1dedf6b
```

![usage example](https://user-images.githubusercontent.com/9842107/57939351-1ef6f380-78c2-11e9-97f6-27b22aea4ed8.png)

---

## Installation

```text
npm install -g akamai-error-lookup
```

### Configuration

You'll need to create an `auth.edgerc` file and configure it with your Akamai API credentials as described [here](https://developer.akamai.com/introduction/Conf_Client.html).

If the `auth.edgerc` file is not found you'll receive the following error message:

![auth file not found](https://user-images.githubusercontent.com/9842107/57942716-202c1e80-78ca-11e9-8af6-c13976c22a51.png)

---

## Usage

`hashref [errorReference]`

---

## Debugging

`akamai-error-lookup` uses the npm package [debug](https://www.npmjs.com/package/debug "www.npm js.com").  If you set the environment variable `debug` to `hashref` you'll see full debug output.

### Windows

```text
set debug=hashref
hashref [errorReference]
```

### Linux

```text
DEBUG=hashref hashref [errorReference]
```

### Powershell

```text
$env:debug="hashref"
node akamai-error-lookup [errorReference]
```

---