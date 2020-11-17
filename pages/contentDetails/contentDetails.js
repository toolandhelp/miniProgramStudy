var util = require('../utils/util.js');
const app = getApp();
var baseUrl = app.baseApi;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsData: Object,
   // detailsHtml:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.detailsId;
    if (id.length == 0) {
      wx.showToast({
        title: 'ID错误',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      this.getDetails(id);

     wx.hideLoading()
    }, 1000);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getDetails: function (id) {

    var details = wx.getStorageSync(id);
    if (details != '') {
      this.setData({ detailsData: details });
      wx.setNavigationBarTitle({
        title: this.data.detailsData.ItemEntity.ItemName,
       // detailsHtml:this.detailsHtml(this.data.detailsData.ItemEntity.ItemContentBefore)
      })
    } else {
      var detailsUrl = baseUrl + `ItemDetails/Details`;
      var para = { "Id": id };

      util.request_method_post_data(detailsUrl, para, (res) => {
        if (res.Success) {
          var datas = res.Data;
          if(datas.ItemEntity.ItemContentBefore!=''){
            datas.ItemEntity.ItemContentBefore=this.detailsHtml(datas.ItemEntity.ItemContentBefore);
          }
          //console.log(datas)
          wx.setStorageSync(id, datas);
          this.setData({ detailsData: datas });

          wx.setNavigationBarTitle({
            title: this.data.detailsData.ItemEntity.ItemName,
            //detailsHtml:this.detailsHtml(this.data.detailsData.ItemEntity.ItemContentBefore)
          })
        }
      });
    }
  },
  detailsHtml:function(stringObj){
   // console.log("原数据："+stringObj)
    if(stringObj.length!=0){
      stringObj = stringObj.replace(/src=\"\/content\/images\/loading.gif"/g,' ');
      stringObj = stringObj.replace(/data-original/g,'src');
      stringObj = stringObj.replace(/width=\"855\"/g,'');
      stringObj = stringObj.replace(/<img/g,'<img width=\"100%\"')
    }

   // console.log("后面数据："+stringObj);
    return stringObj;
  }

})