const app = getApp()
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

Page({
  data: {
    currentTab:0,
    currentTab2:0,
    page:1,//第几页
    size:10,//每页显示的条数
    keywords:'',
    category1:12,
    category2:-1,
    listPage:[],//列表页面信息
    category1List: [{ "parid": "0", "regname": "图书", "regid": "1" }, { "parid": "0", "regname": "电子数码", "regid": "12" }, { "parid": "0", "regname": "交通工具", "regid": "27" }, { "parid": "0", "regname": "家用电器", "regid": "35" }, { "parid": "0", "regname": "家居家具", "regid": "43" }, { "parid": "0", "regname": "办公用品", "regid": "58" }, { "parid": "0", "regname": "文具乐器", "regid": "63" }, { "parid": "0", "regname": "票务卡券", "regid": "73" }, { "parid": "0", "regname": "运动户外", "regid": "87" }, { "parid": "0", "regname": "服装鞋帽", "regid": "98" }, { "parid": "0", "regname": "美妆个护", "regid": "114" }, { "parid": "0", "regname": "奢饰品", "regid": "123" }, { "parid": "0", "regname": "租房", "regid": "131" }, { "parid": "0", "regname": "其他闲置", "regid": "137" }, { "parid": "0", "regname": "打包出售", "regid": "139" }],
    category2List: [{ "parid": "12", "regname": "手机", "regid": "13" }, { "parid": "12", "regname": "笔记本", "regid": "14" }, { "parid": "12", "regname": "台式机", "regid": "15" }, { "parid": "12", "regname": "平板电脑", "regid": "16" }, { "parid": "12", "regname": "摄影器材", "regid": "17" }, { "parid": "12", "regname": "耳机", "regid": "18" }, { "parid": "12", "regname": "音箱/音响", "regid": "19" }, { "parid": "12", "regname": "移动电源", "regid": "20" }, { "parid": "12", "regname": "kindel/电子书", "regid": "21" }, { "parid": "12", "regname": "存储设备", "regid": "22" }, { "parid": "12", "regname": "摄像头", "regid": "23" }, { "parid": "12", "regname": "游戏机", "regid": "24" }, { "parid": "12", "regname": "智能穿戴", "regid": "25" }, { "parid": "12", "regname": "其他数码", "regid": "26" }, { "parid": "12", "regname": "路由器/交换机", "regid": "55" }, { "parid": "12", "regname": "手机配件", "regid": "56" }, { "parid": "12", "regname": "电脑配件", "regid": "57" }],
categoryList: { "27": [{ "parid": "27", "regname": "自行车", "regid": "28" }, { "parid": "27", "regname": "电动车", "regid": "29" }, { "parid": "27", "regname": "平衡车", "regid": "30" }, { "parid": "27", "regname": "摩托车", "regid": "31" }, { "parid": "27", "regname": "自行车/电动车/摩托车配件", "regid": "32" }, { "parid": "27", "regname": "汽车配件", "regid": "33" }, { "parid": "27", "regname": "其他代步工具", "regid": "34" }], "131": [{ "parid": "131", "regname": "整租", "regid": "132" }, { "parid": "131", "regname": "单间", "regid": "133" }, { "parid": "131", "regname": "床铺", "regid": "134" }, { "parid": "131", "regname": "短租/日租", "regid": "135" }, { "parid": "131", "regname": "合租", "regid": "136" }], "114": [{ "parid": "114", "regname": "护肤", "regid": "115" }, { "parid": "114", "regname": "彩妆", "regid": "116" }, { "parid": "114", "regname": "口腔护理", "regid": "117" }, { "parid": "114", "regname": "香水", "regid": "118" }, { "parid": "114", "regname": "面膜", "regid": "119" }, { "parid": "114", "regname": "洗发护发", "regid": "120" }, { "parid": "114", "regname": "美容工具", "regid": "121" }, { "parid": "114", "regname": "其他美容用品", "regid": "122" }], "137": [{ "parid": "137", "regname": "闲置物品", "regid": "138" }], "139": [{ "parid": "139", "regname": "同类打包", "regid": "140" }, { "parid": "139", "regname": "非同类打包", "regid": "141" }], "73": [{ "parid": "73", "regname": "美食券", "regid": "74" }, { "parid": "73", "regname": "咖啡券", "regid": "75" }, { "parid": "73", "regname": "健身卡", "regid": "76" }, { "parid": "73", "regname": "冰淇淋券", "regid": "77" }, { "parid": "73", "regname": "电影票", "regid": "78" }, { "parid": "73", "regname": "赛事演出", "regid": "79" }, { "parid": "73", "regname": "美容美发卡", "regid": "80" }, { "parid": "73", "regname": "蛋糕/甜品卡", "regid": "81" }, { "parid": "73", "regname": "购物卡", "regid": "82" }, { "parid": "73", "regname": "洗衣卡", "regid": "83" }, { "parid": "73", "regname": "话费卡", "regid": "84" }, { "parid": "73", "regname": "景点门票", "regid": "85" }, { "parid": "73", "regname": "其他卡券", "regid": "86" }], "98": [{ "parid": "98", "regname": "女装套装", "regid": "99" }, { "parid": "98", "regname": "男装套装", "regid": "100" }, { "parid": "98", "regname": "女装上衣", "regid": "101" }, { "parid": "98", "regname": "女装裤子", "regid": "102" }, { "parid": "98", "regname": "裙子", "regid": "103" }, { "parid": "98", "regname": "男装上衣", "regid": "104" }, { "parid": "98", "regname": "男装裤子", "regid": "105" }, { "parid": "98", "regname": "男鞋", "regid": "106" }, { "parid": "98", "regname": "女鞋", "regid": "107" }, { "parid": "98", "regname": "女包", "regid": "108" }, { "parid": "98", "regname": "男包", "regid": "109" }, { "parid": "98", "regname": "行李箱", "regid": "110" }, { "parid": "98", "regname": "帽子", "regid": "111" }, { "parid": "98", "regname": "家居服/内衣", "regid": "112" }, { "parid": "98", "regname": "其他服装", "regid": "113" }], "12": [{ "parid": "12", "regname": "手机", "regid": "13" }, { "parid": "12", "regname": "笔记本", "regid": "14" }, { "parid": "12", "regname": "台式机", "regid": "15" }, { "parid": "12", "regname": "平板电脑", "regid": "16" }, { "parid": "12", "regname": "摄影器材", "regid": "17" }, { "parid": "12", "regname": "耳机", "regid": "18" }, { "parid": "12", "regname": "音箱/音响", "regid": "19" }, { "parid": "12", "regname": "移动电源", "regid": "20" }, { "parid": "12", "regname": "kindel/电子书", "regid": "21" }, { "parid": "12", "regname": "存储设备", "regid": "22" }, { "parid": "12", "regname": "摄像头", "regid": "23" }, { "parid": "12", "regname": "游戏机", "regid": "24" }, { "parid": "12", "regname": "智能穿戴", "regid": "25" }, { "parid": "12", "regname": "其他数码", "regid": "26" }, { "parid": "12", "regname": "路由器/交换机", "regid": "55" }, { "parid": "12", "regname": "手机配件", "regid": "56" }, { "parid": "12", "regname": "电脑配件", "regid": "57" }], "35": [{ "parid": "35", "regname": "洗衣机", "regid": "36" }, { "parid": "35", "regname": "冰箱", "regid": "37" }, { "parid": "35", "regname": "热水器", "regid": "38" }, { "parid": "35", "regname": "电视机", "regid": "39" }, { "parid": "35", "regname": "厨房电器", "regid": "40" }, { "parid": "35", "regname": "生活小家电", "regid": "41" }, { "parid": "35", "regname": "其他家电", "regid": "42" }, { "parid": "35", "regname": "插排/网线", "regid": "54" }], "58": [{ "parid": "58", "regname": "打印机/复印机", "regid": "59" }, { "parid": "58", "regname": "投影仪", "regid": "60" }, { "parid": "58", "regname": "文具耗材", "regid": "61" }, { "parid": "58", "regname": "其他办公用品", "regid": "62" }], "1": [{ "parid": "1", "regname": "教材教辅", "regid": "2" }, { "parid": "1", "regname": "考试资料", "regid": "3" }, { "parid": "1", "regname": "文学小说", "regid": "4" }, { "parid": "1", "regname": "经管励志", "regid": "5" }, { "parid": "1", "regname": "人文社科", "regid": "6" }, { "parid": "1", "regname": "科技科普", "regid": "7" }, { "parid": "1", "regname": "生活艺术", "regid": "8" }, { "parid": "1", "regname": "外文原版", "regid": "9" }, { "parid": "1", "regname": "唱片影像", "regid": "10" }, { "parid": "1", "regname": "其他图书", "regid": "11" }], "123": [{ "parid": "123", "regname": "包袋", "regid": "124" }, { "parid": "123", "regname": "腕表", "regid": "125" }, { "parid": "123", "regname": "首饰/配饰", "regid": "126" }, { "parid": "123", "regname": "服装", "regid": "127" }, { "parid": "123", "regname": "鞋靴", "regid": "128" }, { "parid": "123", "regname": "玉翠珠宝", "regid": "129" }, { "parid": "123", "regname": "其他奢饰品", "regid": "130" }], "63": [{ "parid": "63", "regname": "玩具", "regid": "64" }, { "parid": "63", "regname": "吉他", "regid": "65" }, { "parid": "63", "regname": "钢琴", "regid": "66" }, { "parid": "63", "regname": "电子琴", "regid": "67" }, { "parid": "63", "regname": "古筝", "regid": "68" }, { "parid": "63", "regname": "架子鼓", "regid": "69" }, { "parid": "63", "regname": "小提琴", "regid": "70" }, { "parid": "63", "regname": "二胡", "regid": "71" }, { "parid": "63", "regname": "其他乐器", "regid": "72" }], "43": [{ "parid": "43", "regname": "沙发", "regid": "44" }, { "parid": "43", "regname": "床/床垫", "regid": "45" }, { "parid": "43", "regname": "柜子", "regid": "46" }, { "parid": "43", "regname": "桌子/茶几", "regid": "47" }, { "parid": "43", "regname": "椅子/凳子", "regid": "48" }, { "parid": "43", "regname": "衣架/架子", "regid": "49" }, { "parid": "43", "regname": "家纺", "regid": "50" }, { "parid": "43", "regname": "灯具照明", "regid": "51" }, { "parid": "43", "regname": "鞋架", "regid": "52" }, { "parid": "43", "regname": "垃圾桶", "regid": "53" }], "87": [{ "parid": "87", "regname": "舞蹈瑜伽用品", "regid": "88" }, { "parid": "87", "regname": "轮滑", "regid": "89" }, { "parid": "87", "regname": "游泳用品", "regid": "90" }, { "parid": "87", "regname": "户外装备", "regid": "91" }, { "parid": "87", "regname": "健身训练器材", "regid": "92" }, { "parid": "87", "regname": "篮球/足球", "regid": "93" }, { "parid": "87", "regname": "羽毛球/乒乓球", "regid": "94" }, { "parid": "87", "regname": "垂钓用品", "regid": "95" }, { "parid": "87", "regname": "桌游棋牌", "regid": "96" }, { "parid": "87", "regname": "其他运动用品", "regid": "97" }] },
  },
  //一级分类切换
  switchNav:function(e){
    // console.log(e);
    var that = this;
    var id = e.target.id;
    if (id == that.data.category1){//取消选择
      that.setData({ "category1": -1, "category2List":[]});
    }else{//选中
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
  //视频播放错误
  videoErrorCallback: function (e) {
    util.showErrorToast(e.detail.errMsg);
  },
  keywordsInput:function(e){
    this.setData({
      keywords: e.detail.value
    });
  },
  //搜索
  search:function(e){
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
    util.request(api.Hand2GoodsList, {
      category1: category1,
      category2: category2,
      keywords: keywords,
      page: page,
      size:size
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
    if(category1 != undefined){
      var tempId = JSON.parse('"' + category1 + '"') ;
      var cate2List = that.data.categoryList[tempId];
      that.setData({ "category1": category1, "category2List": cate2List});
    }else{
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
  onShow:function(e){
    this.requestPageData();
  },
  onPullDownRefresh: function() {
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
    util.request(api.Hand2GoodsList, {
      category1: category1,
      category2: category2,
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
