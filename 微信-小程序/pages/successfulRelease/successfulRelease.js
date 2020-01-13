var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpId: '',
    goodsNo: '',
    verifyState: 0,//认证状态,
    title:'',
    path:'',
    imageUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var helpId = options.helpId;
    var goodsNo = options.goodsNo;
    if (helpId != undefined) {
      this.setData({
        helpId: options.helpId,
        title: '同学看过来，抢单赚报酬！',
        path: '/pages/microHelp/detail/detail?helpId=' + helpId,
        imageUrl: '/static/images/share1.jpg'
      });
    } else if (goodsNo != undefined) {
      this.setData({
        goodsNo: options.goodsNo,
        title: '同学看过来，这里有个物美价廉的物品等你拿',
        path: '/pages/hand2goods/detail/detail?goodsNo=' + goodsNo,
        imageUrl: '/static/images/share1.jpg'
      });
    } else {
      console.log("链接错误！");
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  goPage0: function () { wx.navigateTo({ url: '/pages/authentication/attestationPage/attestationPage' }) },
  goPage1: function () { wx.navigateTo({ url: '/pages/authentication/attestationPageing/attestationPageing' }) },
  goPage3: function () { wx.navigateTo({ url: '/pages/authentication/attestationPageFail/attestationPageFail' }) },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //查询认证状态
    util.request(api.QueryVerifyState, {
    }).then(function (res) {
      if (res.errno === 0) {
        var verifyState = Number(res.data);
        if (verifyState == 0) {
          that.goPage0();
        } else if (verifyState == 1) {
          that.goPage1();
        } else if (verifyState == 3) {
          that.goPage3();
        }
      }
    });
  },

  // 分享
  onShareAppMessage: (res) => {
    var that = this;
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      var title = that.data.title;
      var path = that.data.path;
      var imageUrl = that.data.imageUrl;
      return {
        title: title,
        path: path,
        imageUrl: imageUrl,
        success: (res) => {
          console.log("转发成功,跳转到首页", res);
          wx.navigateTo({
            url: '/pages/index/index'
          })
        },
        fail: (res) => {
          console.log("转发失败，也跳转到首页", res);
          wx.navigateTo({
            url: '/pages/index/index'
          })
        }
      }
    } else {
      console.log("来自右上角转发菜单")
      return {
        title: '同学看过来，抢单赚报酬！',
        path: '/pages/index/index',
        imageUrl: '/static/images/share1.jpg',
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    }

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

})