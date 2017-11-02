const app = getApp()
Page({
  data: {
    dyIndex:1,
    indexLength:3,
    collectIcon:'/images/detailUncheckedIcon.png',
    collectFlag:1,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    sid:"",//艺人的id
    sinfo:"",//艺人详情
  },
  swiperEvent:function(e){
    this.setData({
      dyIndex: e.detail.current+1
    })
  },
  // 收藏
  collectClick:function(){
    var myinfo = wx.getStorageSync('myinfo');
    if(!myinfo){
      return;
    }
    if(this.data.collectFlag){
      this.setData({
        collectIcon: '/images/detailCheckedIcon.png',
        collectFlag:0,
      })
      //加入收藏
       var sid = this.data.sid
       this.addcollect(sid);
      
    }else{
      this.setData({
        collectIcon: '/images/detailUncheckedIcon.png',
        collectFlag: 1,
      })
      var sid = this.data.sid;
      this.delcollect(sid);
    }
  },

  onLoad:function(e){
    var that = this;
    var sid = e.id;
    that.setData({sid:sid});
    //查看是否收藏
    this.lookcollect(sid);
    //查看艺人详情
    var url = '/inter/Applet/getstarinfo';
    var postData = {sid:sid}
    function dos(res){
      if(res.data.status==1){
        that.setData({
          sinfo: res.data.data
        })
      }
    }

    app.yxkRequest(url, postData, dos);
  },

  //加入收藏函数
  addcollect:function(e){
    var myinfo = wx.getStorageSync('myinfo');
    if(!myinfo){
      return;
    }
    var that = this;
    var r = '';
    var url = '/inter/index/addcollect';
    var myinfo = wx.getStorageSync('myinfo');
    var postData = {uid:myinfo.id,pid:e,types:'4'}
    function doSuccess(res){
      if(res.data.status==1){
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
  delcollect:function(e){
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
  lookcollect:function(e){
    var that = this;
    var myinfo = wx.getStorageSync('myinfo');
    if(myinfo){
      var url = '/inter/index/collectlist';
      var postData = {types:'4',uid:myinfo.id,pid:e}
      function doSuccess(res){
        if(res.data.status==1){
          that.setData({
            collectIcon: '/images/detailCheckedIcon.png',
            collectFlag: 0,
          })
        }
      }
      app.yxkRequest(url, postData, doSuccess);
    }
  },

  //跳转更多
  jump_all:function(e){
    var types = e.currentTarget.dataset.types;
    var sid = this.data.sid;
    wx.navigateTo({
      url: '/pages/detail/detailMovieList/detailMovieList?types='+types+"&sid="+sid
    })
    
  }



})