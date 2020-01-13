var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var app = getApp()
var page = 1;
Page({
 
  /**
   * 页面的初始数据
   */ 
  data: {
    array: [{
        type: '全部',
        index: 0
      },
      {
        type: '取快递',
        index: 1
      },  
      {
        type: '送资料', 
        index: 2
      },
      {
        type: '求辅导',
        index: 3
      },
      {
        type: '代打饭',
        index: 4
      },
      {
        type: '办事务',
        index: 5
      },
      {
        type: '其它',
        index: 90
      }
    ], 
    index: 0,
    // showModal: -100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestPageData()
    this.getCurrentPageUrl()
  },
  getCurrentPageUrl:function (){
    var that=this;
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    console.log(url)
    console.log(1)
    that.setData({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  //雷锋信息按钮
  helpInformation: function (e) {
    var helpId = e.target.dataset.id ;
    this.setData({
      showModal: helpId
    })
  },
  // 雷锋信息中的关闭按钮
  closeInfo: function (e) {
    this.setData({
      showModal: -100
    })
  },
  // 下拉框
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，索引为', e.detail.value);
    var id = this.data.array[e.detail.value].index
    this.setData({
      id: id,
      index: e.detail.value,
    })
    this.requestPageData()
    console.log('id为: ', id);
  },
  // 请求页面数据渲染
  requestPageData: function() {
    let that = this;
    if (that.data.id == 90) {
      var index = 90
    } else {
      var index = that.data.index;
    }
    util.request(api.MySeekList, {
      helpType: index,
    }).then(function(res) {
      console.log(res)
      if (res.errno === 0) {
        that.setData({
          grabSheet: res.data.data,
          totalNum: res.data.count
        });
      }
    });
  },  


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  
  /**
 * 重新支付
 */
  repay: function (e) {
    let that = this;
    var helpId = e.target.dataset.id;
    var helpReward = Number(e.target.dataset.helpreward);

    util.request(api.MyAccount, {}).then(function (account) {
      // console.log("account="+JSON.stringify(account));
      var accountVal = Number(account.data.accountBalance);
      if (accountVal >= helpReward) {//账户余额大于支付金额，使用两种支付方式

        wx.showActionSheet({
          itemList: ['微信支付', '账户余额'],//
          itemColor: "#333",//显示文字的颜色
          success: function (resAction) {
            if (!resAction.cancel) {//选中判断 
              if (resAction.tapIndex == 0) {//微信支付

                util.request(api.Prepay, {
                  helpId: helpId
                }).then(function (res2) {
                  let payParam = res2.data;
                  // console.log("payParam=" + JSON.stringify(payParam));
                  wx.requestPayment({
                    'timeStamp': payParam.timeStamp,
                    'nonceStr': payParam.nonceStr,
                    'package': payParam.package,
                    'signType': payParam.signType,
                    'paySign': payParam.paySign,
                    'success': function (res) {
                      console.log("支付成功了。。。。" + JSON.stringify(res));
                      wx.navigateTo({
                        url: '/pages/successfulRelease/successfulRelease?helpId=' + helpId
                      })

                    },
                    'fail': function (res) {
                      util.showErrorToast("支付失败");
                      that.onLoad();
                    }
                  })
                });

              } else if (resAction.tapIndex == 1) {//余额支付

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
        })

      }else{//只能使用一种支付方式

        util.request(api.Prepay, {
          helpId: helpId
        }).then(function (res2) {
          let payParam = res2.data;
          // console.log("payParam=" + JSON.stringify(payParam));
          wx.requestPayment({
            'timeStamp': payParam.timeStamp,
            'nonceStr': payParam.nonceStr,
            'package': payParam.package,
            'signType': payParam.signType,
            'paySign': payParam.paySign,
            'success': function (res) {
              console.log("支付成功了。。。。" + JSON.stringify(res));
              wx.navigateTo({
                url: '/pages/successfulRelease/successfulRelease?helpId=' + helpId
              })

            },
            'fail': function (res) {
              util.showErrorToast("支付失败");
              that.onLoad();
            }
          })
        });

      }
      });


 
  },

  //  删除微帮助 
  deleteHelp: function(e) {
    let that = this;
    var helpId = e.target.dataset.id;
    util.request(api.DelHelp, {
      helpId: helpId,
    }).then(function(res) {
      // console.log(res)
      if (res.errno === 0) {
        wx.showToast({
          title: "删除成功",
          icon: 'success',
          duration: 1000
        });
        setTimeout(function(){
          that.onLoad();
        },1000);

      } else {
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })
      }
    });
  },

  //  取消微帮助 
  cancelHelp: function (e) {
    let that = this;
    var helpId = e.target.dataset.id;
    wx.showModal({
      title: '温馨提醒',
      content: '请再次确认是否取消该单？',
      success: function (result) {
        if (result.confirm) {
          util.request(api.CancelHelp, {
            helpId: helpId,
          }).then(function (res) {
            // console.log(res)
            if (res.errno === 0) {
              wx.showToast({
                title: "取消成功",
                icon: 'success',
                duration: 1000
              });
              setTimeout(function () {
                that.onLoad();
              }, 1000);

            } else {
              wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
              })
            }
          });
        }
      }
    });

  
  },

  //确认送达按钮
  confirmationService: function (e) {
    var that = this;
    var helpNo = e.currentTarget.dataset.helpno
    // console.log("helpNo="+helpNo)
    wx.showModal({
      title: '温馨提醒',
      content: '请再次确认对方是否完成帮助？确认后，报酬将转入对方账户！',
      success: function (result) {
        if (result.confirm) {
          util.request(api.ConfirmHelp, { helpNo: helpNo }).then(function (res) {
            if (res.errno == 0) {
              wx.showToast({
                title: res.errmsg,
                icon: 'success',
                duration: 1000
              });
              setTimeout(function () {
                that.onLoad();
              }, 1000);
            } else {
              wx.showToast({
                title: res.errmsg,
                icon: 'none',
                duration: 2000
              })
            }
          });
        }
      }
    });
  },

  //退款
  refund: function (e) {
    var that = this;
    var helpNo = e.currentTarget.dataset.helpno;
    var payway = e.currentTarget.dataset.payway;

    wx.showModal({
      title: '温馨提醒',
      content: '退款后，资金请原路返回！',
      success: function (result) {
        if (result.confirm) {
          var refundUrl = api.Refund ;
          if (payway == 2){
            refundUrl = api.RefundToAccount;
            // console.log("aaaaaaaaaaaaaa" + refundUrl);
          }
          
          util.request(refundUrl, { helpNo: helpNo }).then(function (res) {
            if (res.errno == 0) {
              wx.showToast({
                title: res.errmsg,
                icon: 'success',
                duration: 1000
              });
              setTimeout(function () {
                that.onLoad();
              }, 1000);
            } else {
              wx.showToast({
                title: res.errmsg,
                icon: 'none',
                duration: 2000
              })
            }
          });
        }
      }
    });
  },

  //评价按钮跳转
  evaluateHelper: function (e) {
    var helpId = e.currentTarget.dataset.id;//帮助ID
    var helperavatar = e.currentTarget.dataset.helperavatar;//头像
    var helper = e.currentTarget.dataset.helper;//姓名 
    wx.navigateTo({
      url: '../EvaluationPage/EvaluationPage?helpId=' + helpId + "&helper=" + helper + "&helperavatar=" + helperavatar
    })

  },
  //去认证按钮
  certification:function(e){
    wx.navigateTo({
      url: '/pages/attestationPage/attestationPage'
    })
  },
  //重新认证按钮
  recertification: function (e) {
    wx.navigateTo({
      url: '/pages/attestationPageFail/attestationPageFail'
    })
  },
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    var index = that.data.index;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    page = page + 1;
    util.request(api.MySeekList, {
      helpType: index,
      page: page
    }).then(function(res) {
      console.log(res)
      if (res.errno === 0) {
        var moment_list = that.data.grabSheet;
        const oldData = that.data.grabSheet;
        that.setData({
          grabSheet: oldData.concat(res.data.data)
        });
        // 隐藏加载框
        wx.hideLoading();
      }
    });
  },

  // 分享
  onShareAppMessage: (res) => {
  // console.log(this.data.url)
    // console.log(url)
    var userGroup = res.target.dataset.usergroup;
    var shareImg = '/static/images/share1.jpg' ;
    var title = '同学看过来，抢单赚报酬！';
    if(userGroup == '1'){
      shareImg = '/static/images/share2.jpg';
      title = '小仙女求帮助，有钱有爱故事哟！';
    }
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      var helpid = res.target.dataset.helpid;
      return {
        title: title,
        path: '/pages/detailsPage/detailsPage?helpId=' + helpid,
        imageUrl: shareImg,
        success: (res) => {
          console.log("转发成功", res);
        },
        fail: (res) => {
          console.log("转发失败", res);
        }
      }
    }
    else {
      console.log("来自右上角转发菜单")
      return {
        title: '同学看过来，抢单看报酬！',
        path: '/static/images/share1.jpg',
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