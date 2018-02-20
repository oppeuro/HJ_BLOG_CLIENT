import {baseUrl,ajax_aixos,queryString} from "./API_BASE";


export function uploadImg(name, data) {
  return ajax_aixos.post(baseUrl+'/upload/img/'+name,data,{headers: { 'Content-Type': 'multipart/form-data' }})
}

export function uploadArticle(data) {
  var sendData = data;
  Object.keys(sendData).forEach((key) => {
    if ((typeof sendData[key]) === 'object') {
      sendData[key] = JSON.stringify(sendData[key])
    }
  })
  sendData = queryString.stringify(sendData)
  return ajax_aixos.post(baseUrl+'/api/newArticle',sendData)
}

export function updateArticle(data) {
  /*先将json对应的值转成String，通过qs解析成符合格式的传输字符串，服务器端接收后在Json解析成原来的格式*/
  var sendData = data;
  Object.keys(sendData).forEach((key) => {
    if ((typeof sendData[key]) === 'object') {
      sendData[key] = JSON.stringify(sendData[key])
    }
  })
  sendData = queryString.stringify(sendData)
  return ajax_aixos.post(baseUrl+'/api/updateArticle',sendData)
}

export function getArticle(id) {
  return ajax_aixos.get(baseUrl+'/api/getArticle/'+id);
}

export function getArticleList(data) {
  var data = queryString.stringify(data)
  return ajax_aixos.post(baseUrl+'/api/getArticleList',data)
}

export function getAdminArticleList(data) {
  var data = queryString.stringify(data)
  return ajax_aixos.post(baseUrl+'/api/getAdminArticleList',data)
}

export function getArticleNum() {
  return ajax_aixos.get(baseUrl+'/api/'+'getArticleNum')
}

export function findArticle(name) {
  return ajax_aixos.get(baseUrl+'/api/'+name)
}

export function deleteArticle(id) {
  return ajax_aixos.get(baseUrl+'/del/'+id)
}



