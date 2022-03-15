# akamai-error-lookup

![Version](https://img.shields.io/npm/v/akamai-error-lookup?style=plastic)
![node-current](https://img.shields.io/node/v/akamai-error-lookup?style=plastic)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ad68526459464546ba23686ae1229688)](https://www.codacy.com/gh/markSmurphy/akamai-error-lookup/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=markSmurphy/akamai-error-lookup&amp;utm_campaign=Badge_Grade)
![GitHub issues](https://img.shields.io/github/issues/markSmurphy/akamai-error-lookup?style=plastic)
[![Known Vulnerabilities](https://snyk.io/test/npm/akamai-error-lookup/badge.svg)](https://snyk.io/test/npm/akamai-error-lookup)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/akamai-error-lookup?style=plastic)
![Downloads](https://img.shields.io/npm/dm/akamai-error-lookup?style=plastic)
![Licence](https://img.shields.io/npm/l/akamai-error-lookup?style=plastic)

## Quick Start

* Install globally using `npm install -g akamai-error-lookup`
* Configure your Akamai API credentials in `auth.edgerc`
* Run `hashref [errorReference]`

![Output Example](https://user-images.githubusercontent.com/9842107/58412603-b1d82080-806e-11e9-800f-7e96611538f1.gif)

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

You can save `auth.edgerc` in either the current directory or in the home directory (`node -p require('os').homedir()`).

Using the home directory means you can install the package globally and call `hashref` from any location.

If the `auth.edgerc` file is not found you'll receive the following error message:

![auth file not found](https://user-images.githubusercontent.com/9842107/57942716-202c1e80-78ca-11e9-8af6-c13976c22a51.png)

---

## Usage

`hashref [errorReference] [options]`

---

## Options

```text
--decode <true|false>            Enable or disable decoding of URLs and user-agent [true]
--no-color                       Switches off colour output
--version                        Display version number
--help                           Display this help
```

### decode

By default all output will be decoded, so that fields such as **user-agent** and **URL** are more readable.  Use `--decode false` to switch this off.

### no-color

If your terminal has problems rendering the colour output then you can switch it off by using `--no-color`.

### version

Prints out `akamai-error-lookup`'s version number.

### help

Displays the help screen.

---

## Verbose output

The default terminal output contains a selective subset of the more salient fields returned by Akamai's API.

The full `json` response is automatically written to the operating system's default directory for temporary files (`node -p require('os').tmpdir()`).  The location is displayed as part of the terminal output:

```text
Writing full response to [C:\Users\foo\AppData\Local\Temp\11.2e373217.1558514903.f6c71e.json]
```

Note: On Linux systems this will be `/tmp` rather than `/var/tmp` which means these files will **not** persist a system reboot.  If you want to retain them, copy them elsewhere.

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

## Where is the Change Log

The Change Log as been moved to its own file, `CHANGELOG.md`, and can be found [here](./CHANGELOG.md)

---
