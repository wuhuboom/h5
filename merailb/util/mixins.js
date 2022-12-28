import {
	getTimeState,
	formatDateToStr,
	formatDateTimeSolt
} from '@/common/publicTool.js'
import {
	getConfigReq
} from '@/api/index.js'
import {
	mapState,
	mapMutations
} from 'vuex'
// 常规使用-满足大部分
export const myMixin = {
	data() {
		return {
			localLoginToken: null,
		}
	},
	filters: {
		timestampStr(value) {
			if (value && value != "---" && value != 0) {
				return formatDateTimeSolt(value, 1)
			} else if (value === '---' || value === 0) {
				return value
			}
		},
		timestampStrSlice(value) {
			// console.log("val",formatDateToStr(value));
			if (value) {
				let tempDateStr = formatDateTimeSolt(value, 1)
				return tempDateStr.slice(5)
			}

		},
		timeToDate(value) {
			if (value) {
				let tempDateStr = formatDateTimeSolt(value, 1)
				return tempDateStr.slice(0, 10)
			}
		}
	},
	computed: {
		...mapState(['hasLogin', 'symbolStr']),
	},
	onLoad() {
		// console.log("this.hasLogin", this.hasLogin);
		// console.log("mixin调用了")
		if (!this.hasLogin) {
			uni.reLaunch({
				url: '/pages/login/login',
				animationType: 'slide-in-top',
				animationDuration: 200
			})
		}

		this.localLoginToken = this.$store.state.userInfo.Token
	},
	onShow() {

		let langStr = uni.getStorageSync('merailb_lang')
		if (!langStr) {
			uni.setStorageSync('merailb_lang', 'en')
		}

		this.localLoginToken = this.$store.state.userInfo.Token

		this.getConfigData()

		// this.localLoginToken = uni.getStorageSync('footballToken');
	},
	methods: {
		...mapMutations(['logout', 'set_symbol_Str']),
		async getConfigData() {
			let resR = await getConfigReq({}, this.localLoginToken)
			if (resR.code === 2000) {
				// console.log("resR", resR.result.SystemCurrency);
				this.set_symbol_Str(resR.result.SystemCurrency)
			}
		},
		getTimeStateHandle() {
			// console.log("进来咯");
			return getTimeState()
		}
	}
}

// withdraw专用
export const withdrawMinxi = {
	computed: {
		...mapState(['withdrawState_Bool']),
	},
	methods: {
		...mapMutations(['save_withdraw_from', 'remove_withdraw_from']),
	}
}

// 充值专用
export const rechargeMinxi = {
	computed: {
		...mapState(['rechargeState_Bool']),
	},
	methods: {
		...mapMutations(['save_recharge_from', 'remove_recharge_from']),
	}
}


// 添加银行卡
export const addBankMinxi = {
	computed: {
		...mapState(['addBankState_Bool']),
	},
	methods: {
		...mapMutations(['save_addBank_from', 'remove_addBank_from']),
	}
}



// 添加USDT
export const addUsdtMinxi = {
	computed: {
		...mapState(['addUsdtState_Bool']),
	},
	methods: {
		...mapMutations(['save_addUsdt_from', 'remove_addUsdt_from']),
	}
}


// 账变记录专用
export const setOrderRecordMixin = {
	computed: {
		...mapState(['orderRState_Bool']),
	},
	methods: {
		...mapMutations(['save_order_r_from']),
	}
}


// bindphone专用
export const setBindPhoneMixin = {
	computed: {
		...mapState(['bindPhoneState_Bool']),
	},
	methods: {
		...mapMutations(['save_bindphone_from']),
	}
}


// 资金密码专用
export const setFunPassMixin = {
	computed: {
		...mapState(['funPassState_Bool']),
	},
	methods: {
		...mapMutations(['save_funpass_from']),
	}
}


// change_phone专用
export const changePhoneMixin = {
	computed: {
		...mapState(['bindPhoneState_Bool']),
	},
	methods: {
		...mapMutations(['save_bindphone_from', 'remove_bindphone_from']),
	}
}

// 全局修改标题
export const changeTitleMixin = {
	onShow() {
		// #ifdef H5
		document.title = getApp().globalData.webTitle
		// #endif
	}
}


// 全局任务状态专用
export const taskListMixin = {
	computed: {
		...mapState(['taskListState']),
	},
	methods: {
		...mapMutations(['set_tasklist_num']),
	}
}
