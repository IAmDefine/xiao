const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabArr:{
      btnIndex:0,
    },
    dis:"none",
    collect:"",//收藏的艺人
    o_page: "2",//下一页
    one_page: "",//总页数
    //资讯
    two_page:"",//总页数
    t_page:"2",//下一页
    news:"",//收藏的星讯

  },
  tabClick:function(e){
    var midIndex = e.target.dataset.index;
    var indexObj={};
    indexObj.btnIndex = midIndex;
    this.setData({
      tabArr:indexObj,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myinfo = wx.getStorageSync('myinfo');
    if(myinfo){
      var url = '/inter/index/collectlist';
      var postData = { uid: myinfo.id, types: '4', showrow:"5" }
      function doSuccess(res){
        if(res.data.status==1){
          var cinfo = res.data.data.data
          that.setData({
            dis:"none",
            collect:cinfo,
            one_page: res.data.data.totalPage
          })
        }else{
          that.setData({
            dis:"block"
          })
        }
      }
      app.yxkRequest(url, postData, doSuccess);
    }else{
      that.setData({
        dis: "block"
      })
    }


  },

  //点击收藏艺人
  click_star:function(e){
    var collect = this.data.collect
    if (collect){
      this.setData({
        dis:"none"
      })
    }else{
      this.setData({
        dis: "block"
      })
    }
  },


  //点击星讯
  click_news:function(){
    var that = this;
    var myinfo = wx.getStorageSync('myinfo');
    if (myinfo) {
      var url = '/inter/index/collectlist';
      var postData = { uid: myinfo.id, types: '5', showrow:"100" }
      function doSuccess(res) {
        if (res.data.status == 1) {
          var cinfo = res.data.data.data
          console.log(cinfo)
          for(let i in cinfo){
            cinfo[i].instime = app.timetransform(cinfo[i].instime)
            if(cinfo[i].starnews_con.length>30){
              cinfo[i].starnews_con= cinfo[i].starnews_con.slice(0, 40)+'...'; 
            }
          }

          that.setData({
            dis:"none",
            news: cinfo,
            two_page: res.data.data.totalPage
          })
        } else {
          that.setData({
            dis: "block"
          })
        }
      }
      app.yxkRequest(url, postData, doSuccess);
    }else{
      that.setData({
        dis: "block"
      })
    }
  },



  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    var that = this;
    var types = that.data.tabArr.btnIndex;
    var myinfo = wx.getStorageSync('myinfo');
    if(types=='0'){
      var page = that.data.o_page++
      if (page > that.data.one_page * 1 + 1) {
        return;
      }
      var url = '/inter/index/collectlist';
      var postData = { uid: myinfo.id, types: '4', showrow:"5", page: page }
      function pdata(res) {
        if (res.data.status == 1) {
          var info = res.data.data.data;
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 500
          })
          var main_con = that.data.collect
          var a = main_con.concat(info)
          that.setData({
            collect: a
          })
        }
      }
      app.yxkRequest(url, postData, pdata)
    }

  },
})

