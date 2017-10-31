var md5 = require('./utils/md5.js');
App({
  https: "https://api.youxingku.cn",
  onLaunch: function () {
    // wx.authorize({
    //   scope: 'scope.userInfo',
    //   success() {

    //   }
    // })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx2cfc3a917dbe5697&secret=8710ead45bfce4ed619a01d74bb00c71&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var openid = res.data['openid']
            wx.setStorage({
              key: "openid",
              data: openid
            })
          },
          complete: function () {
           
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
               var wxinfo = { nickname: res['userInfo'].nickName, photo: res['userInfo'].avatarUrl }
              wx.setStorage({
                key: "wxinfo",
                data: wxinfo
              })
            }
          })
        
      }
    })
  },

  /**
 * 封装yxkRequest的post提交请求方式，通过回调函数处理相关数据传递
 * @url:请求地址
 * @postData：请求参数
 * @doSuccess：请求成功回调函数
 * @doFail：请求失败回调函数
 * @doComlete：请求时执行函数
 */
  yxkRequest: function (url, postData, doSuccess, doFail, doComplete) {
    var timestr = Date.parse(new Date()) / 1000;//当前时间戳
    var token = url + timestr + "qianfeng2017";
    var md5str = md5.hexMD5(token);
    postData['timestr'] = timestr; 
    postData['md5str'] = md5str; 
    wx.request({
      url: this.https + url,
      data: postData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (typeof doSuccess == "function") {
          doSuccess(res);
        }
      },
      fail: function () {
        if (typeof doFail == "function") {
          doFail();
        }
      },
      complete: function () {
        if (typeof doComplete == "function") {
          doComplete();
        }
      }
    })
  },



})