var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var app = getApp()

Page({
    data: {
        mobile: '',
        code:'',
        userInfo: {
            avatarUrl: '',
            nickName: ''
        },
        disableGetMobileCode: false,
        getCodeButtonText: '获取验证码'
    },

    onShow: function () {
    },

    onLoad: function () {
        var that = this
        that.setData({userInfo: app.globalData.userInfo})

        if (app.globalData.token) {
          console.log(app.globalData.token)
        } else {
            var token = wx.getStorageSync('userToken')
          console.log(token)
            if (token) {
                app.globalData.token = token
            }
        }
 
    },

    bindGetPassCode: function (e) {
        var that = this
        that.setData({disableGetMobileCode: true})
    },

    bindInputMobile: function (e) {
        this.setData({
            mobile: e.detail.value,
        })
    },

  sendVCode: function () {
        if (!util.checkMobile(this.data.mobile)) {
            return
        }
      util.request(api.SmsCode, { mobile: this.data.mobile }, 'POST', 'application/x-www-form-urlencoded;charset=utf-8')
            .then(function (res) {
                if (res.errno == 0) {
                    wx.showToast({
                        title: '发送成功',
                        icon: 'success',
                        duration: 1000
                    })
                    var pages = getCurrentPages()
                    var i = 60;
                    var intervalId = setInterval(function () {
                        i--
                        if (i <= 0) {
                            pages[pages.length - 1].setData({
                                disableGetMobileCode: false,
                                getCodeButtonText: '获取验证码'
                            })
                            clearInterval(intervalId)
                        } else {
                            pages[pages.length - 1].setData({
                                getCodeButtonText: i,
                                disableGetMobileCode: true
                            })
                        }
                    }, 1000);
                } else {
                    wx.showToast({
                        title: '发送失败',
                        icon: 'none',
                        duration: 1000
                    })
                }
            });

    },

    bindLoginMobilecode: function (e) {
        var mobile = this.data.mobile;
        if (!util.checkMobile(mobile)) {
            return
        }
        if (!(e.detail.value.code && e.detail.value.code.length === 4)) {
            return
        }
        wx.showToast({
            title: '操作中...',
            icon: 'loading',
            duration: 5000
        })

      util.request(api.BindMobile, { vcode: e.detail.value.code, mobile: mobile}, "POST")
            .then(function (res) {
              console.log(res)
                if (res.errno === 0) {
                    wx.showModal({
                        title: '提示',
                        content: '操作成功',
                        showCancel: false
                    })
                    wx.switchTab({
                        url: '/pages/ucenter/index/index'
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '验证码错误',
                        showCancel: false
                    })
                }
            })
    }
})