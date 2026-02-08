<a name="getBasename"></a>

## getBasename(filename) ⇒ <code>string</code>

getBasename() 方法用来获取文件名中不含扩展名的字符串

**Kind**: global function **Returns**:
<code>string</code> - - 返回文件名中去掉扩展名部分的字符串

| Param    | Type                | Description          |
| -------- | ------------------- | -------------------- |
| filename | <code>string</code> | 文件名（路径）字符串 |

#### Usage

```js
import getBasename from '@yaohaixiao/renames.js/lib/utils/get-basename.js';

const filename = '1-E01-1 (1).mp4';
const basename = getBasename(filename);

console.log(basename); // -> '1-E01-1 (1)'
```
