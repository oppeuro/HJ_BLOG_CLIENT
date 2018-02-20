// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import cookie from './api/cookie'

import '../static/css/monokai-sublime.css'
import hljs from '../static/js/highlight.pack.js'

//单个引入muse
import icon from 'muse-ui/src/icon'
import toast from 'muse-ui/src/toast'
import popup from 'muse-ui/src/popup'
import appBar from 'muse-ui/src/appBar'
import avatar from 'muse-ui/src/avatar'
import dialog from 'muse-ui/src/dialog'
import checkbox from 'muse-ui/src/checkbox'
import textField from 'muse-ui/src/textField'
import iconButton from 'muse-ui/src/iconButton'
import flatButton from 'muse-ui/src/flatButton'
import raisedButton from 'muse-ui/src/raisedButton'
import {list,listItem} from 'muse-ui/src/list'
import {card,cardHeader,cardMedia,cardTitle,cardText,cardActions} from 'muse-ui/src/card'
//muse组件注册
Vue.component(icon.name, icon)
Vue.component(toast.name, toast)
Vue.component(popup.name, popup)
Vue.component(appBar.name, appBar)
Vue.component(avatar.name, avatar)
Vue.component(dialog.name, dialog)
Vue.component(checkbox.name, checkbox)
Vue.component(textField.name, textField)
Vue.component(iconButton.name, iconButton)
Vue.component(flatButton.name, flatButton)
Vue.component(raisedButton.name, raisedButton)

Vue.component(list.name, list)
Vue.component(listItem.name, listItem)

Vue.component(card.name, card)
Vue.component(cardHeader.name, cardHeader)
Vue.component(cardMedia.name, cardMedia)
Vue.component(cardTitle.name, cardTitle)
Vue.component(cardText.name, cardText)
Vue.component(cardActions.name, cardActions)


//login Vue.cookie设置与验证逻辑
Vue.prototype.setCookie = cookie.setCookie;
Vue.prototype.getCookie = cookie.getCookie;
Vue.prototype.delCookie = cookie.delCookie;

hljs.highlightCode = function () {
  let blocks = document.querySelectorAll('pre code');
  [].forEach.call(blocks, hljs.highlightBlock);
}

Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
