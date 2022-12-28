import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		withdrawState_Bool: false,
		rechargeState_Bool: false,
		addBankState_Bool: false,
		addUsdtState_Bool: false,
		funPassState_Bool: false,
		openWithDrawModelBool: false,
		changeLangStatusBool: true,
		taskListState: 2,
		orderRState_Bool: false,
		symbolStr: 'ABC$',
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true
			state.userInfo = provider
			uni.setStorage({
				key: 'userInfoMerailb',
				data: provider
			});
			// console.log("userInfo_store",state.userInfo);
		},
		logout(state) {
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key: 'userInfoMerailb',
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
			uni.removeStorage({
				key: 'queryWithdrawUrlFrom',
			});
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
		save_funpass_from(state, content) {
			state.funPassState_Bool = true
			uni.setStorage({
				key: 'queryFunPassUrlFrom',
				data: content
			});
		},
		save_order_r_from(state, content) {
			state.orderRState_Bool = true
			uni.setStorage({
				key: 'queryRecordOrderUrlFrom',
				data: content
			});
		},
		change_lang_status_bool(state, content) {

			state.changeLangStatusBool = content
		},
		set_tasklist_num(state, content) {
			state.taskListState = content
		},
		set_symbol_Str(state, content) {
			state.symbolStr = content
		}
	},
	actions: {

	}
})

export default store
