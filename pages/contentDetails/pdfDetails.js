// pages/contentDetails/pdfDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdfuri: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      var pdfuri = options.uri;
      var pdfName = options.name;
      console.log(pdfuri)
      if (pdfuri != '' && pdfuri.length > 0) {

        // wx.downloadFile({
        //   url: pdfuri,
        //   success: function (res) {
        //     //const filePath = res.tempFilePath
        //     //debugger
        //     // that.setData({
        //     //   pdfuri: filePath
        //     // })
        //     //console.log(filePath);
        //     // wx.openDocument({
        //     //   filePath: filePath,
        //     //   success: function (res) {
        //     //     console.log('打开文档成功')
        //     //   }
        //     // })
        //   }
        // })

        that.setData({
          pdfuri: pdfuri
        })

        wx.setNavigationBarTitle({
          title: pdfName,
        })
      } else {
        wx.navigateBack({
          success: function () {
            wx.showToast({
              title: '路径出错,无法访问',
              icon: 'none',
              duration: 1000
            })
          }
        });
      }
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

  }
})