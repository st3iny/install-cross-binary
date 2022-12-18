# install-cross-binary

A dead simple GitHub Action to download and install the latest
[cross](https://github.com/cross-rs/cross) binary from GitHub.

Include it in your workflow file to download and install the latest cross release to
`/usr/local/bin`.

```yaml
- name: Install latest cross binary
  uses: st3iny/install-cross-binary@v2
```

## Options

The action can be customized by passing the following options via `with:`.

- **release** (default: `latest`): The version of cross to install. Can be any [released tag](https://github.com/cross-rs/cross/releases).
- **destination** (default: `/usr/local/bin`): The directory in which the cross binary is installed.

### Example

Install cross `v0.2.3` to `/usr/bin`:
```yaml
- name: Install cross v0.2.3
  uses: st3iny/install-cross-binary@v2
  with:
    release: v0.2.3
    destination: /usr/bin
```

## Why?

### Problem

Cross compiling Rust code is very convenient when using the awesome
[cross tool](https://github.com/cross-rs/cross). It can be used on GitHub Actions through the
official [cargo action](https://github.com/actions-rs/cargo#cross-compilation).
However, the action compiles cross from source and this usually takes some time.

### Solution

This action downloads a pre-compiled binary from the official cross repository at GitHub and
installs it to the runner.
The official cargo action automatically detects installed cross binaries and skips the compilation
if one is found.
