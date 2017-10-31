const app = getApp()
Page({
  data: {
    userInfo: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    starinfo:''
  },

  onLoad: function () {
    var that = this;
    var value = wx.getStorageSync('wxinfo');
      this.setData({
        userInfo: value,
      })
      var url = '/inter/caches/indexget';
      var postData = { types: 2}
      function dosa(res) {
        if (res.data.status == 1) {
          var info = res.data.data
         that.setData({
            starinfo: info['3']
          });
        }
      }
     app.yxkRequest(url, postData,dosa);
     

  },

  search_link:function(e){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  }

})
