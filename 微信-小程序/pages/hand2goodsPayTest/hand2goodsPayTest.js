var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  hand2GoodsPay: function (e) {

    var that = this ;
    var price = Number(e.target.dataset.price);
    var goodsNo = '7e3joecyus0vvn48zg4cmquz2o75a54';
    //判断认证状态
    util.request(api.QueryVerifyState).then(function (res) {
      // console.log("res==="+JSON.stringify(res));
      if (res.errno === 0) {
        var verifyState = res.data ;
        if (verifyState == 0) {
          wx.showModal({
            title: '提示',
            content: '您还未认证，请先完成认证！',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/attestationPage/attestationPage'
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          })
        } else if (verifyState == 1) {
          wx.showModal({
            title: '提示',
            content: '您的认证还在申请，很快申请通过后，就可以购买了！',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/attestationPageing/attestationPageing'
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          })
        } else if (verifyState == 3) {
          wx.showModal({
            title: '提示',
            content: '您的认证失败了，请重新提交认证吧！',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/attestationPageFail/attestationPageFail'
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          })
        } else {//认证通过

          //查询账户余额
          util.request(api.MyAccount, {}).then(function (account) {
            // console.log("account="+JSON.stringify(account));
            var accountVal = Number(account.data.accountBalance);

            // return false;
            console.log("account=" + accountVal);
            console.log("Number(that.data.moneys)=" + price);
            if (accountVal >= price) {//账户余额大于支付金额

              wx.showActionSheet({
                itemList: ['微信支付', '账户余额'],//
                itemColor: "#333",//显示文字的颜色
                success: function (resAction) {
                  if (!resAction.cancel) {//选中判断 
                    if (resAction.tapIndex == 0) {//使用微信支付

                      //使用微信支付
                      util.request(api.Hand2GoodsPrepay, {
                        goodsNo: goodsNo
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
                          if (res2.errmsg)
                            util.showErrorToast(res2.errmsg);
                          else
                            util.showErrorToast("调用支付接口失败");
                        }

                      });

                    } else if (resAction.tapIndex == 1) {//使用账户余额支付

                      //使用账户余额支付
                      util.request(api.Hand2GoodsPayUseAccount, {
                        goodsNo: goodsNo
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

            } else {//否则只能使用微信支付

              //发布成功后，使用微信支付
              util.request(api.Hand2GoodsPrepay, {
                goodsNo: goodsNo
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
                  if (res2.errmsg)
                    util.showErrorToast(res2.errmsg);
                  else
                    util.showErrorToast("调用支付接口失败");
                }

              });

            }


          });


        }


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