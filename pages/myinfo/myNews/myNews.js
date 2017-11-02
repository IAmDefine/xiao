const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msginfo:"",//获取消息
    str:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var myinfo = wx.getStorageSync('myinfo');
      var url = '/inter/infomation/lookmsgs';
      var postData = { recuid: myinfo.id,showrow:'10000',ifdel:"1" }
      function msginfo(res) {
        if (res.data.status == 1) {
          var msg = res.data.data.data;
          var str = ''
          for(let i in msg){
            msg[i].instime = app.timetransform(msg[i].instime);
            if (msg[i].ifread == 1) {
              str += msg[i].id + ',';
            }
          }
         var s = str.substr(0, str.length - 1);  
          that.setData({
            msginfo:msg,
            idstr:s
          })

          //设置状态为已读
          if(s){
            var url = '/inter/infomation/editread';
            var postdata = { ifread:2,id:s}
            function editmsg(res){
              console.log(res.data)
            }
            app.yxkRequest(url, postdata, editmsg);
          }
        }
      }
      app.yxkRequest(url, postData, msginfo);
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //删除
  del: function (e) {
    var that = this;
    wx.showModal({
      confirmColor: "#EB2000",
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          var id = e.currentTarget.id
          var url = "/inter/infomation/delmsgs"
          var postData = { id: id, ifdel: 2}
          function doSuccess(res) {
            console.log(res.data)
            if (res.data.status == 1) {
              that.onLoad()
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1000
              })
            }
          }
          app.yxkRequest(url, postData, doSuccess)

        }
      }
    })
  },

})