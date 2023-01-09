import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)


let lifeData = {}

// 尝试获取本地是否存在lifeData变量，第一次启动时不存在
try {
	lifeData = uni.getStorageSync('lifeData')
} catch (e) {

}

// 标记需要永久存储的变量，在每次启动时取出，在state中的变量名
let saveStateKeys = ['vuex_user']

// 保存变量到本地存储
const saveLifeData = function(key, value) {
	// 判断变量是否在存储数组中
	if (saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmpLifeData = uni.getStorageSync('lifeData')
		// 第一次启动时不存在，则放一个空对象
		tmpLifeData = tmpLifeData ? tmpLifeData : {},
			tmpLifeData[key] = value
		// 将变量再次放回本地存储中
		uni.setStorageSync('lifeData', tmpLifeData)
	}
}

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		isNewDevice: false,
		userInfo: {},
		matchContent_Bool: false,
		matchOrder_Bool: false,
		selectBetNul: null,
		withdrawState_Bool: false,
		rechargeState_Bool: false,
		updatePhoneState_Bool: false,
		addBankState_Bool: false,
		addUsdtState_Bool: false,
		addSimState_Bool: false,
		accountListState_Bool: false,
		searchTeamNameStr: '',
		searchHisTeamNameStr: '',
		matchAllNum: '',
		matchTodayNum: '',
		matchTomorrowNum: '',
		changAnimationFinishBool: false,
		changHisAnimationFinishBool: false,





		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {
			name: 'tuniao'
		},

		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		// app版本
		vuex_version: "1.0.0",
		// 是否使用自定义导航栏
		vuex_custom_nav_bar: true,
		// 状态栏高度
		vuex_status_bar_height: 0,
		// 自定义导航栏的高度
		vuex_custom_bar_height: 0
	},
	mutations: {
		$tStore(state, payload) {
			// 判断是否多层调用，state中为对象存在的情况，例如user.info.score = 1
			let nameArr = payload.name.split('.')
			let saveKey = ''
			let len = nameArr.length
			if (len >= 2) {
				let obj = state[nameArr[0]]
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]]
				}
				obj[nameArr[len - 1]] = payload.value
				saveKey = nameArr[0]
			} else {
				// 单层级变量
				state[payload.name] = payload.value
				saveKey = payload.name
			}

			// 保存变量到本地中
			saveLifeData(saveKey, state[saveKey])
		},
		login(state, provider) {
			state.hasLogin = true
			state.userInfo = provider
			uni.setStorage({
				key: 'userInfoFootball',
				data: provider
			});
			// console.log("userInfo_store",state.userInfo);
		},
		logout(state) {
			// console.log("调用！");
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key: 'userInfoFootball',
			});
		},
		set_device(state, content) {
			state.isNewDevice = content
		},
		save_match_content(state, content) {
			state.matchContent_Bool = true
			uni.setStorage({
				key: 'queryMatchContentItem',
				data: content
			});
			// console.log("userInfo_store",state.userInfo);
		},
		change_match_bool(state, content) {
			state.matchContent_Bool = false
		},
		remove_match_content(state, content) {
			state.matchContent_Bool = false
			uni.removeStorage({
				key: 'queryMatchContentItem',
			});
		},
		save_match_order(state, content) {
			state.matchOrder_Bool = true
			uni.setStorage({
				key: 'queryMatchOrderItem',
				data: content
			});
		},
		remove_match_order(state, content) {
			state.matchOrder_Bool = false
			uni.removeStorage({
				key: 'queryMatchOrderItem',
			});
		},
		save_withdraw_from(state, content) {
			state.withdrawState_Bool = true
			uni.setStorage({
				key: 'queryWithdrawUrlFrom',
				data: content
			});
		},
		remove_withdraw_from(state, content) {
			state.withdrawState_Bool = false
			// console.log("content", content);
			if (content === 'remove') {
				uni.removeStorage({
					key: 'queryWithdrawUrlFrom',
				});
			}

		},
		save_recharge_from(state, content) {
			state.rechargeState_Bool = true
			uni.setStorage({
				key: 'queryRechargeUrlFrom',
				data: content
			});
		},
		remove_recharge_from(state, content) {
			state.rechargeState_Bool = false
			uni.removeStorage({
				key: 'queryRechargeUrlFrom',
			});
		},
		save_addBank_from(state, content) {
			state.addBankState_Bool = true
			uni.setStorage({
				key: 'queryAddBankUrlFrom',
				data: content
			});
		},
		remove_addBank_from(state, content) {
			state.addBankState_Bool = false
			uni.removeStorage({
				key: 'queryAddBankUrlFrom',
			});
		},
		save_addsim_from(state, content) {
			state.addSimState_Bool = true
			uni.setStorage({
				key: 'queryAddSimUrlFrom',
				data: content
			});
		},
		remove_addsim_from(state, content) {
			state.addSimState_Bool = false
			uni.removeStorage({
				key: 'queryAddSimUrlFrom',
			});
		},
		save_accountlist_from(state, content) {
			state.accountListState_Bool = true
			uni.setStorage({
				key: 'queryAccountListUrlFrom',
				data: content
			});
		},
		remove_accountlist_from(state, content) {
			state.accountListState_Bool = false
			uni.removeStorage({
				key: 'queryAccountListUrlFrom',
			});
		},
		save_addUsdt_from(state, content) {
			state.addUsdtState_Bool = true
			uni.setStorage({
				key: 'queryAddUsdtUrlFrom',
				data: content
			});
		},
		remove_addUsdt_from(state, content) {
			state.addUsdtState_Bool = false
			uni.removeStorage({
				key: 'queryAddUsdtUrlFrom',
			});
		},
		save_updatephone_from(state, content) {
			state.updatePhoneState_Bool = true
			uni.setStorage({
				key: 'queryChangePhoneUrlFrom',
				data: content
			});
		},
		remove_updatephone_from(state, content) {
			state.updatePhoneState_Bool = false
			uni.removeStorage({
				key: 'queryChangePhoneUrlFrom',
			});
		},
		change_bet_num(state, content) {
			// console.log("content",content);
			state.selectBetNul = content
		},
		save_bet_num(state, content) {
			uni.setStorage({
				key: 'selectBetNum',
				data: content
			});
		},
		remove_bet_num(state, content) {
			uni.removeStorage({
				key: 'selectBetNum',
			});
		},
		save_gametype_num(state, content) {
			uni.setStorage({
				key: 'gameTypeNum',
				data: content
			});
		},
		remove_gametype_num(state, content) {
			uni.removeStorage({
				key: 'gameTypeNum',
			});
		},
		set_search_team_name(state, content) {
			state.searchTeamNameStr = content
		},
		set_his_search_team_name(state, content) {
			state.searchHisTeamNameStr = content
		},
		set_match_all_num(state, content) {
			state.matchAllNum = content
		},
		set_match_today_num(state, content) {
			state.matchTodayNum = content
		},
		set_match_tom_num(state, content) {
			state.matchTomorrowNum = content
		},
		change_finish_bool(state, content) {
			state.changAnimationFinishBool = content
		},
		change_his_finish_bool(state, content) {
			state.changHisAnimationFinishBool = content
		}
	},
	actions: {

	}
})

export default store
