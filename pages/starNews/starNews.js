const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:"",
    allpage:"",//总页数
    page:"1",//当前页数
  },

  onLoad: function (options) {
    var that = this;
    var url = "/inter/starsnews/lists";
    var postData = {page:1,showrow:'5'};
    function doSuccess(res){
      if(res.data.status==1){
        var info = res.data.data.data;
        for(let i in info){
          info[i].instime = app.timetransform(info[i].instime);
          info[i].starnews_con = info[i].starnews_con.slice(0,30)
        }
        that.setData({
          info:info,
          allpage: res.data.data.totalPage
        })
      }
    }
    app.yxkRequest(url, postData, doSuccess);
  },

 //跳转详情
  jump:function(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url:"/pages/starNews/starNewsDetail/starNewsDetail?id="+id,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
* 页面上拉触底事件的处理函数
*/
  onReachBottom: function () {
    var that = this;
    var page = this.data.page
    page = page * 1 + 1;
    if (page > that.data.allpage) {
      return;
    }
    var url = '/inter/starsnews/lists';
    var postData = { page: page, showrow: '5' }
    function pdata(res) {
      if (res.data.status == 1) {
        var info = res.data.data.data;
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 500
        })
        for (let i in info) {
          info[i].instime = app.timetransform(info[i].instime);
          info[i].starnews_con = info[i].starnews_con.slice(0, 30)
        }
        var main_con = that.data.info
        var a = main_con.concat(info)
        that.setData({
          info: a,
          page: page
        })
      }
    }
    app.yxkRequest(url, postData, pdata)
  },

  onPullDownRefresh:function(e){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    this.onLoad()
    wx.stopPullDownRefresh()
  },
  //点击我要找艺人
  needs:function(e){
    var that = this;
    var myinfo = wx.getStorageSync('myinfo');
    if (!myinfo) {
      wx.showModal({
        title: '绑定手机才可以发布！',
        content: '是否绑定？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/myinfo/telNum/telNum',
            })
          }
        }
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/starNews/leaveMes/leaveMes',
    })
  }
})