<template>
	<view>
		<view class="homepage">
			<view class="homeNav">
				<uni-nav-bar backgroundColor="#00111c" color="#fff" :border="false" rightWidth="0px">
					<template #left>
						<view class="navBarLeft" @click="refreshWebClick">
							<image src="../../static/images/cfresh.svg" mode="" class="freshImage"></image>
						</view>
						<view class="" style="margin-left: 3px;">
							V8.5
						</view>
					</template>

					<view class="navBarTitle">
						{{showTimeStatus}}:<text class="userNameText"> {{loginUser}}</text>
					</view>
					<view class="navBarRight">
						<view class="navBarRightContainer">
							<view class="navBarCustom">

							</view>
							<view class="barRightIcon" @click="navBarRightClick">
								<image src="../../static/images/menu.svg" mode=""></image>
							</view>
						</view>

					</view>
					<block slot="left">
						<view class="left-icon">

						</view>
						<!-- <view class="left-icon">
							<image src="../../static/images/logo3.svg" mode=""></image>
						</view> -->
					</block>

				</uni-nav-bar>

				<!-- <transition name="menuBoxAni">
					
				</transition>
 -->
				<view class="menuModal" v-if="menuStatus">
					<view class="menuBox">
						<view class="menuItem" v-for="(item,index) in menuBoxListData" :key="index"
							@click="mesBoxItemClick(index+1)">
							<image :src="item.srcImgStr" mode=""></image>
							<span class="text" style="margin-left: 5px;">{{item.name}}</span>
						</view>

						<view class="menuItem">
							<view class="textBox" @click.stop="changeLang">
								<span>{{selectLangStr}}</span>
								<view class="iconLang">
									<image src="../../static/images/icon_up.svg" :class="langSBoxtatus ? 'down' : null">
									</image>
								</view>
								<!-- 	<transition name="langBoxAni">
									
								</transition> -->
								<view class="langBoxList" v-if="langSBoxtatus">
									<span :class="item.active ? 'menuItemActive' : null"
										v-for="(item,index) in langBoxListData" :key="index"
										@click.stop="menuItemClick(item)">{{item.lang}}</span>
								</view>

							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="homeContent" @click="homeContentClick">

				<view class="outsideSwiper">
					<!-- 	<view class="swiperWrap">
						<swiper class="swiper-content" interval="5000" duration="3000" autoplay="true" circular="true"
							English>
							<swiper-item v-for="(item, index) in swiperList" :key="item.id">
								<image class="swiper-img" :src="item.localPath" mode="scaleToFill"></image>
							</swiper-item>
						</swiper>
					</view> -->

					<view class="outerbox">
						<!-- effect3d img-mode="aspectFit" -->
						<u-swiper :list="swiperList" height="360" borderRadius="10" bgColor="#071A28" mode="none">
						</u-swiper>
					</view>
				</view>

				<view class="notice">
					<!-- 	<uni-notice-bar 
						show-icon 
						scrollable
						background-color="#132736"
						text="" />
						 -->
					<u-notice-bar border-radius="50" mode="horizontal" :list="noticeList" color="#cacaca" speed="100"
						bg-color="#132736"></u-notice-bar>

				</view>

				<view class="balance">
					<view class="balance_title">
						<image src="../../static/images/wallet.svg" mode=""></image>
						<text>{{$t('home.balance')}}</text>
					</view>
					<view class="balance_content">
						<view class="numRefresh">
							<text class="balance_money">{{balanceMoneyNum | moneyFormat}}</text>
							<image src="../../static/images/refresh.svg" mode="" class="refresh"
								@click="refreshMoneyClick"></image>
						</view>
						<view class="wallet_icon_btn">
							<view class="recharge" @click="rechargeBtnClick">
								<image src="../../static/images/recharge.svg" mode="" class="rechargeIcon"></image>
								<view>{{$t('home.recharge')}}</view>
							</view>
							<view class="withdraw" @click="withdrawBtnClick">
								<image src="../../static/images/forcash.svg" mode="" class="withdrawIcon"></image>
								<view>{{$t('home.withdraw')}}</view>
							</view>

							<view class="withdraw" @click="serverBtnClick">
								<image src="../../static/images/icon_service.svg" mode="" class="withdrawIcon"></image>
								<view>{{$t('home.munu.server')}}</view>
							</view>
						</view>
					</view>
				</view>

				<view class="hotMatch">
					<view class="hotMatchTitle">
						{{$t('home.hot')}}
					</view>

					<matchListView :listData="matchList" :fromUrlNum="1"
						styleData="padding: 0px 0px 20px;margin-top: 9px;" keyNameStr="hot"></matchListView>
				</view>


			</view>

			<!-- 	<transition name="inputModalAni">
				
			</transition> -->
			<view class="homeModal" v-if="isShowWithDrawModal">
				<view class="modalMask" @click="isShowWithDrawModal=false">

				</view>
				<view class="modalContent">
					<view class="modalTitle">
						<span>{{$t('home.pay.title.text')}}</span>
						<uni-icons type="closeempty" size="25" class="header-icon" color="#3d8dfe"
							@click="isShowWithDrawModal=false"></uni-icons>
					</view>
					<view class="modalBody">
						<view class="viewTop">
							<span class="viewTopText">{{$t('home.pay.pwd.tip.text')}}</span>
							<input value="" v-model="inputWithdrawData" maxlength="16" :placeholder="withdrawPlace"
								placeholder-style="font-size:12px" :password="!withdrawInputBool"
								@input="withdrawInput" />

							<view class="viewTopSeeimg" v-if="showSeeBool"
								@click="withdrawInputBool = !withdrawInputBool">
								<image
									:src="!withdrawInputBool ? '../../static/images/nosee.svg' : '../../static/images/see.svg' "
									mode=""></image>
							</view>
						</view>
						<view class="modalBottom">
							<span class="modalBtn" @click="confirmSetPayClick">{{$t('home.pay.pwd.btn.text')}}</span>
						</view>
					</view>
				</view>
			</view>


		</view>

		<u-toast ref="uToast" />
		<show-modal ref="testRef"></show-modal>
	</view>
