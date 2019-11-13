### js-feature-test
  测试浏览器对js新语法的支持。

### 文件说明
  - dist：输出目录
    - dist/featureTestHtml.js：给node提供的html代码，用来返回给浏览器运行feature测试
    - index.js：给浏览器代码调用的feature测试代码
    - runFeatureTest.ts：在浏览器自动运行feature测试代码，可以用来参考接口的使用
  - src：源代码
    - index.ts：暴露api来启动运行所有validator
    - tools.ts
    - runFeatureTest.ts：暴露给浏览器运行的默认feature测试代码（调用index.ts的api），并将结果使用post方式发送给当前页面的服务器
    - validators：各个feature validator
  - main.js 打包文件
  - service.js 运行开发服务

### 使用说明
express运行feature-test
```javascript
const html = require('./dist/featureTestHtml.js)

//...

app.get('featureTest.html', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.send(html)
})

//...
```

前端代码快速运行feature-test
```javascript
import './dist/runTeatureTest.js' //自动运行
```

前端代码自己调用feature-test
```javascript
import { featureTest } from './dist/index.js'
//...

featureTest(content, { isOutput: false }, validators, (testResult) => {
  save(testResult)
})

//...
```
