var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var app = getApp()
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      { type:'全部',id:0},
      { type: '送资料', id: 1 },
      { type: '取快递', id: 2 },
      { type: '代打饭', id: 3 },
      { type: '求辅导', id: 4 },
      { type: '办事务', id: 5 },
      { type: '其它', id: 90 }
    ],
    index: 0, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestPageData()
  }, 
  // 下拉框
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，索引为', e.detail.value);
    var id = this.data.array[e.detail.value].id
    this.setData({
      id: id,
      index: e.detail.value,
    })
    this.requestPageData()
    console.log('id为: ', id);
  },
  // 请求页面数据渲染
  requestPageData: function () {
    let that = this;
    if (that.data.id == 90) {
      var index = 90
    } else {
      var index = that.data.index;
    }
    util.request(api.MyHelpList, {
      helpType: index,
    }).then(function (res) {
      console.log(res)
      if (res.errno === 0) {
        that.setData({
          grabSheet: res.data.data,
          totalNum: res.data.count
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //个人信息按钮
  helpInformation: function (e) {
    var helpId = e.target.dataset.id;
    this.setData({
      showModal: helpId
    })
  },
  // 个人信息中的关闭按钮
  closeInfo: function (e) {
    this.setData({
      showModal: -100
    })
  },
  //确认送达按钮
  confirmationService:function(e){
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log(id)
    util.request(api.ConfirmHelp, { helpId: id}).then(function (res) {
      console.log(res)
      if (res.errno == 0) {
        wx.showToast({
          title: res.errmsg,
          icon: 'success',
          duration: 1000
        })
      }else{
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 1000
        })
      }
    });
  },
  //评价按钮跳转
  evaluateSeeker: function (e) {
  
    var helpId = e.currentTarget.dataset.id;//帮助ID
    var seekeravatar = e.currentTarget.dataset.seekeravatar;//头像
    var seeker = e.currentTarget.dataset.seeker;//姓名 
    wx.navigateTo({
      url: '../EvaluationPage2/EvaluationPage2?helpId=' + helpId + "&seeker=" + seeker + "&seekeravatar=" + seekeravatar
    })

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
    var that = this;
    var index = that.data.index;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    page = page + 1;
    util.request(api.MyHelpList, {
      helpType: index,
      page: page
    }).then(function (res) {
      console.log(res)
      if (res.errno === 0) {
        var moment_list = that.data.grabSheet;
        const oldData = that.data.grabSheet;
        that.setData({
          grabSheet: oldData.concat(res.data.data)
        });
        // 隐藏加载框
        wx.hideLoading();
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})