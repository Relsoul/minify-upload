# 说明
轻量，简约基于koa+nodejs的文件上传服务器。chrome插件github地址:[戳我查看](https://github.com/Relsoul/minify-upload-chrome-extension)
>最近写markdown没办法快捷的上传图片和文件，又不想额外打开窗口去上传文件。于是做了一个比较简约的文件上传服务器。

# 安装

```
npm install
```

# 配置
打开conf/conf.js
其中host为自己的域名，user为一个数组，可以自定义添加额外的用户。

# 运行
```shell
node app.js
```
推荐使用pm2来管理运行。

# todoList
[ ] 文件大小等后端校验与过滤

[ x ] 静态文件服务器支持index目录查看

[ ] 更加完善的server，如错误捕捉等

[ ] 文件的更新/删除

[ x ] 基于文件目录化的用户文件保存与查看

[ ] todo....

# changelog

### v0.2 2018年11月20日19:42:15

[ x ] 基于文件目录化的用户文件保存与查看
[ x ] 文件大小等后端校验与过滤

### V0.1 2018年11月19日
[x] 支持user认证

[x] 文件上传与保存

[x] 静态服务器