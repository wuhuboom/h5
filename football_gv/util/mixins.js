import {
	getTimeState,
	formatDateToStr,
	formatDateTimeSolt
} from '@/common/publicTool.js'
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
		...mapState(['hasLogin']),
	},
	onReady() {
		// #ifdef APP-PLUS
		plus.navigator.setStatusBarStyle("light"); //只支持dark和light
		// #endif
	},
	onLoad() {
		// console.log("this.hasLogin",this.hasLogin);
		// console.log("mixin调用了")
		if (!this.hasLogin) {
			uni.reLaunch({
				url: '/pages/login/login',
				animationType: 'pop-in',
				animationDuration: 200
			})
		}

		this.localLoginToken = this.$store.state.userInfo.token
	},
	onShow() {

		let langStr = uni.getStorageSync('foot_lang')
		if (!langStr) {
			uni.setStorageSync('foot_lang', 'en')
		}


		this.localLoginToken = this.$store.state.userInfo.token
		// this.localLoginToken = uni.getStorageSync('footballToken');


		setTimeout(() => {
			// #ifdef APP-PLUS
			plus.navigator.setStatusBarStyle("light"); //只支持dark和light

			// #endif
		}, 200)

	},
	methods: {
		...mapMutations(['logout']),
		getTimeStateHandle() {
			// console.log("进来咯");
			return getTimeState()
		}
	}
}

// match_content专用
export const matchContentMinxi = {
	computed: {
		...mapState(['matchContent_Bool', 'selectBetNul'])
	},
	onLoad() {
		this.localLoginToken = this.$store.state.userInfo.token
	},
	methods: {
		...mapMutations(['save_match_content', 'remove_match_content', 'change_bet_num', 'save_bet_num',
			'remove_bet_num'
		]),
	}
}

// match_order专用
export const matchOrderMinxi = {
	computed: {
		...mapState(['selectBetNul', 'matchOrder_Bool']),
	},
	// onLoad() {
	// 	this.localLoginToken = this.$store.state.userInfo.token
	// },
	methods: {
		...mapMutations(['save_match_order', 'remove_match_order', 'change_bet_num', 'remove_bet_num',
			'change_match_bool', 'save_gametype_num', 'remove_gametype_num'
		]),
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

// 添加SIM
export const addSimMinxi = {
	computed: {
		...mapState(['addSimState_Bool']),
	},
	methods: {
		...mapMutations(['save_addsim_from', 'remove_addsim_from']),
	}
}

// match_list专用
export const setSearchTeamNameMixin = {
	computed: {
		...mapState(['searchTeamNameStr', 'changAnimationFinishBool', 'matchAllNum', 'matchTodayNum',
			'matchTomorrowNum'
		]),
	},
	methods: {
		...mapMutations(['set_search_team_name', 'change_finish_bool', 'set_match_all_num', 'set_match_today_num',
			'set_match_tom_num'
		]),
	}
}

// match_his_list专用
export const setSearchHisTeamNameMixin = {
	computed: {
		...mapState(['searchHisTeamNameStr']),
	},
	methods: {
		...mapMutations(['set_his_search_team_name', 'change_his_finish_bool']),
	}
}



// change_phone专用
export const changePhoneMixin = {
	computed: {
		...mapState(['updatePhoneState_Bool']),
	},
	methods: {
		...mapMutations(['save_updatephone_from', 'remove_updatephone_from']),
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

// 登录识别新设备专用
export const newDeviceMixin = {
	computed: {
		...mapState(['isNewDevice']),
	},
	methods: {
		...mapMutations(['set_device']),
	}
}
