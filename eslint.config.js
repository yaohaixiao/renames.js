/**
 * # Eslint.config.js - eslint 配置
 *
 * Created By: Yaohaixiao Update: 2026.1.10
 */
import eslintJs from '@eslint/js';
import { defineConfig } from 'eslint/config';
// Added for .gitignore
import { includeIgnoreFile } from '@eslint/compat';

// Added for .gitignore path
import { fileURLToPath } from 'node:url';
import globals from 'globals';

import eslintPluginJsdoc from 'eslint-plugin-jsdoc';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintConfigPrettier from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default defineConfig(
  // 1. Handle .gitignore patterns
  includeIgnoreFile(gitignorePath),

  // 2. 忽略指定目录/文件（全局生效）
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      'public/',
      'logs/',
      '*.config.js',
      '**/*.min.js',
    ],
  },

  // 3. Global linter options
  {
    linterOptions: {
      // Enable reporting of unused disable directives
      reportUnusedDisableDirectives: true,
    },
  },

  // 4. Base configurations for all relevant files
  eslintJs.configs.recommended, // Basic ESLint recommended rules

  // 5. JSDoc configuration
  {
    plugins: { jsdoc: eslintPluginJsdoc },
    rules: {
      ...eslintPluginJsdoc.configs.recommended.rules,
      'jsdoc/require-jsdoc': 0,
      'jsdoc/tag-lines': [2, 'any', { startLines: 1 }],
      'jsdoc/require-param-type': 0,
      'jsdoc/require-returns-type': 0,
      'jsdoc/no-types': 0,
      'jsdoc/no-defaults': 0,
      // Was in TS override, better here
      'jsdoc/require-returns-check': 0,
      // 核心配置：关闭注释首字母大写约束规则
      'jsdoc/capitalized-comments': 0,
      // 可选：关闭关联的描述开头格式规则（若仍有报错补充配置）
      'jsdoc/require-description-start': 0,
      'jsdoc/reject-function-type': 0,
    },
    settings: {
      jsdoc: {
        mode: 'jsdoc',
        tagNamePreference: { category: 'category' },
      },
    },
  },

  // 6. Node plugin configuration
  {
    plugins: { n: eslintPluginN },
    rules: {
      ...eslintPluginN.configs.recommended.rules,
      'n/file-extension-in-import': [2, 'always'],
      'n/no-missing-import': 0,
      'n/no-unpublished-import': 0,
    },
  },

  // 7. Unicorn plugin configuration
  {
    plugins: { unicorn: eslintPluginUnicorn },
    rules: {
      ...eslintPluginUnicorn.configs.recommended.rules,
      'unicorn/no-null': 0,
      'unicorn/prevent-abbreviations': 0,
      'unicorn/prefer-code-point': 0,
      'unicorn/no-for-loop': 0,
      'unicorn/no-array-callback-reference': 0,
      'unicorn/prefer-spread': 0,
      'unicorn/no-useless-undefined': 0,
      'unicorn/no-array-reduce': 0,
      'unicorn/prefer-array-find': 0,
      'unicorn/prefer-module': 0,
      'unicorn/prefer-at': 0,
      'unicorn/prefer-string-replace-all': 0,
      'unicorn/prefer-switch': [2, { emptyDefaultCase: 'do-nothing-comment' }],
    },
  },

  // 8. Jest 专属配置（核心：插件与规则在同一个配置对象内）
  {
    // 仅对测试文件生效，精准匹配
    files: ['**/tests/**/*.js'],

    ignores: ['node_modules/', 'dist/'],

    // 1. 注册 jest 插件（必须步骤，解决「找不到 plugin jest」）
    plugins: {
      // 键名「jest」需与规则前缀「jest/xxx」对应
      jest: jestPlugin,
    },

    // 2. 配置环境（导入 Jest 全局变量，顺带解决 describe 未定义）
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    // 3. 启用 Jest 规则（包括 jest/expect-expect）
    rules: {
      // 继承 Jest 推荐规则（包含 jest/expect-expect，无需单独手动写）
      ...jestPlugin.configs.recommended.rules,
      // 可选：手动自定义 jest/expect-expect 规则级别（error/warn/off）
      'jest/expect-expect': ['error', { assertFunctionNames: ['expect'] }],
    },
  },

  // 9. Global custom rules and language options
  {
    languageOptions: {
      globals: {
        // 保留 console, process（Jest 运行在 Node 中）
        ...globals.node,
      },
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js'],
        },
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'array-callback-return': [2, { allowImplicit: true }],
      'no-lonely-if': 2,
      'no-proto': 2,
      eqeqeq: [2, 'smart'],
      'no-caller': 2,
      'dot-notation': 2,
      'no-var': 2,
      'prefer-const': 2,
      'prefer-arrow-callback': [2, { allowNamedFunctions: true }],
      'arrow-body-style': [2, 'as-needed'],
      'object-shorthand': 2,
      'prefer-template': 2,
      'one-var': [2, 'never'],
      'prefer-destructuring': [2, { object: true }],
      'capitalized-comments': 0,
      'multiline-comment-style': [2, 'starred-block'],
      'spaced-comment': 2,
      yoda: [2, 'never'],
      curly: [2, 'multi-line'],
      'no-else-return': [2, { allowElseIf: false }],
      'no-unused-expressions': 2,
      'no-useless-call': 2,
      'no-use-before-define': [2, 'nofunc'],
      'no-constant-binary-expression': 2,
      'no-void': 2,
    },
    settings: {
      'import/resolver': {
        jest: {
          jestConfigFile: './jest.config.js',
        },
      },
    },
  },

  // 10. Prettier - must be the last configuration to override styling rules
  eslintConfigPrettier,
);
