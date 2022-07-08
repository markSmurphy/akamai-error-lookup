# Changelog

## v1.2.13 - June 8<sup>th</sup> 2022

### Changed

* Updated dependency `debug` to `v4.3.4`.
* Updated dependency `html-entities` to `v2.3.3`.

---

## v1.2.12 - April 14<sup>th</sup> 2022

### Security

* Updated `moment@2.25.1` to version `2.29.2` to address [CVE-2022-24785](https://nvd.nist.gov/vuln/detail/CVE-2022-24785) (introduced via `edgegrid@3.0.8` --> `moment@2.25.1`).

---

## v1.2.11 - March 26<sup>th</sup> 2022

### Security

* Updated `ajv@6.10.0` to version `6.12.3` to address [CVE-2020-15366](https://nvd.nist.gov/vuln/detail/CVE-2020-15366) (introduced via `edgegrid@3.0.8` --> `request@2.88.0` --> `har-validator@5.1.3` --> `ajv@6.10.0`).
* Updated `ansi-regex@5.0.0` to version `5.0.1` to address [CVE-2021-3807](https://nvd.nist.gov/vuln/detail/CVE-2021-3807) (introduced via `yargs@16.2.0` --> `string-width@4.2.0` --> `strip-ansi@6.0.0` --> `ansi-regex@5.0.0` and 4 other paths).
* Updated `json-schema@0.2.3` to version `0.4.0` to address [CVE-2021-3918](https://nvd.nist.gov/vuln/detail/CVE-2021-3918) (introduced via `edgegrid@3.0.8` --> `request@2.88.0` --> `http-signature@1.2.0` --> `jsprim@1.4.1` --> `json-schema@0.2.3`).
* Updated `minimist@1.2.5` to version `1.2.6` to address [CVE-2021-44906](https://nvd.nist.gov/vuln/detail/CVE-2021-44906) (introduced via `prettyjson@1.2.5` --> `minimist@1.2.5`).

---

## v1.2.10 - February 21<sup>st</sup> 2022

### Changed

* Updated dependency `debug` to `v4.3.3`.
* Updated dependency `prettyjson` to `v1.2.5`.

---

## v1.2.9 - May 11<sup>th</sup> 2021

### Changed

* Updated dependency `html-entities` to `v2.3.2`.

---

## v1.2.8 - January 26<sup>th</sup> 2021

### Changed

* Updated dependency `html-entities` to `v2.0.6`.
* Updated dependency `supports-color` to `v8.1.1`.
* Updated badges in `README`.

---

## v1.2.7 - December 19<sup>th</sup> 2020

### Changed

* Updated dependency (`html-entities v1.4.0`).
* Updated dependency (`yargs v16.2.0`).
* Updated dependency (`supports-color v8.1.0`).

---

## v1.2.6 - December 5<sup>th</sup> 2020

### Changed

* Updated dependency (`debug`).
* Added `supports-color` dependency to supplement `debug`.
* Added `engines` to `package.json` to specify node version >=10.0.0

---

## v1.2.5 - November 19<sup>th</sup> 2020

### Changed

* Updated dependency (`yargs`).

---

## v1.2.4 - November 6<sup>th</sup> 2020

### Changed

* Updated dependency (`yargs`).
* Improved terminal output colour scheme.

---

## v1.2.2 - September 15<sup>th</sup> 2020

### Changed

* Updated dependencies.

---

## v1.2.1 - July 11<sup>th</sup> 2020

### Added

* Added [Snyk](https://snyk.io/test/npm/akamai-error-lookup) badge to README.

### Changed

* Updated dependencies.

---

## v1.2.0 - May 5<sup>th</sup> 2020

### Changed

* Removed `moment` package dependency in favour of native coding of time differentials to workout API call duration.
* Removed `eslint` dev dependency (using a globally installed eslint instead).

---

## v1.1.11 - May 4<sup>th</sup> 2020

### Changed

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

## v1.1.9 - May 1<sup>st</sup> 2020

### Changed

* Updated dependencies.

---

## v1.1.8 - April 14<sup>th</sup> 2020

### Changed

* Updated dependencies.

---

## v1.1.7 - March 26<sup>th</sup> 2020

### Changed

* Updated dependencies.

---

## v1.1.6 - March 15<sup>th</sup> 2020

### Changed

* Updated dependencies.

---

## v1.1.5 - February 8<sup>th</sup> 2020

### Changed

* Updated dependencies.

---

## v1.1.4 - November 29<sup>th</sup> 2019

### Changed

* Updated dependencies.

---

## v1.1.3 - November 20<sup>th</sup> 2019

### Changed

* Updated dependencies.

---

## v1.1.2 - October 12<sup>th</sup> 2019

### Changed

* Fixed path separators in absolute filename references to work across all platforms.

---

## v1.1.1 - September 22<sup>nd</sup> 2019

### Changed

* Updated dependencies to include [edgegrid](https://www.npmjs.com/package/edgegrid) 3.0.8

---

## v1.1.0 - September 20<sup>th</sup> 2019

### Added

* New `--decode` option to enable or disable URI & HTML decoding.

### Changed

* Fixed decoding of URIs & HTML in console output.
* Updated dependencies including `edgegrid 3.0.7`.

---

## v1.0.2 - May 22<sup>nd</sup> 2019

### Added

* Allow `auth.edgerc` to be in either the current directory or in the home directory, which allows a global install to be called from any current working directory.

---

## v1.0.0 - March 19<sup>th</sup> 2019

* Initial Release.

---
