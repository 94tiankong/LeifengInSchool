var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userType: '',//用户类型
    certificatePic: '',//图片地址
    realName: '',//真实姓名
    gender: '',//性别
    mobile: '',//手机号
    college: '',//学院名称
    university: '',//学校ID，默认为清华大学
    certificateNo: '',//学号或教职工
    major: '',//专业 
    jobPost: ''
  },
  //图片预览
  previewImg: function (e) {
    var src = this.data.certificatePic;
    var imgArr = [src];
    wx.previewImage({
      current: src,     //当前图片地址
      urls: imgArr,//所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goBack: function () {
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
    if (!app.globalData.token) {
      var token = wx.getStorageSync('userToken')
      if (token) {
        app.globalData.token = token
      }
    }
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
    var that = this;
    util.request(api.QueryAuthenInfo, {}, 'POST', 'application/x-www-form-urlencoded;charset=utf-8')
      .then(function (res) {
        if (res.errno == 0) {
          that.setData({
            userType: res.data.userType,//用户类型
            certificatePic: res.data.certificatePic,//图片地址
            realName: res.data.realName,//真实姓名
            gender: res.data.gender,//性别
            mobile: res.data.mobile,//手机号
            college: res.data.college,//学院名称
            university: res.data.university,//学校ID，默认为清华大学
            certificateNo: res.data.certificateNo,//学号或教职工
            major: res.data.major,//专业
            jobPost: res.data.jobPost
          })
        } else {
          wx.showToast({
            title: '获取认证信息失败',
            icon: 'none',
            duration: 1000
          })
        }
      });
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
});