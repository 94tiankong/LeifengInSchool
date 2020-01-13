const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');

//获取应用实例
const app = getApp()
var page=1;
Page({
  data: {
    banner: [],
    select: false,
    helpListPage: {"count": 0},
    array: [
      { type: '全部', index: 0 },
      { type: '取快递', index: 1 },
      { type: '送资料', index: 2 },
      { type: '求辅导', index: 3 },
      { type: '代打饭', index: 4 },
      { type: '办事务', index: 5 },
      { type: '其它', index: 90 }],
    index: 0,
    imagefirstsrc: "/static/images/bannar1.png ",
    a: '/static/images/girl-1.png',
    imagewidth: 0, //缩放后的宽
    imageheight: 0, //缩放后的高
    show: true,
    curIdx: null,
    active:'',
    university:'',
    userId:0,
    _num:0,
    listInfo: [
      {
        title: '帮女神',
        imgUrl: '/static/images/c.png',
        curUrl: '/static/images/nv.png',
      },
      {
        title: '帮男神',
        imgUrl: "/static/images/b.png",
        curUrl: '/static/images/nan.png',
      },
      {
        title: '帮老师',
        imgUrl: "/static/images/a.png" ,
        curUrl: '/static/images/ls.png',
      },
    ]
  },
  menuClick: function (e) {
    var that=this;
    if (that.data.active === e.target.dataset.num){
      that.setData({
        _num:0,
        active:0
      })
    }else{
      that.setData({
        _num: e.target.dataset.num,
        active: e.target.dataset.num
      })
    }
    this.requestPageData()
  },
  onclickbtn:function(e){
    var src = e.currentTarget.dataset.src;
    var a=this.data.a
    if (src.indexOf('-1.png')){
      this.data.a = src.replace('-1.png','-2.png')
    }else{
      this.data.a = src.replace('-2.png', '-1.png')
    }
 
  },
  chooseImg: function (e) {
    this.setData({
      curIdx: e.currentTarget.dataset.current
    })
  },
  onShareAppMessage: function() {
    return {
      title: '校园新雷锋',
      desc: '校园新雷锋',
      path: '/pages/index/index'
    }
  },
  onPullDownRefresh() {
    // 增加下拉刷新数据的功能
    this.getIndexData();
    this.requestPageData()
  },
  getIndexData: function() {
    let that = this;
    var data = new Object();
    util.request(api.IndexUrlBanner).then(function(res) {
      if (res.errno === 0) {
        data.banner = res.data.banner
        that.setData(data);
      }
    });

  },
  //等比例缩放图片
  imageLoad: function(e) {
    var imageSize = util.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
 
  bindPickerChange: function (e) {
    var id = this.data.array[e.detail.value].index
    this.setData({
      id: id,
      index: e.detail.value,
    })
    this.requestPageData()
  },
 
  // 请求页面数据渲染
  requestPageData: function() {
    let that = this;
    var index=that.data.index;
    var _num = that.data._num;
    // console.log("index============"+index)
    util.request(api.Micro_helpList, {
      helpType: index,
      userGroup:_num
    }).then(function(res) {
      // console.log("66666666666666666===" + JSON.stringify(res.data))
      if (res.errno === 0) {
        that.setData({
          helpListPage: res.data.data
        });
      }
    });
  },

  // 抢单按钮
  grabSheet: function(e) {
    var id = e.currentTarget.dataset.id;
    let that = this;
    util.request(api.Micro_helpGoHelp, {
      helpId: id,
    }).then(function(res) {
      // console.log(res)
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
      } else if (res.msgNo === 0){//抢单成功
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 1000
        })
        setTimeout(function () {
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/detailsPage/detailsPage?helpId=' + id
          })
        }, 1000);
        
      }else{
        util.showErrorToast(res.message);
      }
     
    });
  },
  onReachBottom: function () {
    var that = this;
    var index = that.data.index;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    page = page + 1;
    util.request(api.Micro_helpList, {
      helpType: index,
      page:page
    }).then(function (res) {
      if (res.errno === 0) {
        var moment_list = that.data.helpListPage;
        const oldData = that.data.helpListPage;
        that.setData({
          helpListPage: oldData.concat(res.data.data)
        });
        // 隐藏加载框
        wx.hideLoading();
      }
    });
  },
  onLoad: function (options) {

  },
  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    // 页面显示
    var that = this;
    that.getIndexData();
    this.requestPageData();
    util.request(api.QueryUserUniversity, {}).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          university: res.data
        });
      }
    });
    var userId = wx.getStorageSync("userId");
    that.setData({
      userId: userId
    });
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
})