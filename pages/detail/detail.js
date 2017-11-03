const app = getApp()
Page({
  data: {
    dyIndex:1,
    indexLength:3,
    collectIcon:'/images/detailUncheckedIcon.png',
    collectFlag:1,
    imgUrls: "",//轮播
    sid:"",//艺人的id
    sinfo:"",//艺人详情
    hid:"",//爱好
    job:"",//职业
    recent:"",//近期上线
    msginfo: '',//评论
    evalimg:"",//全部图片用于放大查看
    
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
        var info = res.data.data;
        var img = [];//图片容器
        var indexLength = 0;//图片数量
        for (let i in info.stars_img){
          img.push(info.stars_img[i].imgurl)
          indexLength++
        }
        //处理爱好
        var hid = '';
        var job = '';
        if(info.hid){
          for (let i in info.hid) {
            hid += info.hid[i] + ' ';
          }
        }  
        //处理职业
        if(info.jobs){
          for (let i in info.jobs) {
            job += info.jobs[i] + ' ';
          }
        }
      //转换出生日期
      info.birthdate = app.timetransform(info.birthdate);

      var url1 = '/inter/star/workslist';
      var thistime = app.timetransform(Date.parse(new Date()) / 1000)
      var postData1 = { types: "1,2", sid:sid, futuretime: thistime }
      function doSuccess1(res) {
        if (res.data.status == 1) {
          var info = res.data.data.data;
          console.log(info)
          that.setData({
            recent: info
          })
        }
      }
      app.yxkRequest(url1, postData1, doSuccess1);
        that.setData({
          sinfo: info,
          imgUrls:img,
          indexLength: indexLength,
          hid:hid,
          job:job,
        })
      }
    }
    app.yxkRequest(url, postData, dos);
  },
  //这里查询评价
  onReady:function(){
    // timetransform
    var that = this;
    var sid = this.data.sid;
    var url = '/inter/infomation/evallist';
    var postData = {sid:sid}
    function doSuccess(res){
      var info = res.data.data.data;
    //转换时候格式（包括评论和追评）  
    for(let i in info){
      info[i].instime = app.timetrans(info[i].instime);
      if (info[i].backtime){
        info[i].backtime = app.timetrans(info[i].backtime)
      }
      if (info[i].strbacktime) {
        info[i].strbacktime = app.timetrans(info[i].strbacktime)
      }
      if (info[i].additionaldiscuss != ''){
        for (let j in info[i].additionaldiscuss){
          info[i].additionaldiscuss[j].instime = app.timetrans(info[i].additionaldiscuss[j].instime)
          if (info[i].additionaldiscuss[j].backtime){
            info[i].additionaldiscuss[j].backtime = app.timetrans(info[i].additionaldiscuss[j].backtime)
          }
            if (info[i].additionaldiscuss[j].strbacktime) {
              info[i].additionaldiscuss[j].strbacktime = app.timetrans(info[i].additionaldiscuss[j].strbacktime)
          }
        }  
      }
    }
    //计算心数量
    for (let i in info) {
      //判断星星
      var st = (info[i].service * 1 + info[i].tech * 1 + info[i].times * 1 + info[i].honer * 1) / 4
      st = Math.round(st) //四舍五入
      info[i].starnum = st
    }
    //获取所有图片
    var evalimg = [];
    for (let i in info) {
      for (let j in info[i].evaimg) {
        evalimg.push(info[i].evaimg[j].urls)
      }
    }



      that.setData({
        msginfo:info,
        evalimg: evalimg
      })
    }
    app.yxkRequest(url, postData, doSuccess);
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
    
  },

  //跳转近期上线
  jump_new:function(e){
    var sid = this.data.sid;
    wx.navigateTo({
      url: '/pages/detail/deductiveExper/deductiveExper?sid='+sid
    })
  },
  look: function (e) {
    var url = e.currentTarget.dataset.u
    var urls = this.data.evalimg
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  //签约
  sign:function(){
    wx.showModal({
      title: '提示',
      content: '请下载优.星库APP或登录网页进行购买',
      cancelText:"联系客服",
      confirmText:"取消",
      cancelColor:"#EB2000",
      success: function (res) {
        if (res.confirm) {
        } else if (res.cancel) {
          wx.makePhoneCall({
            phoneNumber: '010-85952988'
          })
        }
      }
    })
  }
})