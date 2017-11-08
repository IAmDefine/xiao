const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:""
  },
  //获取昵称
  nickname:function(e){
    var value = e.detail.value;//获取用户输入的内容
    this.setData({
      nickname: value//value值变为用户输入内容
    })
  },
  
  //提交
  up:function(){
    var that = this;
    var url = '/inter/index/useredit';
    var myinfo = wx.getStorageSync('myinfo');
    var nickname = that.data.nickname;
    if (nickname==''){
      wx.showToast({
        title: '请输入昵称',
        icon: 'success',
        duration: 1500,
      })
      return;
    }
    var postData = { uid: myinfo.id, wx_nickname:nickname}
    function doSuccess(res){
      if(res.data.status==1){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
        })
        setTimeout(function () {
             wx.navigateBack({
              delta: 1
            })
        }, 2000)
       
      }
    }

    app.yxkRequest(url, postData, doSuccess);
  },

  //删除文字
  del:function(){
    this.setData({
      nickname:""
    })
  }
})

