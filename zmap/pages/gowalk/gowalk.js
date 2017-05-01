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
        console.log(res.data.startLoca);
        console.log(res.data.endLoca);
        that.setData({
          markers: markers,
          longitude: start[0],
          latitude: start[1]
        })
        myAmapFun.getWalkingRoute({
          origin: res.data.startLoca,
          destination: res.data.endLoca,
          success: function (data) {
            var points = [];
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              var steps = data.paths[0].steps;
              for (var i = 0; i < steps.length; i++) {
                var poLen = steps[i].polyline.split(';');
                for (var j = 0; j < poLen.length; j++) {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                }
              }
            }
            that.setData({
              polyline: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });
            if (data.paths[0] && data.paths[0].distance) {
              that.setData({
                distance: data.paths[0].distance + '米'
              });
            }
            if (data.paths[0] && data.paths[0].duration) {
              that.setData({
                cost: parseInt(data.paths[0].duration / 60) + '分钟'
              });
            }

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
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation'
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