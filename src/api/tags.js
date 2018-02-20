import {baseUrl,ajax_aixos,queryString} from "./API_BASE";


export function getTagList() {
  return ajax_aixos.get(baseUrl+'/tags')
}

export function getTag(tag) {
  return ajax_aixos.get(baseUrl+'/tags/'+tag)
}
