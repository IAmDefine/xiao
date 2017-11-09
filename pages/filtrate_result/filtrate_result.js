var app = getApp();
Page({
  data: {
    sinfo:"",
    page:'1',
    allpage:""//总页
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var postData = wx.getStorageSync('filtrate');
        function pdata(res){
      // console.log(res.data);
      if (res.data.result.items){
        var sinfo = res.data.result.items;
        that.setData({
          sinfo:sinfo
        })
      }else{
        // console.log('空');
      }
    }
    var url = '/search/index.php';
    app.yxkRequest(url,postData,pdata)

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var postData = wx.getStorageSync('filtrate');
    var page = this.data.page;
    page = page*1+1
    var postData = wx.getStorageSync('filtrate');
    postData.page = page;
    function pdata(res) {
      if (res.data.result.items) {
        var info = res.data.result.items;
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 500
        })
        var main_con = that.data.sinfo
        var a = main_con.concat(info)
        that.setData({
          sinfo: a,
          page:page
        })
      }
    }
    var url = '/search/index.php';
    app.yxkRequest(url, postData, pdata)
  },
  //跳转详情页面
  jump_detail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
})