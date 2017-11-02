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
  },
  swiperEvent:function(e){
    console.log(e)
    this.setData({
      dyIndex: e.detail.current+1
    })
  },
  // 收藏
  collectClick:function(){
    if(this.data.collectFlag){
      this.setData({
        collectIcon: '/images/detailCheckedIcon.png',
        collectFlag:0,
      })
    }else{
      this.setData({
        collectIcon: '/images/detailUncheckedIcon.png',
        collectFlag: 1,
      })
    }
  }
})