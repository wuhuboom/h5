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

		<view class="bankCardListView">
			<view class="bankCardCellView">
				<view class="bankCardCellTitle">
					<text>{{$t('backapi.self.withdraw.add.sim.text')}}</text>
				</view>
				<view class="bankCardCellImageAndAdd bank_card" :style="bankCardStyle">
					<view class="">

					</view>
					<view class="addBtn" @click="addBtnClick(1)">
						+{{$t('user.security.center.bankcard.Add.title.text')}}
					</view>
				</view>
			</view>
		</view>

		<view class="" style="padding-bottom: 30px;">

			<view class="bankCardListContaines" v-if="usdt_list.length !== 0">
				<!-- <view class="bankCardListContainesTitle">
					{{$t('user.security.center.bankcard.virtual.title.text')}}
				</view> -->
				<view class="bankCardListContainesCell" v-for="(item,index) in usdt_list" :key="index">
					<view class="bankCardListContainesLeft">
						<view class="bankCardListContainesImage">
							<image :src="card_image" mode="" class="bankImage"></image>
						</view>
						<view class="bankCardListContainesCellCenter">
							<view class="bankCardListContainesCellItem">
								{{item.simName}}
							</view>
							<view class="bankCardListContainesCellContent">
								{{item.username}}
							</view>
						</view>
					</view>
					<view class="cardNumContent" style="font-size: 20px;">
						<view>
							{{item.sim}}
						</view>
						<!-- 		<view>
							....
						</view>
						<view>
							{{item.sim}}
						</view> -->
					</view>
					<view class="cardNumTimer">
						{{$t('backapi.self.creatimer')}} {{item.createdAt | timerFormat}}
					</view>
					<view class="editBankBtn" @click="sim_edit_click(item)">
						{{$t('backapi.self.editStr')}}
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		bankCardInfo,
		usdtListReq,
		simCardInfoInfo
	} from '@/api/index.js'
	import {
		addBankMinxi,
		addUsdtMinxi,
		addSimMinxi,
		myMixin
	} from '@/util/mixins.js'
	import {
		formatDateTimeSolt
	} from '@/common/publicTool.js'
	export default {
		mixins: [myMixin, addSimMinxi, addBankMinxi, addUsdtMinxi],
		data() {
			return {
				navTitle: this.$t('backapi.self.sim.list.title.text'),
				bankCardStyle: '',
				usdtStyle: '',
				card_list: [],
				usdt_list: [],
				usdt_image: '',
				card_image: ''
			}
		},
		filters: {
			timerFormat(value) {
				if (value) {
					let tempStr = formatDateTimeSolt(value, 1)
					return tempStr.substr(0, 10)
				} else {
					return ''
				}

			},
			leftAddr(value) {
				return value.substr(0, 4)
			},
			rightAddr(value) {
				return value.substr(-3)
			},
			usdt_left_addr(value) {
				return value.substr(0, 5)
			},
			usdt_right_addr(value) {
				return value.substr(-4)
			}
		},
		onShow() {

			// 动态设置图片
			let date = "?t=" + new Date().getTime();
			let bankImgStr = '../../static/images/sim.png' + date
			let usdtImgStr = '../../static/images/virtual.png' + date
			this.card_image = bankImgStr
			this.usdt_image = usdtImgStr
			this.bankCardStyle = 'background: url(' + bankImgStr + ') no-repeat;background-size: 100% 100%;'
			this.usdtStyle = 'background: url(' + usdtImgStr + ') no-repeat;background-size: 100% 100%;'


			// this.getCardListData()

			// this.getUsdtListData()

			this.getSimListData()

		},
		methods: {
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/securityCenter',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			addBtnClick(num) {
				if (num === 1) {
					uni.navigateTo({
						url: '/pages/user/sim_add',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据	
							this.save_addsim_from('simlist')
							res.eventChannel.emit('eventAddSimPageClick', {
								from: 'simlist'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					})
				}
			},
			async getSimListData() {
				let resR = await simCardInfoInfo(this.localLoginToken)
				if (resR.code === 200) {
					let resultData = resR.data
					if (resultData) {

						let resArr = []
						resArr.push({
							...resultData
						})
						this.usdt_list = resArr
					}
				}
			},
			sim_edit_click(item) {
				uni.navigateTo({
					url: '/pages/user/sim_edit',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('editSimObjs', item)
					},
					animationType: 'pop-in',
					animationDuration: 200
				});
			}

		}
	}
</script>

<style>
	page {
		background-color: #071a28;
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

	.bankCardListView {
		/* width: 100%; */
		display: flex;
		flex-wrap: wrap;
		padding: 0 16px;
		justify-content: space-between;
	}

	.bankCardCellView {
		width: calc(50% - 7px);
		display: flex;
		/* align-items: center;- */
		flex-direction: column;
	}

	.bankCardCellTitle {
		line-height: 39px;
		color: #fff;
		font-size: 14px;
	}

	.bankCardCellImageAndAdd {
		width: 100%;
		position: relative;
		height: 78px;
		display: flex;
		justify-content: center;
		border-radius: 5px;
		overflow: hidden;
	}

	.bank_card {
		/* background: url(@/static/images/bankCharge.png) no-repeat; */
		background-size: 100% 100%;
	}

	.usdt {
		background: url(@/static/images/virtual.png) no-repeat;
		background-size: 100% 100%;
	}

	.addBtn {
		width: 100%;
		position: absolute;
		height: 24px;
		line-height: 24px;
		background: #334756f2;
		text-align: center;
		font-weight: 400;
		color: #fff;
		font-size: 12px;
		bottom: 0;
	}

	.bankCardListContaines {
		/* height: 300px; */
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		/* justify-content: space-between; */
		/* align-items: center; */
		/* width: 90%; */
		padding: 0 20px;
		margin-top: 20px;
		color: #fff;
	}

	.bankCardListContainesTitle {
		margin-top: 10px;
		/* margin-left: 10px; */
	}

	.bankCardListContainesCell {
		padding: 10px;
		background: #132736;
		margin-top: 10px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
	}

	.bankCardListContainesLeft {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.cardNumContent {
		margin-left: 10px;
		margin-top: 10px;
		margin-right: 10px;
		display: flex;
		justify-content: space-between;
	}

	.cardNumTimer {
		margin-left: 10px;
		margin-top: 10px;
	}

	.bankCardListContainesCellCenter {
		margin-left: 10px;
		flex: 1;
	}

	.bankCardListContainesCellContent {
		word-break: break-all;
		font-size: 13px;
	}

	.bankCardListContainesImage {
		margin-left: 10px;
	}

	.editBankBtn {
		align-self: flex-end;
		min-width: 80px;
		margin-top: 10px;
		font-weight: 400;
		font-size: 16px;
		color: #FFF;
		text-align: center;
		box-shadow: 0 2px 4px 0 rgb(0 0 0);
		background: #3d8dfe;
		border-radius: 5px;
		padding: 3px 0;
		/* padding: 0 15px;*/

	}

	.bankImage {
		width: 30px;
		height: 16px;
		/* height: 40px; */
		/* border-radius: 50%; */
		vertical-align: middle
	}
</style>
