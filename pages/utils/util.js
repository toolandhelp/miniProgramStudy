//无参数的GET 请求
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
//带参数的GET 请求
function request_method_data(url, data, callback) {
  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      callback && callback(res.data);
    }
  });
}

function request_method_post_data(url, data,callback) {
  wx.request({
    url: url,
    method: 'POST',
    data:data,
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
  request_method: request_method,
  request_method_data: request_method_data,
  request_method_post_data:request_method_post_data
}