<template>
	<view class="orderCenterPage">
		<view class="backTitleBar-wrapper colCent borderBox">
			<view class="fixedBox">
				<view class="common_header" style="height: 44px;background: #1f252f;">
					<view class="define">
						<view class="define_left_slot" @click="goBackBtnClick">
							<view class="">
								<u-icon name="arrow-left" color="#fff" size="32"></u-icon>
							</view>
						</view>
						<view class="define_center_slot">
							<view class="">
								<text class="title">{{navTitle}}</text>
							</view>
						</view>
						<view class="define_right_slot">
							<view class="">
								<view class="service">
									<image src="../../static/images/service.png" mode="" class="icon"></image>
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


		<view class="list-view">
			<view class="">
				<mescroll-body ref="mescrollRef" :fixed="false" top="0" :topbar="false" bottom="100" :bottombar="false"
					:safearea="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
					:up="upOption">


					<view class="list-item" v-for="(item, index) in dataList" :key="index"
						@click="detailListItem(item)">
						<view class="one-list">
							<view class="source"
								:style="item.status === 1 ?  'color:#fc992c' : item.status === 2 ? 'color:#00ff65' :'color:#ff525d'">
								<view class="">
									{{item.statusName}}
								</view>
							</view>
							<view class="amount C_FF0000">
								<view class="money">
									{{item.money|moneyFormat}}
								</view>
							</view>
						</view>
						<view class="order-time">
							<text class="text">{{$t('recharge.record.center.list.head.date.text')}}</text>
							<text class="text content">{{item.createdAt | timestampStr}}</text>
						</view>
						<view class="tit">
							<text class="text">{{$t('recharge.record.center.list.head.type.text')}}</text>
							<text class="text content">{{item.typeName}}</text>
						</view>
						<view class="tit">
							<text class="text">{{$t('user.report.account.change.list.orderno.text')}}</text>
							<text class="text content">{{item.orderNo}}</text>
						</view>
					</view>

				</mescroll-body>

			</view>
		</view>

		<u-modal v-model="showOrderBool" :title="$t('user.report.account.change.list.tip.text')"
			:confirm-text="$t('modal.confirm.text')" :content-style="contentStyleObj" :confirm-style="confirmStyleObj"
			@confirm="confirmHandle">
			<view class="slot-content">
				{{singleOrderStr}}
			</view>
		</u-modal>

		<show-modal ref="testRef"></show-modal>
	</view>
</template>

