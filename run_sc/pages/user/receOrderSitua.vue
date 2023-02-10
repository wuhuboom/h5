<template>
	<view class="main">
		<u-navbar :is-back="true" :border-bottom="false" z-index="1200" :title-bold="true" back-icon-color="#000000E6"
			title-color="#000000E6" :title="navTitle" :custom-back="goBackBtnClick">
		</u-navbar>

		<view class="container">
			<view class="title">
				{{$t('receive.order.list.cell.item1.title1.text')}}
			</view>
			<view class="itemlist">
				<view class="itemcell">
					<view class="top">
						{{todayData.CollectionCount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item1.title2.text')}}
					</view>
				</view>
				<view class="itemcell">
					<view class="top">
						{{todayData.CollectionAllCount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item1.title3.text')}}
					</view>
				</view>
			</view>
			<view class="itemlist">
				<view class="itemcell">
					<view class="top">
						{{todayData.CollectionAmount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item1.title4.text')}}
					</view>
				</view>
				<view class="itemcell">
					<view class="top">
						{{todayData.CollectionAllAmount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item1.title5.text')}}
					</view>
				</view>
			</view>
			<view class="itemlist">
				<view class="itemcell">
					<view class="top">
						{{todayData.Commission}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item1.title6.text')}}
					</view>
				</view>
				<view class="itemcell">
					<view class="top">
						{{todayData.PayAmount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item1.title7.text')}}
					</view>
				</view>
			</view>
			<view class="itemlist">
				<view class="itemcell">
					<view class="top">
						{{todayData.PayAllAmount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item1.title8.text')}}
					</view>
				</view>
				<view class="itemcell">
					<view class="top">
						{{todayData.PayCount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item1.title9.text')}}
					</view>
				</view>
			</view>
			<view class="itemlist">
				<view class="itemcell">
					<view class="top">
						{{todayData.PayAllCount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item1.title10.text')}}
					</view>
				</view>
			</view>

		</view>

		<view class="container" style="margin-top: 20px;">
			<view class="title">
				{{$t('receive.order.list.cell.item2.title1.text')}}
			</view>
			<view class="itemlist">
				<view class="itemcell">
					<view class="top">
						{{allData.collection_count}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item2.title2.text')}}
					</view>
				</view>
				<view class="itemcell">
					<view class="top">
						{{allData.collection_all_count}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item2.title3.text')}}
					</view>
				</view>
			</view>
			<view class="itemlist">
				<view class="itemcell">
					<view class="top">
						{{allData.collection_amount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item2.title4.text')}}
					</view>
				</view>
				<view class="itemcell">
					<view class="top">
						{{allData.collection_all_amount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item2.title5.text')}}
					</view>
				</view>
			</view>
			<view class="itemlist">
				<view class="itemcell">
					<view class="top">
						{{allData.commission}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item2.title6.text')}}
					</view>
				</view>
				<view class="itemcell">
					<view class="top">
						{{allData.pay_amount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item2.title7.text')}}
					</view>
				</view>
			</view>
			<view class="itemlist">
				<view class="itemcell">
					<view class="top">
						{{allData.pay_all_amount}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item2.title8.text')}}
					</view>
				</view>
				<view class="itemcell">
					<view class="top">
						{{allData.pay_count}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item2.title9.text')}}
					</view>
				</view>
			</view>
			<view class="itemlist">
				<view class="itemcell">
					<view class="top">
						{{allData.pay_all_count}}
					</view>
					<view class="content">
						{{$t('receive.order.list.cell.item2.title10.text')}}
					</view>
				</view>
			</view>

		</view>

		<u-toast ref="uToast" />

	</view>
</template>

<script>
	import {
		getCollectionDetailReq,
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
				todayData: {},
				allData: {},
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

				// 设置文字
				this.navTitle = this.$t('user.list.cell.order.status.text')

				this.getTodayData()
				this.getAllData()
			},


			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'pop-in',
					animationDuration: 200
				})


			},
			async getTodayData() {
				let resR = await getCollectionDetailReq({}, this.localLoginToken, "today")
				if (resR.code === 200) {
					this.todayData = resR.result
				}
			},
			async getAllData() {
				let resR = await getCollectionDetailReq({}, this.localLoginToken, "all")
				if (resR.code === 200) {
					this.allData = resR.result
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
		padding-bottom: 260px;
		height: 100%;
		// overflow: hidden;


		.container {

			margin: 0 20px;
			// margin: 16px auto 0;
			background: #fff;
			box-shadow: 0px 0px 6px 0px #367bcb2e;
			border-radius: 10px;
			margin-top: 10px;

			.title {
				text-align: center;
				color: #367bcb;
				font-size: 15px;
				margin-top: 24px;
				margin-bottom: 29px;

			}

			.itemcell {
				box-sizing: border-box;
				width: 50%;
				padding: 12px 20px;
				float: left;

				.top {
					text-align: center;
					font-size: 15px;
					color: #1c1c1c;
					margin-bottom: 11px;
				}

				.content {
					text-align: center;
					font-size: 11px;
					color: #999;
					font-weight: 200px;
				}
			}
		}

	}
</style>
