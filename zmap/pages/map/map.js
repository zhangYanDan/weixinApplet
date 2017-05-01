//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    windowH: "",
    searchRes: "",
    longitude: "115.89",
    latitude: "28.68",
    controls: [{
      id: 1,
      iconPath: "/resouces/icon1.jpg",
      position: {
        left: 10,
        top: 450,
        width: 30,
        height: 30
      },
      clickable: true
    }, {
      id: 2,
      iconPath: "/resouces/icon2.jpg",
      position: {
        left: 60,
        top: 450,
        width: 30,
        height: 30
      },
      clickable: true
    }, {
      id: 3,
      iconPath: "/resouces/icon3.jpg",
      position: {
        left: 10,
        top: 10,
        width: 300,
        height: 38
      },
      clickable: true
    }]
  },
  onLoad: function () {
    var that = this;
    that.mapCtx = wx.createMapContext('navi_map')
    var windowH = app.globalData.systemInfo.windowHeight;

    var icon1Top = (app.globalData.systemInfo.windowHeight - 30 - 20)
    var icon2Top = (app.globalData.systemInfo.windowHeight - 30 - 20)
    var icon3Left = (app.globalData.systemInfo.windowWidth - 300) / 2;
    var controls = [{
      id: 1,
      iconPath: "/resouces/icon1.jpg",
      position: {
        left: 10,
        top: icon1Top,
        width: 30,
        height: 30
      },
      clickable: true
    }, {
      id: 2,
      iconPath: "/resouces/icon2.jpg",
      position: {
        left: 60,
        top: icon2Top,
        width: 30,
        height: 30
      },
      clickable: true
    }, {
      id: 3,
      iconPath: "/resouces/icon3.jpg",
      position: {
        left: icon3Left,
        top: 10,
        width: 300,
        height: 38
      },
      clickable: true
    }];
    //定位当前位置
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })
    that.setData({
      windowH: windowH,
      controls: controls,

    })
  },
  controlstap: function (event) {
    var id = event.controlId;
    var that = this;
    switch (id) {
      case 1://定位到当前位置
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            that.setData({
              latitude: latitude,
              longitude: longitude
            })
          }
        })
        that.mapCtx.getCenterLocation({
          success: function (res) {
            that.mapCtx.moveToLocation();
          }
        })
        break;
      case 2://查找附近
        wx.navigateTo({
          url: '../routeplan/routeplan',
          success: function (res) {
            // success
          }
        })
        break;
      case 3://搜索关键字查找地点
        wx.navigateTo({
          url: '../search/search',
          success: function (res) {
            // success
          }
        })
        break;
    }
  }
})


