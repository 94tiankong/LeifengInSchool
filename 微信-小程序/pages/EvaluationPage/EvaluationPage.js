var util = require('../../utils/util.js');
var api = require('../../config/api.js');



var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    contentLength: 0,
    starVal:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      helpId: options.helpId,
      helper: options.helper,
      helperavatar: options.helperavatar
    })
  },
  //点两次相同分数取消选择 js
  selectIndexNum(e) {
    let i = e.currentTarget.dataset.index;
    console.log(i)
    if (i == this.data.score) {
      this.setData({
        score: -1,
        starVal: -1
      })
    } else {
      this.setData({
        score: e.currentTarget.dataset.index - 0,
        starVal: e.currentTarget.dataset.index
      })
    }
  },
  contentInput: function (e) {

    let that = this;
    this.setData({
      contentLength: e.detail.cursor,
      content: e.detail.value,
    });

  },
  sbmitFeedback: function (e) {
    let that = this;

    if (that.data.starVal == -1) {
      util.showErrorToast('请选择星级');
      return false;
    }
    var starVal = (that.data.starVal + 1)*2;
    if (that.data.content == '') {
      util.showErrorToast('请输入反馈内容');
      return false;
    }
    wx.showLoading({
      title: '提交中...',
      mask: true,
      success: function () {
      }
    });
    //对帮助者评价
    util.request(api.CommentHelper, { helpId: that.data.helpId, starVal: starVal, comment: that.data.content }).then(function (res) {
      console.log(res)
      if (res.errno === 0) {
        wx.hideLoading();
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 1000
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/OrderIssued/OrderIssued'
          })
        },1000);

      } else {
        util.showErrorToast(res.data);
      }

    });
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