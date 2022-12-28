<template>
	<view class="matchContentPage">
		<uni-nav-bar left-icon="left" backgroundColor="#00111C" color="#fff" :title="navTitle" :statusBar="true"
			:border="false" @clickLeft="goBackBtnClick" style="font-weight: 600;" />

		<view class="matchArea">
			<view class="time-bg-view">

			</view>
			<view class="detail-date">
				<view class="detail-date-time">
					<view class="detailTimeView">
						<!-- :test="`1111 ${this.paramId}`" -->
						{{$t('match.content.close.text')}}: <counter :endtime='closeTimeStr'
							v-if="this.closeTimeStr && this.paramId"></counter>
					</view>
				</view>
				<view class="detailDateView">
					{{detailDateStr | timestampStr}}
				</view>
			</view>
			<view class="detail-title">
				<!-- {{detailTitleStr}} -- {{paramId}} -->
				{{detailTitleStr}}
			</view>
			<view class="matchTwo">
				<view class="matchListLeft">
					<!-- <image src="../../static/images/default.png" mode=""></image> -->
					<image :src="matchTeamLeftLogo ? matchTeamLeftLogo:'../../static/images/default.png'" mode="">
					</image>
					{{matchTeamLeft}}
				</view>
				<view class="matchVS">

				</view>
				<view class="matchListRight">
					<!-- <image src="../../static/images/default.png" mode=""></image> -->
					<image :src="matchTeamRightLogo ? matchTeamRightLogo:'../../static/images/default.png'" mode="">
					</image>

					{{matchTeamRight}}
				</view>
			</view>
		</view>
		<view class="details-tab">
			<view :class="scoreClass" @click="changeTabClick">
				{{$t('match.content.score.text')}}
			</view>
			<view :class="scoreHalfClass" @click="changeTabClick_half">
				{{$t('match.content.half.score.text')}}
			</view>
		</view>


		<view class="detail-title details-tab-info">
			<view class="details-tab-info-head">
				<view class="details-tab-info-head-item">
					{{$t('match.content.list.scorebet.text')}}
				</view>
				<view class="details-tab-info-head-item">
					{{$t('match.content.list.odd.text')}}
				</view>
				<view class="details-tab-info-head-item">
					{{$t('match.content.list.status.text')}}
				</view>
			</view>
		</view>
		<swiper class="swiperViewCus" :duration="durationMatchSwiper" @change="matchContentSwiperChange"
			:current="matchContentSwiperCurrent">
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-Y">
					<!-- <view class="detail-content">
							<view class="detail-content-list">
								<view class="detail-content-list-body" v-for="(item,index) in scoreList" :key="index" @click="detailContentClick(item)">
									<view class="detail-body-scope-status">
										<view class="detail-body-scope">
											{{item.score}}
											<view class="detail-body-scope-right" v-if="item.help" @click.stop="helpClick(item)">
												<view class="" style="margin-left: 5px;">
													<u-icon name="question-circle" color="#3d8dfe"></u-icon>
												</view>
											</view>
										</view>
									</view>
									<view class="detail-body-earnings">
										{{item.lossPerCent}}
									</view>
									<view class="detail-body-order">
										{{$t('match.content.list.canbescore.text')}}
									</view>
								</view>
							</view>
						</view>		 -->

					<detailScoreView :scoreListData='scoreList' :gameType="2" @changeShowHelpTipNum="parentHelpClick">
					</detailScoreView>

					<!-- <noDataView  v-if="!noDataBool && scoreList.length === 0"  /> -->
				</scroll-view>

			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-Y">
					<!-- <view class="detail-content">
							<view class="detail-content-list">
								<view class="detail-content-list-body" v-for="(item,index) in scoreList" :key="index">
									<view class="detail-body-scope-status">
										<view class="detail-body-scope">
											{{item.score}}
											<view class="detail-body-scope-right" v-if="item.help !== ''" @click.stop="helpClick">
												<view class="" style="margin-left: 5px;">
													<u-icon name="question-circle" color="#3d8dfe"></u-icon>
												</view>
											</view>
										</view>
									</view>
									<view class="detail-body-earnings">
										{{item.earning}}
									</view>
									<view class="detail-body-order">
										{{$t('match.content.list.canbescore.text')}}
									</view>
								</view>
							</view>
						</view>		 -->

					<detailScoreView :scoreListData='scoreHalfList' :gameType="1"
						@changeShowHelpTipNum="parentHelpClick"></detailScoreView>

					<!-- <noDataView  v-if="!noDataBoolHalf && scoreHalfList.length === 0"  /> -->

				</scroll-view>

			</swiper-item>
		</swiper>

		<u-modal v-model="helpShow" :show-confirm-button="false" :show-cancel-button="false" :show-title="false"
			:mask-close-able="true" style="background: #334756!important;">
			<view class="helpModalView">
				{{$t('match.content.list.alert.text')}}
			</view>
		</u-modal>

		<!-- 	<uni-popup ref="popup" :mask-click="false" :is-mask-click="true" mask-background-color="rgba(0,17,28,.45)">
			<view class="helpModalViewCenter" v-if="currShowAlertTip === 1">
				{{$t('match.content.list.alert.text')}}
			</view>
			
			<view class="helpModalViewCenter" v-else>
				{{$t('match.content.list.alert.main.text')}}
			</view>
		</uni-popup> -->

		<alertTipPopView :showAlertTipNum="currShowAlertTip" :ball-num="ballNum"
			v-if="showAlertTipParent && allowPropsBool" @click.native="showAlertTipParentClick" ref="alertTipRef">
		</alertTipPopView>



		<u-toast ref="uToast" />

	</view>
