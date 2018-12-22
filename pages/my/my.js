// pages/test/test.js
Page({

  data: {
    tickets: [{
      id: 0,
      hidden: true,
      "tid": "98833"
    }],

  },
  isTicketOpen: function(e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;
    var tickets = that.data.tickets;
    for (let i = 0; i < tickets.length; i++) {
      if (idx == i) {
        tickets[i].hidden = !tickets[i].hidden;
      } else {
        tickets[i].hidden = true;
      }
    }

    this.setData({
      tickets: tickets
    });
    return true;
  },
  onLoad: function() {
    var ticket_info_temp = wx.getStorageSync('ticket_info_storage');
    for (var i = 0; i < ticket_info_temp.length; i++) {
      ticket_info_temp[i].id = i;
      ticket_info_temp[i].hidden = true;
    }
    this.setData({
      tickets: ticket_info_temp
    })
  },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    var ticket_info_temp = wx.getStorageSync('ticket_info_storage');
    for (var i = 0; i < ticket_info_temp.length; i++) {
      ticket_info_temp[i].id = i;
      ticket_info_temp[i].hidden = true;
    }
    this.setData({
      tickets: ticket_info_temp
    })
  }
})