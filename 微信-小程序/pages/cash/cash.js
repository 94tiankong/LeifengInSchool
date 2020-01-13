var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    money:'',
    accountBalance:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.accountBalance)
    var accountBalance = options.accountBalance;
    this.setData({
      accountBalance: accountBalance
    })
  },
  //修改金额
  moneyInput: function (e) {
    var money = e.detail.value
    this.setData({
      money: money,
    })
  },
  //提现全部
  withdrawAll: function(e){
    var that = this ;
    that.setData({
      money: that.data.accountBalance
    })
  },
  withdraw: function(e){
    var that = this ;
    let token = wx.getStorageSync('token');
    if(that.data.money < 1){
      util.showErrorToast("提现金额太小");
      return ;
    }
    // console.log("that.data.money===" + that.data.money);
    wx.showLoading({
      title: '提现中...',
    })
    //保存认证信息
    wx.request({
      method: "POST",
      url: api.Withdraw,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-Nideshop-Token': token
      },
      data: {
        'money': that.data.money
      },
      success: function (res) {
        // console.log("res==="+JSON.stringify(res));
        var errno = res.data.errno;
        if (errno == '0') {
          that.setData({
            accountBalance: that.data.accountBalance - that.data.money 
          })
          wx.showToast({
            title: '提现成功',
            duration: 2000,
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/ucenter/index/index',
            })
          }, 2000)
        } else {//提交失败
          if (res.data.errmsg)
            util.showErrorToast(res.data.errmsg);
          else if (res.data.data)
            util.showErrorToast(res.data.data);
          else
            util.showErrorToast("提现失败");
        }
      }
    })
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