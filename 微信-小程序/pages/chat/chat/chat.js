//chat.js
//获取应用实例
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var app = getApp()
// const msgs = require('./chat-mock-data.js');

Page({
  data: {
    messages: [],         // 聊天记录
    msg: '',              // 当前输入
    scrollTop: 0,         // 页面的滚动值
    socketOpen: false,    // websocket是否打开
    lastId: '',           // 最后一条消息的ID
    isFirstSend: true,     // 是否第一次发送消息(区分历史和新加)
    // user2Nickname:'',//对方的昵称
    user2Id:0,//对方的UserId
    user2Avatar:'',//对方的头像
    user1Id:0,//自己的UserID
    // user1Nickname: 0,//自己的昵称
    user1Avatar: '',//自己的头像

  },
  onLoad(option) {
    var curUser = wx.getStorageSync("userInfo");
    var curUserId = wx.getStorageSync("userId");
    this.setTitle(option);// 设置标题
    this.setData({
      // user2Nickname: option.user2Nickname,//对方的昵称
      user2Id: option.user2Id,//对方的UserId
      user2Avatar: option.user2Avatar,//对方的头像
      user1Id: curUserId,//自己的UserID
      // user1Nickname: curUser.nickName,//自己的昵称
      user1Avatar: curUser.avatarUrl,//自己的头像
    });
  },
  onShow: function(e){
    var that = this ;
    var user2Id = that.data.user2Id ;
    util.request(api.Chats, { user2Id: user2Id}).then(function (res) {

      var len = res.data.length ;
      that.setData({
        messages: res.data
      });
      if(len > 0){
        that.setData({ lastId: res.data[len - 1].id});
      }
    });
    that.connect();

  },
  //事件处理函数
  onReady() {
    // // // 连接websocket服务器
    // this.connect();
  },
  onUnload() {
    
    const socketOpen = this.data.socketOpen;
    if (socketOpen) {
      wx.closeSocket({});
      wx.onSocketClose(res => {
        console.log('WebSocket 已关闭！')
      });

    }
  },
  connect() {
    var that = this ;
    var sender = that.data.user1Id;
    var receiver = that.data.user2Id ;
    wx.connectSocket({
      url: api.ChatWebSocket + "/" + sender + "/" + receiver
    });
    wx.onSocketOpen(res => {
      this.setData({ socketOpen: true });
      wx.sendSocketMessage({
        data: "",
      })
    });

    wx.onSocketMessage(res => {
      var that = this ;
      var oldMessages = that.data.messages ;
      var newMessage = JSON.parse(res.data);
      // console.log("new======"+newMessage);
      newMessage.id = 'msg'+oldMessages.length ;
      oldMessages.push(newMessage);
      var lastId = newMessage.id ;
      that.setData({ messages: oldMessages,lastId:lastId});
      //更新为消息已读
      util.request(api.UpdateChatRead, { chatId: newMessage.chatId }).then(function (res) {
        // console.log("消息已读");
      });

    });
    wx.onSocketError(res => {
      console.log(res);
      console.log('WebSocket连接打开失败，请检查！')
    })
  },
  // 设置昵称
  setTitle(option) {
    const nickname = option.user2Nickname ;
    wx.setNavigationBarTitle({
      title: nickname
    });
  },

  // 输入
  onInput(event) {
    const value = event.detail.value;
    this.setData({ msg: value });
  },
  // 聚焦
  onFocus() {
    this.setData({ scrollTop: 9999999 });
  },
  // 发送消息
  send:function(e) {

    var that = this ;
    const socketOpen = that.data.socketOpen;

    let messages = that.data.messages;
    let nums = messages.length;
    let msg = that.data.msg;

    if (msg === '') {
      util.showErrorToast("请输入内容");
      return false;
    }
    if (msg.length > 500) {
      util.showErrorToast("不能超过500字");
      return false;
    }
    this.setData({msg:''});
    const data = {
      // id: `msg${++nums}`,
      message: msg,
      messageType: 0,
      url: that.data.user1Avatar,
      // user1Avatar: that.data.user1Avatar,
      // user2Avatar: that.data.user2Avatar,
      user2Id: that.data.user2Id,//对方的UserId
      user1Id: that.data.user1Id,//自己的UserId
      // user1Nickname: that.data.user1Nickname,
      // user2Nickname: that.data.user2Nickname,
    };
    this.setData({msg:''});
    
    if (socketOpen) {
      wx.sendSocketMessage({
        data: JSON.stringify(data)
      })
    }
    that.setData({ lastId: `msg${++nums}` });
  }
})
