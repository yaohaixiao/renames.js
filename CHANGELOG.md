## <small>0.3.1 (2026-02-23)</small>

* fix: 修复 main-command-action.js 模块处理 namesList 参数直接传递文件名数据的逻辑错误； ([e6595f6](https://github.com/yaohaixiao/renames.js/commit/e6595f6))
* chore: 调整 analysis-names-list.js 模块，添加返回数据的逻辑； ([9dd8f80](https://github.com/yaohaixiao/renames.js/commit/9dd8f80))
* docs: 更新 api 文档 ([6aaf35c](https://github.com/yaohaixiao/renames.js/commit/6aaf35c))



## 0.3.0 (2026-02-23)

- feat: 给 cache 子命令添加 --delete 配置项，用以删除缓存文件 renames.cache.json;
  ([34165ad](https://github.com/yaohaixiao/renames.js/commit/34165ad))
- feat: 添加 cache 子命令； ([822e332](https://github.com/yaohaixiao/renames.js/commit/822e332))
- feat: 为 cache 子命令添加 --on 配置参数，用来启用 renames.config.js 中的缓存配置；为 cache 子命令添加 --list 参数，用来以有序列表形式显示缓存数据； ([e8b73b3](https://github.com/yaohaixiao/renames.js/commit/e8b73b3))
- chore: delete FUNDING.yml
  ([0e5d588](https://github.com/yaohaixiao/renames.js/commit/0e5d588))
- Update FUNDING.yml to reflect supported platforms
  ([78b3e90](https://github.com/yaohaixiao/renames.js/commit/78b3e90))

## <small>0.2.1 (2026-02-15)</small>

- fix: 修复配置 namesList 为文件路径时 analysis-names-list.js 模块导入 read-list 错误的问题； ([6f9bcb6](https://github.com/yaohaixiao/renames.js/commit/6f9bcb6))

## 0.2.0 (2026-02-14)

- chore: 按代码规范格式化代码； ([b817616](https://github.com/yaohaixiao/renames.js/commit/b817616))
- chore: 调整代码，将全局定义的常量迁移到函数模块内部 ([dcec392](https://github.com/yaohaixiao/renames.js/commit/dcec392))
- chore: 调整代码； ([7bc3d67](https://github.com/yaohaixiao/renames.js/commit/7bc3d67))
- chore: 更新 README.md，添加 codecov.yml 配置； ([fa59c3b](https://github.com/yaohaixiao/renames.js/commit/fa59c3b))
- chore: update codecov.yml
  ([3f81bb1](https://github.com/yaohaixiao/renames.js/commit/3f81bb1))
- chore: update codecov.yml
  ([061f83f](https://github.com/yaohaixiao/renames.js/commit/061f83f))
- chore: update codecov.yml
  ([c92fdef](https://github.com/yaohaixiao/renames.js/commit/c92fdef))
- chore: update README.md; delete codecov.yml
  ([70dc470](https://github.com/yaohaixiao/renames.js/commit/70dc470))
- feat: 添加 revoke 子命令； ([ae73acb](https://github.com/yaohaixiao/renames.js/commit/ae73acb))
- feat: 添加新的配置参数：indexLength 和 cache；添加新的子命令 revoke；优化代码，将原本单个文件中的多个辅助函数调整未独立函数模块； ([7f24270](https://github.com/yaohaixiao/renames.js/commit/7f24270))
- feat: 完成 revoke 子命令的功能开发，并优化之前的代码； ([8daf38e](https://github.com/yaohaixiao/renames.js/commit/8daf38e))
- test: 调整单测并添加 codecov.yml，配置 github 的测试 action
  ([9e3a040](https://github.com/yaohaixiao/renames.js/commit/9e3a040))
- test: 调整单测代码，采用动态生成 sort-files.spec.js 中需要的文件； ([4f90c29](https://github.com/yaohaixiao/renames.js/commit/4f90c29))
- test: 调整单测代码； ([f419096](https://github.com/yaohaixiao/renames.js/commit/f419096))
- test: 调整单测逻辑，使用 for 循环，按顺序生成文件； ([796cb8f](https://github.com/yaohaixiao/renames.js/commit/796cb8f))
- docs: 更新 API 文档，添加新的配置选项 cache 和 indexLength 的说明，添加 revoke 子命令的说明； ([d6eec66](https://github.com/yaohaixiao/renames.js/commit/d6eec66))
- docs: update README.md
  ([d53aed4](https://github.com/yaohaixiao/renames.js/commit/d53aed4))

## 0.1.0 (2026-02-09)

- chore: 调整优化主命令的代码； ([b6b6ebb](https://github.com/yaohaixiao/renames.js/commit/b6b6ebb))
- chore: 更新版本为 0.0.2
  ([b135a6f](https://github.com/yaohaixiao/renames.js/commit/b135a6f))
- chore: 优化代码，分离出全局变量，并抽离 renames.js 中的功能函数，优化代码可读性 ([ce5dc60](https://github.com/yaohaixiao/renames.js/commit/ce5dc60))
- feat: 调整 init 命令配置参数为2个（dirPath和namesList），其余都用默认值，简化配置过程，优化体验； ([4db05be](https://github.com/yaohaixiao/renames.js/commit/4db05be))
- test: 调整单测代码 ([b06703a](https://github.com/yaohaixiao/renames.js/commit/b06703a))

## <small>0.0.2 (2026-02-08)</small>

- fix: 修复 sortBy 参数传递自定义函数无效的问题；
- fix: 修复 indexPadZero 设置为 false 后，还是继续用‘0’填充的问题；
