<template>
	<view>
		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>

		<view class="user_container">
			<view class="searchBox">
				<view class="searchBoxList" @click="searchBoxListClick">
					<view class="searchInputShow">
						{{initSearchInputText}}
					</view>
					<span :class="!showListBool?arrowClass:arrowClassActive"></span>
					<view class="inputSearchList" :style="!showListBool?'display: none;':''">
						<scroll-view scroll-y="true" class="scrollInputSearchList">

							<view class="inputSearchListItem" v-for="(item,index) in inputSearchListItemArray"
								:key="index" @click="inputSearchListItemClick(item,index)">
								<view class="">
									{{item.nameStr}}
								</view>
								<image v-if=" currentIndex == index " src="../../../static/images/dian.png" mode="">
								</image>
							</view>

						</scroll-view>
					</view>
				</view>
				<view class="searchBtn" @click="searchWhereBtnClick">
					{{$t('user.report.account.change.query.btn.text')}}
				</view>
			</view>
			<view class="tableBox">
				<view class="tableBoxCenterTitle">
					<view class="tableBoxCenterTitleItem">
						{{$t('user.report.account.change.list.date.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('user.report.account.change.list.username.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('user.report.account.change.list.type.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('user.report.account.change.list.method.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('user.report.account.change.list.balance.text')}}
					</view>
				</view>
				<view class="tableBoxBody">

					<mescroll-uni ref="mescrollRef" :fixed="false" top="0" :topbar="false" bottom="0" :bottombar="false"
						:safearea="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
						:up="upOption">

						<view class="tableBoxBodyTBody" v-for="(item, index) in dataList" :key="index">
							<view class="tableBoxBodyTBodyItem " style="width: 22%;">
								{{item.createdAt | timestampStr}}
							</view>
							<view class="tableBoxBodyTBodyItem tBodyItemBet">
								{{currUserName}}
							</view>
							<view class="tableBoxBodyTBodyItem">
								{{item.typeName}}
							</view>
							<view class="tableBoxBodyTBodyItem ">
								<view class="tableBoxBodyTBodyItem_method">
									<view class="">
										{{item.changeMoney && item.changeMoney.toString().indexOf('-') !== -1 ? $t('user.report.account.change.query.type.expenditure.title.text') : $t('user.report.account.change.query.type.income.title.text')}}
									</view>
									<view class=""
										:style="item.changeMoney && item.changeMoney.toString().indexOf('-') !== -1 ? 'color:red' : 'color:#3d8dfe' ">
										{{item.changeMoney| moneyFormat | changeMonFormat}}
									</view>
								</view>
							</view>
							<view class="tableBoxBodyTBodyItem">
								{{item.dnedMoney | moneyFormat}}
							</view>
						</view>


					</mescroll-uni>

				</view>

				<u-popup class="dialog" v-model="showTypeBool" mode="bottom" border-radius="54"
					:mask-custom-style="maskCustomStyle" :custom-style="popCustomStyle">
					<view class="dialogMain">
						<view class="dialogTitle">
							<view class="dialogLine">

							</view>
							<!-- :gutter="30" -->
							<u-tabs :list="tabList" :is-scroll="false" :current="tabCurrent" :bold="false"
								bg-color="transparent" font-size="14" :item-width="200" :bar-width="140" :bar-height="2"
								inactive-color="#FFFFFF" active-color="#3d8dfe" @change="tabChange"></u-tabs>
						</view>
						<view class="dialogContent">
							<view class="dialogContentList">
								<view
									:class="currentSelectType === item.narnoid ? 'dialogContentListCellActive': 'dialogContentListCell'"
									v-for="(item,index) in defaultTypeList" :key="item.narnoid"
									@click="selectTypeClick(item)">
									<!-- {{item.value}} -->
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</u-popup>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		balanceChangeReq,
		playerInfoReq
	} from '../../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	// import {
	// 	getTimeState,
	// 	formatDateToStr,
	// 	formatDateTimeSolt
	// } from '../../../common/publicTool.js'
	// import {mapState,mapMutations} from 'vuex'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin], // 使用mixin
		components: {
			MescrollBodyDiy // 避免与main.js注册的全局组件名称相同,否则注册组件失效(iOS真机 APP HBuilderX2.7.9)
		},
		data() {
			return {
				maskCustomStyle: {
					'background-color': 'rgba(0, 17, 28, 0.45)'
				},
				popCustomStyle: {
					'background': 'transparent',
				},
				showTypeBool: false,
				tabCurrent: 0,
				currentIndex: 0,
				currentSelectType: 1,
				showListBool: false,
				arrowClass: 'iconfont icon-arrow-down rightArrow',
				arrowClassActive: 'iconfont icon-arrow-down rightArrow rightArrowActive',
				navTitle: this.$t('user.report.account.change.title.text'),
				initSearchInputText: this.$t('user.report.account.change.query.time.today.text'),
				inputSearchListItemArray: [],
				triggered: false,
				queryTime: 1, //默认是今天
				dataList: [],
				tabList: [],
				defaultTypeList: [],
				typeList: [],
				pageNoNum: 1,
				pageSizeNum: 15,
				selectTypeNum: -101,
				thatT: this,
				currUserName: '',
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {

				},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					toTop: {
						src: null,
						offset: 1000,
						duration: 300,
						zIndex: 9990,
						// right: 20,
						// bottom: 40,
						right: 60,
						bottom: 180,
						// right: 20,
						// bottom: 120,
						safearea: false,
						width: 72,
						radius: "50%",
						left: null
					},
					empty: {
						use: true,
						icon: "../../../static/images/nodata.png",
						tip: 'Absolutely empty',
						btnText: "",
						fixed: false,
						top: "100rpx",
						zIndex: 99
					},
					textLoading: 'Loading',
					textNoMore: '-- End --'
				}
			}
		},
		filters: {
			// timestampStrSlice(value){
			// 	// console.log("val",formatDateToStr(value));
			// 	if(value ){
			// 		let tempDateStr = formatDateTimeSolt(value,1)
			// 		return tempDateStr.slice(5)
			// 	}

			// },
			// timestampStr(value){
			// 	if(value && value != "---"){
			// 		return formatDateTimeSolt(value,1)
			// 	}else if(value === '---'){
			// 		return value
			// 	}
			// },
			showToMethod(value) {
				// console.log("value");
				if (value) {
					let currDataV = value.toString()
					if (currDataV.indexOf('-') === -1) {
						return $t('user.report.account.change.query.type.income.title.text')
					} else {
						return $t('user.report.account.change.query.type.expenditure.title.text')
					}

				}
			},
			changeMonFormat(value) {
				// console.log("value",value);
				if (value) {
					let currDataV = value.toString()
					if (currDataV.indexOf('-') === -1) {
						return "+" + value
					} else {
						return value
					}

				}
			},
			realType(value, that) {
				let currMethodName = ""
				// console.log("value",value,);
				if (value) {
					that.typeList.find((item, index) => {
						// console.log("item.method",item.method,value);
						if (item.method === value) {
							// console.log("item.name",item.method === value,item.name);
							currMethodName = item.name
							// return false
						}
					})

					console.log("currMethodName", currMethodName);
				}

				return currMethodName
			}
		},
		// computed:{
		// 	...mapState(['hasLogin'])
		// },
		// onLoad() {
		// 	// console.log("this.hasLogin",this.hasLogin);
		// 	if(!this.hasLogin){
		// 		uni.reLaunch({
		// 		   url: '/pages/login/login',
		// 		   animationType: 'pop-in',
		// 		   animationDuration: 200
		// 		})
		// 	}

		// 	// this._freshing = false;
		// },
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()

			this.defaultTypeList = this.typeList
			this.currentIndex = 0
			this.tabCurrent = 0
			this.currentSelectType = 1

			// 获取个人信息
			this.getInfoPerson()
		},
		methods: {
			initLang() { //初始化语言


				let langStr = uni.getStorageSync('foot_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('user.report.account.change.title.text'),
					this.initSearchInputText = this.$t('user.report.account.change.query.time.today.text'),
					this.inputSearchListItemArray = [{
						nameStr: this.$t('user.report.account.change.query.time.today.text'),
					}, {
						nameStr: this.$t('user.report.account.change.query.time.yes.text'),
					}, {
						nameStr: this.$t('user.report.account.change.query.time.nearly.text'),
					}],
					this.tabList = [{
						name: this.$t('user.report.account.change.query.type.all.title.text'),
					}, {
						name: this.$t('user.report.account.change.query.type.expenditure.title.text'),
					}, {
						name: this.$t('user.report.account.change.query.type.income.title.text'),
					}],
					this.typeList = [{
						name: this.$t('user.report.account.change.query.type.all.title.text'),
						narnoid: 1,
						method: 0,
						value: -101,
					}, {
						name: this.$t('user.report.account.change.query.type.expenditure.online.cancel.text'),
						narnoid: 2,
						method: 2,
						value: 10,
					}, {
						name: this.$t('user.report.account.change.query.type.expenditure.manual.reduction.text'),
						narnoid: 3,
						method: 2,
						value: 8,
					}, {
						name: this.$t('user.report.account.change.query.type.expenditure.withdraw.deduction.text'),
						narnoid: 4,
						method: 2,
						value: 2,
					}, {
						name: this.$t('user.report.account.change.query.type.expenditure.bet.text'),
						narnoid: 5,
						method: 2,
						value: 3,
					}, {
						name: this.$t('user.report.account.change.query.type.expenditure.rebate.deduction.text'),
						narnoid: 6,
						method: 2,
						value: 9,
					}, 
					// {
					// 	name: this.$t('user.report.account.change.query.type.expenditure.send.envelope.text'),
					// 	narnoid: 7,
					// 	method: 2
					// }, 
					{
						name: this.$t('user.report.account.change.query.type.expenditure.send.reward.text'),
						narnoid: 8,
						method: 2
					}, {
						name: this.$t('user.report.account.change.query.type.income.online.recharge.text'),
						method: 1,
						value: 1,
					}, {
						name: this.$t('user.report.account.change.query.type.income.offline.recharge.text'),
						narnoid: 9,
						method: 1,
						value: 11,
					}, {
						name: this.$t('user.report.account.change.query.type.income.manually.add.money.text'),
						narnoid: 10,
						method: 1,
						value: 6,
					}, {
						name: this.$t('user.report.account.change.query.type.income.withdraw.return.text'),
						narnoid: 11,
						method: 1,
						value: 12,
					}, {
						name: this.$t('user.report.account.change.query.type.income.bets.return.text'),
						narnoid: 12,
						method: 1,
						value: 13,
					}, {
						name: this.$t('user.report.account.change.query.type.income.bet.cancel.text'),
						narnoid: 13,
						method: 1,
						value: 7,
					}, {
						name: this.$t('user.report.account.change.query.type.income.bet.rebate.text'),
						narnoid: 14,
						method: 1,
						value: 4,
					}, {
						name: this.$t('user.report.account.change.query.type.income.bet.back.text'),
						narnoid: 15,
						method: 1,
						value: 14,
					}, 
					// {
					// 	name: this.$t('user.report.account.change.query.type.income.receive.envelops.text'),
					// 	narnoid: 16,
					// 	method: 1
					// }, 
					{
						name: this.$t('user.report.account.change.query.type.income.receive.rewards.text'),
						narnoid: 17,
						method: 1
					}, {
						name: this.$t('user.report.account.change.query.type.income.register.gift.text'),
						narnoid: 18,
						method: 1,
						value: 15,
					}, {
						name: this.$t('user.report.account.change.query.type.income.share.gift.text'),
						narnoid: 19,
						method: 1,
						value: 16,
					}, {
						name: this.$t('user.report.account.change.query.type.income.vip.cash.text'),
						narnoid: 20,
						method: 1,
						value: 17,
					}, {
						name: this.$t('user.report.account.change.query.type.income.activity.cash.text'),
						narnoid: 21,
						method: 1,
						value: 18,
					}, {
						name: this.$t('user.report.account.change.query.type.income.recharge.gift.text'),
						narnoid: 22,
						method: 1,
						value: 19,
					}, {
						name: this.$t('match.order.detail.proce.fee.text'),
						narnoid: 24,
						method: 1,
						value: 20,
					}, {
						name: this.$t('user.report.account.change.query.type.income.lower.level.rebate.text'),
						narnoid: 23,
						method: 1,
						value: 5,
					}, {
						name: this.$t('user.report.account.change.query.type.income.lower.level.recharge.rebate.text'),
						narnoid: 25,
						method: 1,
						value: 21,
					}, {
						name: this.$t('user.report.account.change.query.type.income.lower.level.bet.rebate.text'),
						narnoid: 26,
						method: 1,
						value: 22,
					}, {
						name: this.$t('user.report.account.change.query.type.income.invite.rewards.text'),
						narnoid: 27,
						method: 1,
						value: 23,
					}, {
						name: this.$t('user.report.account.change.query.type.income.first.charge.text'),
						narnoid: 28,
						method: 1,
						value: 24,
					}, {
						name: this.$t('user.report.account.change.query.type.income.active.profit.text'),
						narnoid: 29,
						method: 1,
						value: 25,
					}, {
						name: this.$t('user.report.account.change.query.type.income.sufficient.reward.text'),
						narnoid: 30,
						method: 1,
						value: 26,
					}, {
						name: this.$t('user.report.account.change.query.type.income.fixed.day.text'),
						narnoid: 31,
						method: 1,
						value: 27,
					}, {
						name: this.$t('user.report.account.change.query.type.invite.first.charge.text'),
						narnoid: 32,
						method: 1,
						value: 28,
					}]


			},
			async getInfoPerson() {
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.currUserName = resR.data.username
				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
						success: (res) => {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					});
				}
			},
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/report_management',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			searchBoxListClick() {
				this.showListBool = !this.showListBool
			},
			inputSearchListItemClick(item, index) {
				// console.log("index",index);

				this.initSearchInputText = item.nameStr
				this.currentIndex = index;
				// this.getAccountChangeData(this.pageNoNum,this.pageSizeNum)
				this.dataList = []
				this.mescroll.resetUpScroll();
			},
			searchWhereBtnClick() {
				this.showListBool = false
				this.showTypeBool = true
			},
			tabChange(index) {
				this.tabCurrent = index;
				// console.log("index",index);
				if (index === 0) { //全部
					this.defaultTypeList = this.typeList
				} else if (index === 1) { //支出
					this.defaultTypeList = this.typeList.filter((item, index) => {
						if (item.method === 2) {
							return item
						}
					})

				} else if (index === 2) { //收入
					this.defaultTypeList = this.typeList.filter((item, index) => {
						if (item.method === 1) {
							return item
						}
					})
				}
			},
			selectTypeClick(item) {
				// console.log("item", item);
				this.showTypeBool = false
				this.currentSelectType = item.narnoid
				this.selectTypeNum = item.value
				// this.getAccountChangeData(this.pageNoNum,this.pageSizeNum)
				this.dataList = []
				this.mescroll.resetUpScroll();
			},
			realTypeName(realTypeName) {
				// console.log("realTypeName",realTypeName);

				let tempArray = this.typeList.find(itemT => {
					if (itemT.value === realTypeName) {

						return itemT
					}
				})
				if (!tempArray) {

					return ""
				}
				return tempArray.name
			},
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},

			/*下拉刷新的回调, 重置列表为第一页 (此处可删,mixins已默认)*/
			downCallback() {
				this.dataList = []
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				// console.log("pageNum",pageNum);
				// console.log("pageSize",pageSize);
				this.getAccountChangeData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getAccountChangeData(pageNum, pageSize) {
				// 动态更新全局配置
				uni.$emit("setMescrollGlobalOption", {
					up: {
						empty: {
							tip: this.$t('alert.absolutely.empty')
						},
						textNoMore: this.$t('alert.nomore')
					},
				})
				// let valueNum = item.value

				let reqParam = {}

				if (this.tabCurrent === 0) {
					// console.log("是全部标签");
					if (this.selectTypeNum !== -101) { //不是全部类型按钮的时候
						if (this.selectTypeNum) {
							reqParam.type = this.selectTypeNum
						}
						// console.log("不是全部按钮");
					} else {
						// console.log("是全部按钮");
					}
				} else { //不是全部标签的时候
					// console.log("不是全部标签");
					// if(item.method !== 0){ //不是全部类型按钮的时候
					// 	reqParam.type = item.value
					// }else{

					// }
					if (this.selectTypeNum) {
						reqParam.type = this.selectTypeNum
					}
					// reqParam.typeb = item.method
				}


				reqParam.time = this.currentIndex + 1
				reqParam.pageNo = pageNum
				reqParam.pageSize = pageSize

				// console.log("reqParam",reqParam);

				let resR = await balanceChangeReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {


					let resultsArr = resR.data.results
					let resultsArrNew = []
					let balanceChangeType
					resultsArr.forEach((item, index) => {

						balanceChangeType = this.realTypeName(item.balanceChangeType)



						resultsArrNew.push({
							...item,
							typeName: balanceChangeType
						})
					})

					// console.log("resultsArrNew",resultsArrNew);
					// this.dataList = resultsArrNew

					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//设置列表数据
					if (pageNum == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(resultsArrNew); //追加新数据
				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
						success: (res) => {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					});
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #071a28;
	}

	.navLeftBtn image {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
	}

	.navTitleCenter {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
	}


	.user_container {
		padding: 0 16px;
		height: 100%;
	}

	.searchBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 4px;
		padding-top: 10px;
	}

	.searchBoxList {
		width: 90%;
		margin-right: 5%;
		height: 42px;
		font-size: 12px;
		background-color: #334756;
		/* border: 0px; */
		color: #fff;
		border-radius: 5px;
		padding-left: 10px;
		position: relative;
	}

	.searchInputShow {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;

	}


	.searchBtn {
		font-family: Roboto;
		width: 73px;
		min-height: 42px;
		text-align: center;
		background-color: #3d8dfe;
		font-size: 14px;
		font-weight: 500;
		color: #fff;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 5px;

	}

	.rightArrow {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		align-items: center;
		height: 100%;
		font-weight: 100;
		width: 12%;
		justify-content: center;
		font-size: 16px;
		color: #fff;
		/* transition: transform .2s cubic-bezier(.645, .045, .355, 1); */
		/*设置所有动画的效果：0.3s 淡出效果*/
		transition: all .3s ease-out;
	}

	.rightArrowActive {
		/*旋转180度*/
		transform: rotate(180deg);
	}

	.inputSearchList {
		position: absolute;
		width: 100%;
		left: 0;
		top: 42px;
		box-sizing: border-box;
		z-index: 100;
	}

	.scrollInputSearchList {
		border-radius: 5px;
		width: 100%;
		max-height: 10em;
		background-color: #132736;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		padding: 10px 0;
	}

	.inputSearchListItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 37px;
		font-weight: 400;
		padding: 0 10px;
	}

	.inputSearchListItem image {
		width: 15px;
		height: 15px;
	}

	.tableBox {
		margin-top: 6px;
		height: calc(100vh - 165px);
		border-radius: 5px;
		overflow: hidden;
	}



	.tableBoxCenterTitle {
		/* width: 100%; */
		/* height: 50px; */
		line-height: 50px;
		background: #334756;
		box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
		border-radius: 5px 5px 0 0;
		/* padding: 0 10px; */
		display: flex;
		align-items: center;
	}



	.tableBoxCenterTitleItem {
		width: 20%;
		font-size: 12px;
		color: #fff;
		font-weight: 500;
		line-height: 20px;
		text-align: center;
		padding: 10px 0;
		word-break: break-word;
	}

	.tableBoxBody {
		background: #132736;
		/* 用原生的scrollView的时候.用上 */
		height: calc(100% - 53px);
		/* padding-bottom: 10px; */
		border-radius: 0 0 5px 5px;
	}

	.tableBoxBodyTBody {
		background: #334756;
		border-radius: 2px;
		margin: 10px;
		padding: 5px 0;
		display: flex;
		align-items: center;
	}

	.tBodyItemDate {
		width: 22%;
	}

	.tableBoxBodyTBodyItem {
		width: 20%;
		color: #fff;
		font-size: 12px;
		word-break: break-all;
		text-align: center;
		font-size: 12px;
		font-weight: 400;
	}

	.dialog {
		z-index: 10;
	}


	.dialogMain {
		background-color: #132736;
		height: 450px;
		overflow-y: scroll;
	}


	.dialogTitle {
		width: 100%;
		margin: 0 auto;
		/* border-bottom: 1px solid #10222f; */
	}


	.dialogLine {
		height: 5px;
		background: #fff;
		border-radius: 2px;
		width: 82px;
		margin: 10px auto;
		margin-bottom: 5px;
	}

	.dialogContent {
		margin-top: 10px;
		/* padding: 2px 0 2px 18px; */
		padding: 2px 10px;
	}

	.dialogContentList {
		display: flex;
		justify-content: left;
		/* flex-wrap: wrap; */
		flex-flow: row wrap;
		padding-bottom: 52px;
		width: 100%;


		/* grid-template-columns: repeat(auto-fill, 30%); */
		/* grid-template-columns: 1fr 1fr 1fr; */
		/* display: grid;
	grid-template-columns: repeat(3, 31.33%);
	grid-gap: 0 10px; */
	}

	.dialogContentListCell {
		/* 	grid-column-start: 1;
		grid-column-end: 3; */
		margin-top: 10px;
		/* width: 30%; */
		min-height: 24px;
		text-align: center;
		font-size: 12px;
		font-weight: 500;
		color: #fff;
		background: #334756;
		border-radius: 5px;
		/* margin-right: 11px; */
		/* margin:3px; */
		display: flex;
		/* width: 32.33%; */
		margin-right: 0.08rem;
		align-items: center;
		justify-content: center;
		padding: 3px 0;
		/* flex:1; */
		/* flex: 1 1 33.33%; */
		flex: 0 0 32.33%;
		margin-right: 1%;

	}

	.dialogContentListCellActive {
		/* 	grid-column-start: 1;
		grid-column-end: 3; */
		background: #3d8dfe;
		margin-top: 10px;
		/* width: 30%; */
		min-height: 24px;
		text-align: center;
		font-size: 12px;
		font-weight: 500;
		color: #fff;
		border-radius: 5px;
		/* margin-right: 11px; */
		/* margin:3px; */
		display: flex;
		/* width: 32.33%; */
		margin-right: 0.08rem;
		align-items: center;
		justify-content: center;
		padding: 3px 0;
		/* flex:1; */
		/* flex: 1 1 33.33%; */
		flex: 0 0 32.33%;
		margin-right: 1%;
	}

	.dialogContentListCell:nth-child(3n) {
		margin-right: 0
	}

	.dialogContentListCell:nth-child(3n+1) {
		margin-left: 0.5%;
	}

	.dialogContentListCellActive:nth-child(3n) {
		margin-right: 0
	}

	.dialogContentListCellActive:nth-child(3n+1) {
		margin-left: 0.5%;
	}
</style>
