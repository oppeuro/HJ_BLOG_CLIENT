
exports.setCookie = function(key, val, sec){
  if(key == '' && val == '') {
    return;
  }
  //date设置的是毫秒
  var expires = new Date();
  expires.setTime(expires.getTime() + sec);
  document.cookie = key+'='+val+';expires='+expires.toUTCString();
}

exports.getCookie = function(key) {
  var reg = new RegExp('(^|\\s)'+ key + '=' + '([^;]*)' + '(;|$)');
  return document.cookie.match(reg) ? document.cookie.match(reg)[2] : null;
}

exports.delCookie = function(key) {
  let keyCookieValue = this.getCookie(key)
  if(!keyCookieValue) {
    return
  }else{
    this.setCookie(key,keyCookieValue,1);
  }
}

module.exports = exports;
