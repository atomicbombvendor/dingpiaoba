// pages/test/test.js
Page({

  data: {
    memberList: [{
        iamges: "/assets/logo_aiqiyi2x.png",
        cont: "爱奇艺影视会员",
        discount: "7.5折",
        hiddena: true,
        id: "0",
        invalidActivty: [{
            price: "2.98元",
            oldPrice: "3元",
            validType: "周卡",
            validTime: '7天有效'
          },
          {
            price: "18.98元",
            oldPrice: "25元",
            validType: "月卡",
            validTime: '30天有效'
          },
        ]
      },
      {
        iamges: "/assets/logo_tengxun2x.png",
        cont: "腾讯视频会员",
        discount: "7折",
        hiddena: true,
        id: "1",
        invalidActivty: [{
            price: "2.98元",
            oldPrice: "3元",
            validType: "周卡",
            validTime: '7天有效'
          },
          {
            price: "18.98元",
            oldPrice: "25元",
            validType: "月卡",
            validTime: '30天有效'
          },
        ]
      },
      {
        iamges: "/assets/logo_youku2x.png",
        cont: "优酷视频黄金会员",
        discount: "8折",
        hiddena: true,
        id: "2",
        invalidActivty: [{
            price: "2.98元",
            oldPrice: "3元",
            validType: "周卡",
            validTime: '7天有效'
          },
          {
            price: "18.98元",
            oldPrice: "25元",
            validType: "月卡",
            validTime: '30天有效'
          },
        ]
      },
      {
        iamges: "/assets/logo_sohu2x.png",
        cont: "搜狐视频黄金会员",
        discount: "8折",
        hiddena: true,
        id: "3",
        invalidActivty: [{
            price: "2.98元",
            oldPrice: "3元",
            validType: "周卡",
            validTime: '7天有效'
          },
          {
            price: "18.98元",
            oldPrice: "25元",
            validType: "月卡",
            validTime: '30天有效'
          },
        ]
      },
    ]
  },
  isOpen: function(e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;
    console.log(idx);
    var memberList = that.data.memberList;
    console.log(memberList);
    for (let i = 0; i < memberList.length; i++) {
      if (idx == i) {
        memberList[i].hiddena = !memberList[i].hiddena;
      } else {
        memberList[i].hiddena = true;
      }
    }
    this.setData({
      memberList: memberList
    });
    return true;
  }
})