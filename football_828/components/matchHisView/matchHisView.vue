<template>
	<view class="">
		<view class="hot-event">
			<view class="new_match-item">
				<view class="items" v-for="(item,index) in hisListData" :key="item.id">
					<view class="">
						<view class="match-timer-name">
							<view class="timer">
								<view class="open-time">
									{{item.allianceName}}
								</view>
								<view class="dymain-time detail-timer">
									{{item.startTime | timestampStr}}
								</view>
							</view>
							<view class="nickName score">
								<view class="left">
									{{$t('matchHis.halftime.text')}}:
									<text
										style="color: rgb(255, 185, 0);padding-left: 5px;">{{item.score | halfScoreFormat}}</text>
								</view>
								<view class="right">
									{{$t('matchHis.fulltime.text')}} :
									<text
										style="color: rgb(255, 185, 0);padding-left: 5px;">{{item.score | fullScoreFormat}}</text>
								</view>
							</view>
						</view>
						<view class="match-team-item">
							<view class="t team-left">
								<view class="team">
									<image :src="item.mainLogo ? item.mainLogo:'../../static/images/default.png'"
										mode="" class="team-icon"></image>
								</view>
								<text class="name">{{item.mainName}}</text>
							</view>
							<view class="team-center center-score">
								<text style="color: rgb(248, 248, 248);">{{item.homeFull}}</text>
								-
								<text style="color: rgb(248, 248, 248);">{{item.guestFull}}</text>
							</view>
							<view class="t team-right">
								<view class="team">
									<image :src="item.guestLogo ? item.guestLogo:'../../static/images/default.png'"
										mode="" class="team-icon">
									</image>
								</view>
								<text class="name">{{item.guestName}}</text>
							</view>
						</view>
					</view>

				</view>
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
	export default {
		name: 'matchHisView',
		props: {
			hisListData: {
				type: Array,
				require: true
			}

		},
		filters: {
			timestampStr(value) {
				// console.log("val",formatDateToStr(value));
				return formatDateTimeSolt(value, 1)
			},
			fullScoreFormat(value) {
				// console.log("value",value);
				if (value) {
					let leftStr = value.split('/')[0]
					leftStr = leftStr.replace('-', ":")
					return leftStr;
				} else {
					return ''
				}

			},
			halfScoreFormat(value) {
				if (value) {
					let rightStr = value.split('/')[1]
					rightStr = rightStr.replace('(', "")
					rightStr = rightStr.replace(')', "")
					rightStr = rightStr.replace('-', ":")
					// console.log("rightStr",rightStr);
					return rightStr;
				} else {
					return ''
				}

			},
			leftSignleScoreFormat(value) {
				if (value) {
					let leftStr = value.split('/')[0]
					leftStr = leftStr.split('-')[0]
					leftStr = leftStr.split(':')[0]
					// console.log("leftStr",leftStr);
					return leftStr;
				} else {
					return ''
				}

			},
			rightSignleScoreFormat(value) {
				if (value) {
					let rightStr = value.split('/')[0]
					rightStr = rightStr.split('-')[0]
					rightStr = rightStr.split(':')[1]
					return rightStr;
				} else {
					return ''
				}

			},

		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-event {
		padding: 10px 21px;
	}

	.new_match-item {
		display: flex;
		flex-direction: column;

		.items {
			width: 100%;
			border-radius: 8px;
			overflow: hidden;
			margin-bottom: 20px;

			.match-timer-name {
				// height: 70px;
				min-height: 70px;
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
						flex: 0 0 60%;
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

					.detail-timer {
						color: #eee;
					}


				}

				.nickName {
					color: #fff;
					text-align: center;
					padding-top: 12px;
				}

				.score {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding: 15px;
					font-size: 14px;
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

	.center-score {
		font-size: 18px;
		color: #f8f8f8;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
