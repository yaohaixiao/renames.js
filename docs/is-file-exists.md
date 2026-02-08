<a name="isFileExists"></a>

### isFileExists(filePath, [basePath]) ⇒ <code>boolean</code>

isFileExists() 方法用来同步检测文件是否存在，如果存在，返回 true，否则返回 false。

**Kind**: global function **Returns**:
<code>boolean</code> - - 文件存在返回 true，否则返回 false

| Param      | Type                | Default                               | Description                       |
| ---------- | ------------------- | ------------------------------------- | --------------------------------- |
| filePath   | <code>string</code> |                                       | 检测的文件路径                    |
| [basePath] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | 可选，基础路径。. Default is `''` |

#### Usage

```js
import isFileExists from '@yaohaixiao/renames.js/lib/utils/is-file-exists.js';

const filename = '1-E01-1 (1).mp4';
const basePath = 'C:\Users\haixi\Downloads\达尔文游戏';

// console.log(isFileExists('C:\Users\haixi\Downloads\达尔文游戏\1-E01-1 (1).mp4'))
console.log(isFileExists(filename, basePath)); // -> true
```
