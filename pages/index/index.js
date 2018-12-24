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
    percent: 0,
    status: 'normal',
    ticket_info_storage: [],
    ticket_info: [{
      id: 0,
      cont: "1",
      hidden: true,
    }],

    passengers_info: [{
      id: 0,
      hidden: true,
      "name": "",
      "id_card": ""
    }],
    price: 0,
    default_interval_price: 20
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {

    var ticket_info_temp = wx.getStorageSync('ticket_info_storage');
    if (ticket_info_temp != "") {
      this.setData({
        ticket_info_storage: ticket_info_temp
      })
    } else {
      this.setData({
        ticket_info_storage: []
      })
    }


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
  delete_passenger: function(e) {
    var that = this.data;
    var last_num = that.passenger_num.length - 1
    var passenger_num_tmp = that.passenger_num
    if (last_num > 0) {
      passenger_num_tmp.splice(last_num, 1);
    }
    this.setData({
      passenger_num: passenger_num_tmp
    })
  },
  handleAdd() {
    var that = this;
    if (that.data.status == 'success') {
      return;
    }
    var percent_temp = that.data.percent + 25;
    var price_temp = that.data.price + that.data.default_interval_price;
    if (percent_temp > 80) {
      percent_temp = 96
    }

    if (percent_temp > 90) {
      this.setData({
        percent: percent_temp,
        price: price_temp,
        status: 'success'
      });
    } else {
      this.setData({
        percent: percent_temp,
        price: price_temp
      });
    }
  },
  handleReduce() {
    var that = this;
    var percent_temp = that.data.percent - 25
    var price_temp = that.data.price - that.data.default_interval_price;
    if (this.data.percent == 96) {
      percent_temp = 75
    }
    if (this.data.percent <= 0) return;
    this.setData({
      percent: percent_temp,
      price: price_temp,
      status: 'normal'
    });
  },
  isOpen: function(e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;
    console.log(idx);
    var ticket_info = that.data.ticket_info;
    console.log(ticket_info);
    for (let i = 0; i < ticket_info.length; i++) {
      if (idx == i) {
        ticket_info[i].hidden = !ticket_info[i].hidden;
      } else {
        ticket_info[i].hidden = true;
      }
    }

    this.setData({
      ticket_info: ticket_info
    });
    return true;
  },
  isPassengerOpen: function(e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;
    var passengers_info = that.data.passengers_info;
    for (let i = 0; i < passengers_info.length; i++) {
      if (idx == i) {
        passengers_info[i].hidden = !passengers_info[i].hidden;
      } else {
        passengers_info[i].hidden = true;
      }
    }

    this.setData({
      passengers_info: passengers_info
    });
    return true;
  },
  add_passenger: function(e) {
    var that = this;

    var temp = that.data.passengers_info
    if (temp.length >= 5) {
      wx.showToast({
        title: '最多添加5个成员',
      })
      return true;
    }
    var passenger_temp = {
      'id': temp[temp.length - 1].id + 1,
      hidden: true,
      "name": "",
      "id_card": ""
    }
    temp.push(passenger_temp)
    this.setData({
      passengers_info: temp
    });
    return true;
  },
  delete_passenger: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.index
    var temp = that.data.passengers_info
    if (temp.length <= 1) {
      wx.showToast({
        title: '最少保留一个',
      })
      return true;
    }
    temp.splice(id, 1)
    for (var i = 0; i < temp.length; i++) {
      temp[i].id = i
    }
    this.setData({
      passengers_info: temp
    });
    return true;
  },
  get_value_content: function(temp_val) {
    var temp = temp_val;
    var content = "";
    if (temp != null) {
      var temp_arr = temp.split(" ");
      for (var i = 0; i < temp_arr.length; i++) {
        content += "[" + temp_arr[i] + "]";
      }
    }
    return content;
  },
  formSubmit: function(e) {

    wx.showLoading({
      title: '提交...',
    })

    var that = this;
    var account = e.detail.value.account;
    var account_password = e.detail.value.account_password;
    var train_number = that.get_value_content(e.detail.value.train_number);
    var start_from = that.get_value_content(e.detail.value.start_from);
    var end_to = that.get_value_content(e.detail.value.end_to);
    var ticket_date = that.get_value_content(e.detail.value.ticket_date);
    var seat = that.get_value_content(e.detail.value.seat);
    var passengers = that.get_passengers(e);
    var passenger_num = that.get_passengers_num(e);
    var percent = that.data.percent;
    var qq_number = e.detail.value.qq_number
    var wechat_id = e.detail.value.wechat_id
    var tel_phone = e.detail.value.tel_phone

    that.sleep(3000);

    wx.request({
      method: 'GET',
      url: 'https://xiaobaili.applinzi.com/wx_add/',
      data: {
        account: account,
        account_password: account_password,
        train_number: train_number,
        start_from: start_from,
        end_to: end_to,
        ticket_date: ticket_date,
        seat: seat,
        passengers: passengers,
        percent: percent,
        tel_phone: tel_phone,
        wechat_id: wechat_id,
        qq_number: qq_number,
        passenger_num: passenger_num
      },
      success: function(res) {

        if (res.statusCode != 200) {
          wx.showModal({
            title: '网络错误',
            content: 请等待10秒钟重试,
            success: function(res) {
              if (res.confirm) {
                console.log('弹框后点取消')
              } else {
                console.log('弹框后点取消')
              }
            }
          })
          return;
        }
        var temp = res.data;
        var reg = new RegExp("<script(.+?)script>", "g"); //正则表达式，第一个参数是目标对象，第二个参数g,表示全部替换。
        temp = temp.replace(reg, "");
        temp = temp.replace("'", "\"");
        var result = JSON.parse(temp);

        if (result != null) {
          that.update_storage(result);
          wx.showModal({
            title: '订单编号',
            content: result.ticket_id,
            success: function(res) {
              if (res.confirm) {
                console.log('弹框后点取消')
              } else {
                console.log('弹框后点取消')
              }
            }
          })
        } else {
          wx.showToast({
            title: '添加失败',
          })
        }
      },
      error: function(data) {
        alert('error');
        alert(data);
      },
      complete: () => {
        wx.hideLoading()
      }
    });
  },
  get_passengers_num: function(e) {
    var count = 0;
    var passenger_name_0 = e.detail.value.passenger_name_0;
    var passenger_id_card_0 = e.detail.value.passenger_id_card_0;
    if (passenger_name_0 != null) {
      count += 1;
    }

    var passenger_name_1 = e.detail.value.passenger_name_1;
    var passenger_id_card_1 = e.detail.value.passenger_id_card_1;
    if (passenger_name_1 != null) {
      count += 1;
    }

    var passenger_name_2 = e.detail.value.passenger_name_2;
    var passenger_id_card_2 = e.detail.value.passenger_id_card_2;
    if (passenger_name_2 != null) {
      count += 1;
    }

    var passenger_name_3 = e.detail.value.passenger_name_3;
    var passenger_id_card_3 = e.detail.value.passenger_id_card_3;
    if (passenger_name_3 != null) {
      count += 1;
    }

    var passenger_name_4 = e.detail.value.passenger_name_4;
    var passenger_id_card_4 = e.detail.value.passenger_id_card_4;
    if (passenger_name_4 != null) {
      count += 1;
    }
    return count;
  },
  get_passengers: function(e) {
    var temp = "";

    var passenger_name_0 = e.detail.value.passenger_name_0;
    var passenger_id_card_0 = e.detail.value.passenger_id_card_0;
    if (passenger_name_0 != null) {
      temp += "[" + passenger_name_0 + ",1," + passenger_id_card_0 + "_1]"
    }

    var passenger_name_1 = e.detail.value.passenger_name_1;
    var passenger_id_card_1 = e.detail.value.passenger_id_card_1;
    if (passenger_name_1 != null) {
      temp += "[" + passenger_name_1 + ",1," + passenger_id_card_1 + "_1]"
    }

    var passenger_name_2 = e.detail.value.passenger_name_2;
    var passenger_id_card_2 = e.detail.value.passenger_id_card_2;
    if (passenger_name_2 != null) {
      temp += "[" + passenger_name_2 + ",1," + passenger_id_card_2 + "_1]"
    }

    var passenger_name_3 = e.detail.value.passenger_name_3;
    var passenger_id_card_3 = e.detail.value.passenger_id_card_3;
    if (passenger_name_3 != null) {
      temp += "[" + passenger_name_3 + ",1," + passenger_id_card_3 + "_1]"
    }

    var passenger_name_4 = e.detail.value.passenger_name_4;
    var passenger_id_card_4 = e.detail.value.passenger_id_card_4;
    if (passenger_name_4 != null) {
      temp += "[" + passenger_name_4 + ",1," + passenger_id_card_4 + "_1]"
    }

    temp = temp.substring(0, temp.length - 3) + "]";

    return temp;
  },
  get_contact: function(e) {
    var content = ""
    var tel_phone = e.detail.data.tel_phone


    var wechat_id = e.detail.data.wechat_id
    var qq_number = e.detail.data.qq_number

  },
  // 防止添加重复的ticket_id到数据库。好像没有什么用。
  update_storage: function(ticket) {
    var that = this;
    var exists = false;
    var ticket_info_storage_temp = that.data.ticket_info_storage;
    for (var i = 0; i < ticket_info_storage_temp.length; i++) {
      if (ticket_info_storage_temp[i].ticket_id == ticket.ticket_id) {
        exists = true;
      }
    }
    if (!exists) {
      ticket_info_storage_temp.push(ticket);
      that.setData({
        ticket_info_storage: ticket_info_storage_temp
      });
      wx.setStorageSync('ticket_info_storage', ticket_info_storage_temp);
    }
  },
  //参数n为休眠时间，单位为毫秒:
  sleep: function(n) {
    var start = new Date().getTime();
    //  console.log('休眠前：' + start);
    while (true) {
      if (new Date().getTime() - start > n) {
        break;
      }
    }
    // console.log('休眠后：' + new Date().getTime());
  },
  onShareAppMessage: function () {
    return {
      title: '订车票吧',
      desc: '我正在预订火车票，快来使用吧',
      imageUrl: '../../icon/timg.jpg',
      path: 'pages/index/index?id=123'
    }
  }

})