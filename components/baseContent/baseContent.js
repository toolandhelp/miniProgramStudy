
Component({
  behaviors: [],

  // 属性定义（详情参见下文）
  properties: {
    obj: { type:Object ,value:null },  
    // obj: { type: Array, value: [] },
    name:{type:String,value:''}
    // obj: [{
    //   user: {
    //     nickName: "用户名",
    //     headIcon: "https://www.contemporist.com/wp-content/uploads/2020/11/modern-home-open-living-spaces-091120-709-01.jpg"
    //   },
    //   title:"内容标题声明的的生命豆沙粉的理解 尼斯阿里大家了，是否卡洛斯的i你把的实力案例阿耐何不昆士兰士大夫。",
    //   ResourceObj: [
    //     {imgSrc: "https://www.contemporist.com/wp-content/uploads/2020/11/modern-home-open-living-spaces-091120-709-01.jpg"},
    //   ]
    // }]
  },

  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { 
    //console.log(this.data.obj.ResourceObj.length)

  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    share: function () {
      console.log(`分享点击`);
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      })
    }


  }

})

