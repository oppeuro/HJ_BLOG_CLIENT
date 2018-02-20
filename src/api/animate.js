
export function animate(domArr, attrArr, time) {

  var domQueue = domArr;
  var attrObject = attrArr.shift();
  var attrQueue = Object.keys(attrObject);

  function getStyle(dom, attr) {
    var val = ''
    if(dom.currentStyle) {
      val = dom.currentStyle[attr];
    }else {
      val = getComputedStyle(dom)[attr];
    }
    return val;
  }
   //单位换算
  function getStyleVal(dom, attr, unit) {
    var val;
    var scale = 1;
    var reg = /([0-9]*)([^0-9]*)/;
    if(attr == 'opacity') {
      val = parseFloat(getStyle(dom,attr));
    }else {
      var nowUnit = reg.exec(getStyle(dom,attr))[2];
      val = parseFloat(getStyle(dom,attr));
      if(unit != nowUnit) {
        setStyleVal(dom, attr, val, unit);
        var nowVal = parseFloat(getStyle(dom,attr));
        setStyleVal(dom, attr, val, 'px');
        scale = val / nowVal || 1;
      }
    }
    return val * scale;
  }

  function setStyleVal(dom, attr, val, unit) {
    if(attr == 'opacity') {
      dom.style[attr] = val;
    }else {
      dom.style[attr] = val+unit;
    }
  }

  function createTime() {
    return new Date();
  }

  function tick() {
    var nowTime = createTime();
    var timeDiff = Math.max(0,time - (nowTime - startTime));
    var percentage = 1 - (timeDiff / time);
    var currentVal = (target - startVal) * percentage + startVal;
    setStyleVal(dom, attr, currentVal, unit);
    if(percentage === 1) {
      clearInterval(timer);
      timer = null;
      if(attrQueue.length == 0) {
        if(domQueue.length == 0) {
          return;
        }else {
          dom = domQueue.shift();
          attrObject = attrArr.shift();
          attrQueue = Object.keys(attrObject);
        }
      }else {
        attr = attrQueue.shift();
        startTime = createTime();
        unit = reg.exec(attrObject[attr])[2];
        startVal = getStyleVal(dom, attr, unit);
        target = parseFloat(attrObject[attr]);
        timer = setInterval(tick,13);
      }
    }
  }

  var timer = null;
  var startTime = createTime();
  var dom = domQueue.shift();
  var attr = attrQueue.shift();
  var reg = /([0-9]*)([^0-9]*)/;
  var unit = reg.exec(attrObject[attr])[2];
  var target = parseFloat(attrObject[attr]);
  var startVal = getStyleVal(dom, attr, unit);

  timer  = setInterval(tick, 13);
}
