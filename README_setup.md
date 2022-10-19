# Rust WebAssembly

## 参考

https://www.wasm.com.cn/
https://developer.mozilla.org/en-US/docs/WebAssembly
https://tauri.app/

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

### Install Template `cargo generate --git https://github.com/rustwasm/wasm-pack-template`

### Build the Project `wasm-pack build`

> 初次会安装编译相关依赖包

```sh
# You can cause it to display even more information by using --verbose, or you can silence all stdout by using --quiet.
# You can also use --log-level to have fine-grained control over wasm-pack's log output:
# --log-level info is the default, it causes all messages to be logged.
# --log-level warn causes warnings and errors to be displayed, but not info.
# --log-level error causes only errors to be displayed.

wasm-pack --log-level error build
wasm-pack --quiet build
wasm-pack --verbose build
```

The methods of deployment and integration here are primarily tied to the --target flag.

| Value      | Summary                                        |
| :--------- | :--------------------------------------------- |
| bundler    | Suitable for loading in bundlers like Webpack  |
| web        | Directly loadable in a web browser             |
| nodejs     | Loadable via require as a Node.js module       |
| deno       | Loadable using imports from Deno modules       |
| no-modules | Like web, but older and doesn't use ES modules |

- `wasm-pack build --target web` 编译成 web pkg
- `wasm-pack build --target bundler` 编译成 npm pkg

### Init Web Application `npm init wasm-app www`

1. `/www/package.json` add dependence

```json
"dependencies": {  // Add this three lines block!
  "ju_rust_wasm": "file:../pkg"
},
```

2. `/www/index.js` import wasm pack

```js
import * as wasm from 'ju_rust_wasm';

wasm.greet();
```

3. Web App install dependencies `pnpm i`

4. Run Serving Locally `pnpm run start`

5. Visit web `http://localhost:8080/`

### Test

`wasm-pack test --chrome --headless`

### 使用 vite 脚手架

- vite webassembly 插件 `vite-plugin-rsw` => 暂时没有使用(通过 `pnpm mono repo` 模式替代)

---

## Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中
