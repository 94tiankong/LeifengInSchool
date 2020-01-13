const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
var page=1;
Page({
  data: {
    imagewidth: 0, //缩放后的宽
    imageheight: 0, //缩放后的高
    university:'',
    userId:0,
    bbsHotList:[]
  },


  onShareAppMessage: function() {
    return {
      title: '校园新雷锋',
      desc: '校园新雷锋',
      path: '/pages/index/index'
    }
  },
  onPullDownRefresh() {
    // 增加下拉刷新数据的功能
    this.getIndexData();
  },
  getIndexData: function() {
    let that = this;
    var data = new Object();
    util.request(api.BBSHotList, {num:3}).then(function(res) {
      if (res.errno === 0) {
        that.setData({"bbsHotList":res.data});
      }
    });
  },
  //等比例缩放图片
  imageLoad: function(e) {
    var imageSize = util.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },

  onReachBottom: function () {
   
  },
  onLoad: function (options) {

  },
  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    // 页面显示
    var that = this;
    that.getIndexData();
    util.request(api.QueryUserUniversity, {}).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          university: res.data
        });
      }
    });
    var userId = wx.getStorageSync("userId");
    that.setData({
      userId: userId
    });
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
})