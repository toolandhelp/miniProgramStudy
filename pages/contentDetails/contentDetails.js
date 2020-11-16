var util = require('../utils/util.js');
const app = getApp();
var baseUrl = app.baseApi;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsData: Object,
    detailsHtml: "<p>这是些文字，没有什么用的文字很长很长。。什么用的文字很长很长。。。什么用的文字很长很长。。。什么用的文字很长很长。。。什么用的文字很长很长。。。。</p><p><img src=\"https://www.pic1.jzbl.com/itemfiles/3eb62c63-e608-41bf-95f4-30312481e96e/06bdf7ea-9b77-4b2d-aa63-2fd1b781b664/6367728977707766585595141.jpg?x-oss-process=image/resize,m_lfit,h_626,w_1000/quality,q_90/watermark,image_V2F0ZXJtYXJrL3dhdGVybWFyay5wbmc=,size_20,type_d3F5LXplbmhlaQ,text_QOmDqOiQveW7uuetkQ,color_E94743,shadow_50,order_0,align_2,interval_10,t_90,g_sw,x_20,y_20\" width=\"100%\" title=\"3ece2f94-fd6a-4a21-9a7b-414aefabe657.jpg\"/></p><p><img src=\"https://www.pic1.jzbl.com/itemfiles/3eb62c63-e608-41bf-95f4-30312481e96e/06bdf7ea-9b77-4b2d-aa63-2fd1b781b664/6367728977707766585595141.jpg?x-oss-process=image/resize,m_lfit,h_626,w_1000/quality,q_90/watermark,image_V2F0ZXJtYXJrL3dhdGVybWFyay5wbmc=,size_20,type_d3F5LXplbmhlaQ,text_QOmDqOiQveW7uuetkQ,color_E94743,shadow_50,order_0,align_2,interval_10,t_90,g_sw,x_20,y_20\" width=\"100%\" title=\"3ece2f94-fd6a-4a21-9a7b-414aefabe657.jpg\"/></p><p><img src=\"https://www.pic1.jzbl.com/itemfiles/3eb62c63-e608-41bf-95f4-30312481e96e/06bdf7ea-9b77-4b2d-aa63-2fd1b781b664/6367728977707766585595141.jpg?x-oss-process=image/resize,m_lfit,h_626,w_1000/quality,q_90/watermark,image_V2F0ZXJtYXJrL3dhdGVybWFyay5wbmc=,size_20,type_d3F5LXplbmhlaQ,text_QOmDqOiQveW7uuetkQ,color_E94743,shadow_50,order_0,align_2,interval_10,t_90,g_sw,x_20,y_20\" width=\"100%\" title=\"3ece2f94-fd6a-4a21-9a7b-414aefabe657.jpg\"/></p><p><img src=\"https://www.pic1.jzbl.com/itemfiles/3eb62c63-e608-41bf-95f4-30312481e96e/06bdf7ea-9b77-4b2d-aa63-2fd1b781b664/6367728977707766585595141.jpg?x-oss-process=image/resize,m_lfit,h_626,w_1000/quality,q_90/watermark,image_V2F0ZXJtYXJrL3dhdGVybWFyay5wbmc=,size_20,type_d3F5LXplbmhlaQ,text_QOmDqOiQveW7uuetkQ,color_E94743,shadow_50,order_0,align_2,interval_10,t_90,g_sw,x_20,y_20\" width=\"100%\" title=\"3ece2f94-fd6a-4a21-9a7b-414aefabe657.jpg\"/></p><p><img src=\"https://www.pic1.jzbl.com/itemfiles/3eb62c63-e608-41bf-95f4-30312481e96e/06bdf7ea-9b77-4b2d-aa63-2fd1b781b664/6367728977707766585595141.jpg?x-oss-process=image/resize,m_lfit,h_626,w_1000/quality,q_90/watermark,image_V2F0ZXJtYXJrL3dhdGVybWFyay5wbmc=,size_20,type_d3F5LXplbmhlaQ,text_QOmDqOiQveW7uuetkQ,color_E94743,shadow_50,order_0,align_2,interval_10,t_90,g_sw,x_20,y_20\" width=\"100%\" title=\"3ece2f94-fd6a-4a21-9a7b-414aefabe657.jpg\"/></p>"
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
    // wx.showLoading({
    //   title: '加载中',
    // })
    setTimeout(() => {
      this.getDetails(id);

     // wx.hideLoading()
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
      })
    } else {
      var detailsUrl = baseUrl + `ItemDetails/Details`;
      var para = { "Id": id };

      util.request_method_post_data(detailsUrl, para, (res) => {
        if (res.Success) {
          var datas = res.Data;
          console.log(datas)
          wx.setStorageSync(id, datas);
          this.setData({ detailsData: datas });

          wx.setNavigationBarTitle({
            title: this.data.detailsData.ItemEntity.ItemName,
          })
        }
      });
    }
  }
})