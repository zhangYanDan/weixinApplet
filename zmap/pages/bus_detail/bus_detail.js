// pages/bus_detail/bus_detail.js
Page({
  data:{
    transits:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    wx.getStorage({
      key: 'transits',
      success: function(res){
        var transits;
        transits=res.data;
        for(var i=0;i<transits.length;i++){
          transits[i].duration=(transits[i].duration/60).toFixed(0);
        }

        that.setData({
          transits:res.data
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})