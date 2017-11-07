const app = getApp();
Page({
  data: {
    // 您的姓名
    nameStatusR: 'block',
    nameCon: '亲要怎样称呼您？',
    nameStatusF:'none',
    nameFocusStatus:false,
    nameHolder:'',
    nameValue:'',
    // 预算
    budgetStatusR: 'block',
    budgetCon: '代言的预算费用是多少呢？',
    budgetStatusF: 'none',
    budgetFocusStatus: false,
    budgetHolder: '',
    budgetValue: '',
    // 联系电话
    phoneStatusR: 'block',
    phoneCon: '您的联系电话是？',
    phoneStatusF: 'none',
    phoneFocusStatus: false,
    phoneHolder: '',
    phoneValue: '',
    descs:"",//描述
  },
  // 您的姓名
  nameClick:function(){
    this.setData({
      nameStatusR: 'none',
      nameStatusF: 'block',
      nameFocusStatus: true,
    })
  },
  // 您的姓名聚焦
  nameFocus:function(e){
    this.setData({
      nameValue:'',
      nameHolder: this.data.nameCon,
    })
  },
  // 您的姓名失焦
  nameBlur:function(e){
    if (e.detail.value!==''){
      this.setData({
        nameCon: e.detail.value,
        nameStatusR: 'block',
        nameStatusF: 'none',
        nameFocusStatus: false,
        nameValue: ''
      })
    }else{
      this.setData({
        nameCon: this.data.nameCon,
        nameStatusR: 'block',
        nameStatusF: 'none',
        nameFocusStatus: false,
        nameValue: ''
      })
    }
  },
  // 预算
  budgetClick: function () {
    this.setData({
      budgetStatusR: 'none',
      budgetStatusF: 'block',
      budgetFocusStatus: true,
    })
  },
  // 预算聚焦
  budgetFocus: function (e) {
    this.setData({
      budgetValue: '',
      budgetHolder: this.data.budgetCon,
    })
  },
  // 预算失焦
  budgetBlur: function (e) {
    if (e.detail.value !== '') {
      this.setData({
        budgetCon: e.detail.value,
        budgetStatusR: 'block',
        budgetStatusF: 'none',
        budgetFocusStatus: false,
        budgetValue: ''
      })
    } else {
      this.setData({
        budgetCon: this.data.budgetCon,
        budgetStatusR: 'block',
        budgetStatusF: 'none',
        budgetFocusStatus: false,
        budgetValue: ''
      })
    }
  },
  // 联系电话
  phoneClick: function () {
    this.setData({
      phoneStatusR: 'none',
      phoneStatusF: 'block',
      phoneFocusStatus: true,
    })
  },
  // 联系电话
  phoneFocus: function (e) {
    this.setData({
      phoneValue: '',
      phoneHolder: this.data.phoneCon,
    })
  },
  // 联系电话
  phoneBlur: function (e) {
    if (e.detail.value !== '') {
      this.setData({
        phoneCon: e.detail.value,
        phoneStatusR: 'block',
        phoneStatusF: 'none',
        phoneFocusStatus: false,
        phoneValue: ''
      })
    } else {
      this.setData({
        phoneCon: this.data.phoneCon,
        phoneStatusR: 'block',
        phoneStatusF: 'none',
        phoneFocusStatus: false,
        phoneValue: ''
      })
    }
  },
  //获取描述
  descs:function(e){
    this.setData({
      descs:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //提交
  up:function(){
    var that = this;
    var need_name = that.data.nameCon;
    var source = '2';
    var descs = that.data.descs
    var need_phone = that.data.phoneCon;
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (!reg.test(need_phone)){
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        image: "/images/type.png",
        duration: 2000
      })
      return;
    }
    var need_budget = that.data.budgetCon; //预算
    var url ='/inter/needs/adds'
    var uid = wx.getStorageSync('myinfo').id;
    var postData = { uid: uid, need_name: need_name, source: source, descs: descs, need_phone: need_phone, need_budget: need_budget, states:'1'}
    function doSuccess(res){
      if(res.data.status==1){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500
        })
        setTimeout(function () {
          wx.navigateBack({
          delta: 1
        })
        }, 2000)
      }
    }
    app.yxkRequest(url, postData, doSuccess);
  }
})