# taro-douban

> 基于 taro 实现豆瓣电影微信小程序

其他实现：

[基于 mpvue 实现豆瓣电影微信小程序](https://github.com/mini-mpvue/mpvue-douban)

## 运行

```bash
npm run dev:weapp
```

## 目录结构

```bash
|__ douban                                    # 本地代理
    |__ app.js                                  # 方式 1
    |__ proxy.js                                # 方式 2
|__ src
    |__ assets                                    # 静态资源
      |__ images                                  # 图片
        |__ *.{png,jpg,gif,jpeg}
    |__ components                            # 组件
      |__ movie-item                        # 电影列表项
        |__ index.js
        |__ index.scss
      |__ movie-list                        # 电影列表
        |__ index.js
        |__ index.scss
    |__ app.js
    |__ pages
      |__ board                               # 榜单
        |__ index.js
        |__ index.scss
      |__ item                                # 电影详情
        |__ index.js
        |__ index.scss
      |__ list                                # 电影列表
        |__ index.js
        |__ index.scss
      |__ profile                             # 关于我
        |__ index.js
        |__ index.scss
      |__ search                              # 电影搜索
        |__ index.js
        |__ index.scss
      |__ splash                              # 启动页面
        |__ index.js
        |__ index.scss
    |__ store                                 # redux
      |__ index.js
    |__ utils                                 # 工具
      |__ api.js                                # 豆瓣 api
      |__ index.js                              # 工具方法
      |__ request.js                            # flyio 配置
      |__ wechat.js                             # 微信小程序 api
      |__ wx.js                                 # wx
```