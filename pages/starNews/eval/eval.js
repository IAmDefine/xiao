const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//星迅id
    msg_detail:"",//评价详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var id = e.id;
    this.setData({
      id:id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  //获取输入信息
  b_input:function(e){
    this.setData({
      msg_detail: e.detail.value
    })
  },
  //提交评价
  up:function(){
    var that = this;
    var snid = that.data.id;
    var evelcon = that.data.msg_detail;//留言内容
    var evelcon = escape(evelcon);//加密评论信息，为了防止输入表情无法存储
    if (!evelcon){
      wx.showToast({
        title: '请输入内容！',
        icon: 'success',
        image:"/images/type.png",
        duration: 2000
      })
      return;
    }
    var uid = wx.getStorageSync('myinfo').id;
    var url = '/inter/starsnews/addleaveinfo';
    var postData = { snid: snid, evelcon: evelcon, uid: uid, eval_source: '2', state:'2'};
    function doSuccess(res){
      if(res.data.status==1){
        wx.showToast({
          title: '已提交审核',
          icon: 'success',
          duration: 1500
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    }
    app.yxkRequest(url, postData, doSuccess);
  }



})