</template>


<script>
	import {
		websiteUrlStr,
		sliderReq,
		swiperReq,
		hotReq,
		playerInfoReq,
		logoutReq,
		getPwdPayReq,
		setPwdPayReq
	} from '../../api/index.js'

	import {
		changeTitleMixin,
		myMixin,
		withdrawMinxi,
		rechargeMinxi,

	} from '@/util/mixins.js'
	import counter from '../../components/counterView/counter.vue';
	export default {
		components: {
			counter
		},
		data() {
			return {
				selectLangStr: 'English',
				menuStatus: false,
				langSBoxtatus: false,
				showTimeStatus: '',
				loginUser: '',
				withdrawPlace: this.$t('home.pay.pwd.input.place.text'),
				withdrawInputBool: false,
				showSeeBool: false,
				isShowWithDrawModal: false,
				inputWithdrawData: '',
				menuBoxListData: [
					// {
					// 	name: this.$t('home.munu.game'),
					// 	srcImgStr: "../../static/images/icon_game.svg",
					// }, {
					// 	name: this.$t('home.munu.notice'),
					// 	srcImgStr: "../../static/images/icon_announcement.svg",
					// }, 
					{
						name: this.$t('home.munu.server'),
						srcImgStr: "../../static/images/icon_service.svg",
					},
					// {
					// 	name: this.$t('home.munu.center'),
					// 	srcImgStr: "../../static/images/icon_center.svg",
					// }, 
					{
						name: this.$t('home.munu.logout'),
						srcImgStr: "../../static/images/icon_signout.svg",
					}
				],
				//Español:西班牙语, Deutsch:德语, 
				//Français:法语,Türkiye:土耳其语,
				//Italiano:意大利语,
				//Português:葡萄牙语, म:印地语
				langBoxListData: [{
						'lang': 'English',
						'val': 'en',
						'active': false,
					},
					{
						'lang': 'Español',
						'val': 'es',
						'active': false,
					},
					{
						'lang': 'Deutsch',
						'val': 'ee',
						'active': false,
					},
					{
						'lang': 'Français',
						'val': 'fr',
						'active': false,
					},
					{
						'lang': 'Yкраїнськаçais',
						'val': 'yk',
						'active': false,
					},
					{
						'lang': 'Türkiye',
						'val': 'tr',
						'active': false,
					},
					{
						'lang': 'Italiano',
						'val': 'it',
						'active': false,
					},
					// {
					// 	'lang': '中文-简体',
					// 	'val': 'cn',
					// 	'active': false,
					// },
					{
						'lang': 'Português',
						'val': 'pt',
						'active': false,
					},
					{
						'lang': 'म',
						'val': 'hi',
						'active': false,
					},
				],
				swiperList: [],
				noticeList: [],
				balanceMoneyNum: null,
				matchList: [],
				// localLoginToken:'',

			}
		},
		mixins: [changeTitleMixin, myMixin, withdrawMinxi, rechargeMinxi],

		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()

			// 初始化页面数据
			this.initPageData()



		},
		mounted() {


		},
		onHide() {
			this.menuStatus = false
		},
		onUnload() {

		},
		methods: {

			// ...mapMutations(['logout']),

			initLang() { //初始化语言


				let langStr = uni.getStorageSync('foot_lang')
				// console.log("lang", langStr);
				this.$i18n.locale = langStr

				uni.setTabBarItem({
					index: 0,
					text: this.$t('tabar.home')
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('tabar.competition')
				})
				uni.setTabBarItem({
					index: 2,
					text: this.$t('tabar.sportsresults')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabar.mine')
				})


				this.menuBoxListData = [
					// {
					// 	name: this.$t('home.munu.game'),
					// 	srcImgStr: "../../static/images/icon_game.svg",
					// }, {
					// 	name: this.$t('home.munu.notice'),
					// 	srcImgStr: "../../static/images/icon_announcement.svg",
					// }, 
					{
						name: this.$t('home.munu.server'),
						srcImgStr: "../../static/images/icon_service.svg",
					},
					// {
					// 	name: this.$t('home.munu.center'),
					// 	srcImgStr: "../../static/images/icon_center.svg",
					// }, 
					{
						name: this.$t('home.munu.logout'),
						srcImgStr: "../../static/images/icon_signout.svg",
					}
				]

			},
			initPageData() { //初始化页面数据

				if (!this.hasLogin) {

					return false
				}

				// 获取是否设置过提现密码
				this.getPwdPay()

				//获取用户名和余额方法
				this.getInformation()

				// 获取顶部时间
				this.showCurrTimeState()

				//获取轮播
				this.getSlider()

				// 获取公告
				this.getSwiper()

				//获取热门赛事
				this.getHotMatch()

				// 获取页面上的参数,方便管理员切换成中文
				this.getURlParam()

			},
			getURlParam() {
				let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
				let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
				let currentPageOptions = currentPage.options ////获取路由参数
				let currentPageRoute = currentPage.route //获取当前页面路由
				// console.log("currentPageOptions",currentPageOptions);
				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('ojbk')) {
					console.log("HACK!");
					uni.setStorageSync('foot_lang', 'cn')
					this.initLang()
				}
			},
			async getPwdPay() {
				let resR = await getPwdPayReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					if (resR.data.paySet === 2) { //1已设置 2未设置
						this.isShowWithDrawModal = true
					} else {
						this.isShowWithDrawModal = false
					}
				}
			},
			async getInformation() {
				let resR = await playerInfoReq(this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					this.loginUser = resR.data.username
					this.balanceMoneyNum = resR.data.balance
				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					this.$refs.uToast.show({
						title: resR.msg,
						url: '/pages/login/login',
					})


					// uni.reLaunch({
					// 	url: '/pages/login/login',
					// 	animationType: 'pop-in',
					// 	animationDuration: 200
					// });
				}


			},
			async getSlider() { //轮播请求
				this.swiperList = []
				let reqParam = {}
				let langStr = uni.getStorageSync('foot_lang')
				// console.log("langStr",langStr);
				if (langStr == "cn") {
					reqParam.lang = "zh"
				} else {
					reqParam.lang = "en"
				}

				let resR = await sliderReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					let resR_data = resR.data
					resR_data.forEach((item, index) => {
						item.image = websiteUrlStr + "/" + item.localPath
						item.localPath = websiteUrlStr + "/" + item.localPath

					})
					// console.log("resR_data",resR_data);
					this.swiperList = resR_data
				}
			},
			async getSwiper() { //滚动广告请求
				this.noticeList = []
				let reqParam = {}
				let langStr = uni.getStorageSync('foot_lang')
				// console.log("langStr",langStr);
				if (langStr == "cn") {
					reqParam.lang = "zh"
				} else {
					reqParam.lang = "en"
				}
				let resR = await swiperReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					let noticeArray = resR.data
					noticeArray.forEach(item => {
						this.noticeList.push(item.content)
					})
				}
			},
			async getHotMatch() { //获取热门赛事
				let resR = await hotReq(this.localLoginToken)
				if (resR.code === 200) {
					this.matchList = resR.data
				}
				// console.log("resR",resR.data);

			},
			showCurrTimeState() { //获取顶部时间
				// let textStatus = getTimeState()
				let textStatus = this.getTimeStateHandle()
				this.showTimeStatus = this.handleTitleStatus(textStatus)
			},
			handleTitleStatus(textStr) {
				switch (textStr) {
					case '早上好':
						return this.$t('home.welcome_morning')
					case '中午好':
						return this.$t('home.welcome_afternoon')
					case '下午好':
						return this.$t('home.welcome_afternoon')
					case '晚上好':
						return this.$t('home.welcome_night')
					default:
						return this.$t('home.welcome_morning')
				}
			},
			refreshWebClick() {
				window.location.reload()
			},
			navBarRightClick() {
				this.menuStatus = !this.menuStatus
				this.langSBoxtatus = false

				this.langBoxListData.forEach((item, index) => {
					if (item.val == uni.getStorageSync('foot_lang')) {
						item.active = true
						this.selectLangStr = item.lang
					}
				})

				// console.log("this.langBoxListData",this.langBoxListData);

			},
			changeLang() {
				// console.log("点击前",this.langSBoxtatus);
				this.langSBoxtatus = !this.langSBoxtatus
				// console.log("点击后",this.langSBoxtatus);
			},
			refreshMoneyClick() {
				this.balanceMoneyNum = 0
				//获取用户名和余额方法
				this.getInformation()
			},
			homeContentClick() {
				this.menuStatus = false
			},
			menuItemClick(item) {
				// console.log("选择语言前",this.langSBoxtatus);
				this.selectLangStr = item.lang
				this.$i18n.locale = item.val;

				uni.setStorageSync('foot_lang', this.$i18n.locale)


				//获取轮播
				this.getSlider()
				// 获取公告
				this.getSwiper()


				this.showCurrTimeState()

				this.langBoxListData.forEach((signle, index) => {
					signle.active = false
					if (signle.val == item.val) {
						signle.active = true
					}
				})


				this.langSBoxtatus = false
				// console.log("选择语言后",this.langSBoxtatus);
				this.menuStatus = false
				this.initLang()



			},

			mesBoxItemClick(num) {
				this.menuStatus = false
				if (num === 1) {
					uni.navigateTo({
						url: '/pages/customer/index',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							uni.setStorageSync('querySeverCustomUrlFrom', 'home');
							res.eventChannel.emit('querySeverCustomUrlFrom', {
								from: 'home'
							})
						},
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else if (num === 2) {
					// console.log("this.$refs.testRef",this.$refs.testRef);
					this.$showModal({
						title: '',
						icon: 'warning',
						ceterTitle: this.$t('modal.title'),
						ceterDesc: this.$t('modal.logout.desc'),
						cancelText: this.$t(
							'modal.cancel.text'), //传入空值表示只显示确认按钮，此代码不能省略
						confirmText: this.$t('modal.confirm.text'),
						success: async (res) => {
							if (res.confirm) {
								let resR = await logoutReq(this.localLoginToken)
								// console.log('用户点击确定',resR)
								if (resR.code === 200) {
									this.logout()
									uni.reLaunch({
										url: '/pages/login/login',
										animationType: 'pop-in',
										animationDuration: 200
									});
								}

							} else if (res.cancel) { //点击确定无需操作

							}
						}
					})

				}



				// if (num === 1) {
				// 	uni.switchTab({
				// 		url: '/pages/match/match_list',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// } else if (num === 2) {
				// 	uni.navigateTo({
				// 		url: '/pages/list/notice_list',
				// 		success: (res) => {
				// 			// 通过eventChannel向被打开页面传送数据	
				// 			uni.setStorageSync('queryNoticListUrlFrom', 'home');
				// 			res.eventChannel.emit('userNoticeClick', {
				// 				from: 'home'
				// 			})
				// 		},
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// } else if (num === 3) {
				// 	uni.navigateTo({
				// 		url: '/pages/customer/index',
				// 		success: (res) => {
				// 			// 通过eventChannel向被打开页面传送数据	
				// 			uni.setStorageSync('querySeverCustomUrlFrom', 'home');
				// 			res.eventChannel.emit('querySeverCustomUrlFrom', {
				// 				from: 'home'
				// 			})
				// 		},
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// } else if (num === 4) {
				// 	uni.switchTab({
				// 		url: '/pages/user/user',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// } else if (num === 5) {
				// 	// console.log("this.$refs.testRef",this.$refs.testRef);
				// 	this.$showModal({
				// 		title: '',
				// 		icon: 'warning',
				// 		ceterTitle: this.$t('modal.title'),
				// 		ceterDesc: this.$t('modal.logout.desc'),
				// 		cancelText: this.$t('modal.cancel.text'), //传入空值表示只显示确认按钮，此代码不能省略
				// 		confirmText: this.$t('modal.confirm.text'),
				// 		success: async (res) => {
				// 			if (res.confirm) {
				// 				let resR = await logoutReq(this.localLoginToken)
				// 				// console.log('用户点击确定',resR)
				// 				if (resR.code === 200) {
				// 					this.logout()
				// 					uni.reLaunch({
				// 						url: '/pages/login/login',
				// 						animationType: 'pop-in',
				// 						animationDuration: 200
				// 					});
				// 				}

				// 			} else if (res.cancel) { //点击确定无需操作

				// 			}
				// 		}
				// 	})

				// }
			},
			matchDetailClick(item) { //赛事点击获取详情

				uni.navigateTo({
					url: '/pages/match/match_content',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						uni.setStorageSync('queryMatchContentItemUrlFrom', 'home');
						res.eventChannel.emit('matchDeClick', {
							content: item,
							from: 'home'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			rechargeBtnClick() { //充值按钮点击事件	

				uni.navigateTo({
					url: '/pages/recharge/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						this.save_recharge_from('home')
						res.eventChannel.emit('rechargeEventClick', {
							from: 'home'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			withdrawBtnClick() { //提现按钮点击事件

				uni.navigateTo({
					url: "/pages/withdraw/index",
					success: (res) => {
						this.save_withdraw_from('home')
						// 通过eventChannel向被打开页面传送数据	
						res.eventChannel.emit('withdrawEventClick', {
							from: 'home'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			serverBtnClick() {
				uni.navigateTo({
					url: '/pages/customer/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据	
						uni.setStorageSync('querySeverCustomUrlFrom', 'home');
						res.eventChannel.emit('querySeverCustomUrlFrom', {
							from: 'home'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			withdrawInput() {
				if (this.inputWithdrawData) {
					this.showSeeBool = true
				} else {
					this.showSeeBool = false
				}
			},
			async confirmSetPayClick() {

				if (!this.inputWithdrawData) {

					uni.showToast({
						title: this.$t('home.pay.pwd.alert.text'),
						icon: 'none',
						duration: 2000
					});

					return false
				}

				let reqParam = {}
				reqParam.payPwd = this.inputWithdrawData
				reqParam.payPwdAgain = this.inputWithdrawData
				let resR = await setPwdPayReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.isShowWithDrawModal = false
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #071a28;
		/* #ifndef H5*/
		background-color: #00111c;
		/* #endif */
		height: 100%;
	}



	.homepage {
		position: relative;
		height: 100%;
		/* #ifndef H5*/
		background-color: #071a28;
		/* #endif */
	}

	.homeNav {
		/* margin-top: 20px; */


		/* #ifndef H5 */
		position: absolute;
		width: 100%;
		top: 44px;
		//#endif
	}

	.navBarTitle {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}

	.left-icon {
		line-height: 15px;
		padding-left: 10px;
	}

	.left-icon image {
		width: 50px;
		height: 30px;
	}

	.userNameText {
		margin-left: 10px;
	}

	.navBarLeft {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.freshImage {
		width: 27px;
		height: 27px;
	}

	.navBarRight {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		/* padding-right: 17px; */
		width: 48px;
	}

	.navBarCustom {
		height: 100%;
		margin-right: 10px;
		display: flex;
	}

	.barRightIcon {}

	.barRightIcon image {
		width: 27px;
		height: 27px;
	}

	.menuModal {
		position: relative;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 1000;
	}

	.menuBox {
		background: #334756;
		color: #fff;
		position: fixed;
		right: 10px;
		top: 40px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		padding: 0 12px 16px 12px;
	}

	.menuBox::before {
		content: "";
		position: fixed;
		right: 24px;
		top: 25px;
		width: 0;
		height: 0;
		border-width: 9px;
		border-style: solid;
		border-color: transparent #334756 transparent transparent;
		transform: rotate(90deg);
	}

	.menuItem {
		height: 25px;
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 14px;
	}

	.menuItem image {
		width: 25px;
		height: 25px;
	}

	.menuItem text {
		margin-left: 12px;
		min-width: 90px;
		text-align: left;
	}

	.textBox {
		height: 25px;
		display: flex;
		align-items: center;
		background: #132736;
		padding: 0 5px;
		min-width: 120px;
		justify-content: space-between;
		position: relative;
	}

	.iconLang image {
		width: 17px;
		height: 9px;
		transition: all .3s ease-out;
		transform: rotate(-180deg);
		-webkit-transform: rotate(-180deg);
	}

	.iconLang .down {
		transform: rotate(0deg);
		-webkit-transform: rotate(0deg);
	}

	.langBoxList {
		position: absolute;
		background: #00111c;
		top: 25px;
		right: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
		/* padding: 0 5px; */
		padding-top: 5px;
		box-shadow: 0 3px 4px -1px rgb(0 0 0 / 25%);
	}

	.langBoxList span {
		color: #506778;
		display: flex;
		height: 25px;
		align-items: center;
		padding: 0 5px;
	}

	.langBoxList .menuItemActive {
		color: #FFFFFF;
	}


	.homeContent {
		position: fixed;
		padding: 5px 16px 0;
		top: 44px;
		bottom: 80px;
		/* #ifndef H5 */
		top: 84px;
		bottom: 0;
		//#endif
		overflow-y: auto;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.outsideSwiper {
		border-radius: 5px;
		overflow: hidden;

	}

	.swiper-content {
		height: 140px;
	}

	.swiper-img {
		width: 100%;
		height: 100%;
	}

	.notice {
		margin-top: 5px;
	}

	.balance {
		padding: 21px 0 0 0;
	}

	.balance_title {
		display: flex;
		align-items: center;
		margin-bottom: 2px;
	}

	.balance_title image {
		width: 22px;
		height: 22px;
		margin-right: 5px;
	}

	.balance_title text {
		color: #fff;
	}

	.refresh {
		width: 22px;
		height: 22px;
		margin-left: 9px;
		margin-right: 24px;
	}

	.numRefresh {
		width: 50%;
	}

	.balance_content {
		display: flex;
	}

	.balance_money {
		color: #FFFFFF;
		font-size: 24px;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
	}

	.wallet_icon_btn {
		/* display: flex;
		position: relative;
		top: -16px */
		width: 50%;
		display: flex;
		position: relative;
		justify-content: space-between;
		top: -16px;
	}


	.recharge {
		/* margin-right: 30px; */
	}

	.recharge,
	.withdraw {
		text-align: center;
		width: 60px;
	}

	.recharge,
	.withdraw view {
		color: #FFFFFF;
		font-size: 12px;
	}

	.rechargeIcon {
		width: 34px;
		height: 34px;
	}

	.withdrawIcon {
		width: 34px;
		height: 34px;
	}


	.hotMatchTitle {
		color: #FFFFFF;
	}

	.homeModal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 16px;
	}

	.modalMask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgb(0 17 28 / 65%);
	}

	.modalContent {
		width: 100%;
		overflow: hidden;
		position: relative;
		height: 262px;
		background-color: #132736;
		border-radius: 10px;
	}

	.modalTitle {
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 18px;
		padding-bottom: 30px;
		font-size: 16px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}

	.header-icon {
		position: absolute;
		right: 10px;
	}

	.modalBody {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.viewTop {
		display: flex;
		flex-direction: column;
		padding: 0 10px 0;
		position: relative;
	}

	.viewTopText {
		display: inline-block;
		color: #fff;
		margin-bottom: 10px;
	}

	.viewTop input {
		width: 100%;
		height: 42px;
		background: #334756;
		border-radius: 5px;
		color: #fff;
		text-indent: 10px;
	}

	.viewTopSeeimg {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		margin-top: 5px;
		position: absolute;
		right: 15px;
		bottom: 15px;
	}

	.viewTopSeeimg image {
		width: 22px;
		height: 11px;
	}

	.modalBottom {
		display: flex;
		justify-content: center;
		padding: 40px 0 28px 0;

	}

	.modalBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		background: #3d8dfe;
		height: 50px;
		width: 200px;
		font-size: 17px;
		color: #fff;
	}


	@-webkit-keyframes slide-in-top {
		0% {
			-webkit-transform: translateY(-1000px);
			transform: translateY(-1000px);
			opacity: 0;
		}

		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes slide-in-top {
		0% {
			-webkit-transform: translateY(-1000px);
			transform: translateY(-1000px);
			opacity: 0;
		}

		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			opacity: 1;
		}
	}

	@-webkit-keyframes slide-out-top {
		0% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			opacity: 1;
		}

		100% {
			-webkit-transform: translateY(-1000px);
			transform: translateY(-1000px);
			opacity: 0;
		}
	}

	@keyframes slide-out-top {
		0% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
			opacity: 1;
		}

		100% {
			-webkit-transform: translateY(-1000px);
			transform: translateY(-1000px);
			opacity: 0;
		}
	}


	@-webkit-keyframes swing-in-top-fwd {
		0% {
			-webkit-transform: rotateX(-100deg);
			transform: rotateX(-100deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 0;
		}

		100% {
			-webkit-transform: rotateX(0deg);
			transform: rotateX(0deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 1;
		}
	}

	@keyframes swing-in-top-fwd {
		0% {
			-webkit-transform: rotateX(-100deg);
			transform: rotateX(-100deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 0;
		}

		100% {
			-webkit-transform: rotateX(0deg);
			transform: rotateX(0deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 1;
		}
	}

	@-webkit-keyframes swing-out-top-bck {
		0% {
			-webkit-transform: rotateX(0deg);
			transform: rotateX(0deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 1;
		}

		100% {
			-webkit-transform: rotateX(-100deg);
			transform: rotateX(-100deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 0;
		}
	}

	@keyframes swing-out-top-bck {
		0% {
			-webkit-transform: rotateX(0deg);
			transform: rotateX(0deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 1;
		}

		100% {
			-webkit-transform: rotateX(-100deg);
			transform: rotateX(-100deg);
			-webkit-transform-origin: top;
			transform-origin: top;
			opacity: 0;
		}
	}


	/* .menuBoxAni-enter-active{
  animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
   -webkit-animation:  slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.menuBoxAni-leave-active {
  animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  -webkit-animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}
 */


	.langBoxAni-enter-active {
		animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
		-webkit-animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
	}

	.langBoxAni-leave-active {
		animation: swing-out-top-bck 0.25s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
		-webkit-animation: swing-out-top-bck 0.25s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
	}

	.inputModalAni-enter-active {
		animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
		-webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	}

	.inputModalAni-leave-active {
		animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
		-webkit-animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	}

	/* .hotMatchList{
	margin-top: 9px;
	padding-bottom: 20px;
}

.homeCard{
	position: relative;
	display: flex;
	margin: 3px 0 15px 0;
	padding: 6px 12px;
	background: #132736 url(../../static/images/list_bg.png) no-repeat top;
	background-size: 100%;
	border-radius: 10px;
	overflow: hidden;
}


.homeCardContent{
	color: #333;
	font-size: 15px;
	flex: 1;
}

.cardContentDate{
	display: flex;
	justify-content: space-between;
	align-items: center;
	
}

.cardContentDate_close{
	font-size: 12px;
	color: #fff;
	position: inherit;
	z-index: 10;
}

.cardContentDate_time{
	display: flex;
	align-items: center;
	font-size: 12px;
	line-height: 12px;
	color: #fff;
}

.cardContentDesc{
	font-family: Hiragino Sans GB;
	font-weight: 600;
	color: #fff;
	padding-top: 20px;
	padding-bottom: 12px;
	font-size: 14px;
	text-align: center;
	max-height: 47px;
}

.cardContentTeam{
	display: flex;
	padding-top: 25px;
	padding-bottom: 10px;
	align-items: center;
	font-weight: 500;
	font-size: 12px;
	color: #fff;
}

.cardContentTeamLeft{
	font-size: 12px;
	width: 43%;
	text-align: center;
}

.cardContentTeamLeft image{
	display: block;
	margin: 0 auto 10px;
	width: 36px;
	height: 36px;
	border-radius: 50px;
}

.cardContentTeamRight{
	font-size: 12px;
	width: 43%;
	text-align: center;
}

.cardContentTeamRight image{
	display: block;
	margin: 0 auto 10px;
	width: 36px;
	height: 36px;
	border-radius: 50px;
}

.cardContentTeamMid{
	width: 40px;
	height: 40px;
	text-align: center;
	font-size: 14px;
	background: url(../../static/images/vs.png);
	background-size: 100%;
}


.timeBg{
	position: absolute;
	left: 0;
	top: 0;
	background: linear-gradient(-90deg,rgba(128,90,0,0),#3d8dfe);
	height: 26px;
	width: 40%;
} */
</style>
