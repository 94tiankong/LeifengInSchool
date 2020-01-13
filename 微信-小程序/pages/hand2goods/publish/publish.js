const app = getApp();
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var list = [];
var list2 = [{ "parid": "12", "regname": "手机", "regid": "13" }, { "parid": "12", "regname": "笔记本", "regid": "14" }, { "parid": "12", "regname": "台式机", "regid": "15" }, { "parid": "12", "regname": "平板电脑", "regid": "16" }, { "parid": "12", "regname": "摄影器材", "regid": "17" }, { "parid": "12", "regname": "耳机", "regid": "18" }, { "parid": "12", "regname": "音箱/音响", "regid": "19" }, { "parid": "12", "regname": "移动电源", "regid": "20" }, { "parid": "12", "regname": "kindel/电子书", "regid": "21" }, { "parid": "12", "regname": "存储设备", "regid": "22" }, { "parid": "12", "regname": "摄像头", "regid": "23" }, { "parid": "12", "regname": "游戏机", "regid": "24" }, { "parid": "12", "regname": "智能穿戴", "regid": "25" }, { "parid": "12", "regname": "其他数码", "regid": "26" }, { "parid": "12", "regname": "路由器/交换机", "regid": "55" }, { "parid": "12", "regname": "手机配件", "regid": "56" }, { "parid": "12", "regname": "电脑配件", "regid": "57" }];
Page({
  data: {
    titleLength:0,
    goodsDescLength:0,
    mediaArr: [],
    // surplusMediaCount: 3 ,
    deliverWays: [
      { name: '包送', value: '2',checked:'' },
      { name: '自取', value: '1', checked: 'true' },
    ],
    title:'',//物品标题
    goodsDesc:'',//物品描述
    category1:12,//一级分类
    category2:13,//二级分类
    originalPrice:'',//原价
    currentPrice:'',//转让价
    deliverWay:1,//交易方式
    shippingAddr:'',//取货点,
    multiIndex: [1, 0],
    multiArray: [["图书", "电子数码", "交通工具", "家用电器", "家居家具", "办公用品", "文具乐器", "票务卡券", "运动户外", "服装鞋帽", "美妆个护", "奢饰品", "租房", "其他二手", "打包出售"], ["手机", "笔记本", "台式机", "平板电脑", "摄影器材", "耳机", "音箱/音响", "移动电源", "kindel/电子书", "存储设备", "摄像头", "游戏机", "智能穿戴", "其他数码"]],
    objectMultiArray:
      [{ "parid": "0", "regname": "图书", "regid": "1" }, { "parid": "0", "regname": "电子数码", "regid": "12" }, { "parid": "0", "regname": "交通工具", "regid": "27" }, { "parid": "0", "regname": "家用电器", "regid": "35" }, { "parid": "0", "regname": "家居家具", "regid": "43" }, { "parid": "0", "regname": "办公用品", "regid": "58" }, { "parid": "0", "regname": "文具乐器", "regid": "63" }, { "parid": "0", "regname": "票务卡券", "regid": "73" }, { "parid": "0", "regname": "运动户外", "regid": "87" }, { "parid": "0", "regname": "服装鞋帽", "regid": "98" }, { "parid": "0", "regname": "美妆个护", "regid": "114" }, { "parid": "0", "regname": "奢饰品", "regid": "123" }, { "parid": "0", "regname": "租房", "regid": "131" }, { "parid": "0", "regname": "其他闲置", "regid": "137" }, { "parid": "0", "regname": "打包出售", "regid": "139" }, { "parid": "1", "regname": "教材教辅", "regid": "2" }, { "parid": "1", "regname": "考试资料", "regid": "3" }, { "parid": "1", "regname": "文学小说", "regid": "4" }, { "parid": "1", "regname": "经管励志", "regid": "5" }, { "parid": "1", "regname": "人文社科", "regid": "6" }, { "parid": "1", "regname": "科技科普", "regid": "7" }, { "parid": "1", "regname": "生活艺术", "regid": "8" }, { "parid": "1", "regname": "外文原版", "regid": "9" }, { "parid": "1", "regname": "唱片影像", "regid": "10" }, { "parid": "1", "regname": "其他图书", "regid": "11" }, { "parid": "12", "regname": "手机", "regid": "13" }, { "parid": "12", "regname": "笔记本", "regid": "14" }, { "parid": "12", "regname": "台式机", "regid": "15" }, { "parid": "12", "regname": "平板电脑", "regid": "16" }, { "parid": "12", "regname": "摄影器材", "regid": "17" }, { "parid": "12", "regname": "耳机", "regid": "18" }, { "parid": "12", "regname": "音箱/音响", "regid": "19" }, { "parid": "12", "regname": "移动电源", "regid": "20" }, { "parid": "12", "regname": "kindel/电子书", "regid": "21" }, { "parid": "12", "regname": "存储设备", "regid": "22" }, { "parid": "12", "regname": "摄像头", "regid": "23" }, { "parid": "12", "regname": "游戏机", "regid": "24" }, { "parid": "12", "regname": "智能穿戴", "regid": "25" }, { "parid": "12", "regname": "其他数码", "regid": "26" }, { "parid": "12", "regname": "路由器/交换机", "regid": "55" }, { "parid": "12", "regname": "手机配件", "regid": "56" }, { "parid": "12", "regname": "电脑配件", "regid": "57" }, { "parid": "27", "regname": "自行车", "regid": "28" }, { "parid": "27", "regname": "电动车", "regid": "29" }, { "parid": "27", "regname": "平衡车", "regid": "30" }, { "parid": "27", "regname": "摩托车", "regid": "31" }, { "parid": "27", "regname": "自行车/电动车/摩托车配件", "regid": "32" }, { "parid": "27", "regname": "汽车配件", "regid": "33" }, { "parid": "27", "regname": "其他代步工具", "regid": "34" }, { "parid": "35", "regname": "洗衣机", "regid": "36" }, { "parid": "35", "regname": "冰箱", "regid": "37" }, { "parid": "35", "regname": "热水器", "regid": "38" }, { "parid": "35", "regname": "电视机", "regid": "39" }, { "parid": "35", "regname": "厨房电器", "regid": "40" }, { "parid": "35", "regname": "生活小家电", "regid": "41" }, { "parid": "35", "regname": "其他家电", "regid": "42" }, { "parid": "35", "regname": "插排/网线", "regid": "54" }, { "parid": "43", "regname": "沙发", "regid": "44" }, { "parid": "43", "regname": "床/床垫", "regid": "45" }, { "parid": "43", "regname": "柜子", "regid": "46" }, { "parid": "43", "regname": "桌子/茶几", "regid": "47" }, { "parid": "43", "regname": "椅子/凳子", "regid": "48" }, { "parid": "43", "regname": "衣架/架子", "regid": "49" }, { "parid": "43", "regname": "家纺", "regid": "50" }, { "parid": "43", "regname": "灯具照明", "regid": "51" }, { "parid": "43", "regname": "鞋架", "regid": "52" }, { "parid": "43", "regname": "垃圾桶", "regid": "53" }, { "parid": "58", "regname": "打印机/复印机", "regid": "59" }, { "parid": "58", "regname": "投影仪", "regid": "60" }, { "parid": "58", "regname": "文具耗材", "regid": "61" }, { "parid": "58", "regname": "其他办公用品", "regid": "62" }, { "parid": "63", "regname": "玩具", "regid": "64" }, { "parid": "63", "regname": "吉他", "regid": "65" }, { "parid": "63", "regname": "钢琴", "regid": "66" }, { "parid": "63", "regname": "电子琴", "regid": "67" }, { "parid": "63", "regname": "古筝", "regid": "68" }, { "parid": "63", "regname": "架子鼓", "regid": "69" }, { "parid": "63", "regname": "小提琴", "regid": "70" }, { "parid": "63", "regname": "二胡", "regid": "71" }, { "parid": "63", "regname": "其他乐器", "regid": "72" }, { "parid": "73", "regname": "美食券", "regid": "74" }, { "parid": "73", "regname": "咖啡券", "regid": "75" }, { "parid": "73", "regname": "健身卡", "regid": "76" }, { "parid": "73", "regname": "冰淇淋券", "regid": "77" }, { "parid": "73", "regname": "电影票", "regid": "78" }, { "parid": "73", "regname": "赛事演出", "regid": "79" }, { "parid": "73", "regname": "美容美发卡", "regid": "80" }, { "parid": "73", "regname": "蛋糕/甜品卡", "regid": "81" }, { "parid": "73", "regname": "购物卡", "regid": "82" }, { "parid": "73", "regname": "洗衣卡", "regid": "83" }, { "parid": "73", "regname": "话费卡", "regid": "84" }, { "parid": "73", "regname": "景点门票", "regid": "85" }, { "parid": "73", "regname": "其他卡券", "regid": "86" }, { "parid": "87", "regname": "舞蹈瑜伽用品", "regid": "88" }, { "parid": "87", "regname": "轮滑", "regid": "89" }, { "parid": "87", "regname": "游泳用品", "regid": "90" }, { "parid": "87", "regname": "户外装备", "regid": "91" }, { "parid": "87", "regname": "健身训练器材", "regid": "92" }, { "parid": "87", "regname": "篮球/足球", "regid": "93" }, { "parid": "87", "regname": "羽毛球/乒乓球", "regid": "94" }, { "parid": "87", "regname": "垂钓用品", "regid": "95" }, { "parid": "87", "regname": "桌游棋牌", "regid": "96" }, { "parid": "87", "regname": "其他运动用品", "regid": "97" }, { "parid": "98", "regname": "女装套装", "regid": "99" }, { "parid": "98", "regname": "男装套装", "regid": "100" }, { "parid": "98", "regname": "女装上衣", "regid": "101" }, { "parid": "98", "regname": "女装裤子", "regid": "102" }, { "parid": "98", "regname": "裙子", "regid": "103" }, { "parid": "98", "regname": "男装上衣", "regid": "104" }, { "parid": "98", "regname": "男装裤子", "regid": "105" }, { "parid": "98", "regname": "男鞋", "regid": "106" }, { "parid": "98", "regname": "女鞋", "regid": "107" }, { "parid": "98", "regname": "女包", "regid": "108" }, { "parid": "98", "regname": "男包", "regid": "109" }, { "parid": "98", "regname": "行李箱", "regid": "110" }, { "parid": "98", "regname": "帽子", "regid": "111" }, { "parid": "98", "regname": "家居服/内衣", "regid": "112" }, { "parid": "98", "regname": "其他服装", "regid": "113" }, { "parid": "114", "regname": "护肤", "regid": "115" }, { "parid": "114", "regname": "彩妆", "regid": "116" }, { "parid": "114", "regname": "口腔护理", "regid": "117" }, { "parid": "114", "regname": "香水", "regid": "118" }, { "parid": "114", "regname": "面膜", "regid": "119" }, { "parid": "114", "regname": "洗发护发", "regid": "120" }, { "parid": "114", "regname": "美容工具", "regid": "121" }, { "parid": "114", "regname": "其他美容用品", "regid": "122" }, { "parid": "123", "regname": "包袋", "regid": "124" }, { "parid": "123", "regname": "腕表", "regid": "125" }, { "parid": "123", "regname": "首饰/配饰", "regid": "126" }, { "parid": "123", "regname": "服装", "regid": "127" }, { "parid": "123", "regname": "鞋靴", "regid": "128" }, { "parid": "123", "regname": "玉翠珠宝", "regid": "129" }, { "parid": "123", "regname": "其他奢饰品", "regid": "130" }, { "parid": "131", "regname": "整租", "regid": "132" }, { "parid": "131", "regname": "单间", "regid": "133" }, { "parid": "131", "regname": "床铺", "regid": "134" }, { "parid": "131", "regname": "短租/日租", "regid": "135" }, { "parid": "131", "regname": "合租", "regid": "136" }, { "parid": "137", "regname": "闲置物品", "regid": "138" }, { "parid": "139", "regname": "同类打包", "regid": "140" }, { "parid": "139", "regname": "非同类打包", "regid": "141" }],
  },
  bindMultiPickerChange: function (e) {
    var that = this;
    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1],
      "category1": list2[e.detail.value[1]].parid,
      "category2": list2[e.detail.value[1]].regid,
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this ;
    switch (e.detail.column) {
      case 0:
        list = [];
        list2 = [];
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
          if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) {
            list.push(that.data.objectMultiArray[i].regname);
            list2.push(that.data.objectMultiArray[i]);
          }
        }
        that.setData({
          "multiArray[1]": list,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        })

    }
  },
  //图片预览
  previewImg: function (e) {
    var src = e.currentTarget.dataset.imgsrc;
    var imgArr = [src];
    wx.previewImage({
      current: src,     //当前图片地址
      urls: imgArr,//所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //视频播放错误
  videoErrorCallback: function (e) {
    util.showErrorToast(e.detail.errMsg);
  },

  //删除图片
  delImg: function (e) {
    var that = this ;
    var src = e.currentTarget.dataset.imgsrc;
    var newMediaArr = [];
    var oldMediaArr = that.data.mediaArr;
    for(var i = 0 ; i < oldMediaArr.length ; i ++){
      var media = oldMediaArr[i];
      if(media.mediaUrl != src){
        newMediaArr.push(media);
      }
    }
    that.setData({
      mediaArr:newMediaArr
    })
  },

  onLoad: function () {

  }, 

  //添加视频和图片
  addMedia: function () {
    var that = this;
    var mediaMaxCount = 3 - that.data.mediaArr.length;//最多三张
    wx.showActionSheet({
      itemList: ['图片', '视频'],
      itemColor: '#007aff',
      success(res) {
        // console.log(res.tapIndex);
        if (res.tapIndex === 0) {
          wx.chooseImage({//选择图片
            count: mediaMaxCount, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var mediaSize = res.tempFiles[0].size / 1024 / 1024;
              // console.log("res====="+JSON.stringify(res));
              // console.log(mediaSize + "M 图片大小");
              if (mediaSize > 1) {//超过1M，不能上传。
                util.showErrorToast("图片不超过1M");
                return false;
              }
              wx.showLoading({
                title: '上传中'
              }),

              wx.uploadFile({
                url: api.UploadImg,//这里是图片上传的接口
                filePath: res.tempFilePaths[0],//这里是选取的图片的地址数组，
                name: 'file',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                success: function (res2) {
                  wx.hideLoading();
                  var jsonObj = JSON.parse(res2.data)
                  if (jsonObj.errno == "0") {
                    that.data.mediaArr.push({ "mediaType": "1", "mediaUrl": jsonObj.data});
                    console.log("media==" + JSON.stringify(that.data.mediaArr));
                    //图片上传成功
                    that.setData({
                      mediaArr: that.data.mediaArr
                    })
                  } else {
                    util.showErrorToast(jsonObj.errmsg);
                  }
                },
                fail: function (res3) {
                  wx.hideLoading();
                  var jsonObj = JSON.parse(res3.data)
                  // console.log("res3=" + res3);
                  util.showErrorToast(res3.errmsg);
                }
              });

            }
          });
        } else if (res.tapIndex === 1) {

          wx.chooseVideo({//视频
            count: mediaMaxCount, // 默认9
            //相机和相册
            sourceType: ['album', 'camera'],
            //录制视频最大时长
            maxDuration: 10,
            //摄像头
            camera: ['front', 'back'],
            //这里返回的是tempFilePaths并不是tempFilePath
            success: function (res) {
              var mediaSize = res.size / 1024 / 1024 ;
              // console.log("res=====" + JSON.stringify(res));
              if (mediaSize > 5){//超过5M，不能上传。
                util.showErrorToast("视频不超过5M");
                return false;
              }
              if (res.duration >= 11){//超过10秒不能上传
                util.showErrorToast("时长不超10秒");
                return false;
              }

              wx.uploadFile({
                url: api.UploadVideo,//这里是视频上传的接口
                filePath: res.tempFilePath,//这里是选取的视频
                name: 'file',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                success: function (res2) {
                  wx.hideLoading();
                  var jsonObj = JSON.parse(res2.data)
                  if (jsonObj.errno == "0") {
                    that.data.mediaArr.push({ "mediaType": "2", "mediaUrl": jsonObj.data });
                    //上传成功
                    // console.log("media==" + JSON.stringify(that.data.mediaArr));
                    //图片上传成功
                    that.setData({
                      mediaArr: that.data.mediaArr
                    })
                  } else {
                    util.showErrorToast(jsonObj.errmsg);
                  }
                },
                fail: function (res3) {
                  wx.hideLoading();
                  var jsonObj = JSON.parse(res3.data)
                  // console.log("res3=" + res3);
                  util.showErrorToast(res3.errmsg);
                }
              });

            },
            fail: function (e) {
              console.log(e)
            }
          })


        }
      }
    })
  },
  saveHand2Goods:function(e){
    let that = this;
    if(that.data.mediaArr.length == 0){
      util.showErrorToast('上传图片或视频');
      return false;
    }
    if (that.data.mediaArr.length > 3) {
      util.showErrorToast('图片/视频过多');
      return false;
    }
    if (that.data.title == '') {
      util.showErrorToast('请输入标题');
      return false;
    }
    if (that.data.goodsDesc == '') {
      util.showErrorToast('请输入描述');
      return false;
    }
    if (that.data.category1 == '' || that.data.category2 == ''){
      util.showErrorToast('请选择分类');
      return false;
    }
    console.log("cate1="+that.data.category1);
    console.log("cate2=" + that.data.category2);
    if (that.data.currentPrice == '') {
      util.showErrorToast('请输入转让价');
      return false;
    }
    let str = /^\d+(.\d{1,2})?$/;
    if (!str.test(that.data.currentPrice)) {
      util.showErrorToast('转让价两位小数');
      return false;
    }
    if (that.data.originalPrice == '') {
      util.showErrorToast('请输入原价');
      return false;
    }
    if (!str.test(that.data.originalPrice)) {
      util.showErrorToast('原价两位小数');
      return false;
    }
    if(that.data.deliverWay == 1 && that.data.shippingAddr == ''){//自取
      util.showErrorToast('请输入取货点');
      return false;
    }
    if(that.data.deliverWay == 2){
      that.setData({
        "shippingAddr":""
      })
    }
    wx.showLoading({
      title: '提交中...',
      mask: true,
      success: function () {
      }
    });
    //发布
    util.request(api.Hand2GoodsPublish, {
      mediaList: that.data.mediaArr,
      title: that.data.title,
      goodsDesc: that.data.goodsDesc,
      category1: that.data.category1,
      category2: that.data.category2,
      originalPrice: that.data.originalPrice,
      currentPrice: that.data.currentPrice,
      deliverWay: that.data.deliverWay,
      shippingAddr: that.data.shippingAddr
    },"POST","application/json").then(function (res) {
      if(res.errno == 0){//保存成功
        var goodsNo = res.data;
        wx.navigateTo({
          url: '/pages/successfulRelease/successfulRelease?goodsNo=' + goodsNo
        })
      }else{//保存失败
        util.showErrorToast(res.errmsg);
      }
      console.log("发布保存结果res="+JSON.stringify(res));
      wx.hideLoading();
    });

  },
  //交易方式
  radioChange: function (e) {
    var val = e.detail.value;
    this.setData({
      deliverWay: val,
    })
  },
  //输入标题
  bindInputTitle: function (e) {
    this.setData({
      title: e.detail.value,
      titleLength: e.detail.cursor,
    })
  },
  //输入描述
  bindInputGoodsDesc: function (e) {
    this.setData({
      goodsDesc: e.detail.value,
      goodsDescLength: e.detail.cursor,
    })
  },
  //输入转让价
  bindInputCurrentPrice: function (e) {
    this.setData({
      currentPrice: e.detail.value,
    })
  },
  //输入原价
  bindInputOriginalPrice: function (e) {
    this.setData({
      originalPrice: e.detail.value,
    })
  },
  //输入取货点
  bindInputShippingAddr: function (e) {
    this.setData({
      shippingAddr: e.detail.value,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})
