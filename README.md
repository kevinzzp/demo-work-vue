## Client端，Node构建
运行 npm run start 本地调试，端口：9001  
运行 npm run build 线上构建

#### 工程目录
build ---- webpack配置文件  
dist ----- 项目打包目录  
src ---- 源代码  
src说明：  
-- common --> 公共配置
---- index.js -->常用工具类
-- pages --> 页面文件
---- 按功能节点建立目录
-- router --> 路由配置   
-- services --> 远程接口服务
---- 按功能节点建立目录
#### 公共引入  
lodash.js -- 数组对象处理库
moment.js -- 时间处理库