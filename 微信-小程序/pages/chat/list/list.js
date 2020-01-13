//chat.js
//获取应用实例
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var app = getApp()
const friends = require('./list-mock-data.js')

Page({
  data: {
    friends: []
  },

  gotoChat(event) {
    const curUser = event.currentTarget.dataset.user;
    wx.navigateTo({
      url: '/pages/chat/chat/chat?user2Nickname=' + curUser.nickname + "&user2Id=" + curUser.userId + "&user2Avatar=" + curUser.photo
    })
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this ;
    util.request(api.ChatList, {}).then(function (res){
      that.setData({
        friends:res.data 
      })
    });
  },

})
