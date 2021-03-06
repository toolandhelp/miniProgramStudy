var util = require('../utils/util.js');
const app = getApp();
var baseUrl = app.baseApi;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsData: Object,
    showType:0,
   // detailsHtml:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.detailsId;
    var showType=options.showType;
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

      this.setData({ showType: showType }); 

      console.log(showType);
      console.log(this.data.showType);

     wx.hideLoading()
    }, 1000);

    // wx.downloadFile({
    //   // 示例 url，并非真实存在
    //   url: 'https://www.pic1.jzbl.com/itemfiles/3eb62c63-e608-41bf-95f4-30312481e96e/411c1958-5870-4169-b23b-a65734f95d26/6367909652522412103592130.pdf',
    //   success: function (res) {
    //     const filePath = res.tempFilePath
    //     console.log(filePath);
    //     wx.openDocument({
    //       filePath: filePath,
    //       success: function (res) {
    //         console.log('打开文档成功')
    //       }
    //     })
    //   }
    // })

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