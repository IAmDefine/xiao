var app = getApp();
Page({
  data: {
    page:"1",
    history_items:[],
    hot_items: [],
    history_state: "block",//搜索历史默认出现
    search_con: "",//搜索内容的value值
    search_info: "block",//整个下方搜索历史、刷新
    submit_bg: "#FFFFFF",//搜索按钮为灰色状态
    submit_value: "取消",//搜索按钮文字为取消
    star_message:"",//查询出来的明星信息
    search_content:"none"
    
  },
  onLoad: function (options) {
    var that = this;
    var history = wx.getStorageSync('history');
    if (!history){
      this.setData({
        'history_state':'none'
      })
    }else{
      this.setData({
        'history_items': history
      })
    }
  //查询热门搜索
    var url = '/inter/hotkeys/lists';
    var postData = { showrow: 10}
    function doSuccess(res) {
      // console.log(res.data.data.data);
      if (res.data.status == 1) {
        that.setData({
          hot_items: res.data.data.data,

        })
      } else {
        that.setData({
          hot_items: ""
        })
      }
    }

    app.yxkRequest(url, postData, doSuccess);
  },

  // 点击清除执行
  button_del: function () {
    wx.removeStorage({
      key: 'history',
    })
    this.setData({
      history_state: "none",//历史搜索框消失
      history_items: [],//历史搜索内容清空
      search_con: "",//搜索框内容清空
    })
  },
  // 点击换一批执行
  hot_button: function () {
    var that = this;
    var page = that.data.page * 1 + 1;
    var url = '/inter/hotkeys/lists';
    var postData = { showrow: 8, page: page }
    function doSuccess(res) {
      if (res.data.status == 1) {
        that.setData({
          hot_items: res.data.data.data,
          page: page
        })
      } else {

        var page = 1;
        var url = '/inter/hotkeys/lists';

        var postData = { showrow: 8, page: page }
        function a(res) {
          console.log(res);
          that.setData({
            hot_items: res.data.data.data,
            page: page
          })
        }
        app.yxkRequest(url, postData, a)

      }
    }
    app.yxkRequest(url, postData, doSuccess)
  },
  search_submit: function (e) {
    this.setData({
      // 点击提交时，历史搜索页面消失，搜索结果页面出来
      search_info: "none",//历史搜索、热门搜索消失
      search_content: "block"//搜索内容出现
    })

  },

  // 点击搜索按钮按钮点击时执行
  submit_click: function (w) {
    var that = this
    if (this.data.search_con != "") {
      //历史搜索追加到缓存
      var history = wx.getStorageSync('history') || []
      var a = history.indexOf(this.data.search_con)
      if (a == -1) {
        history.unshift(this.data.search_con)
        wx.setStorageSync('history', history);
      }
      var url = "/search/index.php";
      var postData = { keys: this.data.search_con}
      //成功执行函数
      function doSuccess(res) {
        if(res.data.result.items[0]){
          var info = res.data.result.items[0].fields;
             that.setData({
               'star_message': info
            })
        }else{
          that.setData({
            'star_message': ''
          })
        }
  
      }
      app.yxkRequest(url, postData, doSuccess); //调用查询接口
      //输入框内容不为空的时候
      this.setData({
        search_info: "none",//历史搜索、热门搜索消失
        search_content: "block",//搜索内容出现
      })
    } else {
     
    }
    var a = that.data.submit_value;
    if(a=='取消'){
      wx.navigateBack({
        delta: 1
      })
    }
  },
  // 用户输入时执行
  input_value: function (q) {
    var new_value = q.detail.value;//获取用户输入的内容
    this.setData({
      search_con: new_value//value值变为用户输入内容
    })
    if (!this.data.search_con) {
      var history = wx.getStorageSync('history')
      if (history){
        this.setData({
          history_state: "block",
          'history_items': history
        })
      }
      //  如果输入框内没有内容，历史搜索、热门搜索出来
      this.setData({
        search_info: "block",
        //  搜索按钮颜色变为灰色
        submit_value: "取消",
        search_content:"none",
        star_message:""
      })
    } else {
      //输入框有内容时执行
      this.setData({
        // 搜索按钮变为红色
        submit_value: "搜索",
      })
    }
  },
  //历史内容里的搜索
  seek: function (e) {
    var that = this
    var seek = e.target.dataset.hi //历史搜索内容清空
    var url = "/search/index.php";
   
    var postData = { keys: seek}; 
    //成功执行函数
    function doSuccess(res) {
      if (res.data.result.items[0]) {
        var info = res.data.result.items[0].fields;
        that.setData({
          'star_message': info,
          'search_con': seek
        })
      } else {
        that.setData({
          'star_message': '',
          'search_con': seek
        })
      }
     
    }
    app.yxkRequest(url, postData, doSuccess); //调用查询接口
    this.setData({
      search_info: "none",//历史搜索、热门搜索消失
      search_content: "block",//搜索内容出现
      
    })
  },
  //点击热门搜索
  hot1: function (e) {
    var that = this
    var hot = e.target.dataset.hi
   
    //历史搜索追加到缓存
    var history = wx.getStorageSync('history') || []
    var a = history.indexOf(hot)
    if (a == -1) {
      history.unshift(hot)
      wx.setStorageSync('history', history);
    }
    var url = "/search/index.php";
   
    var postData = { keys: hot}
    
    //成功执行函数
    function doSuccess(res) {
      if (res.data.result.items[0]) {
        var info = res.data.result.items[0].fields;
        that.setData({
          'star_message': info,
          'search_con': hot
        })
      } else {
        that.setData({
          'star_message': '',
          'search_con': hot
        })
      }
    }
    app.yxkRequest(url, postData, doSuccess); //调用查询接口
    //输入框内容不为空的时候
    this.setData({
      search_info: "none",//历史搜索、热门搜索消失
      search_content: "block",//搜索内容出现
    })
  },


})
