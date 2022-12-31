<template>
	<view>

		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>


		<view class="statisticsMain">
			<u-tabs :list="tabList" :is-scroll="true" :current="current" :gutter="30" :bold="false" bg-color="#00111c"
				font-size="20" :item-width="200" :bar-width="140" :bar-height="2" inactive-color="#FFFFFF"
				active-color="#3d8dfe" @change="tabChange"></u-tabs>

			<view class="statisticsContainer">
				<!-- <view class="statisticsSearchBox">
					<u-input 
						v-model="searchUsername"
						:clearable = "false"
						height="80" 
						:custom-style="customStyleInput" 
						:placeholder="placeholderAccount" 
						placeholder-style="color:#506778;font-size:12px"
					/>
					<view class="statisticsSearchBox_searchBtn" @click="searchClick()">
						{{$t('user.statistics.center.data.query.search.text')}}
					</view>
				</view> -->
				<view class="statisticsResultContent">
					<view class="statisticsResultTableBox">
						<view class="statisticsResultTableBoxHeader">
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.teambalance.text')}}
							</view>
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.teamrecharge.text')}}
							</view>
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.teamwithdraw.text')}}
							</view>
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.netprofit.text')}}
							</view>
						</view>
						<view class="statisticsResultTableBoxBody">
							<view class="statisticsResultTableBoxBodyContent">
								<view class="statisticsResultTableBoxBodyCell">
									{{totalBalance | moneyFormat}}
								</view>
								<view class="statisticsResultTableBoxBodyCell">
									{{totalRecharge | moneyFormat}}
								</view>
								<view class="statisticsResultTableBoxBodyCell">
									{{totalWithdrawal | moneyFormat}}
								</view>
								<view class="statisticsResultTableBoxBodyCell">
									{{netProfit | moneyFormat}}
								</view>
							</view>
						</view>
					</view>
					<view class="statisticsResultTableBox">
						<view class="statisticsResultTableBoxHeader">
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.teamSize.text')}}
							</view>
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.newreg.text')}}
							</view>
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.betamount.text')}}
							</view>
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.numofbets.text')}}
							</view>
						</view>
						<view class="statisticsResultTableBoxBody">
							<view class="statisticsResultTableBoxBodyContent">
								<view class="statisticsResultTableBoxBodyCell">
									{{playerCount}}
								</view>
								<view class="statisticsResultTableBoxBodyCell">
									{{newPlayer}}
								</view>
								<view class="statisticsResultTableBoxBodyCell">
									{{totalBetBalance | moneyFormat}}
								</view>
								<view class="statisticsResultTableBoxBodyCell">
									{{totalBetPlayer}}
								</view>
							</view>
						</view>
					</view>
					<view class="statisticsResultTableBox">
						<view class="statisticsResultTableBoxHeader">
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.amountofwin.text')}}
							</view>
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.activityaward.text')}}
							</view>
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.activitynum.text')}}
							</view>
							<view class="statisticsResultTableBoxHeaderCell">
								{{$t('user.statistics.center.data.head.unregnum.text')}}
							</view>
						</view>
						<view class="statisticsResultTableBoxBody">
							<view class="statisticsResultTableBoxBodyContent">
								<view class="statisticsResultTableBoxBodyCell">
									{{cumulativeWinning}}
								</view>
								<view class="statisticsResultTableBoxBodyCell">
									{{cumulativeActivity}}
								</view>
								<view class="statisticsResultTableBoxBodyCell">
									{{playerActive}}
								</view>
								<view class="statisticsResultTableBoxBodyCell">
									{{playerOffline}}
								</view>
							</view>
						</view>
					</view>
					<view class="statisticsResultTableBox">
						<view class="statisticsResultTableBoxWrap">
							<view class="statisticsResultTableBoxWrapContent">
								<view class="statisticsResultTableBoxWrapCell">
									{{$t('user.statistics.center.data.head.discoutedprice.text')}}
									<view class="goSubordianateBtn" @click="goToLevelDetail">
										{{$t('user.statistics.center.data.head.lowerlevel.text')}} >
									</view>
								</view>
							</view>
						</view>
						<view class="statisticsResultTableBoxBody">
							<view class="statisticsResultTableBoxBodyContent">
								<view class="statisticsResultTableBoxBodyCell">
									{{cumulativeDiscount | moneyFormat}}
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>



	</view>
</template>

