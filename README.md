# 番茄闹钟
项目代码见 todo 分支
## 项目介绍
基于 React 实现番茄闹钟，实现登陆、注册、番茄闹钟模块、todoList、完成番茄、任务历史图表统计，任务历史、番茄历史等模块。
## [项目预览](https://sethlee23.github.io/tomato-app/)
### 登陆页面
![signin.png](https://i.loli.net/2019/08/12/ZmE6o7bA5RJk9Lv.png)

### 注册页面
![signup.png](https://i.loli.net/2019/08/12/c1JyoBgR4xa7vWr.png)

## 导航条
![header.png](https://i.loli.net/2019/08/12/5RikXjqDhZrwPvU.png)

### 番茄模块
![tomato.png](https://i.loli.net/2019/08/12/14gxo5G2HAqCREj.png)

### 任务列表
![task.png](https://i.loli.net/2019/08/12/ApdUECvSz1gsx64.png)

### 统计模块
![statistics.png](https://i.loli.net/2019/08/12/8QDdrJgZ5SUcFuq.png)

### 任务历史
![todohistory.png](https://i.loli.net/2019/08/12/GV9IYOKyhfgLrmn.png)

### 番茄历史
![tomatohistory.png](https://i.loli.net/2019/08/12/RdiEcpoIBbsFYOf.png)

### 页面总览
![homepage.png](https://i.loli.net/2019/08/12/GV7qLUzOkaEJY2S.png)

## 使用技术
| 技术                                                                              | 说明                                                 |
|-----------------------------------------------------------------------------------|------------------------------------------------------|
| [react](https://zh-hans.reactjs.org/)                                             | 用于构建用户界面的 JavaScript 库                     |
| [redux](https://redux.js.org/)                                                    | Redux 是 JavaScript 状态容器，提供可预测化的状态管理 |
| [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) | 提供了导航功能的组件                                 |
| [react-redux](https://cn.redux.js.org/docs/react-redux/)                          | 结合 react 与 redux                                  |
| [classnames](https://www.npmjs.com/package/classnames)                            | react css 类名解决方法                               |
| [history](https://www.npmjs.com/package/history)                                  | JavaScript 库，管理 history                          |
| [typescript](https://www.tslang.cn/)                                              | JavaScript 超集                                      |
| [antd](https://ant.design/index-cn)                                               | 基于 react 的 UI 框架                                |
| [axios](https://github.com/axios/axios)                                           | 基于 Promise 的 http 库                              |
| [date-fns](https://date-fns.org/)                                                 | 格式化日期的 JavaScript 工具库                       |
| [lodash](https://www.lodashjs.com/)                                               | JavaScript 实用工具库                                |
| [gh-pages](https://www.npmjs.com/package/gh-pages)                                | 发布文件到 github 的 gh-page 分支                    |

## 组织结构
## 项目实现功能
* 登陆
* 注册，验证用户输入信息是否合法
* 注销当前用户
* 点击按钮开始番茄闹钟
* 番茄闹钟倒计时 25 分钟，网页 title 实时显示倒计时时间
* 计时期间取消番茄闹钟
* 番茄闹钟倒计时结束显示 input 框，用于输入完成番茄，可取消
* 展示近期完成番茄，根据日期展示，可折叠
* 展示 todo 列表，实现任务的增删改功能
* 柱形图展示一周任务统计、折线图展示番茄历史、任务历史
* 点击番茄历史、任务历史统计图表切换历史列表
* 展示已完成任务和已删除任务的任务列表
* 展示已完成番茄和打断记录列表
* 分页展示历史列表
* 在番茄记录中新增番茄记录，并展示补打记录

## TODO
* 统计历史模块
* 番茄时间偏好设置
* 展示指定条数任务及番茄
