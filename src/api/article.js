import axios from 'axios'
import qs from 'qs'

export const baseUrl = 'http://www.huangjin1024.com';

export function uploadImg(name, data) {
  return axios.post(baseUrl+'/upload/img/'+name,data,{headers: { 'Content-Type': 'multipart/form-data' }})
}

export function uploadArticle(data) {
  var data = qs.stringify(data)
  return axios.post(baseUrl+'/api/newArticle',data)
}

export function updateArticle(data) {
  var data = qs.stringify(data)
  return axios.post(baseUrl+'/api/updateArticle',data)
}

export function getArticle(id) {
  //var data = qs.stringify(data)
  return axios.get(baseUrl+'/api/getArticle/'+id);
}

export function getArticleList(data) {
  var data = qs.stringify(data)
  return axios.post(baseUrl+'/api/getArticleList',data)
}

export function getAdminArticleList(data) {
  var data = qs.stringify(data)
  return axios.post(baseUrl+'/api/getAdminArticleList',data)
}

export function getArticleNum() {
  return axios.get(baseUrl+'/api/'+'getArticleNum')
}

export function findArticle(name) {
  return axios.get(baseUrl+'/api/'+name)
}



