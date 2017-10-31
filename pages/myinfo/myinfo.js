const app = getApp()
Page({

  data: {
    myinfo:''
  },

  onLoad: function (options) {
    var value = wx.getStorageSync('wxinfo');
    this.setData({
      myinfo: value,
    })
  },

})