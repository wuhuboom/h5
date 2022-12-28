<template>
	<view class="wrap">
		<view class="backTitleBar-wrapper colCent borderBox">
			<view class="fixedBox">
				<view class="common_header" style="height: 44px;">
					<view class="define">
						<view class="define_left_slot" @click="goBackBtnClick">
							<view class="">
								<u-icon name="arrow-left" size="32"></u-icon>
							</view>
						</view>
						<view class="define_center_slot">
							<view class="">
								<text class="title">{{navTitle}}</text>
							</view>
						</view>
						<!-- @click="goToServerBtnClick" -->
						<view class="define_right_slot">
							<view class="">
								<view class="service">
									<!-- <image src="../../static/images/service.png" mode="" class="icon"></image> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="placeBox">
				<view class="topbarbox">

				</view>
				<view class="placeemptbox" style="height: 45px;">

				</view>
			</view>

		</view>
		<view class="teamdetails">
			<view class="middles">
				【{{detailTitleStr}}】
			</view>
		</view>
		<view class="topdetails" style="margin: 0;margin-bottom: 5px;">
			<view class="lefttimes team">
				{{matchTeamLeft}}
			</view>
			<view class="middles">

			</view>
			<view class="righttimes brightfontColor team">
				{{matchTeamRight}}
			</view>
		</view>
		<view class="topdetails" style="margin: 0;margin-bottom: 5px;">
			<view class="lefttimes">
				{{detailDateStr | timestampStr}}
			</view>

			<view class="righttimes brightfontColor">
				{{$t('match.content.close.text')}}: <counter :endtime='closeTimeStr'
					v-if="this.closeTimeStr && this.paramId"></counter>
			</view>
		</view>


		<!-- <view class="topArea">
			<view class="details-tab">
				<view class="active">
					{{$t('match.content.score.text')}}
				</view>
			</view>
			<view class="topArea-content">
				<view class="top-bg">

				</view>
				<view class="detail-date">
					<view class="time">
						{{detailDateStr | timestampStr}}
					</view>
					<view class="time-countDown">
						<image src="../../static/images/time.png" mode=""></image>
						<view class=""></view>
						<view class="" style="color:#2db9ff;">
							<counter :endtime='closeTimeStr' v-if="this.closeTimeStr && this.paramId"></counter>
						</view>
					</view>
				</view>
				<view class="detail-title">
					<text class="title">{{detailTitleStr}}</text>
				</view>
				<view class="vs">
					<view class="vs-item">
						<image :src="matchTeamLeftLogo ? matchTeamLeftLogo:'../../static/images/default.png'" mode=""
							class="icon"></image>
						<text class="ball_group">{{matchTeamLeft}}</text>
					</view>
					<view class="teamVS">
						<image src="../../static/images/vs.png" mode="" class="vsIcon" style="height: 34px;"></image>
					</view>
					<view class="vs-item">
						<image :src="matchTeamRightLogo ? matchTeamRightLogo:'../../static/images/default.png'" mode=""
							class="icon"></image>
						<text class="ball_group">{{matchTeamRight}}</text>
					</view>
				</view>
			</view>

		</view>
 -->

		<view class="match-content">
			<view class="tab">
				<view :class="scoreClass" @click="changeTabClick">
					<text class="all">{{$t('match.content.all.match.text')}}</text>
				</view>
				<view :class="scoreHalfClass" @click="changeTabClick_half">
					<text class="all">{{$t('match.content.half.match.text')}}</text>
				</view>
			</view>
		</view>

		<view class="details">
			<view class="content-list">
				<view class="details-list list-head">
					<view class="item1" style="width: 30%;">
						{{$t('match.content.list.scorebet.text')}}
					</view>
					<view class="item1 midditem" style="width: 35%;">
						{{$t('match.content.list.odd.text')}}
					</view>
					<view class="item1" style="width: 35%;">
						{{$t('match.content.list.status.text')}}
					</view>
				</view>
			</view>
		</view>
		<detailScoreView :scoreListData='scoreList' :gameType="gameTypeNum" @changeShowHelpTipNum="parentHelpClick">
		</detailScoreView>

		<!-- <swiper class="swiperViewCus" :duration="durationMatchSwiper" @change="matchContentSwiperChange"
			:current="matchContentSwiperCurrent">
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-Y">

					<detailScoreView :scoreListData='scoreList' :gameType="2" @changeShowHelpTipNum="parentHelpClick">
					</detailScoreView>


				</scroll-view>

			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" class="scroll-Y">

					<detailScoreView :scoreListData='scoreHalfList' :gameType="1"
						@changeShowHelpTipNum="parentHelpClick"></detailScoreView>

				</scroll-view>

			</swiper-item>
			
			
			
		</swiper> -->

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
				scoreClass: 'tab_one active',
				scoreHalfClass: 'tab_one',
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
				oldScoreList: [],
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
				gameTypeNum: 2,

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
			// 	   animationType: 'slide-in-top',
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
					this.oldScoreList = lossPerCentArr
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

			this.navTitle = this.$t('match.content.detail.title')
			// this.scoreList = []

		},
		methods: {
			// ...mapMutations(['save_match_content','remove_match_content','logout','change_bet_num','save_bet_num','remove_bet_num']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('ft_lang')
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


					// console.log("lossPerCentArr",this.pageItemData);

					// this.save_match_content(this.pageItemData)
					// console.log("lossPerCentArr",lossPerCentArr);
					// console.log("lossPerCentArrHalf",lossPerCentArrHalf);
					this.pageItemData.lossPerCent = lossPerCentArr
					if (lossPerCentArr.length === 0) {
						this.scoreList = []
					} else {

						this.scoreList = lossPerCentArr
						this.oldScoreList = lossPerCentArr
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
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else if (this.urlFromStr === "match") {
					uni.switchTab({
						url: '/pages/match/match_list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				} else {
					uni.switchTab({
						url: '/pages/match/match_list',
						animationType: 'slide-in-top',
						animationDuration: 200
					})
					// uni.navigateBack({
					// 	delta: 1
					// });
				}


			},
			goToServerBtnClick() {
				uni.navigateTo({
					url: '/pages/customer/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						uni.setStorageSync('querySeverCustomUrlFrom', 'match_c');
						res.eventChannel.emit('querySeverCustomUrlFrom', {
							from: 'match_c'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			changeTabClick() { //反波胆点击事件
				this.scoreClass = 'tab_one active'
				this.scoreHalfClass = 'tab_one'
				this.matchContentSwiperCurrent = 0
				this.scoreList = this.oldScoreList
				this.gameTypeNum = 2
				//1正波,2反波
				this.change_bet_num(2)
				this.save_bet_num(2)
			},
			changeTabClick_half() { //上半场反波胆点击事件
				this.scoreClass = 'tab_one'
				this.scoreHalfClass = 'tab_one active'
				this.matchContentSwiperCurrent = 1
				// console.log("this.scoreHalfList", this.scoreHalfList);
				this.scoreList = this.scoreHalfList
				this.gameTypeNum = 1
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

<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
	}

	.wrap {
		display: flex;
		flex-direction: column;
		// height: calc(100vh - 0px);
		width: 100%;
	}

	.backTitleBar-wrapper {
		.fixedBox {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			background-color: #fff;

			.common_header {
				padding: 7px 15px;

				.define {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 100%;
				}
			}
		}


	}

	// .u-icon--right {
	// 	flex-direction: row;
	// 	align-items: center;
	// }

	.title {
		font-size: 16px;
		font-weight: 700;
	}

	.service {
		width: 28px;
		height: 28px;

		.icon {
			width: 100%;
			height: 100%;
		}
	}

	.teamdetails {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: center;
		-ms-flex-pack: justify;
		justify-content: center;
		height: 30px;
		padding: 0 10px;
		background: #fff;
		margin: 5px 0;

		.middles {
			font-size: 15px;
			color: #666;
			font-weight: 700;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}


	.topdetails {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		height: 30px;
		padding: 0 10px;
		background: #fff;
		margin: 5px 0;

		.lefttimes {
			font-size: 12px;
			color: #666;
		}

		.middles {
			font-size: 13px;
			color: #666;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.righttimes {
			color: #6f8ede;
			font-size: 13px;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
		}


		.team {
			color: #333;
			font-size: 14px;
		}
	}

	.topArea {
		width: 100%;
		background-color: #1f252f;
	}

	.details-tab {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 44px;
		background-color: #171E25;
		background-size: 100%;

		view {
			flex: 1;
			text-align: center;
			font-size: 15px;
			font-family: PingFangSC-Medium, PingFang SC;
			color: #fff;
			padding-bottom: 5px;
			position: relative;
			line-height: 40px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.active {
			color: #ffbf45;
			font-size: 18px;

			&::after {
				content: "";
				position: absolute;
				width: 20%;
				height: 2px;
				background: #ffbf45;
				border-radius: 2px;
				left: 50%;
				bottom: 0;
				margin-left: -10%;
			}
		}
	}

	.topArea-content {
		width: 92%;
		height: 160px;
		background: url(../../static/images/bg-content.jpg);
		background-color: #171e25;
		background-size: 110% 120%;
		margin: 20px auto 0;
		border-radius: 5px;
		background-position: -10px -9px;
		position: relative;
		overflow: hidden;

		.top-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background: url(../../static/images/bg_common.png);
			height: 80px;
			background-size: 110% 120%;
			background-position: -10px -9px;
		}



	}

	.detail-date {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 28px;
		position: relative;
		z-index: 11;

		.time {
			font-size: 14px;
			font-weight: 400;
			font-family: Alibaba PuHuiTi;
			color: #fff;
			background: linear-gradient(270deg, hsla(0, 0%, 100%, 0), #d4a13d);
			padding-left: 8px;
			height: 28px;
			line-height: 28px;
			flex: 70%;
		}

		.time-countDown {
			flex: 30%;
			display: flex;
			justify-content: flex-end;
			padding-right: 8px;
		}


		view {
			&:nth-child(2) {
				display: flex;
				align-items: center;
				font-size: 13px;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
				color: #333;
				height: 100%;

				image {
					width: 15px;
					height: 15px;
					margin-right: 5px;
				}
			}
		}

	}


	.detail-title {
		text-align: center;
		font-size: 6px;
		font-family: Alibaba PuHuiTi;
		font-weight: 700;
		color: #4b4e5c;
		padding: 14px 0 11px;
		margin-top: 10px;
		margin-bottom: 5px;
		position: relative;
		z-index: 22;

		.title {
			color: #fff;
			padding: 6px 15px;
			font-size: 13px;
		}
	}


	.vs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;

		.vs-item {
			width: 167px;
			text-align: center;
			font-size: 13px;
			font-family: Alibaba PuHuiTi;
			font-weight: 700;
			color: #fff;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-word;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.icon {
				width: 35px;
				height: 35px;
			}
		}

		.teamVS {
			width: 37px;
			text-align: center;
			color: #fff;
			font-family: Alibaba PuHuiTi;
			font-weight: 700;

			.vsIcon {
				width: 30px;
				height: 30px;
			}
		}
	}


	.match-content {
		// background: #1f252f;
		// position: relative;
		margin-bottom: 5px;

		.tab {
			/* width: 100%; */
			height: 40px;
			margin: 5px 0;
			/* padding: 0 20px; */
			/* margin-top: 20px; */
			/* margin-bottom: 20px; */
			/* margin-left: auto; */
			/* margin-right: auto; */
			display: flex;
			background: #fff;
			align-items: center;
			// padding: 3px;
			border-radius: 3px;
			justify-content: space-between;

			.tab_one {
				// width: 50%;
				flex: 1;
				text-align: center;
				height: 40px;
				line-height: 40px;
				// border-radius: 2px;
				color: #333;
				// background: url(../../static/images/lanebg.jpg);
				// background-size: 100% 100%;

			}

			.active {
				background: #597ef7;
				color: #fff;
				// background: linear-gradient(90deg, #4476f8, #5686ff);
				// border-radius: 6px;
			}
		}
	}

	.details {
		font-family: Alibaba PuHuiTi;
		font-size: 14px;
		text-align: center;
		background: #f8f8f8;
		border-radius: 5px;

		.content-list {
			overflow: hidden;
		}


		.list-head {
			font-family: Alibaba PuHuiTi;
			font-size: 14px;
			font-weight: 400;
			color: #fff;
			min-height: 40px;
			background: #597ef8;

			.item1 {
				// flex: 1;
				// max-width: 80px;
				text-align: center;
				vertical-align: middle;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 700;
				color: #fff;
				line-height: 40px;

			}

			.midditem {
				border-right: 0.5px solid #ffffff94;
				border-left: 0.5px solid #ffffff57;
			}
		}
	}


	.details-list {
		// padding: 0 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
</style>
