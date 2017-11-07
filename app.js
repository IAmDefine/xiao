var md5 = require('./utils/md5.js');
App({
  https: "http://demo.api.youxingku.cn",
  // https: "https://api.youxingku.cn",
  onLaunch: function () {
    var that = this;
    // wx.authorize({
    //   scope: 'scope.userInfo',
    //   success() {
    //   }
    // })
    // 登录
    // var appid = 'wx2cfc3a917dbe5697';
    // var AppSecret = '8710ead45bfce4ed619a01d74bb00c71';
    var appid = 'wx828e3c2633c686de';
    var AppSecret = '1ca86d3ef1411860161c5cc267860ab1';
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + AppSecret+'&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var unionid = res.data['openid'];
            wx.setStorage({
              key: "unionid",
              data: unionid
            })
          //用unionid查询有没有这个用户
            var url = '/inter/index/userdetail';
            var postData = { wxid: unionid};
            function doSuccess(res){
              if(res.data.status==1){
                var info = res.data.data[0];
                var myinfo = { wx_headportr: info.wx_headportr, wx_nickname: info.wx_nickname, mobile: info.mobile,id:info.id}
                wx.setStorage({
                  key: "myinfo",
                  data: myinfo
                })
              }
            }

            that.yxkRequest(url,postData,doSuccess);
          
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
  //格式化时间
  timetransform: function (timestamp) {
    var d = new Date(timestamp * 1000);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    if (month.toString().length == 1) {
      month = "0" + month
    }
    if (date.toString().length == 1) {
      date = "0" + date
    }
    return year + "-" + month + "-" + date;

  },

  timetrans: function (timestamp) {
    var d = new Date(timestamp * 1000);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    if (hour.toString().length == 1) {
      hour = "0" + hour
    }
    if (minute.toString().length == 1) {
      minute = "0" + minute
    }
    return year + "-" + month + "-" + date + "  " + hour + ":" + minute;

  }

})