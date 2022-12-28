<!-- 自定义赛事组件 -->
<template>
	<view class="hot-event">
		<view class="new_match-item" :style="styleData">
			<view class="items" v-for="(item,index) in listData" :key="keyNameStr+item.id+'-'+index"
				@click.native="homeCardClick(item)">
				<view class="">
					<view class="match-timer-name">
						<view class="timer">
							<view class="open-time">
								{{$t('order.center.show.detail.start.time.text')}} {{item.startTime | timestampStr}}
							</view>
							<view class="dymain-time">
								<image src="../../static/images/time.svg" mode="" class="timeIcon"></image>
								<counter :endtime='item.remainingTime' v-if="item.remainingTime">
								</counter>
							</view>
						</view>
						<view class="nickName">
							{{item.allianceName}}
						</view>
					</view>
					<view class="match-team-item">
						<view class="t team-left">
							<view class="team">
								<image :src="item.mainLogo ? item.mainLogo:'../../static/images/default.png'" mode=""
									class="team-icon"></image>
							</view>
							<text class="name">{{item.mainName}}</text>
						</view>
						<view class="team-center">
							<image src="../../static/images/vs.png" mode="" style="height: 34px;" class="vs"></image>
						</view>
						<view class="t team-right">
							<view class="team">
								<image :src="item.guestLogo ? item.guestLogo:'../../static/images/default.png'" mode=""
									class="team-icon">
								</image>
							</view>
							<text class="name">{{item.guestName}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getTimeState,
		formatDateToStr,
		formatDateTimeSolt
	} from '../../common/publicTool.js'
	import counter from '@/components/counterView/counter.vue';
	export default {
		name: "matchListView",
		props: {
			listData: {
				type: Array,
				required: true,
			},
			fromUrlNum: {
				type: Number,
				required: true,
			},
			styleData: {
				type: String
			},
			keyNameStr: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				fromNum: this.fromUrlNum
			}
		},
		components: {
			counter
		},
		filters: {
			timestampStr(value) {
				// console.log("val",formatDateToStr(value));
				return formatDateTimeSolt(value, 1)
			}
		},
		mounted() {
			// console.log("listData",this.listData);
		},
		onLoad() {

		},
		onShow() {
			// console.log("fromNum",this.fromNum);
		},

		methods: {
			// fromNum(){
			// 	console.log("fromUrlNum",this.fromUrlNum);
			// 	return this.fromUrlNum
			// },
			homeCardClick(item) { //赛事点击获取详情
				// console.log("111");

				if (this.fromNum === 1) {
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
						animationType: 'slide-in-top',
						animationDuration: 200
					});
				} else if (this.fromNum === 2) {
					uni.navigateTo({
						url: '/pages/match/match_content',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据
							uni.setStorageSync('queryMatchContentItemUrlFrom', 'match');
							res.eventChannel.emit('matchDeClick', {
								content: item,
								from: 'match'
							})
						},
						animationType: 'slide-in-top',
						animationDuration: 200
					});
				}



			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-event {
		padding: 10px 15px 0;

		.new_match-item {
			display: flex;
			flex-direction: column;

			.items {
				width: 100%;
				border-radius: 8px;
				overflow: hidden;
				margin-bottom: 20px;

				.match-timer-name {
					height: 70px;
					width: 100%;
					background-color: #202323;
					background-image: url(@/static/images/bg_common.png);
					background-size: cover;

					.timer {
						height: 28px;
						font-size: 12px;
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.open-time {
							background: linear-gradient(270deg, hsla(0, 0%, 100%, 0), #d4a13d);
							padding: 0 15px;
							color: #fff;
							display: flex;
							align-items: center;
							flex: 0 0 70%;
						}

						.dymain-time {
							color: #ffbf45;
							line-height: 28px;
							padding-right: 10px;
							display: flex;
							align-items: center;

							.timeIcon {
								width: 21px;
								height: 21px;
								padding-right: 4px;
							}
						}


					}

					.nickName {
						color: #fff;
						text-align: center;
						padding-top: 12px;
					}
				}

				.match-team-item {
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					align-items: center;
					padding-top: 14px;
					background-color: #1d2730;
					padding-bottom: 15px;

					.t {
						display: flex;
						justify-content: center;
						flex-direction: column;
						align-items: center;
						width: 40%;

						.team {
							width: 36px;
							height: 36px;
							border-radius: 50%;
							overflow: hidden;

							.team-icon {
								width: 36px;
								height: 36px;
								border-radius: 50%;
							}
						}

						.name {
							font-size: 12px;
							padding-top: 5px;
							color: #fff;
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							// white-space: nowrap;
							text-align: center;
						}
					}

					.vs {
						width: 30px;
						height: 30px;
					}
				}
			}
		}

	}
</style>
