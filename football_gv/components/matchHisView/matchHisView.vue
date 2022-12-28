<template>
	<view class="">
		<view class="hotMatchList">
			<view class="homeCard" v-for="(item,index) in hisListData" :key="item.id">
				<view class="homeCardContent">
					<view class="cardContentDate">
						<view class="cardContentDate_close">
							{{$t('matchHis.fulltime.text')}}: {{item.score | fullScoreFormat}}
						</view>
						<view class="cardContentDate_time">
							{{$t('matchHis.halftime.text')}}:{{item.score | halfScoreFormat}}
						</view>
					</view>
					<view class="cardContentDesc">
						<!-- {{item.allianceName}} 【{{index}}】 -->
						{{item.allianceName}}
					</view>
					<view class="cardContentTime">
						{{item.gameTime}}
					</view>
					<view class="cardContentTeam">
						<view class="cardContentTeamLeft">
							<!-- <image src="../../static/images/default.png" mode="" class="logoImg"></image> -->
							<image :src="item.mainLogo ? item.mainLogo:'../../static/images/default.png'" mode=""
								class="logoImg"></image>
							{{item.mainName}}
						</view>
						<view class="cardContentTeamMid">
							<view class="cardContentTeamMidScore">
								<view class="cardContentTeamMidScoreLeft">
									{{item.score | leftSignleScoreFormat}}
								</view>
								<view class="cardContentTeamMidScoreMid">
									:
								</view>
								<view class="cardContentTeamMidScoreRight">
									{{item.score | rightSignleScoreFormat}}
								</view>
							</view>
						</view>
						<view class="cardContentTeamRight">
							<!-- <image src="../../static/images/default.png" mode=""></image> -->
							<image :src="item.guestLogo ? item.guestLogo:'../../static/images/default.png'" mode="">
							</image>
							{{item.guestName}}
						</view>
					</view>
					<!-- 	<view class="timeBg">
						
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getTimeState,
		formatDateToStr,
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
				return formatDateToStr(value)
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

<style>
	.hotMatchList {
		/* margin-top: 9px; */
		padding-bottom: 20px;
		padding: 8px 15px 0px;
		background-color: #071a28;
	}

	.homeCard {
		position: relative;
		display: flex;
		margin: 3px 0 15px 0;
		padding: 6px 12px;
		background: #132736 url(../../static/images/list_bg.png) no-repeat top;
		box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
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
		/* padding-top: 10px; */
		padding-top: 70px;
		/* padding-bottom: 12px; */
		font-size: 14px;
		text-align: center;
		max-height: 47px;
	}


	.cardContentTime {
		font-family: Hiragino Sans GB;
		font-weight: 600;
		color: #fff;
		padding-top: 5px;
		padding-bottom: 6px;
		font-size: 12px;
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
		position: relative;
		top: -10px;
	}

	.cardContentTeamMidScore {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		font-weight: 500;
		font-size: 12px;
		color: #3d8dfe;
		position: absolute;
		bottom: -25px;
		width: 60px;
		left: -10px;
	}

	.cardContentTeamMidScoreLeft {
		font-size: 16px;
		width: 43%;
		text-align: right;
	}

	.cardContentTeamMidScoreMid {
		font-size: 16px;
		width: 14%;
		text-align: center;
		color: #3d8dfe;
	}

	.cardContentTeamMidScoreRight {
		font-size: 16px;
		width: 43%;
		text-align: left;
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
