function request_method(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      callback && callback(res.data);
    }
  });
}

//需要加上这段来暴露你定义的方法，否则在外部找不到
module.exports = {
  request_method: request_method
}