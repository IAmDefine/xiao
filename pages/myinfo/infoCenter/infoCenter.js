const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo:"",
    nickname:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
        }
      }

      app.yxkRequest(url, postData, doSuccess);
    }else{
      if (value) {
        this.setData({
          nickname: value.nickname,
          photo: value.photo
        })
      }
    }
  },

  jump_editname:function(){
    var myinfo = wx.getStorageSync('myinfo');
    if(myinfo){
      wx.navigateTo({
        url: '/pages/myinfo/changeName/changeName'
      })
    }else{
      wx.redirectTo({
        url: '/pages/myinfo/telNum/telNum'
      })
    }

   
  },
  //修改头像
  edit_photo:function(e){
    var that = this;
    var myinfo = wx.getStorageSync('myinfo');
    if (!myinfo) {
      wx.redirectTo({
        url: '/pages/myinfo/telNum/telNum'
      })
      return;
    } 
    //上传头像
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var yuanimg = res.tempFilePaths
        wx.uploadFile({
          url: 'https://api.youxingku.cn/aliyun/uploadwx.php',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var img = res.data
            that.setData({
              photo: img
            })
            var postData = { uid: myinfo.id, wx_headportr: img }
            function doSuccess(res) {
              console.log(res)
              if (res.data.status == 1) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 1500,
                })
              }
            }
            var url = '/inter/index/useredit';
            app.yxkRequest(url, postData, doSuccess);
          }
        })
      }
    })


  }
})

