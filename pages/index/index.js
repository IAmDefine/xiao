const app = getApp()
Page({
  data: {
    page:"1",
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
      var url = '/inter/Applet/getindex';
      var postData = { page: 1, showrow:'2'}
      function dosa(res) {
        if (res.data.status == 1) {
          var info = res.data.data.data
         that.setData({
           starinfo: info, 
           allpage: res.data.data.totalpage
          });
        }
      }
     app.yxkRequest(url, postData,dosa);
  },

  search_link:function(e){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  //筛选按钮
  filter: function () {
    wx.navigateTo({
      url: '/pages/filter/filter'
    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    var that = this;
    var page = this.data.page
    page = page*1 +1;
    if (page > that.data.allpage){
      return;
    }
    var url = '/inter/Applet/getindex';
    var postData = { page: page, showrow:'2' }
    function pdata(res) {
      if (res.data.status==1) {
        var info = res.data.data.data;
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 500
        })
        var main_con = that.data.starinfo
        var a = main_con.concat(info)
        that.setData({
          starinfo: a,
          page:page
        })
      }
    }
    app.yxkRequest(url, postData, pdata)
  },

  //跳转详情
  detail:function(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  }
})
