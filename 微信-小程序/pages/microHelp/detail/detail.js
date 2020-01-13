const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
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
    userId:0
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
    var userId = wx.getStorageSync("userId");
    this.setData({
      userId:userId
    })
  },
  // 获取详情页的内容
  getDetailsPageContent:function(){
    let that = this;
    var data = new Object();
    util.request(api.Micro_helpDetail,
      { helpId: that.data.helpId},
    ).then(function (res) {
        console.log(res)
      if (res.errno === 0) {
        that.setData({
          msg:res.data,
          authenInfo:res.data.authenInfo
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
      if (res.msgNo === 3) {
        wx.showModal({
          title: '提示',
          content: res.message,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/attestationPage/attestationPage'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else if (res.msgNo === 0) {//抢单成功
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.hideLoading()
          that.onLoad();//重新加载页面
        }, 2000);

      } else {
        util.showErrorToast(res.message);
      }
      
    });
  },
  //  返回首页按钮
  returnHomePage:function(){
    wx.switchTab({
      url: '/pages/index/index'
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
  // 分享
  onShareAppMessage: (res) => {
    var that = this;
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      var helpid = res.target.dataset.helpid;
      var userGroup = res.target.dataset.usergroup;
      var title = '同学看过来，抢单赚报酬！' ;
      var path = '/pages/detailsPage/detailsPage?helpId=' + helpid;
      var imgUrl = '/static/images/share1.jpg';
      if(userGroup == '1'){
        title = '小仙女求帮助，有钱有爱故事哟！';
        imgUrl = '/static/images/share2.jpg';
      }
      return {
        title: title,
        path: path,
        imageUrl: imgUrl,
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
})