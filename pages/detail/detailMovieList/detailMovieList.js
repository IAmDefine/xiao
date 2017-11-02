const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worklist:"",
    page:"2",
    allpage:"",
    title:"",
    info:"",//带过来的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    that.setData({info:e})
    var types = e.types;
    if(types==1){
      that.setData({title:'电影'})
    }else if(types==2){
      that.setData({ title: '电视剧' })
    }
    var sid = e.sid;
    var url = '/inter/star/workslist';
    var postData = {sid:sid,types:types,showrow:"6"}
    function doSuccess(res){
      if(res.data.status==1){
        var info = res.data.data.data;
        that.setData({
          worklist:info,
          allpage: res.data.data.totalpage
        })
      }
    }

    app.yxkRequest(url, postData, doSuccess);

  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    console.log(2222);
    var that = this;
    var page = this.data.page++
    if (page > that.data.allpage * 1 + 1) {
      return;
    }
    var info = that.data.info
    var url = '/inter/star/workslist';
    var postData = { page: page, showrow: '6', sid: info.sid, types: info.types }
    // var postData = { page: page, showrow: '6',sid:278,types:info.types }
    function pdata(res) {
      console.log(res)
      if (res.data.status == 1) {
        var info = res.data.data.data;
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 500
        })
        var main_con = that.data.worklist
        var a = main_con.concat(info)
        that.setData({
          worklist: a
        })
      }
    }
    app.yxkRequest(url, postData, pdata)
  },
})