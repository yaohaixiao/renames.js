import { supportsColor } from 'chalk';

/**
 * # Jest.config.js - jest 配置
 *
 * Created By: Yaohaixiao Update: 2026.1.10
 */
export default {
  moduleFileExtensions: ['js'],
  // 处理导入映射
  moduleNameMapper: {
    '^#ansi-styles$': 'ansi-styles',
    '^#supports-color$': 'supports-color',
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/tests/*.spec.(js)'],
  transform: {
    '^.+\\.js$': [
      'babel-jest',
      {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: { node: 'current' },
            },
          ],
        ],
      },
    ],
  },
  testEnvironment: 'node',
  testTimeout: 5000,
  // 确保不会忽略转换 chalk
  transformIgnorePatterns: [
    'node_modules/(?!(chalk|ansi-styles|supports-color)/)',
  ],
  collectCoverage: true,
  coverageDirectory: 'report/coverage',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'renames.js 单测报告',
        outputPath: './report/unit-test/index.html',
        includeFailureMsg: true,
      },
    ],
  ],
};
