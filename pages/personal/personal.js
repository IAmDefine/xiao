Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var value = wx.getStorageSync('wxinfo');
    this.setData({
      userInfo: value,
    })
  },
})