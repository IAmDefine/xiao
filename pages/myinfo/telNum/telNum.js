var util = require('../../../utils/rand.js');
const app = getApp();
function countdown(that) {
  var code_time = that.data.code_time
  if (code_time == 0) {
    that.setData({
      code_time: "60",
      codeStatus: 'block',
      timeStatus:'none',
      codeBg: '#DC3B31',
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      code_time: code_time - 1,
      codeStatus: 'none',
      timeStatus: 'block',
      codeBg: '#DBDBDB',
      
    });
    countdown(that);
  }
    , 1000)
}
Page({
  data: {
    code_time: 60,//倒计时事件控制
    codeStatus:'block',
    timeStatus:'none',
    codeBg:'#DC3B31',
    phone_value:"",//填写的手机号
    code:"",//输入的code
    ra_num:"",//随机生成的验证码
    password:"",
    repassword:""
  },

  onLoad: function (options) {

  },

  //获取手机号
  phone:function(e){
    var old_value = e.detail.value;//获取用户输入的内容
    this.setData({
      phone_value: old_value//value值变为用户输入内容
    })
  },

  // 点击获取验证码事件
  codeClick: function () {
    var that = this;
    var phone = /^1[3|4|5|7|8][0-9]{9}$/;
    if (phone.test(that.data.phone_value)) {
    //先判断有没有这个手机号
      var url = '/inter/index/userdetail';
      var postData = { mobile: that.data.phone_value};
      function doSuccess(res){
        if(res.data.status==1){

          wx.showModal({
            title: '手机号已存在！',
            content: '是否绑定？',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/myinfo/bindNum/binidNum',
                })
              }
            }
          })
          return;
          // wx.showToast({
          //   title: '手机已存在',
          //   icon: 'success',
          //   duration: 2000
          // })
        }else{
          // 手机号码格式正确执行倒计时等事件
          countdown(that);
          //调用短信接口
          var url = "/aliyun/regcode.php";
          var ra_num = util.addNumber(4)
          that.setData({
            ra_num: ra_num
          })
          var postData = { mobile: that.data.phone_value, authcode: ra_num }
          app.yxkRequest(url, postData)
        }
      }
      app.yxkRequest(url, postData, doSuccess);
    } else {
      //  手机号码格式不正确弹出modal框
      wx.showToast({
        title: '手机号格式错误',
        icon: 'success',
        duration: 2000
      })
    }
  },

  //获取手机号
  code: function (e) {
    var code = e.detail.value;//获取用户输入的内容
    this.setData({
      code: code//value值变为用户输入内容
    })
  },

  //获取密码
  password:function(e){
    var password = e.detail.value;//获取用户输入的内容
    this.setData({
      password: password//value值变为用户输入内容
    })
  },

  //再次输入密码
  aginpass:function(e){
    var repassword = e.detail.value;//获取用户输入的内容
    this.setData({
      repassword: repassword//value值变为用户输入内容
    })
  },


// 点击提交按钮事件
  register: function () {
    var that = this;
    if (this.data.password==''){
      wx.showToast({
        title: '请输入密码',
        icon: 'success',
        image:"/images/type.png",
        duration: 1500
      })
      return false;
    }
    if (this.data.password != this.data.repassword) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'success',
        image: "/images/type.png",
        duration: 2000
      })
      return false;
    }
    var ph = /^1[3|4|5|7|8][0-9]{9}$/; //验证手机
    if (this.data.code != this.data.ra_num){
      wx.showToast({
        title: '验证码错误',
        icon: 'success',
        image: "/images/type.png",
        duration: 2000
      })
      return false;
    }

      var url = "/inter/index/register";
      var mobile = this.data.phone_value;
      var pass = this.data.password;
      var code = this.data.code;
      var wxid = wx.getStorageSync('unionid');
      var postData = { mobile: mobile, pass: pass, wxid: wxid, usertype: '1'}
      var wxinfo = wx.getStorageSync('wxinfo');
      if(wxinfo){
        postData.wx_headportr = wxinfo.photo;
        postData.wx_nickname = wxinfo.nickname;
      }
      function doSuccess(res) {
        var info = res.data;
        if (info.status == 1) {
          var id = res.data.data.id
          if (wxinfo){
            var myinfo = { "wx_headportr": wxinfo.photo, "wx_nickname": wxinfo.nickname, "mobile": mobile, id: id }
          }else{
            var myinfo = { "wx_headportr": "", "wx_nickname": "", "mobile": mobile, id: id }
          }
        wx.setStorage({
          key: "myinfo",
          data: myinfo
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500,
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
        } else {
          wx.showModal({
            title: '提示',
            content: info.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }
      //调用注册方法接口  
      app.yxkRequest(url, postData, doSuccess)
    } 
})