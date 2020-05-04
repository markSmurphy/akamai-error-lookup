# akamai-error-lookup

![Version](https://img.shields.io/npm/v/akamai-error-lookup.svg?style=plastic)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/104448c7cade4f6bbdb2f4cf8b3b2109)](https://www.codacy.com?utm_source=bitbucket.org&amp;utm_medium=referral&amp;utm_content=MarkSMurphy/hashref&amp;utm_campaign=Badge_Grade)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/akamai-error-lookup.svg?style=plastic)
![Downloads](https://img.shields.io/npm/dm/akamai-error-lookup.svg?style=plastic)
![Licence](https://img.shields.io/npm/l/akamai-error-lookup.svg?style=plastic)

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

## Changelog

### [1.1.11] - May 4<sup>th</sup> 2020

#### Changed

* Added colour to the output of the number of seconds the query takes.
* Updated dependencies.

```text
           __
.-.__      \ .-.  ___  __
|_|  '--.-.-(   \/\;;\_\.-._______.-.
(-)___     \ \ .-\ \;;\(   \       \ \
 Y    '---._\_((Q)) \;;\\ .-\     __(_)
 I           __'-' / .--.((Q))---'    \,
 I     ___.-:    \|  |   \'-'_          \
 A  .-'      \ .-.\   \   \ \ '--.__     '\
 |  |____.----((Q))\   \__|--\_      \     '
    ( )        '-'  \_  :  \-' '--.___\
     Y                \  \  \       \(_)
     I                 \  \  \         \,
     I                  \  \  \          \
     A                   \  \  \          '\
     |                    \  \__|           '
                           \_:.  \
                             \ \  \
    HAPPY STAR WARS DAY       \ \  \
                               \_\_|
```

### [1.1.9] - May 1<sup>st</sup> 2020

#### Changed

* Updated dependencies.

---

### [1.1.8] - April 14<sup>th</sup> 2020

#### Changed

* Updated dependencies.

---

### [1.1.7] - March 26<sup>th</sup> 2020

#### Changed

* Updated dependencies.

---

### [1.1.6] - March 15<sup>th</sup> 2020

#### Changed

* Updated dependencies.

---

### [1.1.5] - February 8<sup>th</sup> 2020

#### Changed

* Updated dependencies.

---

### [1.1.4] - November 29<sup>th</sup> 2019

#### Changed

* Updated dependencies.

---

### [1.1.3] - November 20<sup>th</sup> 2019

#### Changed

* Updated dependencies.

---

### [1.1.2] - October 12<sup>th</sup> 2019

#### Changed

* Fixed path separators in absolute filename references to work across all platforms.

---

### [1.1.1] - September 22<sup>nd</sup> 2019

#### Changed

* Updated dependencies to include [edgegrid](https://www.npmjs.com/package/edgegrid) 3.0.8

---

### [1.1.0] - September 20<sup>th</sup> 2019

#### Added

* New `--decode` option to enable or disable URI & HTML decoding.

#### Changed

* Fixed decoding of URIs & HTML in console output.
* Updated dependencies including `edgegrid 3.0.7`.

---

### [1.0.2] - May 22<sup>nd</sup> 2019

#### Added

* Allow `auth.edgerc` to be in either the current directory or in the home directory, which allows a global install to be called from any current working directory.

---

### [1.0.0] - March 19<sup>th</sup> 2019

* Initial Release.

---
