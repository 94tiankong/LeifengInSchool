var dateTimePicker = require('../../../utils/dateTimePicker.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
var transDate = "";
Page({
  data: {
    // text:"这是一个页面"
    topicList: [],
    page: 1,
    size: 10,
    count: 0,
    scrollTop: 0,
    isRuleTrue: true,
    showPage: false,
    //1-取快递，2-送资料，3-求辅导，4-带打饭，90-其它
    array: [
      {
        type: '请选择',
        helpType: 0 
      },
      {
        type: '取快递',
        helpType: 1
      },
      {
        type: '送资料',
        helpType: 2
      },
      {
        type: '求辅导',
        helpType: 3
      },
      {
        type: '代打饭',
        helpType: 4
      },
      {
        type: '办事务',
        helpType: 5
      },
      {
        type: '其它',
        helpType: 90
      }
    ],
    index: 0,
    helpType:0,
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2019,
    endYear: 2022,
    startAdress: '',
    endAdress: '',
    moneys: '',
    content:''

  },
  //关闭提示
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getTopic();
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateAdd(new Date(),2);
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

  },
  // 下拉框
  bindPickerChange: function(e) {
    var helpType = this.data.array[e.detail.value].helpType
    this.setData({
      helpType: helpType,
      index: e.detail.value,
    })
  },
  //时间选择器
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e) {
    let arr = this.data.dateTime,
    dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  //地点输入框
  startInput(e) {
    this.setData({
      startAdress: e.detail.value
    });
    // console.log(this.data.startAdress)
  },
  endInput(e) {
    this.setData({
      endAdress: e.detail.value
    });
    // console.log(this.data.endAdress)
  },
  moneyInput(e) {
    this.setData({
      moneys: e.detail.value
    });
    // console.log(this.data.moneys)
  },
  contentInput: function(e) {

    let that = this;
    this.setData({
      contentLength: e.detail.cursor,
      content: e.detail.value,
    });
    // console.log(this.data.content)
  },
  formSubmit: function(e) {
    let that = this;
    var helpType = that.data.helpType ;

    if (!((helpType >= 1 && helpType <= 5) || helpType == 90)) {
      util.showErrorToast('请选择类型');
      return false;
    }
    if (that.data.index != 3 && that.data.startAdress == '') {
      util.showErrorToast('请输入初始地');
      return false;
    }
    if (that.data.endAdress == '') {
      util.showErrorToast('请输入目的地');
      return false;
    }

    if (that.data.moneys == '') {
      util.showErrorToast('请输入报酬');
      return false;
    }
    let str = /^\d+(.\d{1,2})?$/ ;
    if (!str.test(that.data.moneys)) {
      util.showErrorToast('报酬两位小数');
      return false;
    }
    if (Number(that.data.moneys) < 1) {
      util.showErrorToast('报酬至少1元');
      return false;
    }
    if (that.data.content == '') {
      util.showErrorToast('请输入任务描述');
      return false;
    }

    wx.showLoading({
      title: '提交中...',
      mask: true,
      success: function() {

      }
    });
    var startTime = that.data.dateTimeArray[0][that.data.dateTime[0]] + '/' + that.data.dateTimeArray[1][that.data.dateTime[1]] + '/' + that.data.dateTimeArray[2][that.data.dateTime[2]] + ' ' + that.data.dateTimeArray[3][that.data.dateTime[3]] + ':' + that.data.dateTimeArray[4][that.data.dateTime[4]] + ':' + that.data.dateTimeArray[5][that.data.dateTime[5]] ;
    var endTime = that.data.dateTimeArray1[0][that.data.dateTime1[0]] + '/' + that.data.dateTimeArray1[1][that.data.dateTime1[1]] + '/' + that.data.dateTimeArray1[2][that.data.dateTime1[2]] + ' ' + that.data.dateTimeArray1[3][that.data.dateTime1[3]] + ':' + that.data.dateTimeArray1[4][that.data.dateTime1[4]] + ':' + that.data.dateTimeArray1[5][that.data.dateTime1[5]];

    util.request(api.Micro_helpSeekHelp, {
      helpType: helpType,
      startTime: startTime,
      endTime: endTime,
      startAddr: that.data.startAdress,
      endAddr: that.data.endAdress,
      helpReward: Number(that.data.moneys),
      helpDesc: that.data.content
    }).then(function(res) {
      // console.log(res)
      if (res.errno == 0) {
        wx.hideLoading();

        //查询账户余额
        util.request(api.MyAccount, {}).then(function (account) {
          // console.log("account="+JSON.stringify(account));
        var accountVal = Number(account.data.accountBalance);
  
        // return false;
        console.log("account=" + accountVal);
        console.log("Number(that.data.moneys)=" + Number(that.data.moneys));
        if (accountVal >= Number(that.data.moneys)){//账户余额大于支付金额

          wx.showActionSheet({
            itemList: ['微信支付', '账户余额'],//
            itemColor: "#333",//显示文字的颜色
            success: function (resAction) {
              if (!resAction.cancel) {//选中判断 
                if (resAction.tapIndex == 0) {//使用微信支付

                  //发布成功后，使用微信支付
                  var helpId = res.data;
                  util.request(api.Prepay, {
                    helpId: helpId
                  }).then(function (res2) {
                    if (res2.errno == 0) {
                      let payParam = res2.data;
                      // console.log("payParam=" + JSON.stringify(payParam));
                      wx.requestPayment({
                        'timeStamp': payParam.timeStamp,
                        'nonceStr': payParam.nonceStr,
                        'package': payParam.package,
                        'signType': payParam.signType,
                        'paySign': payParam.paySign,
                        'success': function (res) {
                          // console.log("支付成功了。。。。" + JSON.stringify(res));
                          wx.navigateTo({
                            url: '/pages/successfulRelease/successfulRelease?helpId=' + helpId
                          })
                        },
                        'fail': function (res) {
                          util.showErrorToast("支付失败");//取消支付，跳转待支付列表页面
                          wx.redirectTo({
                            url: '/pages/OrderIssued/OrderIssued',
                          });
                        }
                      })
                    } else {
                      // console.log("调用支付接口失败="+JSON.stringify(res2));
                      util.showErrorToast("调用支付接口失败");
                    }

                  });

                } else if (resAction.tapIndex == 1) {//使用账户余额支付

                  //发布成功后，使用账户余额支付
                  var helpId = res.data;
                  util.request(api.PayUseAccount, {
                    helpId: helpId
                  }).then(function (res2) {
                    if (res2.errno == 0) {

                      wx.showToast({
                        title: '余额支付成功',
                        duration: 1000,
                      })
                      setTimeout(function () {
                        wx.navigateTo({
                          url: '/pages/successfulRelease/successfulRelease?helpId=' + helpId
                        })
                      }, 1000)

                    } else {

                      wx.showToast({
                        title: res2.errmsg,
                        duration: 1000,
                      })
                      setTimeout(function () {
                        wx.navigateTo({
                          url: '/pages/OrderIssued/OrderIssued'
                        })
                      }, 1000)

                    }

                  });

                }
              }
            }
          });

        }else{//否则只能使用微信支付

          //发布成功后，使用微信支付
          var helpId = res.data;
          util.request(api.Prepay, {
            helpId: helpId
          }).then(function (res2) {
            if (res2.errno == 0) {
              let payParam = res2.data;
              // console.log("payParam=" + JSON.stringify(payParam));
              wx.requestPayment({
                'timeStamp': payParam.timeStamp,
                'nonceStr': payParam.nonceStr,
                'package': payParam.package,
                'signType': payParam.signType,
                'paySign': payParam.paySign,
                'success': function (res) {
                  // console.log("支付成功了。。。。" + JSON.stringify(res));
                  wx.navigateTo({
                    url: '/pages/successfulRelease/successfulRelease?helpId=' + helpId
                  })

                },
                'fail': function (res) {
                  util.showErrorToast("支付失败");//取消支付，跳转待支付列表页面
                  wx.navigateTo({
                    url: '/pages/OrderIssued/OrderIssued',
                  });
                }
              })
            } else {

              util.showErrorToast("调用支付接口失败");
            }

          });

        }
 


  
        });

      } else {
        // console.log("res.errmsg==" + res.errmsg);
        if(res.errmsg){
          util.showErrorToast(res.errmsg);
        }else{
          util.showErrorToast("发单失败");
        }
        
      }

    });
  },


  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    this.setData({
      isRuleTrue: true,
      startAdress: '',
      endAdress: '',
      moneys: '',
      content: ''
    });

  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  nextPage: function(event) {
    var that = this;
    if (this.data.page + 1 > that.data.count / that.data.size) {
      return true;
    }
    that.setData({
      "page": parseInt(that.data.page) + 1
    });
    this.getTopic();
  },
  getTopic: function() {

    let that = this;
    that.setData({
      scrollTop: 0,
      showPage: false,
      topicList: []
    });
    // 页面渲染完成
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    });

    util.request(api.TopicList, {
      page: that.data.page,
      size: that.data.size
    }).then(function(res) {
      if (res.errno === 0) {

        that.setData({
          scrollTop: 0,
          topicList: res.data.data,
          showPage: true,
          count: res.data.count
        });
      }
      wx.hideToast();
    });

  },
  prevPage: function(event) {
    if (this.data.page <= 1) {
      return false;
    }

    var that = this;
    that.setData({
      "page": parseInt(that.data.page) - 1
    });
    this.getTopic();
  }
})