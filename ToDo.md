# TO DO

## Next version

* Add `--authFile` command line switch to specify `auth.edgerc` filename/location.
* Add `--authFileSection` command line switch to specify section with `auth.edgerc` to use.
* Implement `findup` to locate `authFile` in parent directories, and also look for `.edgerc` file.
* Output which ~~`authfile` and~~ `authFileSection` is being used.
* ~~Remove `moment` in favour of native coding of time differences to work out request/response duration~
* ~~Fix string decoding~~
  * ~~Add a switch which turns decoding off~~
* ~~Update `readme.md` to include description of full json output being written to `tmp` folder.~~
* ~~Add `Yargs` command line argv parser~~
* ~~Move help screen into separate .js file and improve its aesthetics.~~
* ~~Look for `auth.edgerc` in home folder if it's not found in the current directory (`require('os').homedir()`).~~
* ~~Replace `outputExample.png` with animated gif showing complete but sanitised output (rather than the ugly blurred obfuscation).~~

---

## NPM Repository prerequisites

* ~~Complete Readme.md~~
* ~~Remove unneeded dependencies.~~
* ~~`package.json` add github URLs to `bugs`, `homepage` & `repository`~~
* ~~`package.json` change licence.~~
* ~~`package.json` make public.~~
* ~~`package.json` change version to v1.0.0~~
* ~~Add additional checking on json non-200 response (i.e. `objJSON.errors[0].error`)~~
* ~~Rename title for `npm` repository.~~
* ~~Add checking for missing `auth.edgerc`~~
* ~~Add shim and shebang.~~
* ~~Add `-h`, `--help` command line switch and usage output.~~
* ~~Increase `debug` output to include request objects and raw verbose response.~~
* ~~Add `debug` output.~~

---
