//app.js
App({
  onLaunch: function () {
    try {
      const res = wx.getStorageInfoSync()
     // console.log(res.keys)
     // console.log(res.currentSize)
     // console.log(res.limitSize)
     // console.log(res.limitSize - 500)
     // var guidKeys = res.keys.filter(o => o.length == 36);
     // var guidKeys = res.keys.filter(o => this.isGuidFormat(o));

      if (res.currentSize >= (res.limitSize - 500)) {
        var guidKeys = res.keys.filter(o => this.isGuidFormat(o));
        guidKeys.forEach(async (key) =>{
          try {
            await wx.removeStorageSync(key)
          } catch (e) {
            console.log(`清楚缓存【${key}]出错:${e}`)
          }
        });
      }
    } catch (e) {
      console.log(e)
    }
  },
  isGuidFormat: function (guid) {
    var reg = new RegExp(/^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$/);
    if (reg.test(guid)) {
      return true;
    }
    return false;
  },
  globalData: {
  },
  baseApi: "https://www.api.jzbl.com/api/"
})