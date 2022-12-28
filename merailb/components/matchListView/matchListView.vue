<!-- 自定义赛事组件 -->
<template>
	<view class="hot-event">
		<view class="new_match-item" :style="styleData" v-for="(item,index) in listData"
			:key="keyNameStr+item.id+'-'+index" @click.native="homeCardClick(item)">

			<view class="toplines">
				<view class="lefts darkfontscolor">
					{{item.startTime | timestampStr | splitDate}}
				</view>
				<view class="imgs">
					<image src="../../static/images/toptixing.png" mode="" class="imgfilterdark"></image>
					<view class="matchname">
						{{item.allianceName}}
					</view>
				</view>
				<view class="lefts rights darkfontscolor">
					{{item.startTime | timestampStr | splittTime}}
				</view>
			</view>

			<view class="constnts">
				<view class="hh">
					<image :src="item.mainLogo ? item.mainLogo:'../../static/images/default.png'" mode=""></image>
					<view class="fonts darkfontscolor">
						{{item.mainName}}
					</view>
				</view>
				<view class="vs">
					<view class="vsfontsstyle fontColor">
						VS
					</view>
				</view>
				<view class="cc">
					<view class="fonts darkfontscolor">
						{{item.guestName}}
					</view>
					<image :src="item.guestLogo ? item.guestLogo:'../../static/images/default.png'" mode="">
				</view>
			</view>

			<!-- 	
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
		 -->
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
			height: 90px;
			margin-bottom: 5px;
			background: url(../../static/images/listbg.png);
			background-position: 50%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin-top: 4px;
			box-sizing: border-box;
			box-shadow: 0 2px 4px 0 #0000000f;
			border-radius: 6px;
			display: flex;
			flex-direction: column;

			.toplines {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.lefts {
					color: #929ec1;
					font-size: 12px;
					padding-top: 10px;
					padding-left: 10px;
					width: 90px;
					// box-sizing: border-box;
				}

				.imgs {
					width: 161.5px;
					height: 25.6px;
					position: relative;

					image {
						width: 161.5px;
						height: 25.6px;

					}

					.matchname {
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						color: #fff;
						font-weight: 700;
						font-size: 13px;
						text-align: center;
						height: 25.6px;
						line-height: 25.6px;
					}
				}



				.rights {
					text-align: right;
					padding-right: 10px;
				}

			}

			.constnts {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 10px;

				.hh {
					display: flex;
					align-items: center;

					image {
						width: 34.5px;
						height: 34.5px;
					}

					.fonts {
						font-size: 12px;
						color: #929ec1;
						font-weight: 700;
						width: 70px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-left: 5px;
						text-align: right;
					}
				}

				.vs {
					width: 10px;
					height: 20px;
					margin: 0 27.5px;

					.vsfontsstyle {
						font-size: 13px;
						font-weight: 700;
						font-family: DINProMedium;
						margin: 0 0.08rem;
						color: #4176f7;
					}
				}


				.cc {
					display: flex;
					align-items: center;

					image {
						width: 34.5px;
						height: 34.5px;
					}

					.fonts {
						font-size: 12px;
						color: #929ec1;
						font-weight: 700;
						width: 70px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-right: 5px;
						text-align: left;
					}
				}

			}

		}

	}
</style>
