<template>
	<view class="main">
		<u-navbar :is-back="true" :border-bottom="false" z-index="1200" :title-bold="true" back-icon-color="#000000E6"
			title-color="#000000E6" :title="navTitle" :custom-back="goBackBtnClick">
		</u-navbar>
		<view class="page_main">
			<view class="type_container">
				<view class="title">
					{{$t('withdraw.index.page.choose.type.text')}}
				</view>
				<view class="content">
					<view :class="chooseTypeIndex === item.id? 'seleBtn active' : 'seleBtn'"
						v-for="(item,index) in typeList" :key="index" @click="chooseTypeClick(item)">
						{{item.name}}
					</view>
				</view>
			</view>

			<view class="money_container">
				<view class="title">
					{{$t('withdraw.index.page.choose.money.text')}}
				</view>
				<view class="content">
					<view :class="chooseMoneyIndex === item.id? 'seleBtn active' : 'seleBtn'"
						v-for="(item,index) in moneyList" :key="index" @click="chooseMoneyClick(item)">
						<image
							:src="chooseMoneyIndex === item.id ? '../../static/images/qian2.png':'../../static/images/qian.png'"
							mode="" style="height: 16px;"></image>
						{{item.value}}
					</view>
				</view>
			</view>

			<view class="form_container">
				<view class="txt">
					{{$t('withdraw.index.page.input.money.text')}}
				</view>
				<view class="input_m">
					<input type="text" value="" :placeholder="inputPlace" v-model="money_input"
						placeholder-class="place" />
				</view>
			</view>

			<view class="u-line">

			</view>

			<view class="submitBtn" @click="submitMoneyClick">
				{{$t('withdraw.index.page.now.withdraw.btn.text')}}
			</view>


		</view>

		<u-toast ref="uToast" />

	</view>
</template>

<script>
	import {
		withdrawalReq,
	} from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		data() {
			return {
				navTitle: '',
				backgroundOBj: {
					"background": "transparent"
				},
				moneyList: [{
					id: 1,
					value: 100
				}, {
					id: 2,
					value: 300
				}, {
					id: 3,
					value: 500
				}, {
					id: 4,
					value: 1000
				}, {
					id: 5,
					value: 2000
				}, {
					id: 6,
					value: 3000
				}, {
					id: 7,
					value: 5000
				}, {
					id: 8,
					value: 10000
				}, {
					id: 9,
					value: 20000
				}, {
					id: 10,
					value: 50000
				}, {
					id: 11,
					value: 100000
				}],

				typeList: [{
					id: 1,
					name: "UPI"
				}, {
					id: 2,
					name: "USDT"
				}],

				chooseMoneyIndex: 1,
				chooseTypeIndex: 1,
				inputPlace: this.$t("withdraw.index.page.inpuit.money.place.text"),
				money_input: '100',

				scrollTop: 0,

				urlFromStr: null,
			}
		},
		mixins: [myMixin],
		onShow() {

			// 初始化语言
			this.initLang()

			// 初次加载数据
			this.initData()


			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('userNoticeClick', async (data) => {
				this.urlFromStr = data.from
			})


		},
		methods: {
			initLang() { //初始化语言


				let langStr = uni.getStorageSync('run_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr



			},
			initData() {

				// this.localLoginToken = this.$store.state.userInfo.token
				// this.localLoginToken = uni.getStorageSync('footballToken');

				// 设置文字
				this.navTitle = this.$t('home.withdraw')



			},


			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'pop-in',
					animationDuration: 200
				})

				// const queryNoticListUrlFrom = uni.getStorageSync('queryNoticListUrlFrom') || 'other'
				// // console.log("queryMatchContentItemUrlFrom",queryMatchContentItemUrlFrom);
				// if (!this.matchContent_Bool) {
				// 	this.urlFromStr = queryNoticListUrlFrom
				// }
				// if (this.urlFromStr === 'user') {
				// 	uni.switchTab({
				// 		url: '/pages/user/user',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// } else if (this.urlFromStr === 'home') {
				// 	uni.switchTab({
				// 		url: '/pages/home/index',
				// 		animationType: 'pop-in',
				// 		animationDuration: 200
				// 	})
				// }


			},
			chooseTypeClick(item) {
				this.chooseTypeIndex = item.id
			},
			chooseMoneyClick(item) {
				this.chooseMoneyIndex = item.id
				this.money_input = item.value
			},
			async submitMoneyClick() {
				let reqParam = {}
				reqParam.kinds = this.chooseTypeIndex + 1
				reqParam.amount = this.money_input
				let resR = await withdrawalReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background-color: #fff;
	}

	.main {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;

		.page_main {
			padding: 0 25px;
			margin-top: 17px;

			.type_container {
				display: flex;
				flex-direction: column;

				.title {}

				.content {
					margin-top: 15px;
					flex: 1;
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-wrap: wrap;


					.seleBtn {
						margin-right: 15px;
						margin-bottom: 12px;
						min-width: 70px;
						box-sizing: border-box;
						padding-right: 5px;
						height: 27px;
						border-radius: 5px;
						background-color: #f6f6f6;
						color: #666;
						font-size: 14px;
						font-weight: 400;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.active {
						background: #34d155;
						box-shadow: 0 4px 4px 0 #37d25466;
						color: #fff;
					}
				}
			}


			.money_container {
				display: flex;
				flex-direction: column;
				margin-top: 20px;

				.title {}

				.content {
					margin-top: 15px;
					flex: 1;
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-wrap: wrap;


					.seleBtn {
						margin-right: 15px;
						margin-bottom: 12px;
						min-width: 70px;
						box-sizing: border-box;
						padding-right: 5px;
						height: 27px;
						border-radius: 5px;
						background-color: #f6f6f6;
						color: #666;
						font-size: 14px;
						font-weight: 400;
						display: flex;
						align-items: center;

						image {
							margin-left: 7px;
							margin-right: 9px;
							width: 16px;
							vertical-align: middle;
						}

						&:nth-child(4n+4) {
							margin-right: 0;
						}
					}


					.active {
						background: #34d155;
						box-shadow: 0 4px 4px 0 #37d25466;
						color: #fff;
						max-resolution: 9px;
					}
				}
			}

			.form_container {
				display: flex;
				flex-direction: row;
				padding: 10px 0;
				margin-top: 20px;


				.txt {
					font-size: 14px;
					font-weight: 400;
					color: #2d2d2d;
					display: inline-block;
					margin-right: 19px;
				}

				.input_m {
					/deep/ .place {
						color: #c0c4cc;
						font-size: 13px;
						font-weight: 400;
					}
				}
			}

			.u-line {
				margin: 0px;
				border-bottom: 1px solid rgb(214, 215, 217);
				width: 100%;
				transform: scaleY(0.5);
				border-top-color: rgb(214, 215, 217);
				border-right-color: rgb(214, 215, 217);
				border-left-color: rgb(214, 215, 217);
			}


			.submitBtn {
				width: 280px;
				height: 43px;
				line-height: 43px;
				background: url(../../static/images/btn.png) no-repeat 50%;
				background-size: contain;
				margin: 55px auto 20px;
				font-size: 16px;
				color: #fff;
				text-align: center;
			}
		}


	}
</style>
