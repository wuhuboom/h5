import App from './App'

// #ifndef VUE3

import Vue from 'vue'
import uView from 'uview-ui';
// 引入全局TuniaoUI
import TuniaoUI from 'tuniao-ui'
// import tmVuetify from "./tm-vuetify";

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
// 引入TuniaoUI提供的vuex简写方法
let vuexStore = require('@/store/$tn.mixin.js')
Vue.mixin(vuexStore)


filters(Vue); //注册使用filter
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
// Vue.use(tmVuetify)
Vue.use(uView)
Vue.use(TuniaoUI)
initModal(Vue)
Vue.component('show-modal', showModal)
initToast(Vue);
Vue.component('show-toast', showToast);
// locale: uni.getStorageSync('run_lang') || 'en'
// locale: uni.getStorageSync('run_lang') ? uni.getStorageSync('run_lang') : 'en', //当前语言默认英文;

let i18nConfig = {
	locale: uni.getStorageSync('run_lang') ? uni.getStorageSync('run_lang') : 'en',
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
