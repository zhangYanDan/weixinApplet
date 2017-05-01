// pages/search/search.js
var app=getApp();
Page({
  data:{
    windowH:"",
    location:"",
    searchResult:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    that.setData({
      windowH:app.globalData.systemInfo.screenHeight
    });
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        that.setData({
          location:res.longitude+","+res.latitude
        })
      }
    })
  },
  confirmInput:function(event){
    var that=this;
    var input_val=event.detail.value;
    wx.request({
      url: 'https://restapi.amap.com/v3/place/around?parameters',
      data: {'key':'66d5e6b0731da647f9bb27bdc799ae2b','keywords':input_val,'city':'江西','children':'1','offset':'20','location':that.data.location},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        var options=res.data.pois
        for(var i=0;i<options.length;i++){
          options[i].distance=(options[i].distance/1000).toFixed(1);
          options[i].address=(options[i].address).split(';')
        }
        that.setData({
          searchResult:options
        }) 
      }
    })
  },
  goRoutePlan:function(e){
    var id=e.currentTarget.dataset.id;
    var that=this;
    var tapObj=that.data.searchResult[id];
    var startLoca=that.data.location;
    var endLoca=tapObj.location;
    var s_e_loca={startLoca,endLoca};
    wx.redirectTo({
      url: '../routeplan/routeplan',
      success: function(res){
        wx.setStorage({
          key: 'location',
          data: s_e_loca,
          success: function(res){
            // success
          }
        })
      }
    })
        
    
  }
})