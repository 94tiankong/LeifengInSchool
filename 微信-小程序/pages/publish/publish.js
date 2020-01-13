Page({
  data: {
    animationData: {}, //内容动画
    animationMask: {} //蒙板动画
  },
  onLoad: function () {
    this.animateTrans = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    this.animateFade = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
   
  },
  onShow: function(e){
    this.showModal();
  },
  // 显示
  showModal: function () {
    this.animateTrans.translateY(0).step()
    this.animateFade.opacity(1).step()
    this.setData({
      animationData: this.animateTrans.export(), //动画实例的export方法导出动画数据传递给组件的animation属性
      animationMask: this.animateFade.export()
    })
  },

  // 隐藏
  hideModal: function () {
    this.animateTrans.translateY(300).step()
    this.animateFade.opacity(0).step()
    this.setData({
      animationData: this.animateTrans.export(),
      animationMask: this.animateFade.export()
    });

    wx.switchTab({
      url: '/pages/index/index',
    });
    
  }

})