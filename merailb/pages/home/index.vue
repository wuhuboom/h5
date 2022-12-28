<template>
	<view>
		<view class="Homepage">
			<view class="backTitleBar-wrapper colCent borderBox">
				<view class="fixedBox">
					<view class="common_header" style="height: 44px;">
						<view class="define">
							<view class="define_left_slot">
								<view class="lang">
									<view class="lang-view">
										<view class="langs" @click="changeLang">
											<image :src="defaultLangImg" mode="" class="lang-icon"
												style="height: 20px;"></image>
											<text class="lang-text">{{selectLangStr}}</text>
											<image src="../../static/images/triangle.png" mode=""
												:class="langSBoxtatus ? 'langTriangle isRotate' : 'langTriangle '">
											</image>
										</view>
									</view>
									<view class="langItem" :style="langSBoxtatus ? null : 'display:none;' ">
										<scroll-view scroll-y="true" class="scroll-item">
											<view class="item" v-for="(item,index) in langBoxListData" :key="index"
												@click="menuItemClick(item)">
												<view class="left">
													<image :src="item.url" mode="" class="icon"></image>
												</view>
												<view class="txt">
													{{item.lang}}
												</view>
											</view>
										</scroll-view>
									</view>
								</view>
							</view>
							<view class="define_center_slot">
								<view class="logo">
									<view class="logo_center_img">
										<view class="">
											Merailb
										</view>

									</view>
								</view>
							</view>
							<view class="define_right_slot">
								<view class="anount">
									<view class="anount-view">
										<!-- Version1.0 -->
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

			<view class="contents">
				<view class="contents-wrap">
					<view class="swiper">
						<u-swiper :list="swiperList" height="360" mode="round" interval="5500">
						</u-swiper>
					</view>
					<view class="service-list">
						<view class="item-list">
							<view class="service-item" @click="profitBtnClick">
								<image src="../../static/images/cell1.png" mode="" class="img"></image>
								<view class="text">{{$t('home.tool.profit')}}</view>
							</view>
							<view class="service-item" @click="rechargeBtnClick">
								<image src="../../static/images/cell2.png" mode="" class="img"></image>
								<view class="text">{{$t('home.tool.recharge')}}</view>
							</view>
							<view class="service-item" @click="withdrawBtnClick" style="width: 40%;">
								<image src="../../static/images/cell3.png" mode="" class="img"></image>
								<view class="text">{{$t('home.tool.withdraw')}}</view>
							</view>
						</view>
					</view>

					<view class="notice">
						<view class="notice-img">
							<image src="../../static/images/s_notice.png" mode=""></image>
						</view>
						<view class=" simpletext">
							<!-- G**ry 14-10-2022 22:44:35 40105.99 -->
							<text>{{firstPersonInfo.nickname}}</text>
							<text style="margin-left: 20px;margin-right: 20px;">{{firstPersonInfo.create_time}}</text>
							<text>{{firstPersonInfo.money}}</text>
						</view>
					</view>

					<view class="info">
						<view class="wrap">
							<view class="username">
								{{loginUser}}
							</view>
							<view class="invitecode" @click="copyInviteBtn">
								{{inviteCodeStr}}
							</view>
						</view>
						<view class="title">
							{{$t('home.info.money.text')}} {{symbolStr}}
						</view>
						<view class="money">
							{{balanceMoneyNum}}
						</view>
						<view class="desc">
							<view class="cell">
								<view class="dot">
									<view class="real">

									</view>
								</view>
								<view class="content">
									<view class="title">
										{{$t('home.info.money.desc.income.text')}}:
									</view>
									<view class="money">
										{{symbolStr}} {{moneyInfo.income}}
									</view>
								</view>
							</view>

							<view class="cell">
								<view class="dot">
									<view class="real yellow">

									</view>
								</view>
								<view class="content">
									<view class="title">
										{{$t('home.info.money.desc.money.text')}}:
									</view>
									<view class="money">
										{{symbolStr}} {{moneyInfo.balance}}
									</view>
								</view>
							</view>


							<view class="cell">
								<view class="dot">
									<view class="real gray">

									</view>
								</view>
								<view class="content">
									<view class="title">
										{{$t('home.info.money.desc.freeze.text')}}:
									</view>
									<view class="money">
										{{symbolStr}} {{moneyInfo.freeze}}
									</view>
								</view>
							</view>
						</view>
					</view>


					<view class="showtitle">
						{{$t('home.scroll.center.text')}}
					</view>
					<view class="showlist">
						<view class="listcell">
							<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" interval="1100"
								duration="1600" :vertical="true" :disable-touch="true" display-multiple-items="4"
								:acceleration="true">
								<swiper-item class="newlist" v-for="(item,index) in newListItemArr" :key="index"
									style="height: 25%;">
									<view class="cell-item">
										<!-- <image :src="item.avatar" mode="" class="roundimg"></image> -->
										<image src="../../static/images/1.jpg" mode="" class="roundimg"></image>
										<view class="con">
											<view class="conone top">
												{{item.nickname}}
											</view>
											<view class="conone bottom">
												{{item.create_time}}
											</view>
										</view>
										<view class="right">
											{{symbolStr}}{{item.money}}
										</view>
									</view>
								</swiper-item>

							</swiper>
						</view>
					</view>

					<view class="company">
						<view class="item" @click="aboutClick">
							<image src="../../static/images/company-profile.png" mode=""></image>
							<view class="name">
								{{$t('home.info.company.left.text')}}
							</view>
						</view>
						<view class="item" @click="companyClick">
							<image src="../../static/images/Calculate-revenue.png" mode=""></image>
							<view class="name">
								{{$t('home.info.company.right.text')}}
							</view>
						</view>
					</view>
					<view class="shoptitle">
						{{$t('home.partners.center.text')}}
					</view>
					<view class="shoplist">
						<view class="cell">
							<view class="item" v-for="(item,index) in 6" :key="index">
								<image :src="`../../static/images/list${item}.jpg`" mode="" class="imgs"></image>
							</view>
						</view>
					</view>

				</view>

			</view>

		</view>

		<self-tabbar :current-page="0" ref="childBar"></self-tabbar>


		<!-- <u-toast ref="uToast" /> -->
		<show-modal ref="testRef"></show-modal>
	</view>
