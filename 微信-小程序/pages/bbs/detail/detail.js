const app = getApp()
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

Page({
  data: {
    bbsNo:'',
    title:'',
    bbsDetail:{},
    ReplyList:[]
  },
  toReply:function(e){
    var that = this ;
    wx.navigateTo({
      url: '/pages/bbs/reply/reply?title='+that.data.title+'&bbsNo='+that.data.bbsNo,
    })
  },
  onLoad: function(options) {
    
    var that = this ;
    that.setData({
      "bbsNo": options.bbsNo
    });
  },
  onShow:function(e){
    var that = this ;
    util.request(api.BBSView,{"bbsNo":that.data.bbsNo}).then(function(res){
      if(res.errno === 0){
        that.setData({
          "bbsDetail":res.data,
          "title":res.data.title
        })
      }
    })
  },


})
