var list = require('../../common/js/list.js');
Page({
    data:{
      listResult:"",
      actTabNum:"1",
      img:"https://temp.zoco.me/nanfeng/access.ews?cmd=getImage&fileName=",
      slide:[{
      imgSrc:"http://117.21.209.214/nanfeng/nanfengWap20161214/images/deliciousFoodSlide1.png"
      },{
      imgSrc:"http://117.21.209.214/nanfeng/nanfengWap20161214/images/deliciousFoodSlide1.png"
      },{
      imgSrc:"http://117.21.209.214/nanfeng/nanfengWap20161214/images/deliciousFoodSlide1.png"
      }],
      indicatorDots:false,
      autoplay:true,
      interval:3000,
      duration:1000
    },
    onLoad:function(){
        var that=this;
        var cmd="getFineFoodList";
        list.reqList(cmd,that);
        
    },
    food:function(){
      var that=this;
      that.setData({
        actTabNum:"1"
      });
      var cmd="getFineFoodList";
      list.reqList(cmd,that);

    },
    store:function(){
      var that=this;
      var cmd="restaurantList";
      that.setData({
        actTabNum:"2"
      })
      list.reqList(cmd,that);
    }
});