var app = getApp();
Page({
  data: {
    //类型
    pro_type: ['全部', "肖像照片", "商演活动", "形象代言", "自媒体"],
    pro_type_detail:'0',
    //性别
    sex:['不限','女','男'],
    sex_detail:'0',
    //年龄
    age: ['不限','10-18岁', '18-25岁', '25-35岁', '35-50岁', '50+岁'],
    age_detail:"0",

    //家庭身份
    family: ['不限','未婚','已婚未育','已婚已育'],
    family_detail:"0",
    //艺人地区
    area_v: [],
    area_s:[],
    area_detail:"0",
    //适用行业
    job_sid: '',
    show_value: '',
    //职业
    select_profession_sid: '',
    select_profession_value: '',
    //艺人特质
    tag_sid: '',
    tag_value: '',

  },

  onLoad: function () {
    var that = this;
    //查询地区
    var url = '/inter/index/datadictslist';
    var postData = { types: 8, showrow: 50}
    function dos(res) {
      if (res.data.status == 1) {
        var area_v=[];
        var area_s=[];
        for (let i in res.data.data.data){
          area_v.push(res.data.data.data[i].values)
          area_s.push(res.data.data.data[i].sid)
        }

    // console.log(area_s)
        that.setData({
          area_v: area_v,
          area_s: area_s,
        })
      }
    }
    app.yxkRequest(url, postData, dos)
  },

  onShow: function () {
    var industry = wx.getStorageSync('selest_industry');
    var select_profession = wx.getStorageSync('select_profession');
    var select_tag = wx.getStorageSync('select_tag');
    if (industry) {
        var job_sid = "";
        var show_value = "";
        var num = industry.length;
        for (let i = 0; i < num; i++) {
          if (industry[i].sid) {
            job_sid += industry[i].sid + ","
            show_value += industry[i].value + ","
          }
        }
        var a = job_sid.substr(0, job_sid.length - 1)
        var b = show_value.substr(0, show_value.length - 1)
        this.setData({
          job_sid: a,
          show_value: b,
        })
    }
    //获取职业
    if (select_profession) {
      var profession_sid = "";
      var profession_value = "";
      var num = select_profession.length;
      for (let i = 0; i < num; i++) {
        if (select_profession[i].sid) {
          profession_sid += select_profession[i].sid + ","
          profession_value += select_profession[i].value + ","
        }
      }
      var a = profession_sid.substr(0, profession_sid.length - 1)
      var b = profession_value.substr(0, profession_value.length - 1)
      this.setData({
        select_profession_sid: a,
        select_profession_value: b,
      })
    }
  //获取特质
    console.log(select_tag)
    if (select_tag){
      var tag_sid = "";
      var tag_value = "";
      var num = select_tag.length;
      for (let i = 0; i < num; i++) {
        if (select_tag[i].sid) {
          tag_sid += select_tag[i].sid + ","
          tag_value += select_tag[i].value + ","
        }
      }
      var a = tag_sid.substr(0, tag_sid.length - 1)
      var b = tag_value.substr(0, tag_value.length - 1)
      this.setData({
        tag_sid: a,
        tag_value: b,
      })
    }


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

  //产品类型
  protype: function (e) {
    this.setData({
      pro_type_detail: e.detail.value
    })
  },
  //使用时长
  u_time: function (e) {
    this.setData({
      u_time_detail: e.detail.value
    })
  },
  //性别
  sex: function (e) {
    this.setData({
      sex_detail: e.detail.value
    })
  },
  //年龄
  age: function (e) {
    this.setData({
      age_detail: e.detail.value
    })
  },
  //家庭身份
  family: function (e) {
    this.setData({
      family_detail: e.detail.value
    })
  },
  //艺人地区
  area: function (e) {
    this.setData({
      area_detail: e.detail.value
    })
  },


  //适用行业
  click_industry: function (e) {
    wx.navigateTo({
      url: '/pages/select_info/select_info',
    })
  },

  //艺人职业
  select_profession: function (e) {
    wx.navigateTo({
      url: '/pages/select_profession/select_profession',
    })
  },

  //艺人特质
  tag: function (e) {
    wx.navigateTo({
      url: '/pages/select_tag/select_tag',
    })
  },

  //点击确定
  up:function(e){
    var that = this;
    //产品类型
    var types = that.data.pro_type_detail;
    //性别
    var gender = that.data.sex_detail
    //年龄
    var age = that.data.age_detail
    //家庭身份
    var marriage = that.data.family_detail
    //艺人地区
    var num = that.data.area_detail;
    var country = that.data.area_s[num];
    //适用行业
    var iid = that.data.job_sid;
    //职业
    var jid = that.data.select_profession_sid
    //特质
    var tid = that.data.tag_sid;

    var postData = { types: types, gender: gender, age: age, marriage: marriage, country: country,iid:iid,jid:jid,tid:tid}
    //去掉=0的值
    for (let i in postData) {
      if (!postData[i] || postData[i] == 0 || postData[i] == '') {
        delete postData[i]
      }
    }
    //跳转筛选结果
    wx.setStorageSync('filtrate', postData);
      wx.navigateTo({
        url: '/pages/filtrate_result/filtrate_result',
      })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync('select_tag');
    wx.removeStorageSync('select_profession');
    wx.removeStorageSync('selest_industry');
    this.setData({
      job_sid:'',
      job_value:"",
      select_profession_sid:"",
      select_profession_value:"",
      tag_sid:"",
      tag_value:""
    })
  },
  //重置
  reser_btn:function(){
    wx.redirectTo({
      url: '/pages/filter/filter',
    })
  }

})