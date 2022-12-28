<template>
	<view class="subordinateDetailPage" style="
    height: 100vh;
">
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
						<view class="define_right_slot">
							<view class="">
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

		<view class="content">
			<view class="tab">
				<text :class="selectCurrent === index ? 'text active':'text'" v-for="(item,index) in tabList"
					:key="index" @click="changeTabSelect(item,index)">
					{{item.name}}</text>
			</view>
			<!-- 	<view class="line">

			</view> -->
			<view class="container">
				<view class="con_item">
					<view class="con_table">
						<view class="head">
							<view class="cell">
								{{$t('user.subordinateDetail.center.lower.level.text')}}
							</view>
							<view class="cell">
								{{$t('user.subordinateDetail.center.new.member.text')}}
							</view>
							<view class="cell">
								{{$t('user.subordinateDetail.center.topUp.member.text')}}
							</view>
							<view class="cell">
								{{$t('user.subordinateDetail.center.withdrawl.member.text')}}
							</view>
						</view>
						<view class="con_body">
							<view class="body_content" v-for="(item,index) in dataList" :key="index" v-if="noDataBool">
								<view class="bodycell">
									{{item.levelType}}{{$t('user.subordinateDetail.center.level.agent.text')}}
								</view>
								<view class="bodycell middelleft">
									{{item.newPlayer}}
								</view>
								<view class="bodycell middelright">
									{{item.recharge}}
								</view>
								<view class="bodycell">
									{{item.cumulativeReflect}}
								</view>
							</view>
							<noDataView v-if="!noDataBool && dataList.length === 0" />
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		dataCenterDetailReq
	} from '@/api/index.js'
	// import {mapState,mapMutations} from 'vuex'
	import noDataView from '@/components/noDataView/noDataView.vue';
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		components: {
			noDataView
		},
		data() {
			return {
				navTitle: this.$t('user.subordinateDetail.center.title.text'),
				tabList: [],
				current: 0,
				selectCurrent: 0,
				timeNum: 0,
				dataList: [],
				currSearchName: "",
				noDataBool: false,
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
		// 		   animationType: 'slide-in-top',
		// 		   animationDuration: 200
		// 		})
		// 	}
		// },
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()


			// 获取页面的url值
			this.getPageParamData()

			this.current = 0
			this.selectCurrent = 0
			this.timeNum = 0
			// 获取数据
			this.getSubLevelDetail(1)

		},
		methods: {
			getPageParamData() {
				// 这种方法和onload那种方法灵活一些
				let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
				let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
				let currentPageOptions = currentPage.options ////获取路由参数
				let currentPageRoute = currentPage.route //获取当前页面路由

				// console.log("currentPageOptions",currentPageOptions);
				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('searchName')) {
					this.currSearchName = currentPageOptions.searchName
				}

			},
			initLang() { //初始化语言


				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('user.subordinateDetail.center.title.text')
				this.tabList = [{
					name: this.$t('user.subordinateDetail.center.today.text'),
					value: 1,
				}, {
					name: this.$t('user.subordinateDetail.center.yes.text'),
					value: 2,
				}, {
					name: this.$t('user.subordinateDetail.center.nearly7.text'),
					value: 3,
				}, {
					name: this.$t('user.subordinateDetail.center.nearly30.text'),
					value: 5,
				}]

			},
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/statistics',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			changeTabSelect(item, index) {
				this.selectCurrent = index
				this.timeNum = item.value
				this.getSubLevelDetail(this.timeNum)
			},
			async getSubLevelDetail(timeNumber) {
				let reqParam = {}
				if (this.currSearchName) {
					reqParam.username = this.currSearchName
				}
				reqParam.time = timeNumber
				let resR = await dataCenterDetailReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					if (resR.data && resR.data.length !== 0) {
						this.noDataBool = true
						this.dataList = resR.data
					} else {
						this.dataList = []
						this.noDataBool = false
					}
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

<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
		height: 100%;
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

	.title {
		// color: #fff;
		font-weight: 700;
		font-size: 16px;
	}

	.service {
		width: 28px;
		height: 28px;

		.icon {
			width: 100%;
			height: 100%;
		}
	}

	// 导航栏结束

	.tab {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		height: 41px;
		background-color: #fff;
		box-shadow: 0px 1px 2px #fff;

		.text {
			color: #a5a9b2;
			font-size: 14px;
			border-bottom: 1px solid hsla(0, 0%, 100%, 0);
			line-height: 41px;
		}

		.active {
			font-size: 16px;
			font-weight: 600;
			padding-bottom: 5px;
			color: #507ef6;
			border-bottom: 2px solid #507ef6;
		}
	}

	.line {
		width: 100%;
		background-color: #171e25;
		height: 10px;
	}


	.content {
		height: calc(100% - 44px);
	}

	.container {
		width: 100%;
		height: calc(100% - 72px);
		margin-top: 10px;

		.con_item {
			height: 100%;
			// padding: 10px 15px 0;
			background-color: #fff;

			.con_table {
				height: 100%;

				.head {
					width: 100%;
					height: 46px;
					background: #597ef7;
					// background: url(../../static/images/opaicty.png) no-repeat;
					// background-size: 200% 200%;
					// background-position: -40px -25px;
					// border-radius: 5px 5px 0 0;
					display: flex;
					align-items: center;

					.cell {
						width: 25%;
						font-weight: 500;
						font-size: 12px;
						color: #fff;
						font-family: Roboto;
						text-align: center;
					}
				}

				.con_body {
					height: calc(100% - 72px);
					max-height: 1200px;
					overflow-y: scroll;
					border-radius: 2px;
					padding-bottom: 15px;

					.body_content {
						height: 42px;
						line-height: 42px;
						// background: #171e25;
						// border-radius: 2px;
						// margin-top: 10px;
						// margin-bottom: 2px;
						display: flex;
						align-items: center;

						.bodycell {

							text-align: center;
							width: 25%;
							color: #000;
							font-size: 12px;
							font-weight: 400;
							border-bottom: 0.5px solid #ccc;


						}

						.middelleft {
							border-right: 0.5px solid #ccc;
							border-left: 0.5px solid #ccc;
						}

						.middelright {
							border-right: 0.5px solid #ccc;
						}
					}

				}
			}
		}
	}
</style>
