import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

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
		searchTeamNameStr: '',
		searchHisTeamNameStr: '',
		matchAllNum: '',
		matchTodayNum: '',
		matchTomorrowNum: '',
		changAnimationFinishBool: false,
		changHisAnimationFinishBool: false,
	},
	mutations: {
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
