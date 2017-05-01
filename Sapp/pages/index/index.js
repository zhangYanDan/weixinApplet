//index.js
//获取应用实例
var app = getApp();
var amapFile = require('../../resource/js/amap-wx.js');
Page({
  data: {
    cityName: '默认',
    weather:'天气',
    imgUrls: [
      'http://117.21.209.214/nanfeng/access.ews?cmd=getImage&fileName=28TEEW5A.jpg',
      'http://117.21.209.214/nanfeng/access.ews?cmd=getImage&fileName=34JGQRDK.jpg',
      'http://117.21.209.214/nanfeng/access.ews?cmd=getImage&fileName=28TFMU2W.jpg',
      'http://117.21.209.214/nanfeng/access.ews?cmd=getImage&fileName=34JGHF7P.jpg'
    ],
    iconUrls:[
      {
        url:'http://117.21.209.214/nanfeng/nanfengWap20161214/images/delicacyIcon.png',
        name:'美食',
        linkUrl:"../food/food"
      },
      {
        url:'http://117.21.209.214/nanfeng/nanfengWap20161214/images/spotIcon.png',
        name:'景点',
        linkUrl:"../spot/spot"
      },
      {
        url:'http://117.21.209.214/nanfeng/nanfengWap20161214/images/hotelIcon.png',
        name:'住宿',
        linkUrl:"3"
      },
      {
        url:'http://117.21.209.214/nanfeng/nanfengWap20161214/images/travelIcon.png',
        name:'出行',
        linkUrl:"4"
      },
      {
        url:'http://117.21.209.214/nanfeng/nanfengWap20161214/images/shopIcon.png',
        name:'购物',
        linkUrl:"5"
      },
      {
        url:'http://117.21.209.214/nanfeng/nanfengWap20161214/images/arderIcon.png',
        name:'休闲',
        linkUrl:"6"
      },
      {
        url:'http://117.21.209.214/nanfeng/nanfengWap20161214/images/raidersIcon.png',
        name:'攻略',
        linkUrl:"7"
      },{
        url:'http://117.21.209.214/nanfeng/nanfengWap20161214/images/impressionIcon.png',
        name:'印象',
        linkUrl:"8"
      }
    ],
    tourDiv:[
      {url:'http://117.21.209.214/nanfeng/access.ews?cmd=getImage&fileName=2BXJPTLY.jpg',title:'辨别正宗南丰蜜桔，涨知识！',taplink:''},
      {url:'http://117.21.209.214/nanfeng/access.ews?cmd=getImage&fileName=2BXJNY3C.jpg',title:'“桔园游”再掀巨浪，第二趟旅游专列驶入南丰',taplink:''},
      {url:'http://117.21.209.214/nanfeng/access.ews?cmd=getImage&fileName=374FQV5F.jpg',title:'你可知道，别人眼中的南丰是怎样的？',taplink:''}
    ],
    hotAct:[{hotActLink:"",url:"http://117.21.209.214/nanfeng/access.ews?cmd=getImage&fileName=35U52DHH.jpg",title:"南丰多方发力打造“全域景区”"},
    {hotActLink:"",url:"http://117.21.209.214/nanfeng/access.ews?cmd=getImage&fileName=374E9RL7.jpg",title:"南丰惊艳江西！2016江西旅博会南丰旅游商品火爆开展！！！"},
    {hotActLink:"",url:"http://117.21.209.214/nanfeng/access.ews?cmd=getImage&fileName=374FEA96.jpg",title:"又一个涉旅项目落地！江西聚福堂生态观光园项目举行开工奠基仪式"}
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true
  },
  //事件处理函数
  // 旅游资讯点击事件
  tourTap:function(e){
    var par=e.currentTarget.dataset.taplink;
    wx.navigateTo({
      url: par,
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  // 定位城市
  location:function(){
    var that=this;
    var myAmapFun = new amapFile.AMapWX({key:'ea9e30408db053426ec4675fbcefa72a'});
    myAmapFun.getRegeo({
      success: function(data){
        var ads=data[0].desc;
        var endIdx=ads.indexOf("市");
        ads=ads.substring(0,endIdx);
        that.setData({
          cityName:ads
        })
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that=this;
    var myAmapFun=new amapFile.AMapWX({key:'ea9e30408db053426ec4675fbcefa72a'});
    //获取天气
    myAmapFun.getWeather({
      success: function(data){
        var weather=data.liveData.weather;
        that.setData({
          weather:weather
        })
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    });
    // 定位城市
    myAmapFun.getRegeo({
      success: function(data){
        var ads=data[0].desc;
        var endIdx=ads.indexOf("市");
        ads=ads.substring(0,endIdx);
        that.setData({
          cityName:ads
        })
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
  }
})
