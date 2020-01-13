var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');



var app = getApp();

Page({
  data: {
    // array: ['请选择反馈类型', '系统报错', '账户资金问题', '用户体验差', '其他'],
    array: [
      { type:'请选择反馈类型',id:0},
      { type: '系统报错', id: 1 },
      { type: '账户资金问题', id: 2 },
      { type: '用户体验差', id: 3 },
      { type: '其他', id: 9 }],
    index: 0,
    content:'',
    contentLength:0,
    mobile:''
  },
  // 下拉框
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，索引为', e.detail.value);
    var id = this.data.array[e.detail.value].id
    this.setData({
      id: id,
      index: e.detail.value,
    })
    console.log('id为: ', id);
  },
  mobileInput: function (e) {
    let that = this;
    this.setData({
      mobile: e.detail.value,
    });
  },
  contentInput: function (e) {
   
    let that = this;
    this.setData({
      contentLength: e.detail.cursor,
      content: e.detail.value,
    });
    
  },
  cleanMobile:function(){
    let that = this;

  },
  sbmitFeedback : function(e){
    let that = this;
    if (that.data.index == 0){
      util.showErrorToast('请选择反馈类型');
      return false;
    }

    if (that.data.content == '') {
      util.showErrorToast('请输入反馈内容');
      return false;
    }

    if (that.data.mobile == '') {
      util.showErrorToast('请输入手机号码');
      return false;
    }
    wx.showLoading({
      title: '提交中...',
      mask:true,
      success: function () {

      }
    });

    util.request(api.FeedbackAdd, { mobile: that.data.mobile, feedType: that.data.id, content: that.data.content}).then(function (res) {
      if (res.errno === 0) {

        wx.hideLoading();

        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 2000,
          complete: function () {
            that.setData({
              index: 0,
              content: '',
              contentLength: 0,
              mobile: ''
            });
          }
        });
      } else {
        util.showErrorToast(res.data);
      }
      
    });
  },
  onLoad: function (options) {
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  }
})