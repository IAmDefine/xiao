const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //从缓存获取个人信息查询是否绑定过账号
    var that = this;
    var myinfo = wx.getStorageSync('myinfo');
    if (myinfo) {
      var mobile = myinfo.mobile.substring(0, 3) + "****" + myinfo.mobile.substring(7, 11)
      that.setData({
        mobile: mobile
      })
    }
  },

  phone:function(e){
    var mobile = this.data.mobile
    if(!mobile){
      wx.navigateTo({
        url: '/pages/myinfo/telNum/telNum'
      })
    }
  },

  //拨打电话
  tel:function(){
    wx.makePhoneCall({
      phoneNumber: '010-85952988' 
    })
  },

  //关于我们
  we:function(){
    wx.navigateTo({
      url: '/pages/myinfo/infoSet/aboutUs/aboutUs',
    })
  }

})