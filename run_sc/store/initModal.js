import Vuex from 'vuex'
// 自定义弹窗
export default function initModal(v) {
	// 挂在store到全局Vue原型上
	v.prototype.$modalStore = new Vuex.Store({
		state: {
			show: false,
			title: "title",
			content: 'content',
			ceterTitle: 'ceterTitle',
			ceterDesc: 'ceterDesc',
			showCancel: true,
			cancelText: "Cancel",
			cancelColor: "#fff",
			cancelBackgroundColor: "#6A6A6A",
			confirmText: "Confirm",
			confirmColor: "#fff",
			confirmBackgroundColor: "#0582B4",
			success: null,
			icon: "warning", //success:成功；fail:失败;
		},
		mutations: {
			hideModal(state) {
				// 小程序导航条页面控制
				// #ifndef H5
				if (state.hideTabBar) {
					wx.showTabBar();
				}
				// #endif
				state.show = false
			},
			showModal(state, data) {
				state = Object.assign(state, data)
				// console.log(state);
				state.show = true
			},
			success(state, res) {
				let cb = state.success
				let resObj = {
					cancel: false,
					confirm: false
				}
				res == "confirm" ? resObj.confirm = true : resObj.cancel = true
				cb && cb(resObj)
			}
		}
	})
	v.prototype.$showModal = function(option) {
		if (typeof option === 'object') {
			// #ifndef H5
			if (option.hideTabBar) {
				wx.hideTabBar();
			}
			// #endif

			v.prototype.$modalStore.commit('showModal', option)
		} else {
			throw "配置项必须为对象传入的值为：" + typeof option;
		}
	}
}
