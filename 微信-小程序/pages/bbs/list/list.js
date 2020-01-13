const app = getApp()
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

Page({
  data: {
    currentTab: 0,
    currentTab2: 0,
    page: 1,//第几页
    size: 10,//每页显示的条数
    keywords: '',
    category1: 5,
    category2: -1,
    listPage: [],//列表页面信息
    category1List: [{ "parid": "0", "regname": "学术研讨", "regid": "1" }, { "parid": "0", "regname": "谈情说爱", "regid": "5" }, { "parid": "0", "regname": "体育修身", "regid": "10" }, { "parid": "0", "regname": "广而告之", "regid": "16" }, { "parid": "0", "regname": "社团群体", "regid": "22" }, { "parid": "0", "regname": "学校的事", "regid": "26" }],
    category2List: [{ "parid": "5", "regname": "鹊桥", "regid": "6" }, { "parid": "5", "regname": "情诗", "regid": "7" }, { "parid": "5", "regname": "表白墙", "regid": "8" }, { "parid": "5", "regname": "情感抒发", "regid": "9" }],
    categoryList: { "22": [{ "parid": "22", "regname": "学生会", "regid": "23" }, { "parid": "22", "regname": "社团", "regid": "24" }, { "parid": "22", "regname": "俱乐部", "regid": "25" }], "26": [{ "parid": "26", "regname": "教务", "regid": "27" }, { "parid": "26", "regname": "食堂", "regid": "28" }, { "parid": "26", "regname": "超市", "regid": "29" }, { "parid": "26", "regname": "花店/水果店", "regid": "30" }], "10": [{ "parid": "10", "regname": "篮球", "regid": "11" }, { "parid": "10", "regname": "足球", "regid": "12" }, { "parid": "10", "regname": "羽毛球", "regid": "13" }, { "parid": "10", "regname": "健美健身", "regid": "14" }, { "parid": "10", "regname": "户外运动", "regid": "15" }], "16": [{ "parid": "16", "regname": "租房", "regid": "17" }, { "parid": "16", "regname": "求职", "regid": "18" }, { "parid": "16", "regname": "招聘", "regid": "19" }, { "parid": "16", "regname": "免费赠送", "regid": "20" }, { "parid": "16", "regname": "求助", "regid": "21" }], "1": [{ "parid": "1", "regname": "文科类", "regid": "2" }, { "parid": "1", "regname": "理科类", "regid": "3" }, { "parid": "1", "regname": "工科类", "regid": "4" }], "5": [{ "parid": "5", "regname": "鹊桥", "regid": "6" }, { "parid": "5", "regname": "情诗", "regid": "7" }, { "parid": "5", "regname": "表白TA", "regid": "8" }, { "parid": "5", "regname": "情感抒发", "regid": "9" }] },
  },
  //一级分类切换
  switchNav: function (e) {
    // console.log(e);
    var that = this;
    var id = e.target.id;
    if (id == that.data.category1) {//取消选择
      that.setData({ "category1": -1, "category2List": [] });
    } else {//选中
      var tempId = JSON.parse('"' + id + '"');
      var cate2List = that.data.categoryList[tempId];
      that.setData({ "category1": tempId, "category2List": cate2List });
    }
    this.requestPageData();
  },
  //二级分类切换
  switchNav2: function (e) {
    var that = this;
    that.setData({ "category2": e.target.id == that.data.category2 ? -1 : e.target.id });
    this.requestPageData();
  },
  keywordsInput: function (e) {
    this.setData({
      keywords: e.detail.value
    });
  },
  //搜索
  search: function (e) {
    this.requestPageData();
  },
  // 请求页面数据渲染
  requestPageData: function () {
    let that = this;
    var category1 = that.data.category1;
    var category2 = that.data.category2;
    var keywords = that.data.keywords;
    var page = that.data.page;
    var size = that.data.size;
    util.request(api.BBSList, {
      board1: category1,
      board2: category2,
      keywords: keywords,
      page: page,
      size: size
    }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          listPage: res.data.data
        });
      }
    });
  },
  onLoad: function (options) {
    var that = this;
    var category1 = options.category1;
    if (category1 != undefined) {
      var tempId = JSON.parse('"' + category1 + '"');
      var cate2List = that.data.categoryList[tempId];
      that.setData({ "category1": category1, "category2List": cate2List });
    } else {
      that.setData({ "category1": -1, "category2List": [] });
    }
  },
  //至顶部
  goTop: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  },
  onShow: function (e) {
    this.requestPageData();
  },
  onPullDownRefresh: function () {
    // 增加下拉刷新数据的功能
    this.requestPageData();
  },
  onReachBottom: function () {
    var that = this;
    var category1 = that.data.category1;
    var category2 = that.data.category2;
    var keywords = that.data.keywords;
    var page = that.data.page;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中...',
    });
    // 页数+1
    page = page + 1;
    util.request(api.BBSList, {
      board1: category1,
      board2: category2,
      keywords: keywords,
      page: page
    }).then(function (res) {
      if (res.errno === 0) {
        const oldData = that.data.listPage;
        that.setData({
          listPage: oldData.concat(res.data.data)
        });
        // 隐藏加载框
        wx.hideLoading();
      }
    });
  },
})

