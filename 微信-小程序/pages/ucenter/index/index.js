var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp();

Page({
  data: {
    userInfo: {},
    hasMobile: '',
    verifyState:0
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.getPageInformation()
    // this.getGetMobile() 
  },
  getPageInformation: function() {
    var that = this;
    util.request(api.MyAccount).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          totalIncome: res.data.totalIncome,
          totalExpenditure: res.data.totalExpenditure,
          totalWithdrawal: res.data.totalWithdrawal,
          accountBalance: res.data.accountBalance
        })
      }
    });
  },
  //获取手机号
  getGetMobile: function() {
    var that = this;
    util.request(api.GetMobile).then(function (res) {
        that.setData({
          mobile: res.mobile,
        })
    });
  },
  onReady: function() {

  },
  onShow: function() {
    this.getPageInformation()
    this.getGetMobile()
    
    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');
    // 页面显示
    if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    }

    this.setData({
      userInfo: app.globalData.userInfo,
    });
    // this.getPageInformation()
    var that = this;
    util.request(api.QueryVerifyState).then(function (res) {
      // console.log("res==="+JSON.stringify(res));
      if (res.errno === 0) {
        that.setData({
          verifyState: res.data
        })
      }
    });
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  },
  bindGetUserInfo(e) {
    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');
    if (userInfo && token) {
      return;
    }
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      user.loginByWeixin(e.detail).then(res => {
        
        this.setData({
          userInfo: res.data.userInfo
        });
        app.globalData.userInfo = res.data.userInfo;
        app.globalData.token = res.data.token;
      }).catch((err) => {
        console.log(err)
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告通知',
        content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
        success: function(res) {
          if (res.confirm) {
            wx.openSetting({
              success: (res) => {
                if (res.authSetting["scope.userInfo"]) { ////如果用户重新同意了授权登录
                  user.loginByWeixin(e.detail).then(res => {
                    this.setData({
                      userInfo: res.data.userInfo
                    });
                    app.globalData.userInfo = res.data.userInfo;
                    app.globalData.token = res.data.token;
                  }).catch((err) => {
                    console.log(err)
                  });
                }
              }
            })
          }
        }
      });
    }
  },
  exitLogin: function() {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  }
})