</template>

<script>
	import {
		gameReq,
	} from '../../api/index.js'
	import {
		myMixin,
		matchContentMinxi
	} from '@/util/mixins.js'
	// import {mapState,mapMutations} from 'vuex'
	import counter from '../../components/counterView/counter.vue';
	import detailScoreView from '../../components/detailScoreView/detailScoreView.vue';
	import alertTipPopView from '../../components/alertTipPopView/alertTipPopView.vue';
	// import {
	// 	getTimeState,
	// 	formatDateToStr,
	// 	formatDateTimeSolt
	// } from '../../common/publicTool.js'
	export default {
		components: {
			counter,
		},
		// filters:{
		// 	timestampStr(value){
		// 		// console.log("val",formatDateToStr(value));
		// 		return formatDateTimeSolt(value,1)
		// 	}
		// },
		data() {
			return {
				navTitle: 'Competition Details',
				scoreClass: 'details-tab-left active-tab',
				scoreHalfClass: 'details-tab-right',
				tempClose: 79677458,
				detailDateStr: '',
				detailTitleStr: '',
				matchTeamLeft: '',
				matchTeamLeftLogo: '',
				matchTeamRight: '',
				matchTeamRightLogo: '',
				scoreStr: '',
				matchContentSwiperCurrent: 0,
				durationMatchSwiper: 1000,
				helpShow: false,
				pageItemData: null,
				scoreList: [],
				scoreHalfList: [],
				noDataBool: false,
				noDataBoolHalf: false,
				localLoginToken: '',
				closeTimeStr: null,
				urlFromStr: '',
				paramId: null,
				currShowAlertTip: 1,
				ballNum: 0,
				showAlertTipParent: false,
				allowPropsBool: false,

			}
		},
		mixins: [myMixin, matchContentMinxi],
		computed: {
			// ...mapState(['hasLogin','matchContent_Bool','selectBetNul'])
		},
		onLoad() {

			// if(!this.hasLogin){
			// 	uni.reLaunch({
			// 	   url: '../login/login',
			// 	   animationType: 'pop-in',
			// 	   animationDuration: 200
			// 	})
			// }
			this.change_bet_num(2)
			this.save_bet_num(2)
			// console.log("content_selectBetNul",this.selectBetNul);

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			//初始化语言
			this.initLang()


			// console.log("this.matchContent_Bool",this.matchContent_Bool);
			if (!this.matchContent_Bool) {
				const queryMatchContentItem = uni.getStorageSync('queryMatchContentItem')
				if (queryMatchContentItem) {
					// 使用网络请求
					// this.requestInitData(queryMatchContentItem.game.id)
					// 直接本地获取
					this.closeTimeStr = null
					this.paramId = null

					this.closeTimeStr = queryMatchContentItem.game.remainingTime
					this.paramId = queryMatchContentItem.game.id
					this.detailTitleStr = queryMatchContentItem.game.allianceName
					this.detailDateStr = queryMatchContentItem.game.startTime
					this.matchTeamLeft = queryMatchContentItem.game.mainName
					this.matchTeamRight = queryMatchContentItem.game.guestName
					this.matchTeamLeftLogo = queryMatchContentItem.game.mainLogo
					this.matchTeamRightLogo = queryMatchContentItem.game.guestLogo
					// this.scoreList = queryMatchContentItem.lossPerCent

					let lossPerCentArray = queryMatchContentItem.lossPerCent
					// console.log("lossPerCentArray",lossPerCentArray,typeof lossPerCentArray);
					let lossPerCentArr = lossPerCentArray.filter((item, index) => { //1是上半,2是全场咯
						if (item.gameType === 2) {
							return item
						}
					})

					let lossPerCentArrHalf = lossPerCentArray.filter((item, index) => { //1是上半,2是全场咯
						if (item.gameType === 1) {
							return item
						}
					})

					// console.log("lossPerCentArr",lossPerCentArr);
					// console.log("lossPerCentArrHalf",lossPerCentArrHalf);
					this.scoreList = lossPerCentArr
					this.scoreHalfList = lossPerCentArrHalf

				}


			} else {

			}

			// 初次获取页面数据
			this.initPageData()


		},
		onUnload() {
			// uni.$off('handleSuccess');
		},
		onShow() {


			// uni.$on('handleSuccess', data => {
			// 	console.log('details发出的值===>', data);
			// 	if (data) {
			// 		 this.requestInitData(data)
			// 	}
			// });

			// console.log("onShow");


			this.navTitle = this.$t('match.content.detail.title')
			// this.scoreList = []

		},
		methods: {
			// ...mapMutations(['save_match_content','remove_match_content','logout','change_bet_num','save_bet_num','remove_bet_num']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr


			},
			initPageData() {
				// #ifndef APP-NVUE
				const eventChannel = this.getOpenerEventChannel();
				// console.log("eventChannel",eventChannel);
				// #endif
				// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
				eventChannel.on('matchDeClick', (data) => {
					// console.log("data",data);
					this.urlFromStr = data.from
					this.requestInitData(data.content.id)
				})
			},
			// fiter
			async requestInitData(gameId) {
				// console.log("data11111",gameId);
				let resR = await gameReq({
					gameId
				}, this.localLoginToken, 'GET')
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.pageItemData = resR.data
					this.save_match_content(resR.data)
					// console.log({...this.pageItemData})
					this.paramId = resR.data.game.id
					// console.log("this.paramId",this.paramId);
					this.closeTimeStr = 0
					this.closeTimeStr = resR.data.game.remainingTime
					// console.log("this.closeTimeStr",this.closeTimeStr);
					this.detailTitleStr = resR.data.game.allianceName
					this.detailDateStr = resR.data.game.startTime
					this.matchTeamLeft = resR.data.game.mainName
					this.matchTeamRight = resR.data.game.guestName
					this.matchTeamLeftLogo = resR.data.game.mainLogo
					this.matchTeamRightLogo = resR.data.game.guestLogo

					let lossPerCentArray = resR.data.lossPerCent
					// console.log("lossPerCentArray", lossPerCentArray, typeof lossPerCentArray);
					let lossPerCentArr = lossPerCentArray.filter((item, index) => { //1是上半,2是全场咯
						if (item.gameType === 2) {
							return item
						}
					})

					let lossPerCentArrHalf = lossPerCentArray.filter((item, index) => { //1是上半,2是全场咯
						if (item.gameType === 1) {
							return item
						}
					})


					// console.log("lossPerCentArr",this.pageItemData);

					// this.save_match_content(this.pageItemData)
					// console.log("lossPerCentArr",lossPerCentArr);
					// console.log("lossPerCentArrHalf",lossPerCentArrHalf);
					this.pageItemData.lossPerCent = lossPerCentArr
					if (lossPerCentArr.length === 0) {
						this.scoreList = []
					} else {

						this.scoreList = lossPerCentArr
					}

					if (lossPerCentArrHalf.length === 0) {
						this.scoreHalfList = []
					} else {

						this.scoreHalfList = lossPerCentArrHalf
					}
					// this.scoreList = lossPerCentArr
					// this.scoreHalfList = lossPerCentArrHalf

					// let tempSavePageItemData = {}
					// tempSavePageItemData.game = resR.data


					// this.scoreList = resR.data.lossPerCent
				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					this.$refs.uToast.show({
						title: resR.msg,
						url: '/pages/login/login',
					})
				}
			},
			goBackBtnClick() {
				this.remove_bet_num()
				this.remove_match_content()
				const queryMatchContentItemUrlFrom = uni.getStorageSync('queryMatchContentItemUrlFrom') || 'other'
				// console.log("queryMatchContentItemUrlFrom",queryMatchContentItemUrlFrom);
				if (!this.matchContent_Bool) {
					this.urlFromStr = queryMatchContentItemUrlFrom
				}
				// console.log("this.urlFromStr",this.urlFromStr);
				if (this.urlFromStr === "home") {
					uni.switchTab({
						url: '/pages/home/index',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "match") {
					uni.switchTab({
						url: '/pages/match/match_list',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else {
					uni.switchTab({
						url: '/pages/match/match_list',
						animationType: 'pop-in',
						animationDuration: 200
					})
					// uni.navigateBack({
					// 	delta: 1
					// });
				}


			},
			changeTabClick() { //反波胆点击事件
				this.scoreClass = 'details-tab-left active-tab',
					this.scoreHalfClass = 'details-tab-right'
				this.matchContentSwiperCurrent = 0
				//1正波,2反波
				this.change_bet_num(2)
				this.save_bet_num(2)
			},
			changeTabClick_half() { //上半场反波胆点击事件
				this.scoreClass = 'details-tab-left',
					this.scoreHalfClass = 'details-tab-right active-tab'
				this.matchContentSwiperCurrent = 1
				//1正波,2反波
				this.change_bet_num(1)
				this.save_bet_num(1)
			},
			matchContentSwiperChange(e) {
				let current = e.detail.current
				this.matchContentSwiperCurrent = current
				// console.log("current",current);
				if (current === 0) {
					this.changeTabClick()
				} else {
					this.changeTabClick_half()
				}
			},
			parentHelpClick(num, currNumber) {
				// console.log("num",num,currNumber);

				if (num === 1) { //客赢4球
					this.currShowAlertTip = 1
				} else { //主赢4球
					this.currShowAlertTip = 2
				}

				// if(this.matchContentSwiperCurrent = 0){
				// 	this.ballNum = 3
				// }else{
				// 	this.ballNum = 4

				// }

				this.ballNum = currNumber
				this.allowPropsBool = true
				this.showAlertTipParent = true

				this.$nextTick(() => {
					this.$refs.alertTipRef.openTip()
				})
				// this.$refs.popup.open('center')
			},
			showAlertTipParentClick() {
				this.showAlertTipParent = false
			}
			// helpClick(item){//帮助弹窗
			// 	// uni.showToast({
			// 	// 	title: this.$t('match.content.list.alert.text'),
			// 	// });
			// 	console.log("item",item);

			// 	let scoreString = item.score
			// 	let leftScoreStr = scoreString.split('-')[0]
			// 	if(leftScoreStr === '*'){ //客赢4球
			// 		this.currShowAlertTip = 1
			// 	}else{ //主赢4球
			// 		this.currShowAlertTip = 2
			// 	}

			// 	this.$refs.popup.open('center')



			// 	// this.helpShow = true
			// },
		}
	}
</script>

<style scoped>
	page {
		background-color: #071a28;
	}

	.matchContentPage {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: #071a28;
		height: calc(100vh - var(--window-top));
	}


	.matchArea {
		background: #132736 url(../../static/images/list_bg.png) no-repeat top;
		background-size: 100%;
		margin: 20px 15px 0 15px;
		box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
		border-radius: 10px;
		overflow: auto;
		position: relative;
	}

	.detail-date {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 7px 10px 0px;
		position: inherit;
		z-index: 10;
	}

	.detail-date-time {
		display: flex;
		align-items: center;
		font-size: 13px;
		font-family: Hiragino Sans GB;
		font-weight: 400;
		color: #fff;
	}

	.detailTimeView {}

	.detailDateView {
		font-size: 13px;
		font-weight: 400;
		font-family: Hiragino Sans GB;
		color: #fff;
	}

	.detail-title {
		text-align: center;
		font-size: 14px;
		font-family: Hiragino Sans GB;
		/* padding-top: 20px; */
		padding-top: 70px;
		color: #fff;
	}

	.time-bg-view {
		position: absolute;
		top: 0;
		left: 0;
		background: linear-gradient(-90deg, rgba(128, 90, 0, 0), #3d8dfe);
		height: 26px;
		width: 30%;
	}

	.matchTwo {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		/* padding-top: 30px; */
		padding-top: 5px;
		padding-bottom: 15px;
		color: #FDFDFD;
	}

	.matchListLeft {
		text-align: center;
		font-size: 12px;
		font-family: FZDaHei-B02S;
		font-weight: 500;
		width: 43%;
	}

	.matchListLeft image {
		display: block;
		margin: 0 auto 10px;
		width: 36px;
		height: 36px;
		border-radius: 50px;
	}

	.matchVS {
		width: 40px;
		height: 40px;
		text-align: center;
		font-size: 14px;
		background: url(../../static/images/vs.png) no-repeat top;
		background-size: 100%;
	}

	.matchListRight {
		text-align: center;
		font-size: 12px;
		font-family: FZDaHei-B02S;
		font-weight: 500;
		width: 43%;
	}

	.matchListRight image {
		display: block;
		margin: 0 auto 10px;
		width: 36px;
		height: 36px;
		border-radius: 50px;
	}

	.details-tab {
		display: flex;
		/* align-items: center; */
		justify-content: space-between;
		font-size: 15px;
		margin: 20px 20px 0;
		/* margin: 20px; */
		color: #FFFFFF;
	}

	.details-tab-left {
		flex: 1;
		text-align: center;
		box-sizing: border-box;
		font-size: 12px;
		font-weight: 400;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 35px;
		background: #334756;
		color: #fff;
		padding: 0 1px;
		border-radius: 5px 0 0 5px;
		position: relative;
	}


	/* 	.details-tab-left::after {
		content: "";
		opacity: 1;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #3d8dfe;
		box-shadow: 0 0 0 1px #3d8dfe;
		position: absolute;
		left: 50%;
		bottom: -5px;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	} */

	.details-tab-right {
		flex: 1;
		text-align: center;
		box-sizing: border-box;
		font-size: 12px;
		font-weight: 400;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 35px;
		background: #334756;
		color: #fff;
		padding: 0 1px;
		border-radius: 0 5px 5px 0;
	}

	.active-tab {
		background: #3d8dfe;
		color: #fff;
	}

	.details-tab-info {
		padding: 20px 15px 0px;
	}

	.details-tab-info-head {
		display: flex;
		align-items: center;
		font-size: 14px;
		font-weight: 400;
		color: #fff;
		height: 44px;
		background: #334756;
		box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
		opacity: 1;
		border-radius: 10px 10px 0 0;
		padding: 0 10px;
	}

	.details-tab-info-head-item {
		width: 30%;
	}

	.details-tab-info-head-item:nth-child(2) {
		width: 35%;
	}

	.details-tab-info-head-item:last-child {
		width: 35%;
	}

	/* 
.detail-content{
	font-size: 14px;
	text-align: center;
	padding: 0px 15px 15px;
}

.detail-content-list{
	padding: 1px 0px 9px 0px;
	background: #132736;
	border-radius: 0 0 10px 10px;
}

.detail-content-list-body{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	color: #fff;
	margin: 10px;
	background: #334756;
	line-height: 30px;
	border-radius: 4px;
}

.detail-body-scope-status{
	display: flex;
	align-items: center;
	width: 30%;
}

.detail-body-scope{
	font-size: 12px;
	margin: auto;
}

.detail-body-scope-right{
	display: inline-block;
	width: auto;
}

.detail-body-earnings{
	width: 25%;
	color: #3d8dfe;
}

.detail-body-order{
	width: 45%;
}
 */
	.scroll-Y {
		height: 100%;
	}

	.swiperViewCus {
		flex: 1;
	}


	.helpModalViewCenter {
		max-width: 200px;
		max-height: 50px;
		/* margin: 20px; */
		padding: 8px 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #00FF65;
		border-radius: 7px;
		background: #334756;
	}

	.u-model {
		background: #334756;
	}
</style>
