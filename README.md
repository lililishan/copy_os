# RMOS前端





* 调试开发 `npm run dev`
* 分支commit限制 `num run hook`
* 上线 `npm run build`
* 安装测试selenium ``
* eslint `npm run lint`
* 单测 `npm run test`
* e2e测试 `npm run e2e`


### 代码规范

见[code_style.md](./code_style.md)


### 目录规范

```
src代码目录

src下面的

* common组件库
    * conponents 组件 component和directive
    * service
    * filter
    * 
* homepage具体的业务库

```

### 文件规范

目录下的入口是index.js
* homepage.controller.js
* homepage.component.js
* honepage.service.js
* homepage.filter.js

测试的文件

* homepage.controller.spec.js 单测
* homepage.controller.e2e.js e2e测试