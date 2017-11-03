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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})