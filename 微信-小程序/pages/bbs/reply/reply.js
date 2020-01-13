var initData = 'this is first line\nthis is second line'
var extraLine = [];
Page({
  data: {
    title: '',
    bbsNo:''
  },
 onLoad:function(options){
   var that = this ;
   that.setData({
     title: options.title,
     bbsNo: options.bbsNo
   });
 },
 onShow:function(e){

 },
})