<script>
	import {
		dataCenterReq
	} from '@/api/index.js'
	// import {mapState,mapMutations} from 'vuex'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		data() {
			return {
				navTitle: this.$t('user.statistics.center.title.text'),
				placeholderAccount: this.$t('user.statistics.center.data.query.account.text'),
				customStyleInput: {
					"border-radius": "5px",
					"background-color": "#334756",
					"text-indent": "10px",
					"color": "#fff"
				},
				tabList: [{
					name: this.$t('user.statistics.center.today.text'),
				}, {
					name: this.$t('user.statistics.center.yes.text'),
				}, {
					name: this.$t('user.statistics.center.nearly7.text'),
				}, {
					name: this.$t('user.statistics.center.nearly10.text'),
				}, {
					name: this.$t('user.statistics.center.nearly30.text'),
				}],
				current: 0,
				totalBalance: 0,
				totalRecharge: 0,
				totalWithdrawal: 0,
				netProfit: 0,
				playerCount: 0,
				newPlayer: 0,
				totalBetBalance: 0,
				totalBetPlayer: 0,
				cumulativeWinning: 0,
				cumulativeActivity: 0,
				playerActive: 0,
				playerOffline: 0,
				cumulativeDiscount: 0,

				localLoginToken: null,
				searchUsername: '',

			}
		},
		mixins: [myMixin],
		// computed:{
		// 	...mapState(['hasLogin'])
		// },
		// onLoad() {
		// 	if(!this.hasLogin){
		// 		uni.reLaunch({
		// 		   url: '../login/login',
		// 		   animationType: 'pop-in',
		// 		   animationDuration: 200
		// 		})
		// 	}
		// },
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()


			// 初始化数据
			this.getStatissticsData(0)

		},
		methods: {
			initLang() { //初始化语言


				let langStr = uni.getStorageSync('foot_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('user.statistics.center.title.text')
				this.placeholderAccount = this.$t('user.statistics.center.data.query.account.text')
				this.tabList = [{
					name: this.$t('user.statistics.center.today.text'),
				}, {
					name: this.$t('user.statistics.center.yes.text'),
				}, {
					name: this.$t('user.statistics.center.nearly7.text'),
				}, {
					name: this.$t('user.statistics.center.nearly10.text'),
				}, {
					name: this.$t('user.statistics.center.nearly30.text'),
				}]

			},
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/report_management',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			tabChange(index) {
				// console.log("index",index);
				this.current = index;

				this.getStatissticsData(this.current)
			},
			searchClick() {
				this.getStatissticsData(this.current)
			},
			async getStatissticsData(transferIndex) {
				let reqParam = {}
				if (this.searchUsername) {
					reqParam.username = this.searchUsername
				}

				reqParam.time = transferIndex + 1
				let resR = await dataCenterReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {

					this.totalBalance = resR.data.totalBalance
					this.totalRecharge = resR.data.totalRecharge
					this.totalWithdrawal = resR.data.totalWithdrawal
					this.netProfit = resR.data.netProfit

					this.playerCount = resR.data.playerCount
					this.newPlayer = resR.data.newPlayer
					this.totalBetBalance = resR.data.totalBetBalance
					this.totalBetPlayer = resR.data.totalBetPlayer

					this.cumulativeWinning = resR.data.cumulativeWinning
					this.cumulativeActivity = resR.data.cumulativeActivity
					this.playerActive = resR.data.playerActive
					this.playerOffline = resR.data.playerOffline
					this.cumulativeDiscount = resR.data.cumulativeDiscount

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
			goToLevelDetail() {
				uni.navigateTo({
					url: '/pages/user/subordinateDetail?searchName=' + this.searchUsername,
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #071a28;
		height: 100%;
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

	.statisticsMain {
		padding-bottom: 20px;
	}

	.statisticsContainer {
		padding: 0 16px;
	}

	.statisticsSearchBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 10px;
	}

	.statisticsSearchBox_searchBtn {
		text-align: center;
		font-size: 14px;
		background-color: #3d8dfe;
		width: 73px;
		height: 42px;
		line-height: 42px;
		border-radius: 5px;
		font-weight: 400;
		color: #fff;
		margin-left: 10px;
	}

	.statisticsResultContent {
		margin-top: 10px;
		height: calc(100vh - 159px);
		background: #132736;
		border-radius: 5px;
	}

	.statisticsResultTableBox {}

	.statisticsResultTableBoxHeader {
		width: 100%;
		background: #334756;
		font-size: 12px;
		display: flex;
		align-items: center;
		border-radius: 5px 5px 0 0;
		height: 50px;
	}

	.statisticsResultTableBoxHeader2 {
		/* width: 100%; */
		width: calc(100% - 15px);
		margin-left: 7px;
		background: #334756;
		font-size: 12px;
		display: flex;
		align-items: center;
		border-radius: 5px 5px 0 0;
		height: 50px;
	}

	.statisticsResultTableBoxHeaderCell {
		text-align: center;
		width: 25%;
		align-items: center;
		font-weight: 500;
		color: #fff;
		font-family: Roboto;
		justify-content: space-around;
		word-wrap: break-word;
		padding: 10px 0;
	}

	.statisticsResultTableBoxWrap {
		width: 100%;
		background: #132736;
	}

	.statisticsResultTableBoxWrapContent {
		width: calc(100% - 15px);
		margin-left: 7px;
		border-radius: 2px;
		font-size: 12px;
		background: #334756;
	}

	.statisticsResultTableBoxWrapCell {
		/* width: 100%; */
		text-align: center;
		font-weight: 500;
		color: #fff;
		font-family: Roboto;
		display: flex;
		align-items: center;
		justify-content: space-around;
		word-break: break-word;
		padding: 10px 0;
		margin-left: 10px;
	}

	.goSubordianateBtn {
		height: 46px;
		line-height: 21px;
		text-align: center;
		font-family: 'Hiragino Sans GB';
		font-size: 12px;
		color: #3d8dfe;
		margin-left: 64px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		word-break: break-word;
		padding: 10px 0;
	}

	.statisticsResultTableBoxBody {
		background: #132736;
	}

	.statisticsResultTableBoxBodyContent {
		height: 38px;
		display: flex;
		align-items: center;
	}

	.statisticsResultTableBoxBodyCell {
		width: 25%;
		color: #fff;
		font-size: 12px;
		word-break: break-all;
		text-align: center;
	}
</style>
