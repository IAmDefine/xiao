const app = getApp()
Page({

  data: {
    nickname:"",
    photo:"",
    msgnum:""//未读消息数量
  },

  onLoad: function (options) {


  },

  onShow:function(){
    var that = this;
    var value = wx.getStorageSync('wxinfo');
    //查询个人信息
    var myinfo = wx.getStorageSync('myinfo');
    if (myinfo) {
      var url = '/inter/index/userdetail';
      var postData = { mobile: myinfo.mobile }
      function doSuccess(res) {
        if (res.data.status == 1) {
          var info = res.data.data[0];
          //如果有头像和昵称就用设置的
          if (info.wx_headportr) {
            that.setData({
              photo: info.wx_headportr
            })
          }else{
            if (value) {
              this.setData({
                photo: value.photo
              })
            }
          }
          if (info.wx_nickname) {
            that.setData({
              nickname: info.wx_nickname
            })
          }else{
            if (value) {
              this.setData({
                nickname: value.nickname,
              })
            }
          }
        }else{
          if (value) {
            this.setData({
              nickname: value.nickname,
              photo: value.photo
            })
          }
        }
      }
      app.yxkRequest(url, postData, doSuccess);
      //程序走这里说明用户已经绑定过账号了，调用查询消息
      var url = '/inter/infomation/lookmsgs';
      var postData = { recuid: myinfo.id, showrow: '10000', ifdel: "1" }
      function msginfo(res){
        if(res.data.status==1){
          var msgnum = 0
          var msg = res.data.data.data;
          for(let i in msg){
            if(msg[i].ifread=='1'){
              msgnum++;
            }
          }
        }
        that.setData({
          msgnum:msgnum
        })
      }

      app.yxkRequest(url, postData, msginfo);

    }else{
      var value = wx.getStorageSync('wxinfo');
      if (value) {
        this.setData({
          nickname: value.nickname,
          photo: value.photo
        })
      }
    }

   

  },

  //跳转个人中心
  jump_infoCenter:function(e){
    wx.navigateTo({
      url: '/pages/myinfo/infoCenter/infoCenter'
    })
  },

  //跳转收藏
  jump_Collect:function(){
    wx.navigateTo({
      url: '/pages/myinfo/myCollect/myCollect'
    })
  },

  jump_news:function(){
    wx.navigateTo({
      url: '/pages/myinfo/myNews/myNews'
    })
  },
  //跳转设置
  jump_set:function(){
    wx.navigateTo({
      url: '/pages/myinfo/infoSet/infoSet'
    })
  }

})