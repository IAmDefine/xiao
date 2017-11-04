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

    info:"",//内容
    id:""
  },
  // 点赞
  thumbsClick:function(){
    var that = this;
    if (this.data.thumbsClickFlag==0){
      return;
    }
    var url = '/inter/starsnews/addgive';
    var wxopenid = wx.getStorageSync('unionid');
    var postData = { snid: this.data.id, wxopenid: wxopenid};
    function doSuccess(res){
      if(res.data.status==1){
        var oldinfo = that.data.info;
        var num = oldinfo.zannum*1+1;
        oldinfo.zannum = num;
      that.setData({
        thumbsSrc: '/images/starNewsDetail3Checked.png',
        thumbsClickFlag: 0,
        info: oldinfo
      })
      }
    }
    
    app.yxkRequest(url, postData, doSuccess);
    // if (this.data.thumbsClickFlag) {
    //   this.setData({
    //     thumbsSrc: '/images/starNewsDetail3Checked.png',
    //     thumbsClickFlag: 0,
    //   })
    // } else {
    //   this.setData({
    //     thumbsSrc: '/images/starNewsDetail3Unchecked.png',
    //     thumbsClickFlag: 1,
    //   })
    // }
  },
  // 收藏
  collectClick:function(){
    var myinfo = wx.getStorageSync('myinfo');
    if (!myinfo) {
      return;
    }
    if (this.data.collectSrcFlag){
      this.setData({
        collectSrc: '/images/starNewsDetail4Checked.png',
        collectSrcFlag: 0,
      })
      //加入收藏
      var id = this.data.id
      this.addcollect(id);

    }else{
      this.setData({
        collectSrc: '/images/starNewsDetail4Unchecked.png',
        collectSrcFlag: 1,
      })
      var id = this.data.id;
      this.delcollect(id);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    //查看是否收藏
    this.lookcollect(e.id);
    var that = this;
    var url = '/inter/starsnews/details';
    var postData = {id:e.id}
    that.setData({id:e.id})
    function doSuccess(res){
      if(res.data.status==1){
        var info = res.data.data;
        info.instime = app.timetransform(info.instime);    
        that.setData({
          info:info
        })
      }
    }
    app.yxkRequest(url, postData, doSuccess);
    //查询是否点过赞
    var url = '/inter/starsnews/lookgive';
    var pd = { snid: e.id, wxopenid: wx.getStorageSync('unionid')}
    function dos(res){
      console.log(res)
      if(res.data.status==1){
        that.setData({
          thumbsSrc: '/images/starNewsDetail3Checked.png',
          thumbsClickFlag: 0,
        })
      }
    }
    app.yxkRequest(url, pd, dos);
    
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onShareAppMessage: function (res) {
    var that = this;
    return {
      success: function (res) {
        if(res.errMsg =="shareAppMessage:ok"){
          var url = '/inter/starsnews/details';
          var postData = { id: that.data.id }
          function doSuccess(res) {
            if (res.data.status == 1) {
              var info = res.data.data;
              var num = info.forwarnum*1+1;
             var oldinfo = that.data.info;
             oldinfo.forwarnum = num;
              that.setData({
                info: oldinfo
              })
              //修改状态+1
              var url = '/inter/starsnews/upds';
              var postData = { id: that.data.id, forwarnum:num}
              function dos(res){
                console.log(res.data);
              }
              app.yxkRequest(url, postData, dos);
            }
          }
          app.yxkRequest(url, postData, doSuccess);
        }
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //加入收藏函数
  addcollect: function (e) {
    var myinfo = wx.getStorageSync('myinfo');
    if (!myinfo) {
      return;
    }
    var that = this;
    var r = '';
    var url = '/inter/index/addcollect';
    var myinfo = wx.getStorageSync('myinfo');
    var postData = { uid: myinfo.id, pid: e, types: '5' }
    function doSuccess(res) {
      if (res.data.status == 1) {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1500
        })
      }
    }
    app.yxkRequest(url, postData, doSuccess);
  },

  //删除收藏
  delcollect: function (e) {
    var that = this;
    var myinfo = wx.getStorageSync('myinfo');
    if (myinfo) {
      var url = '/inter/index/delcollect';
      var postData = { uid: myinfo.id, pid: e }
      function doSuccess(res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1500
          })
        }
      }
      app.yxkRequest(url, postData, doSuccess);
    }
  },
  //查看是否收藏
  lookcollect: function (e) {
    var that = this;
    var myinfo = wx.getStorageSync('myinfo');
    if (myinfo) {
      var url = '/inter/index/collectlist';
      var postData = { types: '5', uid: myinfo.id, pid: e }
      function doSuccess(res) {
        if (res.data.status == 1) {
          that.setData({
            collectSrc: '/images/starNewsDetail4Checked.png',
            collectSrcFlag: 0,
          })
        }
      }
      app.yxkRequest(url, postData, doSuccess);
    }
  },
})