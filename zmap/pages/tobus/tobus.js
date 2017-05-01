var amapFile = require('../../resouces/amap-wx.js');
var config = require('../../resouces/config.js');
var app = getApp();
Page({
  data: {
    markers: [{
      iconPath: "../../resouces/iconEnd.png",
      id: 0,
      latitude: "",
      longitude: "",
      width: 23,
      height: 33
    }, {
      iconPath: "../../resouces/iconStart.png",
      id: 1,
      latitude: "",
      longitude: "",
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: [],
    latitude: '28.682892',
    longitude: '115.858198'
  },
  onLoad: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    that.mapCtx = wx.createMapContext('navi_map');
    wx.getStorage({
      key: 'location',
      success: function (res) {
        var markers = that.data.markers;
        var start = (res.data.startLoca).split(",");
        var end = (res.data.endLoca).split(",");
        markers[0].longitude = start[0];
        markers[0].latitude = start[1];
        markers[1].longitude = end[0];
        markers[1].latitude = end[1];
        that.setData({
          markers: markers,
          longitude: start[0],
          latitude: start[1]
        })
        myAmapFun.getTransitRoute({
          origin: res.data.startLoca,
          destination: res.data.endLoca,
          city: '南昌',
          success: function (data) {
           
            if (data && data.transits) {
              var transits = data.transits;
              for (var i = 0; i < transits.length; i++) {
                var segments = transits[i].segments;
                transits[i].transport = [];
                for (var j = 0; j < segments.length; j++) {
                  if (segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name) {
                    var name = segments[j].bus.buslines[0].name
                    if (j !== 0) {
                      name = '--' + name;
                    }
                    transits[i].transport.push(name);
                  }
                }
              }
            }
            that.setData({
              transits: transits
            });
             console.log(that.data.transits)
          },
          fail: function (info) {

          }
        })
      }
    })
    that.mapCtx.getCenterLocation({
      success: function (res) {
        that.mapCtx.moveToLocation();
      }
    })

  },
  goDetail: function () {
    var that=this;
    wx.setStorage({
      key: 'transits',
      data: that.data.transits,
      success: function(res){
        console.log('设置数据成功')
      }
    })
    wx.navigateTo({
      url: '../bus_detail/bus_detail'
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../routeplan/routeplan'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../tobus/tobus'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../gowalk/gowalk'
    })
  }
})