</template>


<script>
	import {
		websiteUrlStr,
		getSlideshowReq,
		getInformationReq,
		getMoneyInformationReq,

	} from '../../api/index.js'
	import {
		randomString,
		randomNum,
		getRandomNum,
		formatSoltDateTime,
		forMate
	} from '../../common/publicTool.js'
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	import {
		myMixin,
		withdrawMinxi,
		setOrderRecordMixin,
	} from '@/util/mixins.js'
	import counter from '../../components/counterView/counter.vue';
	export default {
		components: {
			counter
		},
		data() {
			return {
				loginUser: '',
				balanceMoneyNum: null,
				inviteCodeStr: '',
				moneyInfo: {},
				firstPersonInfo: {},
				newListItemArr: [{
						"id": 0,
						"avatar": "../../static/images/avatar5.jpg",
						"money": 21277.86,
						"nickname": "G***ry",
						"user_id": 0,
						"create_time": "15-10-2022 21:35:31"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar8.jpg",
						"money": 46100.05,
						"nickname": "Char***",
						"user_id": 0,
						"create_time": "15-10-2022 21:37:04"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar10.jpg",
						"money": 27647.57,
						"nickname": "De***",
						"user_id": 0,
						"create_time": "15-10-2022 21:38:20"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar16.jpg",
						"money": 14595.51,
						"nickname": "Au***",
						"user_id": 0,
						"create_time": "15-10-2022 21:39:18"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar8.jpg",
						"money": 9577.58,
						"nickname": "Dou****",
						"user_id": 0,
						"create_time": "15-10-2022 21:40:22"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar7.jpg",
						"money": 48523.85,
						"nickname": "Bo***",
						"user_id": 0,
						"create_time": "15-10-2022 21:42:00"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar3.jpg",
						"money": 49295.67,
						"nickname": "Bo***",
						"user_id": 0,
						"create_time": "15-10-2022 21:43:08"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar7.jpg",
						"money": 33225.83,
						"nickname": "E***c",
						"user_id": 0,
						"create_time": "15-10-2022 21:44:25"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar7.jpg",
						"money": 35351.33,
						"nickname": "Bra****",
						"user_id": 0,
						"create_time": "15-10-2022 21:45:53"
					},
					{
						"id": 0,
						"avatar": "../../static/images/avatar8.jpg",
						"money": 20815.87,
						"nickname": "Col***",
						"user_id": 0,
						"create_time": "15-10-2022 21:46:49"
					}
				],

				defaultLangImg: '',
				selectLangStr: '',
				menuStatus: false,
				langSBoxtatus: false,


				// русский:俄罗斯,Português:葡萄牙语,
				//Español:西班牙语, //Indonesia:印尼,
				// ไทย:泰国,Français:法语,
				// म:印地语,한국인:韩语,
				//Japan:日语,Melayu:马来语,
				//Deutsch:德语, //Türkiye:土耳其语,
				//Italiano:意大利语,
				langBoxListData: [{
						lang: "EN",
						type: "EN",
						url: "../../static/images/en.svg",
						'active': false,
					},
					{
						lang: "ES",
						type: "ES",
						url: "../../static/images/es.svg",
						'active': false,
					},
					// {
					// 	lang: "CN",
					// 	type: "CN",
					// 	url: "../../static/images/zh.svg",
					// 	'active': false,
					// },
				],
				swiperList: [],
			}
		},
		mixins: [myMixin, setOrderRecordMixin, withdrawMinxi],

		onShow() {
			this.langSBoxtatus = false
			// 初始化语言
			this.initLang()

			// 创建虚拟数据
			this.buildVirtualData()


			// 获取URL打印
			this.getURlParam()

			// 初始化页面数据
			this.initPageData()

		},
		// activated() {
		// 	this.langSBoxtatus = false
		// 	// 初始化语言
		// 	this.initLang()
		// 	// 初始化页面数据
		// 	this.initPageData()
		// },
		onLoad() {},
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

				let langStr = uni.getStorageSync('merailb_lang')
				let langUpperStr = langStr.toUpperCase()
				// console.log("lang",langStr);
				this.$i18n.locale = langStr
				this.langBoxListData.forEach((item, index) => {
					if (item.type === langUpperStr) {
						this.selectLangStr = item.lang
						item.active = true
					}
				})
				if (langUpperStr !== 'CN') {
					if (langUpperStr == 'PT') {
						this.defaultLangImg = '../../static/images/pt.png'
					} else {
						this.defaultLangImg = '../../static/images/' + langUpperStr.toLowerCase() + '.svg'
					}
				} else {
					// this.defaultLangImg = '../../static/images/zh.svg'
					this.defaultLangImg = ''
				}


			},
			getURlParam() {
				let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
				let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
				// console.log("currentPage", currentPage);
				if (!currentPage) {
					return false
				}
				let currentPageOptions = currentPage.options ////获取路由参数
				let currentPageRoute = currentPage.route //获取当前页面路由
				// console.log("currentPageOptions",currentPageOptions);
				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('ojbk')) {
					console.log("HACK!");
					uni.setStorageSync('merailb_lang', 'cn')
					this.initLang()
				}
			},
			buildVirtualData() {

				let timerStr = 0
				let creatTime = 0
				let virtualArr = []
				let nicknameres = ""

				for (let i = 0; i < 20; i++) {
					nicknameres = randomString(6)
					timerStr = Date.parse(new Date()) / 1000;
					creatTime = timerStr + getRandomNum(30, 120)
					virtualArr.push({
						id: i + 1,
						nickname: forMate(nicknameres, 2, 3),
						money: getRandomNum(5000, 50000),
						create_time: formatSoltDateTime(creatTime, 1000)
					})

				}

				this.firstPersonInfo = virtualArr[0]
				this.newListItemArr = virtualArr

			},
			initPageData() { //初始化页面数据

				if (!this.hasLogin) {

					return false
				}


				//获取用户名和余额方法
				this.getInformation()

				// 获取冻结金额
				this.getMoneyInformation()

				//获取轮播
				this.getSlider()

			},
			async getInformation() {
				let resR = await getInformationReq(this.localLoginToken)
				// console.log("resR", resR);
				if (resR.code === 2000) {
					this.loginUser = resR.result.Username
					this.balanceMoneyNum = resR.result.Balance
					this.inviteCodeStr = resR.result.InvitationCode
				}
			},
			async getMoneyInformation() {
				let resR = await getMoneyInformationReq(this.localLoginToken)
				// console.log("resR", resR);
				if (resR.code === 2000) {
					this.moneyInfo = resR.result
				}
			},
			async getSlider() { //轮播请求
				this.swiperList = []
				let reqParam = {}
				let langStr = uni.getStorageSync('merailb_lang')
				// console.log("langStr", langStr);
				// reqParam.country_name = "Spain"
				if (langStr == "cn") {
					reqParam.country_name = "zh"
				} else if (langStr == "es") {
					reqParam.country_name = "Spain"
				} else if (langStr == "en") {
					reqParam.country_name = "en"
				}

				let resR = await getSlideshowReq(reqParam, this.localLoginToken)
				if (resR.code === 2000) {
					let resR_data = resR.result
					if (!resR_data) {
						return false
					}
					resR_data.forEach((item, index) => {
						item.image = websiteUrlStr + "/" + item.ImageUrl
						item.localPath = websiteUrlStr + "/" + item.ImageUrl

					})
					this.swiperList = resR_data
				}
			},
			changeLang() {
				this.langSBoxtatus = !this.langSBoxtatus
			},
			copyInviteBtn() {
				setClipboardData(this.inviteCodeStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('invite.friend.copy.success.text')
					});
				})
			},

			refreshMoneyClick() { //刷新余额方法，暂时没有绑定
				this.balanceMoneyNum = 0
				//获取用户名和余额方法
				this.getInformation()
			},
			menuItemClick(item) {
				// console.log("item", item);
				// console.log("选择语言前",this.langSBoxtatus);
				this.defaultLangImg = item.url
				this.selectLangStr = item.lang
				this.$i18n.locale = item.type.toLowerCase();
				uni.setStorageSync('merailb_lang', this.$i18n.locale)
				this.$refs.childBar.childMethods()

				//获取轮播
				this.getSlider()

				this.langBoxListData.forEach((signle, index) => {
					signle.active = false
					// console.log("signle.type", signle.type);
					// console.log("item.type", item.type);
					if (signle.type == item.type) {
						signle.active = true
					}
				})


				this.langSBoxtatus = false
				// console.log("选择语言后",this.langSBoxtatus);
				this.menuStatus = false
				this.initLang()

			},
			profitBtnClick() {
				uni.navigateTo({
					url: "/pages/mine/record",
					success: (res) => {
						this.save_order_r_from('home')
						// 通过eventChannel向被打开页面传送数据	
						res.eventChannel.emit('recordOrderEventClick', {
							from: 'mine'
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			rechargeBtnClick() { //充值按钮点击事件
				uni.switchTab({
					url: '/pages/recharge/index',
					// success: (res) => {
					// 	// 通过eventChannel向被打开页面传送数据
					// 	this.save_recharge_from('home')
					// 	res.eventChannel.emit('rechargeEventClick', {
					// 		from: 'home'
					// 	})
					// },
					animationType: 'slide-in-top',
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
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			aboutClick() {
				uni.navigateTo({
					url: "/pages/article/aboutus",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			companyClick() {
				uni.navigateTo({
					url: "/pages/article/company",
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f1f1f1;
		color: #303133;
		font-size: 14px;
	}

	.backTitleBar-wrapper {
		.fixedBox {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			color: #fff;
			background: linear-gradient(to right, rgb(109, 202, 184), rgb(58, 120, 203));

			.common_header {
				// padding-top: 7px;
				// padding-bottom: 7px;
				// padding-left: 15px;
				// padding-right: 15px;
				padding: 7px 15px;

				.define {
					display: flex;
					justify-content: space-between;
					align-items: center;
					// height: 100%;
					height: 30px;
					line-height: 30px;
				}
			}
		}
	}

	.Homepage {
		position: relative;
		padding-bottom: 50px;


		.lang-view {
			position: relative;
			width: 90px;
			border: 0.5px solid rgba(0, 0, 0, .15);

			.langs {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;

				.lang-icon {
					flex: 0 0 20px;
					width: 20px;
					height: 20px;
					margin-left: 5px;
				}

				.lang-text {
					width: 80px;
					width: 40px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					display: inline-block;
					// color: #f8f8f8;
					padding-left: 5px;
					font-weight: 700;
				}


				.langTriangle {
					width: 10px;
					height: 7px;
					transition: all .3s ease;
				}

				.isRotate {
					// transform: rotate(0deg);
					transform: rotate(180deg);
				}
			}
		}

		.langItem {
			position: absolute;
			left: 15px;
			top: 40px;
			width: 90px;
			/* width: 100%; */
			background-color: #fff;
			/* border: 1px solid rgba(255, 255, 255, 0.2); */
			z-index: 999;

			.scroll-item {
				min-height: 100px;
				max-height: 350px;

				.item {
					text-align: center;
					line-height: 40px;
					color: #333;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					// padding: 0 10px;
					padding-left: 5px;
					// border-bottom: 0.5px solid #222;

					.left {
						flex: 0 0 21px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-right: 5px;

						.icon {
							width: 18px;
							height: 18px;
							border-radius: 50%;
						}
					}

					.txt {
						// flex: 1;
					}
				}
			}

		}


		.logo_center_img {
			margin-top: 5px;
			font-size: 16px;

			.log-img {
				height: 100%;
				width: 100%;
			}
		}

		.anount-view {
			position: relative;
			width: 80px;
			height: 38px;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.anount-icon {
				width: 38px;
				height: 38px;
			}

			.diot {
				position: absolute;
				width: 6px;
				height: 6px;
				background-color: #b33a3a;
				border-radius: 50%;
				right: 8px;
				top: 10px;
			}
		}

		.contents {
			background-color: #f1f1f1;
			padding-bottom: 50px;

			.contents-wrap {
				background-color: #f1f1f1;
				border-bottom-left-radius: 15px;
				border-bottom-right-radius: 15px;

				.swiper {
					overflow: hidden;
					width: 93.333333%;
					// width: 350px;
					padding-top: 10px;
					margin: 0 auto;
				}

				.service-list {
					height: 70px;
					margin: 0 15px;
					/* padding-left: 15px; */
					display: flex;
					align-items: center;
					justify-content: space-between;
					/* border-top: 1px solid #171e25; */
					background: #fff;
					margin-top: 10px;
					border-radius: 10px;

					.user-msg {
						display: flex;
						flex-direction: column;
						height: 50px;
						justify-content: space-around;
						color: #fff;

						.user {
							display: flex;
							align-items: center;
							position: relative;

							.uname {
								font-size: 13px;
								margin-right: 5px;
								color: #868b9a;
								width: 60px;
								word-break: break-all;
							}

							.level {
								// background: url(@/static/images/vip.png) no-repeat 50%;
								// background-size: 100%;
								// width: 55px;
								// height: 17px;
								padding: 2px 6px;
								box-sizing: border-box;
								color: #fff;
								background: -webkit-linear-gradient(left, #ffca32, #fc9414);
								background: linear-gradient(90deg, #ffca32, #fc9414);
								border-radius: 4px;
								text-align: center;
								white-space: nowrap;

								.vip-txt {
									font-size: 12px;
									// padding-left: 18px;
									color: #fff;
									// padding-top: 2px;
									font-weight: 600;
								}
							}


						}

						.balance {
							font-size: 18px;
							font-weight: 700;
							// margin-top: 12px;
							color: #414655;
							word-break: break-all;
						}
					}

					.item-list {
						display: flex;
						/* margin-left: 5px; */
						align-items: center;
						justify-content: space-between;
						width: 100%;
						margin: 0 10px;

						.service-item {
							width: 30%;

							.img {
								width: 40px;
								height: 40px;
							}

							.text {
								width: 100%;
								overflow: hidden;
								// white-space: nowrap;
								text-overflow: ellipsis;
								text-align: center;
								color: #333333;
							}
						}
					}

					.service-item {
						display: flex;
						flex-direction: column;
						align-items: center;

						.text {
							font-size: 12px;
							color: #666;
						}
					}
				}
			}
		}

		.notice {
			position: relative;
			margin: 0 15px;
			overflow: hidden;
			display: flex;
			border-radius: 10px;
			align-items: center;
			background: #fff;
			margin-top: 10px;
			padding: 13px 10px;

			.notice-img {
				width: 17px;
				height: 17px;

				image {
					width: 16px;
					height: 16px;
				}
			}

			.simpletext {
				margin-left: 10px;
				font-size: 13px;
				color: #666;
				// font-weight: 600;
			}

			/deep/ .u-notice-bar-wrap {
				width: 100%;
			}

			.uni-noticebar {
				margin-left: 10px;
				margin-bottom: 2px;
				height: 20px;
			}
		}


		.info {
			margin: 0 15px;
			margin-top: 10px;
			border-radius: 10px;

			background: url("../../static/images/card..png") no-repeat;
			background-size: 100% 100%;

			.wrap {

				padding: 5px;
				display: flex;
				justify-content: flex-end;
				text-align: center;


				.username {
					padding: 5px;
					width: 30%;
					color: #444;
					font-weight: 600;
					font-size: 13px;
				}

				.invitecode {
					padding: 5px;
					width: 30%;
					color: #444;
					// font-weight: 600;
					font-size: 13px;
					border-left: 1px solid #adadad;
				}
			}

			.title {
				padding-left: 20px;
				text-align: left;
				font-size: 14px;
				margin: 15px 0;
			}

			.money {
				padding-left: 20px;
				text-align: left;
				font-size: 26px;
				font-weight: 700;
				color: #ff7300;
			}

			.desc {
				// margin: 15px 0 20px;
				padding: 15px 15px 20px;
				display: flex;
				justify-content: space-between;

				.cell {
					display: flex;
					align-items: flex-start;

					.dot {
						width: 10px;
						height: 10px;
						background: #fff;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 3px;
						margin-right: 5px;

						.real {
							width: 8px;
							height: 8px;
							background: #ff0000;
							border-radius: 50%;
						}

						.yellow {
							width: 8px;
							height: 8px;
							background: #ca9854;
							border-radius: 50%;
						}

						.gray {
							width: 8px;
							height: 8px;
							background: #939393;
							border-radius: 50%;
						}
					}

					.content {
						display: flex;
						flex-direction: column;

						.title {
							margin: 0;
							padding: 0;
							font-size: 12px;
							font-weight: 400;
							color: #666;
						}

						.money {
							padding: 0;
							margin-top: 5px;
							font-size: 12px;
							font-weight: 400;
							color: #333;
						}

					}
				}

			}
		}


		.showtitle {
			padding-left: 10px;
			margin-top: 15px;
			padding-left: 16px;
			font-weight: 500;
			color: #333;
			border-radius: 10px;
			margin: 10px auto 0;
		}


		.showlist {
			margin-top: 10px;
			padding: 5px;

			.listcell {
				// padding: 10px;
				border-radius: 9px;
				border: 10px;

				.swiper {
					padding: 0;
					background-color: #fff;
					color: #666;
					height: 280px;

					.newlist {
						.cell-item {
							height: 100%;
							padding: 5px;
							border-radius: 5px;
							border-bottom: 1px solid #ddd;
							padding: 0 10px;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.roundimg {
								width: 50px;
								height: 50px;
								border-radius: 50%;
							}

							.con {
								margin-left: 13px;

								.conone {
									font-size: 12px;
								}

								.top {
									font-size: 14px;
									font-weight: 500;
									color: #333;
								}

								.bottom {
									padding-top: 5px;
									color: #999;
								}
							}

							.right {
								color: #ff7300;
								flex: 1 1 0%;
								text-align: right;
							}
						}
					}
				}
			}

		}

		.company {
			padding: 0 15px;
			margin-top: 10px;
			display: flex;
			justify-content: space-between;
			text-align: center;

			.item {
				width: 48%;
				background: #fff;
				padding: 15px 0;
				border-radius: 9px;
				border: 10px;

				image {
					width: 50%;
					height: 84px;
				}

				.name {
					margin-top: 15px;
				}
			}
		}


		.shoptitle {
			padding-left: 10px;
			margin-top: 15px;
			padding-left: 16px;
			font-weight: 500;
			color: #333;
			border-radius: 10px;
			margin: 10px auto 0;
		}

		.shoplist {
			border-radius: 10px;
			margin: 10px auto 0;

			.cell {
				display: flex;
				flex-wrap: wrap;
				margin-top: 10px;
				padding-left: 10px;
				padding-right: 10px;
				text-align: center;

				.item {
					width: 50%;

					.imgs {
						width: 94%;
						margin-bottom: 10px;
						height: 80px;
					}
				}
			}

		}





	}
</style>
