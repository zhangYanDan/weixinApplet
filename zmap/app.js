//app.js
const systemInfo=wx.getSystemInfoSync();
App({
  onLaunch: function () {
    
  },
  globalData:{
   systemInfo
  }
})