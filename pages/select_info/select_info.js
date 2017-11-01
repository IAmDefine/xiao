
var md5 = require('../../utils/md5.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one_class: "", //一级分类
    two_class: "", //二级分类
    three_class: "",//三级分类

    middle_show: "none",//二级开关
    middle_style: 0,

    allvalue: [],//选择的数据存放数组
    num: "0",
    types: "",

    //全选
    all_dis: "none",
    one_label: "0", //全选标记
    two_dis: "none",
    two_label: "0",//二级全部标记
  },
  //查一级
  onLoad: function (e) {
    var that = this;
    // var types = e.type
    // that.setData({ types: types });
    var url = "/inter/index/datadictslist" //接口地址
    var postData = { types: 5, showrow: 1000, fid: 0}
    function doSuccess(res) {
      console.log(res.data)
      if (res.data.status == 1) {
        var info = res.data.data.data
        for (let i in info) {
          info[i].icon = 'none'
        }
        that.setData({
          one_class: info
        })
      }
    }
    app.yxkRequest(url, postData, doSuccess)
  },

  //查2级
  one_class: function (e) {
    var that = this;
    var fid = e.currentTarget.id
    that.setData({
      left_style: fid
    })
    var url = "/inter/index/datadictslist" //接口地址
    var postData = { types: 5, showrow: 10000, fid: fid}
    function doSuccess(res) {
      if (res.data.status == 1) {
        var info = res.data.data.data;
        var one_label = that.data.one_label
        if (one_label == 1) {
          for (let i in info) {
            info[i].icon = 'block'
          }
          that.setData({
            two_class: info,
            three_class: "",
            middle_show: "block"
          })
          return
        }

        for (let i in info) {
          info[i].icon = 'none'
        }
        var allvalue = that.data.allvalue
        if (allvalue) {
          for (let i in info) {
            for (let j in allvalue) {
              if (allvalue[j].sid == info[i].sid) {
                info[i].icon = 'block'
              }
            }
          }
        }

        that.setData({
          two_class: info,
          three_class: "",
          middle_show: "block"
        })
      }
    }

    app.yxkRequest(url, postData, doSuccess);
  },

  //查三级
  two_class: function (e) {
    var that = this;
    var fid = e.currentTarget.id
    var sid = e.target.dataset.sid; //sid 没有三级会用到
    var value = e.target.dataset.value; //value 没有三级会用到
    var url = "/inter/index/datadictslist" //接口地址
    var postData = { types: 5, showrow: 10000, fid: fid}
    function doSuccess(res) {
      if (res.data.status == 1) {
        var info = res.data.data.data;
        var one_label = that.data.one_label
        var two_label = that.data.two_label
        if (one_label == 1 ||two_label==1) {
          for (let i in info) {
            info[i].icon = 'block'
          }
          that.setData({
            three_class: info,
            middle_style: fid
          })
          return
        }


        for (let i in info) {
          info[i].icon = 'none'
        }
        var allvalue = that.data.allvalue
        if (allvalue) {
          for (let i in info) {
            for (let j in allvalue) {
              if (allvalue[j].sid == info[i].sid) {
                info[i].icon = 'block'
              }
            }
          }
        }
        that.setData({
          three_class: info,
          middle_style: fid
        })
      } else {
        that.setData({
          three_class: "",
          middle_style: fid
        })
      }
    }
    app.yxkRequest(url, postData, doSuccess)
  },

  //选择一级
  select: function (e) {
    var that = this;
    var sid = e.currentTarget.dataset.sid;
    var value = e.target.dataset.value;
    var allvalue = that.data.allvalue
    var all = that.data.one_class;

    if (allvalue == '') {
      var num = allvalue.length * 1 + 1
      var aa = { sid: sid, value: value }
      allvalue.push(aa)
      for (let i in all) {
        if (sid == all[i].sid) {
          all[i].icon = "block"
        }
      }
    } else {
      var aa = { sid: sid, value: value }
      var a = that.inarray(allvalue, sid)
      if (!a) {
        var num = allvalue.length * 1 + 1
        allvalue.push(aa)
        for (let i in all) {
          if (sid == all[i].sid) {
            all[i].icon = "block"
          }
        }
      } else {
        for (let i in all) {
          if (all[i].sid == sid) {
            all[i].icon = 'none'
          }
        }
        for (let i in allvalue) {
          if (allvalue[i].sid == sid) {
            allvalue.splice(i, 1)
          }
        }
        var num = allvalue.length
      }
    }
    that.setData({
      allvalue: allvalue,
      one_class: all,
      num: num
    })
  },

  //选择二级
  select_two: function (e) {
    var that = this;
    var sid = e.currentTarget.dataset.sid;
    var value = e.target.dataset.value;
    var allvalue = that.data.allvalue
    var all = that.data.two_class;
    if (allvalue == '') {
      var num = allvalue.length * 1 + 1
      var aa = { sid: sid, value: value }
      allvalue.push(aa)
      for (let i in all) {
        if (sid == all[i].sid) {
          all[i].icon = "block"
        }
      }
    } else {
      var aa = { sid: sid, value: value }
      var a = that.inarray(allvalue, sid)
      if (!a) {
        var num = allvalue.length * 1 + 1
        allvalue.push(aa)
        for (let i in all) {
          if (sid == all[i].sid) {
            all[i].icon = "block"
          }
        }
      } else {
        for (let i in all) {
          if (all[i].sid == sid) {
            all[i].icon = 'none'
          }
        }
        for (let i in allvalue) {
          if (allvalue[i].sid == sid) {
            allvalue.splice(i, 1)
          }
        }
        var num = allvalue.length
      }
    }
    that.setData({
      allvalue: allvalue,
      two_class: all,
      num: num
    })
  },

  //选择三级
  select_three: function (e) {
    var that = this;
    var sid = e.currentTarget.dataset.sid;
    var value = e.target.dataset.value;
    var allvalue = that.data.allvalue
    var all = that.data.three_class;
    if (allvalue == '') {
      var num = allvalue.length * 1 + 1
      var aa = { sid: sid, value: value }
      allvalue.push(aa)
      for (let i in all) {
        if (sid == all[i].sid) {
          all[i].icon = "block"
        }
      }
    } else {
      var aa = { sid: sid, value: value }
      var a = that.inarray(allvalue, sid)
      if (!a) {
        var num = allvalue.length * 1 + 1
        allvalue.push(aa)
        for (let i in all) {
          if (sid == all[i].sid) {
            all[i].icon = "block"
          }
        }
      } else {
        for (let i in all) {
          if (all[i].sid == sid) {
            all[i].icon = 'none'
          }
        }
        for (let i in allvalue) {
          if (allvalue[i].sid == sid) {
            allvalue.splice(i, 1)
          }
        }
        var num = allvalue.length
      }
    }
    that.setData({
      allvalue: allvalue,
      three_class: all,
      num: num
    })
  },

  //删除
  del_job: function (e) {
    var that = this;
    var sid = e.target.dataset.id;
    var all = that.data.allvalue;
    var one_class = that.data.one_class;
    var two_class = that.data.two_class;
    var three_class = that.data.three_class;
    var num = that.data.allvalue.length * 1 - 1;
    for (let i in all) {
      if (all[i].sid == sid) {
        all.splice(i, 1)
      }
    }
    for (let i in one_class) {
      if (one_class[i].sid == sid) {
        one_class[i].icon = 'none'
      }
    }
    for (let i in two_class) {
      if (two_class[i].sid == sid) {
        two_class[i].icon = 'none'
      }
    }
    for (let i in three_class) {
      if (three_class[i].sid == sid) {
        three_class[i].icon = 'none'
      }
    }
    that.setData({
      allvalue: all,
      num: num,
      one_class: one_class,
      two_class: two_class,
      three_class: three_class
    })
  },

  //判断是否存在数组里
  inarray: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i].sid == obj) {
        return true;
      }
    }
    return false;
  },

  //全选一级
  sel_all: function (e) {
    var that = this;
    var allvalue = []
    var one_class = that.data.one_class
    var one_label = that.data.one_label
    for (let i in one_class) {
      if (one_label == 0) {
        one_class[i].icon = "block";
        var num = one_class.length
        var a = { sid: one_class[i].sid, value: one_class[i].values }
        allvalue.push(a)
        that.setData({
          one_class: one_class,
          all_dis: "block",
          one_label: "1",
          allvalue: allvalue,
          num: num
        })
      } else {
        one_class[i].icon = "none";
        var allvalue = []
        that.setData({
          one_class: one_class,
          all_dis: "none",
          one_label: "0",
          allvalue: allvalue,
          num: "0"
        })
      }
    }
  },

  //点击二级的全部
  click_twoall: function (e) {
    var that = this;
    var two_class = that.data.two_class
    var allvalue = []
    var two_label = that.data.two_label

    for (let i in two_class) {
      if (two_label == 0) {
        two_class[i].icon = "block";
        var num = two_class.length
        var a = { sid: two_class[i].sid, value: two_class[i].values }
        allvalue.push(a)
        that.setData({
          two_class: two_class,
          three_class: "",
          middle_show: "block",
          two_label:"1",
          two_dis: "block",
          allvalue:allvalue,
          num:num
        })
      } else {
        two_class[i].icon = "none";
        that.setData({
          two_class: two_class,
          three_class: "",
          middle_show: "block",
          two_label: "0",
          two_dis: "none",
          allvalue: allvalue,
          num: 0
        })
      }
    }






  },

  //确定行业
  yes_job: function (e) {
    var info = this.data.allvalue;
    if (info) {
      // var types = this.data.types
      // if (types == 1) {
        //产品适用行业
        // var aa = { types: types }
        // info.push(aa)
        console.log(info);
        wx.setStorageSync('selest_industry', info);
      // } 
      // else if (types == 2) {
      //   //排他
      //   var aa = { types: types }
      //   info.push(aa)
      //   wx.setStorageSync('reject', info);
      // } else if (types == 3) {
      //   var aa = { types: types }
      //   info.push(aa)
      //   wx.setStorageSync('screen_industry', info);
      // }
    }

    wx.navigateBack({
      delta: 1
    })


  },
})