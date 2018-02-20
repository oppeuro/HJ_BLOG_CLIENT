import {ajax_aixos, queryString,baseUrl} from "./API_BASE";

export function login(user) {
  var user = queryString.stringify(user)
  return ajax_aixos.post(baseUrl+'/login',user)
}
