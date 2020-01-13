var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpId:'',
    verifyState:0//认证状态
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      helpId: options.helpId
    });
    // wx.showShareMenu({
    //   // 要求小程序返回分享目标信息
    //   withShareTicket: true
    // }); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  goPage0: function () { wx.navigateTo({ url: '/pages/attestationPage/attestationPage'}) },
  goPage1: function () { wx.navigateTo({ url: '/pages/attestationPageing/attestationPageing'})},
  goPage3: function () { wx.navigateTo({ url: '/pages/attestationPageFail/attestationPageFail'})},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this ;
    //查询认证状态
    util.request(api.QueryVerifyState, {
    }).then(function (res) {
      if (res.errno === 0) {
        var verifyState = Number(res.data);
        if(verifyState == 0){
          that.goPage0();
        } else if (verifyState == 1){
          that.goPage1();
        } else if (verifyState == 3) {
          that.goPage3();
        }
      }
    });
  },

  // 分享
  onShareAppMessage: (res) => {
    var that = this ;
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      var helpid = res.target.dataset.helpid;
      return {
        title: '同学看过来，抢单赚报酬！',
        path: '/pages/detailsPage/detailsPage?helpId=' + helpid,
        imageUrl: '/static/images/share1.jpg',
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
    }else {
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