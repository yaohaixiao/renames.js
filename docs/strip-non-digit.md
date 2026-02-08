<a name="stripNonDigit"></a>

### stripNonDigit(str) ⇒ <code>string</code>

stripNonDigit(str) 方法用来移除文本中所有非数值的文本，返回移除纯数值的字符串。

**Kind**: global function **Returns**:
<code>string</code> - - 返回移除非数值的字符串

| Param | Type                | Description        |
| ----- | ------------------- | ------------------ |
| str   | <code>string</code> | 文件名的文本字符串 |

#### Usage

```js
import getBasename from '@yaohaixiao/renames.js/lib/utils/get-basename.js';
import getExtension from '@yaohaixiao/renames.js/lib/utils/get-extension.js';
import stripNonDigit from '@yaohaixiao/renames.js/lib/utils/strip-non-digit.js';

const filename = '第01集：初战';
const basename = getBasename(filename);
const extname = getExtension(filename);

console.log(`${stripNonDigit(basename)}${extname}`); // -> '01.mp4'
```
