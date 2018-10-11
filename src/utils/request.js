// import * as Fly from 'flyio'
import wx from './wx'

const Fly = require('flyio/dist/npm/wx')

const request = new Fly()

request.config.timeout = 10 * 1000
if (process.env.METHOD === 'proxy1') {
  request.config.baseURL = 'http://localhost:3001/douban' // 本地代理1(100次/小时)
} else if (process.env.METHOD === 'proxy2') {
  request.config.baseURL = 'http://localhost:3002' // 本地代理2(100次/小时)
} else if (process.env.METHOD === 'nginx') {
  request.config.baseURL = 'https://movie.douban.gusaifei.com/v2/movie' // nginx 代理(100次/小时)
}

request.interceptors.request.use(req => {
  wx.showLoading({ title: '拼命加载中...' })
  return req
})

request.interceptors.response.use(
  (res, promise) => {
    wx.hideLoading()
    return promise.resolve(res.data)
  },
  (err, promise) => {
    wx.hideLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
