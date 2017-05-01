function reqList(cmd,that){
    wx.request({
            url: 'https://temp.zoco.me/nanfeng/accessAll.ews',
            data: {"cmd":cmd},
            dataType:"json",
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            header : {'Cookie':'JSESSIONID=D1C446D8D4B0509A6EFC9FC1D2324675','a_organizationCode':'nanfeng'},
            success: function(res){
            that.setData({
                listResult:res.data.result
            })
            },
            fail: function(res) {
                // fail
                console.log(res);
            }
            })
}
module.exports.reqList=reqList;