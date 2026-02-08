<a name="getExtension"></a>

### getExtension(filename) ⇒ <code>string</code>

getExtension() 方法用来获取文件名中的扩展名部分字符串（含.）。

**Kind**: global function **Returns**:
<code>string</code> - - 返回文件名中扩展名部分的字符串，例如：'.jpg'

| Param    | Type                | Description          |
| -------- | ------------------- | -------------------- |
| filename | <code>string</code> | 文件名（路径）字符串 |

#### Usage

```js
import getExtension from '@yaohaixiao/renames.js/lib/utils/get-extension.js';

const filename = '1-E01-1 (1).mp4';
const extname = getExtension(filename);

console.log(extname); // -> '.mp4'
```
