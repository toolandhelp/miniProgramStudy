var util = require('../utils/util.js');
const app = getApp();
var baseUrl = app.baseApi;

Page({
  data: {
    tabs: [/*顶部tab切换*/
      // { title: "北京" },
      // { title: "上海" },
      // { title: "广州" },
      // { title: "深圳" },
      // { title: "武汉" },
      // { title: "成都" },
      // { title: "重庆" },
      // { title: "长沙" },
      // { title: "呼和浩特" },
      // { title: "黑龙江" },
      // { title: "其他是" },
    ],
    activeTab: 0,/*tabs当前选中索引*/
    refresherTriggered: false,/*下拉刷新开关*/
    list: [],/*需要渲染的列表*/
    pageIndex: 1,/*当前页数*/
    totalPage: 1,/*总页数*/
    total: 0,/*总数目*/
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getList();
  },
  onReady: function () {
    // 页面渲染完成
    // this.animation = wx.createAnimation();
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /*上拉加载*/
  bindscrolltolower() {
    let pageIndex = this.data.pageIndex + 1;
    if (pageIndex > this.data.totalPage) {
      wx.showToast({
        title: '暂无更多内容',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    this.setData({
      pageIndex: pageIndex,
    })
    this.getList();
  },
  /*下拉刷新*/
  bindrefresherrefresh() {
    this.setData({
      pageIndex: 1,
      refresherTriggered: true,
      list: []
    })
    this.getList();
  },
  /*请求数据*/
  getList() {/*请求数据列表*/
    let formNumber = this.data.list.length;
    let oldData = this.data.list;
    let newArr = [];
    let step = 20;

    /*使用服务器端数据 */
    var appMenus = wx.getStorageSync('GetAppMenus');
    if (appMenus != "") {
      //console.log("使用缓存数据")
      this.setData({ tabs: appMenus });

    } else {
      var appAllMenus = wx.getStorageSync('AppAllMenus');
      if (appAllMenus != "") {    //可要可不要
       // var okdata = this.appMenusCreate(appAllMenus); //处理出第一级菜单数据
        wx.setStorageSync('GetAppMenus', okdata);
        this.setData({ tabs: okdata });

      } else {
        //console.log("第一次获取服务器的数据")
        var url = baseUrl + 'Menu/GetAppMenu';
        util.request_method(url, (res) => {
          if (res.Success) {
            var datas = res.Data;
            wx.setStorageSync('AppAllMenus', datas); //可要可不要
            var okdata = this.appMenusCreate(datas); //处理出第一级菜单数据
            wx.setStorageSync('GetAppMenus', okdata);
            this.setData({ tabs: okdata });
          }
        });
      }
    }

    // 获取档案库数据
    var getlistUrl = baseUrl + 'ItemList/GetItemListData';
    //
    var typeData = this.data.tabs[this.data.activeTab];
    if (typeData != null) {
      if (typeData.attrData.length != 0) { //档案库
        var para= {
          "ClassTypeArrList": [
            {
              "AttrKey": typeData.typeAttrId,
              "AttrValue": "DesignLib"
            }
          ],
          "Pagination": {
            "SortType": 1,
            "KeyWords": "",
            "Order": true,
            "Page": 0,
            "Rows": 0
          }
        }

        util.request_method_post_data(getlistUrl,para,(res) => {
          debugger;
          if (res.Success) {
           console.log(res.Data.RspItemDatas);
          }
        });
      }
    }

    // if (this.data.activeTab % 2 != 0) {
    //   step = 0;
    // }
    if (this.data.pageIndex === this.data.totalPage && this.data.pageIndex > 1) {
      step = this.data.total - step * (this.data.pageIndex - 1)
    }
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      for (let i = formNumber; i < formNumber + step; i++) {
        newArr.push(i)
      }
      this.setData({
        list: [...oldData, ...newArr],
        total: 34,
        totalPage: Math.ceil(34 / 20),
        refresherTriggered: false
      })
      if (step == 0) {
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          duration: 1000
        })
      }
      wx.hideLoading()
    }, 1000)
  },
  /*tab点击*/
  tabclick(e) {
    this.setData({
      activeTab: e.detail.index,
      pageIndex: 1,
      list: []
    })
    this.getList();
  },
  /*swiper切换*/
  swiperChange(e) {
    this.setData({
      activeTab: e.detail.index,
      pageIndex: 1,
      list: []
    })
    this.getList();
  },
  /* app菜单转换 处理第一级菜单数据*/
  appMenusCreate(menusData) {
    var tabs = new Array();
    if (menusData != null && menusData != '') {
      // web菜单
      if (menusData.WebMenus != null && menusData.WebMenus != '') {
        menusData.WebMenus.forEach((menu, i) => {
          tabs[i] = {
            title: menu.MenuName,
            typeAttrId: '',
            attrData:  []
          }
        });
      }
      //档案库菜单
      if (menusData.RetMenuData != null && menusData.RetMenuData != '') {
        menusData.RetMenuData.forEach((menu, i) => {
          var attrData=new Array();
          //属性获取 
          if (menu.ChildNode.length > 0) {
            menu.ChildNode.forEach((attr, i) => {
              var subAttrData = new Array();
              if (attr.ChildNode.length > 0) {
                attr.ChildNode.forEach((subAttr, i) => {
                  subAttrData.push({
                    subAttrId: subAttr.ItemAttributesId,
                    subAttrName: subAttr.ItemAttributesFullName,
                  });
                });
              }
              attrData.push({
                attrId: attr.ItemAttributesId,
                attrName: attr.ItemAttributesFullName,
                subAttr: subAttrData
              });
            });
          }
          tabs.push({
            title: menu.ItemAttributesFullName,
            typeAttrId: menu.ItemAttributesId,
            attrData: attrData
          });
        });
        //属性数据创造
       // this.appMenusAttrCreate(menusData.RetMenuData);
      }

    }
   // console.log("输出：" + JSON.stringify(tabs));
    return tabs;
  },
  /* app菜单属性数据转换 处理第二三级菜单数据 */
  // appMenusAttrCreate(menu) {
  //   var attrData = new Array();

  //   //属性获取 
  //   if (menu.length > 0) {
  //     menu.forEach((attr, i) => {
  //       var subAttrData = new Array();
  //       if (attr.ChildNode.length > 0) {
  //         attr.ChildNode.forEach((subAttr, i) => {
  //           subAttrData.push({
  //             subAttrId: subAttr.ItemAttributesId,
  //             subAttrName: subAttr.ItemAttributesFullName,
  //           });
  //         });
  //       }
  //       attrData.push({
  //         attrId: attr.ItemAttributesId,
  //         attrName: attr.ItemAttributesFullName,
  //         subAttr: subAttrData
  //       });
  //     });
  //   }

  //   //存入缓存
  //   wx.setStorageSync('attrData', attrData);
  //   this.setData({
  //     attrData:attrData
  //   })
  //   //this.data.attrData = attrData;

  // }

})