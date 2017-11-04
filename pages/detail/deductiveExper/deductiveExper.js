const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:"",//所有作品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    var url = '/inter/star/workslist';
    var thistime = app.timetransform(Date.parse(new Date()) / 1000)
    var postData = { types: "1,2", sid: e.sid, futuretime:thistime}
    function doSuccess(res){
      if(res.data.status==1){
        var info = res.data.data.data;
        that.setData({
          info:info
        })
      }
    }
    app.yxkRequest(url, postData, doSuccess);


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})