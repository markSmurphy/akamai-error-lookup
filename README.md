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


---

## Description

Under normal operations, when you browse a domain fronted by Akamai's CDN, the internet's DNS will resolve the domain to the IP address of your nearest Akamai point-of-presence on their **Production** network.

When it is necessary to test a newer Akamai configuration for a domain, you need to override DNS via a local `hosts` file entry which resolves the domain to an IP address in Akamai's **Staging** network.

This utility aids that process by accepting one or more fully qualified domain names and listing out their respective **Staging** IP addresses.

---

## Installation

```text
npm install -g akamai-staging
```

---

## Usage

`staging domain [domain [domain] ...]`

---

## Examples

### A single domain

`staging www.akamai.com`

```text
C:\>staging www.akamai.com

23.195.136.39 www.akamai.com                         #Akamai Staging variant of [www.akamai.com.edgekey.net]

```

### Multiple domains

If your front-end consists of multiple domains, you may need to point more than one to the **Staging** network.  You can pass multiple domains, separated by `spaces`, via the command line:

`staging www.akamai.com www.asos.com www.bridgestone.com www.colorcon.com www.dominos.co.uk`

```text
C:\>staging www.akamai.com www.asos.com www.bridgestone.com www.colorcon.com www.dominos.co.uk

23.198.85.168 www.akamai.com                         #Akamai Staging variant of [www.akamai.com.edgekey.net]
23.41.222.21 www.asos.com                            #Akamai Staging variant of [ev.prod.asos.com.edgekey.net]
23.44.116.103 www.bridgestone.com                    #Akamai Staging variant of [www.bridgestone.com.edgekey.net]
23.44.121.71 www.colorcon.com                        #Akamai Staging variant of [www.colorcon.com.edgekey.net]
23.44.114.227 www.dominos.co.uk                      #Akamai Staging variant of [www.dominos.co.uk.edgekey.net]

```

### Redirecting output to `hosts` file

Why not redirect `stdout` to append the `hosts` file, seeing as you're going to need these entries in there anyway.

*NB* **you may have flush your O/S's resolver cache, and flush your browser DNS cache before new `hosts` entry is recognised**

#### Windows (as local admin)

```text
C:\>staging.js www.akamai.com >> %systemroot%\system32\drivers\etc\hosts

C:\>type %systemroot%\system32\drivers\etc\hosts
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#       127.0.0.1       localhost
#       ::1             localhost



23.195.136.39 www.akamai.com                         #Akamai Staging variant of [www.akamai.com.edgekey.net]

C:\>▄
```

#### Linux (as root)

```text
root@LinuxMint-VirtualBox:~$ staging www.akamai.com >> /etc/hosts
root@LinuxMint-VirtualBox:~$ cat /etc/hosts
127.0.0.1    localhost
127.0.1.1    LinuxMint-VirtualBox

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
23.195.136.39 www.akamai.com                         #Akamai Staging variant of [www.akamai.com.edgekey.net]

root@LinuxMint-VirtualBox:~$ █
```

---

## Debugging

`akamai-staging` uses the npm package [debug](https://www.npmjs.com/package/debug "www.npmjs.com").  If you set the environment variable `debug` to `staging` you'll see full debug output.

### Windows

```text
set debug=staging
staging [domain]
```

### Linux

```text
DEBUG=staging staging [domain]
```

### Powershell

```text
$env:debug="staging"
node akamai-staging [domain]
```

---

## Restrictions

### Apex domains are not currently supported

DNS standards do not allow a `CNAME` record in the apex (`A` or `AAAA` are the only allowed record types), and DNS providers get around this in proprietary ways.  The use of `dns.resolveCname` to get the initial alias of the hostname fails because it's not a `CNAME` record that's being returned.

A resolution is being explored.

---