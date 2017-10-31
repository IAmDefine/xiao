
var app = getApp();
Page({
  data: {
    pro_type: ['全部', "肖像照片", "商演活动", "形象代言", "自媒体"],




  },

  onLoad: function () {
    var that = this;
    
  },

  //判断是否存在数组里
  inarray: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i].sid === obj) {
        return true;
      }
    }
    return false;
  },

  click_type:function(e){
    console.log(e);
  },

  //适用行业
  click_industry: function (e) {
    // wx.navigateTo({
    //   url: '/pages/select_industry/select_industry?type=3',
    // })
  },

})