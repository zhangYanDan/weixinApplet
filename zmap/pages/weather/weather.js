var amapFile = require('../../resource/js/amap-wx.js');
Page({
    data:{
        weather:""
    },
    onLoad:function(){
        var myAmapFun=new amapFile.AMapWX({key:'ea9e30408db053426ec4675fbcefa72a'});
        var that=this;
        myAmapFun.getWeather({
            success: function(data){
                var weather=data;
                console.log(weather);
                that.setData({
                    weather:weather
                })
            },
            fail:function(res){
                console.log(res);
            }
        })
    }
})