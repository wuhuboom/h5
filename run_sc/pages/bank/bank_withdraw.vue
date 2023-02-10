<template>
	<view class="main">
		<u-navbar :is-back="true" :border-bottom="false" z-index="1200" :title-bold="true" back-icon-color="#000000E6"
			title-color="#000000E6" :title="navTitle" :custom-back="goBackBtnClick">
		</u-navbar>

		<view class="cardContainer" @click="editBankClick">
			<view class="addbtn" @click.stop="addBankSmallBtnClick" v-if="isCloseBindBtnBool && !isShowInputFormBool ">
				<image src="../../static/images/bank_add.png" mode="" style="height: 18px;"></image>
				<text>{{$t('bindupi.page.content.add.btn.addr.text')}}</text>
			</view>
			<view class="tabKong bg2 swiperItem">
				<view class="name" v-if="infoBank.Address">
					{{$t('bindupi.page.content.add.cell.type.text')}}:{{$t('bindupi.page.content.add.cell.type.withdraw.text')}}
				</view>

				<view class="card">

				</view>

				<view class="addr">
					{{infoBank.Address}}
				</view>
			</view>
		</view>

		<view class="" style="margin-top: 30px;" v-if="isShowInputFormBool">
			<view class="inputContainer">
				<view class="title">
					{{$t('bindupi.page.content.add.cell.addr.text')}}
				</view>
				<view class="content">
					<input type="text" value="" :placeholder="$t('bindupi.page.content.input.addr.place.text')"
						v-model="addrstr" placeholder-class="place" />
				</view>
			</view>


			<view class="btn" @click="submitBtnClick">
				{{sumitText}}

			</view>
		</view>

		<u-toast ref=" uToast" />

	</view>
</template>

<script>
	import {
		bankUpiReq,
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
				scrollTop: 0,
				sumitText: this.$t('bindupi.page.content.add.btn.bind.now.text'),
				addrstr: '',
				infoBank: {},
				urlFromStr: null,
				isCloseBindBtnBool: false,
				isShowInputFormBool: false,
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
				this.navTitle = this.$t('account.page.cell.bindupi2.text')
				this.getBankInfo()
			},
			async getBankInfo() {
				let reqParam = {}
				reqParam.kinds = 2
				let resR = await bankUpiReq(reqParam, this.localLoginToken, 'check')
				if (resR.code === 200) {
					if (resR.result.length === 0) {
						this.isCloseBindBtnBool = true
					} else {
						this.isCloseBindBtnBool = false
						this.infoBank = resR.result[0]
					}
				}
			},

			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/bank/bank',
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
			addBankSmallBtnClick() {
				if (!this.infoBank.Address) {
					this.isShowInputFormBool = true
				}
			},
			async submitBtnClick() {
				if (!this.addrstr) {
					uni.showToast({
						title: this.$t('bindupi.page.content.input.addr.not.empty.text'),
						icon: "none",
						duration: 3000
					});

					return false
				}

				let reqParam = {}
				reqParam.address = this.addrstr
				let resR
				if (!this.infoBank.Address) {
					reqParam.kinds = 2
					resR = await bankUpiReq(reqParam, this.localLoginToken, 'add')
				} else {
					reqParam.id = this.infoBank.ID
					resR = await bankUpiReq(reqParam, this.localLoginToken, 'update')
				}

				this.addrstr = ""
				if (resR.code === 200) {
					this.isCloseBindBtnBool = false
					this.isShowInputFormBool = false
					this.getBankInfo()
				}

			},
			editBankClick() {
				if (this.infoBank.Address) {
					this.sumitText = this.$t('bindupi.page.content.add.btn.confimr.edit.text')
					this.addrstr = this.infoBank.Address
					this.isShowInputFormBool = !this.isShowInputFormBool
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

		.content_cell {
			font-size: 14px;
			color: #303133;
			margin-top: 2px;
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

		.cardContainer {
			margin: 0 20px;
			min-height: 200px;
			position: relative;
			// background: url(/static/img/kong1.png) no-repeat;
			// background-size: cover;

			.tabKong {}

			.bg2 {
				background: url(../../static/images/kong1.png) no-repeat;
				background-size: cover;

				.name {
					font-size: 25px;
					font-weight: 700;
					color: #fff;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.addr {
					font-size: 15px;
					color: #fff;
					font-weight: 700;
				}
			}

			.swiperItem {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				box-sizing: border-box;
				padding: 41px 20px 33px 22px;
			}
		}

		.addbtn {
			width: 185px;
			height: 34px;
			border-radius: 17px;
			border: 0.5px dashed #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;

			image {
				width: 18px;
			}

			text {
				font-size: 15px;
				color: #fff;
				margin-left: 10px;
				font-weight: 400;
			}
		}

		.inputContainer {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 20px 30px;


			.title {
				justify-content: flex-start;
				font-size: 13px;
				color: rgb(66, 66, 66);
				font-weight: 400;
				margin-right: 20px;
			}


			.content {
				/deep/ .place {
					color: #c0c4cc;
					font-size: 13px;
					font-weight: 400;
				}
			}

		}

		.btn {
			width: 280px;
			height: 43px;
			line-height: 43px;
			background: url(../../static/images/btn.png) no-repeat 50%;
			background-size: contain;
			margin: 25px auto 20px;
			font-size: 16px;
			color: #fff;
			text-align: center;
		}

	}
</style>