<script>
	import {
		betsReq,
		betInfoReq,
		unbetReq,
		rechargeLogReq
	} from '../../api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin], // ??????mixin
		components: {
			MescrollBodyDiy
		},
		data() {
			return {
				singleOrderStr: '',
				showOrderBool: false,
				contentStyleObj: {
					'text-align': 'center',
					'padding': '30px 0px',
					'color': '#2db9ff'
				},
				confirmStyleObj: {
					"color": "rgb(255, 255, 255)",
					"margin": "20px 16px",
					"height": "37px",
					"border-radius": "40px",
					"text-align": "center",
					"line-height": "35px",
					"background": "rgb(45, 185, 255)"
				},

				localLoginToken: null,
				dataList: [],
				navTitle: this.$t('recharge.record.center.nav.title.text'),
				inputSearchListItemArray: [],
				inputSearchListItemArray_type: [],
				pageNo: 1,
				pageSize: 10,
				urlFromStr: '',

				mescroll: null, // mescroll???????????? (????????????,mixins?????????)
				// ?????????????????????(??????, ??????????????????????????????)
				downOption: {

				},
				// ?????????????????????(??????, ??????????????????????????????)
				upOption: {
					page: {
						size: 10 // ?????????????????????,??????10
					},
					noMoreSize: 5, // ???????????????????????????????????????5????????????'-- END --'?????????
					empty: {
						icon: "../../static/images/noData.png",
						tip: 'Absolutely Empty'
					},
					textLoading: 'Loading',
					textNoMore: '-- END --'
				}
			}
		},
		// computed:{
		// 	...mapState(['hasLogin'])
		// },
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// ???????????????
			this.initLang()
			this.dataList = []

			// ????????????????????????
			this.getRechargeRecordData(this.pageNo, this.pageSize)

			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('eventOrderClick', (data) => {
				this.urlFromStr = data.from
			})


		},
		methods: {
			initLang() { //???????????????


				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr
				this.navTitle = this.$t('recharge.record.center.nav.title.text')
				this.inputSearchListItemArray = [{
					nameStr: this.$t('recharge.record.center.search.where.status.all.text'),
					valueNum: 0
				}, {
					nameStr: this.$t('recharge.record.center.search.where.status.pendding.text'),
					valueNum: 1
				}, {
					nameStr: this.$t('recharge.record.center.show.detail.status.pay.arrives.text'),
					valueNum: 2
				}, {
					nameStr: this.$t('recharge.record.center.show.detail.status.scored.text'),
					valueNum: 3
				}, {
					nameStr: this.$t('recharge.record.center.show.detail.status.pay.timeout.text'),
					valueNum: 4
				}]

				this.inputSearchListItemArray_type = [{
					nameStr: this.$t('recharge.record.center.search.where.type.all.text'),
					valueNum: 0
				}, {
					nameStr: this.$t('recharge.record.center.search.where.type.online.text'),
					valueNum: 1
				}, {
					nameStr: this.$t('recharge.record.center.search.where.type.offline.text'),
					valueNum: 2
				}]

			},
			/*mescroll????????????????????????,????????????mescroll?????? (????????????,mixins?????????)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},

			/*?????????????????????, ???????????????????????? (????????????,mixins?????????)*/
			downCallback() {
				this.dataList = []
				this.mescroll.resetUpScroll();
			},
			/*?????????????????????*/
			upCallback(page) {
				let pageNum = page.num; // ??????, ?????????1??????
				let pageSize = page.size; // ??????, ????????????10???
				// console.log("pageNum",pageNum);
				// console.log("pageSize",pageSize);
				this.getRechargeRecordData(pageNum, pageSize)
			},
			/*???????????????????????????,???????????????????????????(???????????????page.num=1,???????????????up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getRechargeRecordData(pageNum, pageSize) {
				// ????????????????????????
				uni.$emit("setMescrollGlobalOption", {
					down: {
						textInOffset: this.$t('alert.textInOffset'),
						textOutOffset: this.$t('alert.textOutOffset'),
						textLoading: this.$t('alert.loading'),
						textSuccess: this.$t('alert.textSuccess'),
						textErr: this.$t('alert.textErr'),
					},
					up: {
						empty: {
							tip: this.$t('alert.absolutely.empty')
						},
						textNoMore: this.$t('alert.nomore'),
						textLoading: this.$t('alert.loading')
					},
				})

				let reqParam = {}
				reqParam.pageNo = pageNum
				reqParam.pageSize = pageSize
				let resR = await rechargeLogReq(reqParam, this.localLoginToken)

				// console.log("resR",resR.data.results);
				let resArray
				if (resR.code === 200) {
					resArray = resR.data.results
					let resultsArrNew = []
					let strType
					let strStatus
					resArray.forEach((item, index) => {
						strStatus = this.realTypeName(item.status, 1)
						strType = this.realTypeName(item.type, 2)
						resultsArrNew.push({
							...item,
							statusName: strStatus,
							typeName: strType
						})
					})

					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//??????????????????
					if (pageNum == 1) this.dataList = []; //???????????????????????????????????????
					this.dataList = this.dataList.concat(resultsArrNew); //???????????????
					// console.log("this.dataList",this.dataList);
				} else if (resR.code === 402 || resR.code === 403) {
					resArray = []
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
				} else {
					resArray = []
					//????????????, ????????????
					// this.mescroll.endErr();
				}


			},
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/user/user',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			realTypeName(realTypeName, typeNum) {
				// console.log("realTypeName",realTypeName);
				let tempFindArray = []
				if (typeNum === 1) {
					tempFindArray = this.inputSearchListItemArray
				} else if (typeNum === 2) {
					tempFindArray = this.inputSearchListItemArray_type
				}
				let tempArray = tempFindArray.find(itemT => {
					if (itemT.valueNum === realTypeName) {

						return itemT
					}
				})
				// console.log("tempArray",tempArray);
				// return tempArray.nameStr
				if (tempArray) {
					return tempArray.nameStr
				} else {
					return this.$t('recharge.record.center.show.detail.status.pay.other.text')
				}
			},
			detailListItem(item) {
				this.showOrderBool = true
				this.singleOrderStr = item.orderNo
			},
			confirmHandle() {
				setClipboardData(this.singleOrderStr).then(() => {
					uni.showToast({
						icon: 'none',
						title: this.$t('user.refer.share.copy.success.text')
					});
				})
			}


		}

	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #171E25;
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
		color: #fff;
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

	// ???????????????

	.list-view {
		margin: 10px 16px 0;
		display: flex;
		flex-direction: column;

		.list-item {
			padding: 15px;
			background: #1f252f;
			border-radius: 10px;
			margin-bottom: 15px;
			position: relative;
			color: #4b4e5c;
		}
	}

	.list-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.one-list,
	.order-time,
	.tit {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		width: 100%;

		.source {
			font-size: 14px;
			font-weight: 600;
			padding-bottom: 3px;
			padding-top: 3px;
		}

		.text {
			font-size: 14px;
			padding-bottom: 9px;
			padding-top: 9px;
			color: #7f8aa1;
			font-weight: 400;
		}

		.content {
			color: #f8f8f8;
		}

		.money {
			font-size: 15px;
			font-weight: 600;
			padding-bottom: 3px;
			padding-top: 3px;
		}
	}

	.C_FF0000 {
		color: #ff525d;
	}
</style>
