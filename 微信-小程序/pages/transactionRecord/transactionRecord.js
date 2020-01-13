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
      { type: '全部', id: 0 },
      { type: '收入', id: 1 },
      { type: '支出', id: 2 },
      { type: '提现', id: 3 },
      { type: '退款', id: 4 },
    ],
    index: 0,
    inExType:'',
    list:[
      {type:'求辅导',time:'2019/07/17 09:28:14',money:10.00},
      { type: '提现', time: '2019/07/17 09:28:14', money: 10.00 },
      { type: '送资料', time: '2019/07/17 09:28:14', money: 10.00 },
      { type: '取快递', time: '2019/07/17 09:28:14', money: 10.00 },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestPageData()
  },
  // 请求页面数据渲染
  requestPageData: function () {
    let that = this;
    var inExType = ''
    if (that.data.index==0){
     inExType=''
    } else if(that.data.index == 1){
     inExType = '收入'
    } else if (that.data.index == 2) {
     inExType = '支出'
    } else if (that.data.index == 3){
     inExType = '提现'
    } else if (that.data.index == 4) {
      inExType = '退款'
    }
    console.log(that.data.index)
    console.log(inExType)
    util.request(api.MyInExList, {
      inExType: inExType
    }).then(function (res) {
      console.log(res)
      if (res.errno === 0) {
        that.setData({
          list: res.data.data,
          inTotal: res.data.otherData.inTotal,
          exTotal: res.data.otherData.exTotal
        });
      }
    });
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
    console.log(this.data.index);
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