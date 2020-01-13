const app = getApp()
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
Page({
  data: {
    focus: false,
    goodsNo:'',
    hand2goods: {}
  },
  //视频播放错误
  videoErrorCallback: function (e) {
    util.showErrorToast(e.detail.errMsg);
  },
  onLoad:function(options){
    this.setData({
      goodsNo:options.goodsNo
    });
  },
  onShow: function(e){
    var that = this;
    var goodsNo = that.data.goodsNo ;
    util.request(api.Hand2GoodsView, {
      goodsNo: goodsNo
    }).then(function (res) {
      that.setData({hand2goods:res.data})
    });
  },

})
