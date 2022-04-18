参考文档： https://reactjs.org/docs/code-splitting.html

### React的坑：
不论有没有用到React对象，代码中总是要引入
```
import React from 'react'
```
事实上jsx代码只是React.createElement调用的语法糖，所以这行引用是编写、渲染react组件必须的。

编译jsx:
```
import React from 'react';
const comp = () => (
    <div>something...</div>
);
//...

// 编译 JSX 后：

import React from 'react';
const comp = () => (
    React. createElement('div', null, 'something...' )
);
//...
```

若写成
```
import react from 'react'
```
**则babel无法识别**。


