const app = getApp()
Page({
  data: {
    page:"2",
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
      var url = '/inter/star/getprogramindex';
      var postData = { page: 1, showrow:'2'}
      function dosa(res) {
      // console.log(res.data.data)
        if (res.data.status == 1) {
          var info = res.data.data.data
          // console.log(info)
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
    var page = this.data.page++
    if (page > that.data.allpage*1+1){
      return;
    }
    var url = '/inter/star/getprogramindex';
    var postData = { page: page, showrow:'2' }
    function pdata(res) {
      if (res.data.status==1) {
        var info = res.data.data.data;
        console.log(info)
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 500
        })
        var main_con = that.data.starinfo
        var a = main_con.concat(info)
        that.setData({
          starinfo: a
        })
      } else {
        // console.log('空');
      }
    }
    app.yxkRequest(url, postData, pdata)
  },
})
