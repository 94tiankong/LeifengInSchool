const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    grade_name: '全部',
    grades: [
      '送资料',
      '取快递',
      '代打饭',
      '求辅导',
      '其他',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      helpId: options.helpId
    })
    this.getDetailsPageContent()
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
  // 获取详情页的内容
  getDetailsPageContent: function () {
    let that = this;
    var data = new Object();
    util.request(api.Micro_helpDetail,
      { helpId: that.data.helpId },
    ).then(function (res) {
      console.log(res)
      if (res.errno === 0) {
        that.setData({
          msg: res.data,
          authenInfo: res.data.authenInfo
        });
        console.log(that.data.msg)
      }
    });
  },
  // 抢单按钮
  grabSheet: function (e) {
    var id = e.currentTarget.dataset.id
    let that = this;
    util.request(api.Micro_helpGoHelp, {
      helpId: id,
    }).then(function (res) {
      console.log(res)
      if (res.msgNo == 0) {
        util.showErrorToast(res.message);
      } else if (res.msgNo === 1) {
        util.showErrorToast(res.message);
      } else if (res.msgNo === 2) {
        util.showErrorToast(res.message);
      } else if (res.msgNo === 3) {
        wx.showModal({
          title: '提示',
          content: res.message,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
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
})