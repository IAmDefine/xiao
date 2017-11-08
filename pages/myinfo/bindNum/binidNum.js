const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    passwd: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获取手机号
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  //获取密码
  pwd: function (e) {
    this.setData({
      passwd: e.detail.value,
    })
  },

  register: function (e) {
    var that = this;
    var phone = that.data.phone;
    var passwd = that.data.passwd;
    var url = '/inter/index/login';
    var postData = { mobile: phone, pass: passwd };
    function doSuccess(res) {
      if (res.data.status == 1) {
        var id = res.data.data.id
        var url = '/inter/index/useredit';
        var wxid = wx.getStorageSync('unionid');
        var postData1 = { uid: id, wxid: wxid };
        var wxinfo = wx.getStorageSync('wxinfo');
        if (wxinfo) {
          postData1.wx_headportr = wxinfo.photo;
          postData1.wx_nickname = wxinfo.nickname;
        }

        function editwx(res) {
          if (res.data.status == 1) {
            if (wxinfo) {
              var myinfo = { "wx_headportr": wxinfo.photo, "wx_nickname": wxinfo.nickname, "mobile": phone, id: id }
            } else {
              var myinfo = { "wx_headportr": "", "wx_nickname": "", "mobile": phone, id: id }
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
          }
        }

         app.yxkRequest(url, postData1, editwx);
      } else {
        wx.showToast({
          title: '信息有误',
          icon: 'success',
          image: "/images/type.png",
          duration: 1500,
        })
      }
    }
    app.yxkRequest(url, postData, doSuccess);
  }

})