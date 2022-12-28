<!-- 自定义赛事组件 -->
<template>
	<view class="">
		<view class="hotMatchList" :style="styleData">
			<view class="homeCard" v-for="(item,index) in listData" :key="keyNameStr+item.id+'-'+index"
				@click.tap="homeCardClick(item)">
				<view class="homeCardContent">
					<view class="cardContentDate">
						<view class="cardContentDate_close">
							<!-- :test="`2222 ${item.id}`" -->
							{{$t('home.close')}}: <counter :endtime='item.remainingTime' v-if="item.remainingTime">
							</counter>
						</view>
						<view class="cardContentDate_time">
							{{item.startTime | timestampStr}}
						</view>
					</view>
					<view class="cardContentDesc">
						<!-- {{item.allianceName}} -- {{keyNameStr + item.id}} -->
						<!-- {{item.allianceName}} -- {{item.id}} 【{{index}}】 -->
						{{item.allianceName}}
					</view>
					<view class="cardContentTeam">
						<view class="cardContentTeamLeft">
							<image :src="item.mainLogo ? item.mainLogo:'../../static/images/default.png'" mode=""
								class="logoImg"></image>
							{{item.mainName}}
						</view>
						<view class="cardContentTeamMid">

						</view>
						<view class="cardContentTeamRight">
							<image :src="item.guestLogo ? item.guestLogo:'../../static/images/default.png'" mode="">
							</image>
							{{item.guestName}}
						</view>
					</view>
					<view class="timeBg">

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
						animationType: 'pop-in',
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
						animationType: 'pop-in',
						animationDuration: 200
					});
				}



			}
		}
	}
</script>

<style>
	.hotMatchList {
		/* margin-top: 9px; */
		padding-bottom: 20px;
		padding: 8px 15px 0px;
		background: #071a28;
	}

	.homeCard {
		position: relative;
		display: flex;
		margin: 3px 0 15px 0;
		padding: 6px 12px;
		background: #132736 url(../../static/images/list_bg.png) no-repeat top;
		background-size: 100%;
		border-radius: 10px;
		overflow: hidden;
	}


	.homeCardContent {
		color: #333;
		font-size: 15px;
		flex: 1;
	}

	.cardContentDate {
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.cardContentDate_close {
		font-size: 12px;
		color: #fff;
		position: inherit;
		z-index: 10;
	}

	.cardContentDate_time {
		display: flex;
		align-items: center;
		font-size: 12px;
		line-height: 12px;
		color: #fff;
	}

	.cardContentDesc {
		font-family: Hiragino Sans GB;
		font-weight: 600;
		color: #fff;
		/* padding-top: 20px; */
		padding-top: 70px;
		padding-bottom: 12px;
		font-size: 14px;
		text-align: center;
		max-height: 47px;
	}

	.cardContentTeam {
		display: flex;
		/* padding-top: 25px; */
		/* padding-top: 5px; */
		padding-bottom: 10px;
		align-items: center;
		font-weight: 500;
		font-size: 12px;
		color: #fff;
	}

	.cardContentTeamLeft {
		font-size: 12px;
		width: 43%;
		text-align: center;
	}

	.cardContentTeamLeft image {
		display: block;
		margin: 0 auto 10px;
		width: 36px;
		height: 36px;
		border-radius: 50px;
	}

	.cardContentTeamRight {
		font-size: 12px;
		width: 43%;
		text-align: center;
	}

	.cardContentTeamRight image {
		display: block;
		margin: 0 auto 10px;
		width: 36px;
		height: 36px;
		border-radius: 50px;
	}

	.cardContentTeamMid {
		width: 40px;
		height: 40px;
		text-align: center;
		font-size: 14px;
		background: url(../../static/images/vs.png);
		background-size: 100%;
	}


	.timeBg {
		position: absolute;
		left: 0;
		top: 0;
		background: linear-gradient(-90deg, rgba(128, 90, 0, 0), #3d8dfe);
		height: 26px;
		width: 40%;
	}
</style>
