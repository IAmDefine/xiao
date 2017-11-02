const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collectSrc:'/images/starNewsDetail4Unchecked.png',
    collectSrcFlag:1,
    thumbsSrc:'/images/starNewsDetail3Unchecked.png',
    thumbsClickFlag:1,
  },
  // 点赞
  thumbsClick:function(){
    if (this.data.thumbsClickFlag) {
      this.setData({
        thumbsSrc: '/images/starNewsDetail3Checked.png',
        thumbsClickFlag: 0,
      })
    } else {
      this.setData({
        thumbsSrc: '/images/starNewsDetail3Unchecked.png',
        thumbsClickFlag: 1,
      })
    }
  },
  // 收藏
  collectClick:function(){
    if (this.data.collectSrcFlag){
      this.setData({
        collectSrc: '/images/starNewsDetail4Checked.png',
        collectSrcFlag: 0,
      })
    }else{
      this.setData({
        collectSrc: '/images/starNewsDetail4Unchecked.png',
        collectSrcFlag: 1,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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