<a name="padZero"></a>

### padZero(val, [length]) ⇒ <code>string</code>

padZero() 方法用来处理对数字/字符串补零，前置补‘0’，确保返回指定长度的字符串。

**Kind**: global function **Returns**:
<code>string</code> - - 返回补零后的字符串

| Param    | Type                                       | Default        | Description                                                  |
| -------- | ------------------------------------------ | -------------- | ------------------------------------------------------------ |
| val      | <code>number</code> \| <code>string</code> |                | 要补零的数字或字符串（如 27、'27'）                          |
| [length] | <code>number</code>                        | <code>2</code> | 可选，目标总长度（如 3 → '027'，4 → '0027'）. Default is `2` |

#### Usage

```js
import getBasename from '@yaohaixiao/renames.js/lib/utils/get-basename.js';
import getExtension from '@yaohaixiao/renames.js/lib/utils/get-extension.js';
import padZero from '@yaohaixiao/renames.js/lib/utils/pad-zero.js';

const filename = '1.mp4';
const finalFileName = `${padZero(getBasename(filename), 3)}${getExtension(filename)}`;

console.log(finalFileName); // -> '001.mp4'
```
