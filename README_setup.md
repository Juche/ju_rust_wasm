# Rust WebAssembly

## Setup Toolchain

- Rust toolchain => including rustup, rustc, and cargo.
- wasm-pack: https://rustwasm.github.io/wasm-pack/installer/
- cargo-generate: `cargo install cargo-generate`

```sh
# The pkg-config command could not be found.
# Most likely, you need to install a pkg-config package for your OS.
没有glib依赖性的替代方法是pkg-config-lite。pkg-config.exe从存档中提取并放入您的路径。如今，可以使用Chocolatey来使用此软件包，然后可以通过安装该软件包choco install pkgconfiglite

# error occurred: Failed to find tool. Is `gcc.exe` installed?
# (see https://github.com/alexcrichton/cc-rs#compile-time-requirements for help)
# MinGW-w64: https://www.mingw-w64.org/downloads/#mingw-builds
安装 MinGW-w64
https://blog.csdn.net/jjxcsdn/article/details/123058745
```

## Project

- Template `cargo generate --git https://github.com/rustwasm/wasm-pack-template`
