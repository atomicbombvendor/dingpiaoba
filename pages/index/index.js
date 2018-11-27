//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    current: 'homepage',
    user_num: "1",
    value1: '1',
    passenger_num: [{
      'id': 1,
      "name": '',
      "ID_number": ""
    },
      {
        'id': 2,
        "name": '',
        "ID_number": ""
      }],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function() {
    return {
      title: '订票吧',
      desc: '快速预订火车票',
      path: '/page/index?id=123'
    }
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },
  add_passenger: function(e) {
    var that = this.data;
    var next_num = that.passenger_num.length + 1
    var passenger_num_temp = that.passenger_num
    passenger_num_temp.push({
      'id': next_num,
      "name": '',
      "ID_number": ""
    })
    
    this.setData({
      passenger_num: passenger_num_temp
    })
  },
  delete_passenger: function (e) {
    var that = this.data;
    var last_num = that.passenger_num.length - 1
    var passenger_num_tmp = that.passenger_num
    if (last_num > 0) { passenger_num_tmp.splice(last_num, 1); }
    this.setData({
      passenger_num: passenger_num_tmp
    })
  }

  
})