import path from 'node:path';
import { fileURLToPath } from 'node:url';

import readFile from './utils/read-file.js';

const { resolve, dirname } = path;

const CURRENT_FILE_PATH = dirname(fileURLToPath(import.meta.url));

// DEMO 文本相关
const DEMO_DIR_PATH = String.raw`C:\Downloads\Videos`;
const DEMO_LIST_PATH = String.raw`C:\Downloads\names.txt`;
const DEMO_LIST_DATA = '新的开始,完美结局';
const DEMO_PREFIX = '动画片';
const DEMO_SUFFIX = '1080p';
const DEMO_CONNECTOR = '-';
const DEMO_BASENAME = '第01话：新的开始';
const DEMO_FILE_NAME = `${DEMO_BASENAME}.mp4`;
const DEMO_FULL_FILE_NAME = `${DEMO_PREFIX}${DEMO_CONNECTOR}${DEMO_BASENAME}${DEMO_CONNECTOR}${DEMO_SUFFIX}.mp4`;
const DEMO_FILES_DATA = `C:\\${DEMO_FILE_NAME},D:\\${DEMO_FULL_FILE_NAME}`;

// 默认配置文件路径
const DEFAULT_CONFIG_PATH = resolve(
  CURRENT_FILE_PATH,
  '../config/default.config.json',
);

// 默认配置相关
const DEFAULT_DIR_PATH = '';
const DEFAULT_NAMES = [];
const DEFAULT_NAMES_LIST = '';
const DEFAULT_FILES_LIST = '';
const DEFAULT_PREFIX = '';
const DEFAULT_SUFFIX = '';
const DEFAULT_CONNECTOR = '';
const DEFAULT_AUTO_INDEX = false;
const DEFAULT_START_INDEX = 0;
const DEFAULT_INDEX_PAD_ZERO = true;
const DEFAULT_INDEX_LENGTH = 'auto';
const DEFAULT_INDEX_PREFIX = '第';
const DEFAULT_INDEX_SUFFIX = '集';
const DEFAULT_DELIMITER = '：';
const DEFAULT_FORCE = false;
const DEFAULT_EXTNAME = '';
const DEFAULT_FILTER = null;
const DEFAULT_SORT_BY = 'name';
const DEFAULT_ORDER = 'asc';
const DEFAULT_SENSITIVITY = 'base';
const DEFAULT_FORMAT = null;
const DEFAULT_CACHE = false;

// 配置文件相关
const CONFIG_FILE_NAME = 'renames.config.js';
const CONFIG_FILE_PATH = resolve(CURRENT_FILE_PATH, `../${CONFIG_FILE_NAME}`);
const CONFIG_FILE_PATH_URL = `file://${CONFIG_FILE_PATH}`;

// 缓存配置相关
const CACHE_FILE_NAME = 'renames.cache.json';
const CACHE_FILE_PATH = resolve(CURRENT_FILE_PATH, `../${CACHE_FILE_NAME}`);

// package.json 数据
const PACKAGE_JSON = JSON.parse(
  readFile(resolve(CURRENT_FILE_PATH, '../package.json')),
);

// 文档相关的数据
const README_PATH = resolve(process.cwd(), './README.md');
const API_PAGE_PATH = resolve(process.cwd(), './docs/index.html');

const NAMESPACE_OID = '1b671a64-40d5-491e-99b0-da01ff1f3341';

const CONSTANTS = {
  CURRENT_FILE_PATH,

  DEMO_DIR_PATH,
  DEMO_FILES_DATA,
  DEMO_LIST_PATH,
  DEMO_LIST_DATA,
  DEMO_PREFIX,
  DEMO_SUFFIX,
  DEMO_CONNECTOR,
  DEMO_FILE_NAME,
  DEMO_FULL_FILE_NAME,

  DEFAULT_CONFIG_PATH,

  DEFAULT_DIR_PATH,
  DEFAULT_NAMES,
  DEFAULT_NAMES_LIST,
  DEFAULT_FILES_LIST,
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  DEFAULT_CONNECTOR,
  DEFAULT_AUTO_INDEX,
  DEFAULT_START_INDEX,
  DEFAULT_INDEX_PAD_ZERO,
  DEFAULT_INDEX_LENGTH,
  DEFAULT_INDEX_PREFIX,
  DEFAULT_INDEX_SUFFIX,
  DEFAULT_DELIMITER,
  DEFAULT_FORCE,
  DEFAULT_EXTNAME,
  DEFAULT_FILTER,
  DEFAULT_SORT_BY,
  DEFAULT_ORDER,
  DEFAULT_SENSITIVITY,
  DEFAULT_FORMAT,
  DEFAULT_CACHE,

  CONFIG_FILE_NAME,
  CONFIG_FILE_PATH,
  CONFIG_FILE_PATH_URL,

  CACHE_FILE_NAME,
  CACHE_FILE_PATH,

  PACKAGE_JSON,

  README_PATH,
  API_PAGE_PATH,

  NAMESPACE_OID,
};

export default CONSTANTS;
