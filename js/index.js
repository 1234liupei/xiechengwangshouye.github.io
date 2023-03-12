window.addEventListener("load", function () {
  // 焦点图
  //1、 获取元素
  var focus = this.document.querySelector(".focus");
  var ol = focus.children[1];
  // 该学着机灵点了
  var ul = focus.children[0];
  // 获得focus 的宽度
  var w = focus.offsetWidth;
  // 2、利用定时器自动轮播
  var index = 0;
  var timer = this.setInterval(function () {
    index++;
    // 最好的是用 translate 来移动
    var translateX = -index * w;
    ul.style.transition = "all .5s";
    ul.style.transform = "translateX(" + translateX + "px)";
  }, 4000);
  // 过渡完成后进行判断
  ul.addEventListener("transitionend", function () {
    // 无缝滚动
    if (index >= 3) {
      index = 0;
      // /去掉过渡效果
      ul.style.transition = "none";
      // 注意下面两句要好好理解：利用最新的索引滚动图片
      var translateX = -index * w; //重新计算一遍 translate
      ul.style.transform = "translateX(" + translateX + "px)";
    }
    // 倒着走的时候是负数，也要加上约束效果
    if (index < 0) {
      index = 2;
      // /去掉过渡效果
      ul.style.transition = "none";
      // 注意下面两句要好好理解：利用最新的索引滚动图片
      var translateX = -index * w; //重新计算一遍 translate
      ul.style.transform = "translateX(" + translateX + "px)";
    }
    // 3、小圆点跟随变化效果
    ol.querySelector("li.current").classList.remove("current");
    ol.children[index].classList.add("current");
  });

  // 4、手指滑动轮播图
  // 触摸元素 获得初始坐标
  var startX = 0; //只需要X 值就够了
  var moveX = 0;
  var flag = false;
  ul.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].pageX;
    // 手指触摸的时候就停止计时器
    clearInterval(timer);
  });
  // 移动手指，计算滑动距离
  ul.addEventListener("touchmove", function (e) {
    moveX = e.targetTouches[0].pageX - startX;
    // 移动盒子
    var translateX = -index * w + moveX;
    ul.style.transform = "translateX(" + translateX + "px)";
    flag = true;
    e.preventDefault();
  });
  // 手指离开判断
  ul.addEventListener("touchend", function () {
    if (flag == true) {
      if (Math.abs(moveX) >= 50) {
        // 如果是正值就播放上一张，负值就播放下一张
        if (moveX > 0) {
          index--;
        } else {
          index++;
        }
        // 注意下面两句要好好理解：利用最新的索引滚动图片
        var translateX = -index * w; //重新计算一遍 translate
        ul.style.transform = "translateX(" + translateX + "px)";
        // 加上过渡效果
        ul.style.transition = "all .5s";
      } else {
        var translateX = -index * w;
        ul.style.transform = "translateX(" + translateX + "px)";
        ul.style.transition = "all .5s";
      }
    }
    // 手指离开开启计时器。
    timer = setInterval(function () {
      index++;
      // 最好的是用 translate 来移动
      var translateX = -index * w;
      ul.style.transition = "all .5s";
      ul.style.transform = "translateX(" + translateX + "px)";
    }, 4000);
  });
  // 返回顶部制作
  var goBack = this.document.querySelector(".goback");
  var nav = this.document.querySelector("nav");
  // 窗口滚动时
  window.addEventListener("scroll", function () {
    if (window.pageYOffset >= nav.offsetTop) {
      goBack.style.display = "block";
    } else {
      goBack.style.display = "none";
    }
  });
  goBack.addEventListener("click", function () {
    window.scroll(0, 0);
  });
});
