import App from './App'


// #ifndef VUE3
import get from './pages/get/index.vue'
import selfTabbar from 'components/self-tabbar/self-tabbar'

import Vue from 'vue'
import uView from 'uview-ui';

// 国际化 json 文件,
import messages from './locale/index'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import initModal from '@/store/initModal.js'
import store from './store'
import showModal from '@/components/show-modal/show-modal.vue'
import initToast from "@/components/show-toast/initToast.js"
import showToast from "@/components/show-toast/show-toast.vue"

// 引入全局filter 方法
import filters from '@/filter'



filters(Vue); //注册使用filter
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
Vue.use(uView)

initModal(Vue)
Vue.component('show-modal', showModal)
initToast(Vue);
Vue.component('show-toast', showToast);

Vue.component('get', get)
// 注册全局组件
Vue.component('self-tabbar', selfTabbar)


let i18nConfig = {
	locale: uni.getStorageSync('merailb_lang') ? uni.getStorageSync('merailb_lang') : 'en',
	messages,
}

Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)

const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
