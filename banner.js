(function (win, doc) {
  // 创建对象
  function Banner(el,circle,options) {
    // 设置配置项
    options = options || {}
    // 获取容器
    this.$outer = $(el)
    // 设置定时器
    this.timer=null
    this.index=$(".active").index()
   
    // 获取要轮播的内容
    this.$inner = this.$outer.children()

    this.width=this.$inner.width()
    // 配置项
    this.autoplay = options.autoplay || false
    this.continue = options.continue || "0.8s"
    this.time = options.time || 2500
    // 是否存在小圆点
    if(circle){
      this.$circle=$(circle)
      this.$cinner=$(circle).children()
    }
    this.init()
 
  }
  // 定义构造函数
  var proto = Banner.prototype
// 初始化插件
  proto.init = function () {
    var _width = this.$inner.width()
    this.auto(_width)
    this.hover()
    this.styleInit()
    this.click()
  }
  proto.styleInit=function(){  
      this.$cinner.eq(0).css("backgroundColor","#fff").siblings().css("backgroundColor","#ff8080")
  }
  // 设置播放
  proto.play=function(_width){
    var _active = $(".active")
    if (this.index >= this.$inner.length - 1) {
      this.index = -1
    }
    this.index++
    this.$inner.css("transition", "none")
    $(this.$inner[this.index]).css("left", `${this.width}px`)
    this.$inner[0].offsetWidth
    this.$inner.css("transition", `all  ${this.continue} linear`)
    _active.css("left",`${-this.width}px`).removeClass("active")
    $(this.$inner[this.index]).css("left",0).addClass("active")

    if(this.$cinner){
      this.$cinner.eq(this.index).css("backgroundColor","#fff").siblings().css("backgroundColor","#ff8080")
    }
  }
  // 设置鼠标悬停事件
 proto.hover=function(){
  this.$outer.parent().hover(()=>{
    clearInterval(this.timer)
  },()=>{
   this.auto()
  })
 }
// 设置自动播放
  proto.auto=function(){
    if(!this.autoplay){
      return
    }
    this.timer=setInterval(()=>{
        this.play()
    }, this.time)
  }
  // 设置圆点点击事件
  proto.click=function(){
    var _this=this
    this.$circle.on("click","li",function(){
        var num=$(this).index()
        if(num==_this.index){
          return
        }
        _this.index=num-1
        _this.play()      
    })
  }
  // 将对象暴露到window
win.Banner=Banner
})(window, document)