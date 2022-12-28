<template>
	<view class="">
		<view class="detail-content" v-if="scoreListData.length !== 0">
			<view class="detail-content-list">
				<view class="detail-content-list-body" v-for="(item,index) in scoreListData" :key="index"
					@click="detailContentClick(item,gameType)">
					<view class="detail-body-scope-status">
						<view class="detail-body-scope">
							{{item.scoreHome}}-{{item.scoreAway}}
							<view class="detail-body-scope-right"
								v-if="item.scoreHome === '*' || item.scoreAway === '*' " @click.stop="helpClick(item)">
								<view class="" style="margin-left: 5px;">
									<u-icon name="question-circle" color="#2979ff"></u-icon>
								</view>
							</view>
						</view>
					</view>
					<view class="detail-body-earnings">
						{{item.antiPerCent}}%
						<!-- {{selectBetNul === 2 ? item.antiPerCent:item.lossPerCent}}% -->
					</view>
					<view class="detail-body-order">
						<!-- {{item.status}} -->
						<view class="order-button">
							{{$t('match.content.list.canbescore.text')}}
						</view>
					</view>
				</view>
			</view>



		</view>

		<noDataView v-if="scoreListData.length === 0" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import noDataView from '../noDataView/noDataView.vue'
	export default {
		name: "detailScoreView",
		props: {
			scoreListData: {
				type: Array,
				required: true,
			},
			gameType: {
				type: Number,
				require: true,
			}
		},
		components: {
			noDataView,
		},
		data() {
			return {
				currGameType: 2,
			}
		},
		computed: {
			...mapState(['selectBetNul'])
		},
		mounted() {
			this.currGameType = this.gameType
			// console.log("this.currGameType",this.currGameType);
		},
		methods: {
			helpClick(item) { //帮助弹窗
				// console.log("item",item);
				let scoreString = item.scoreHome
				let leftScoreStr = ""
				// console.log("leftScoreStr",leftScoreStr);
				let tipNum = 0
				let currNumber = 0
				if (scoreString === '*') { //客赢4球
					tipNum = 1
					leftScoreStr = item.scoreAway.split('-')[0]
				} else { //主赢4球
					tipNum = 2
					leftScoreStr = scoreString.split('-')[0]
				}

				currNumber = leftScoreStr * 1
				this.$emit('changeShowHelpTipNum', tipNum, currNumber)
			},
			detailContentClick(item, gameType) { //

				uni.setStorageSync('detailContentItemAndType', {
					item,
					gameType
				})
				// console.log("gameType",gameType);
				// this.scoreStr = item.score
				// console.log("score",item);
				// let dataObjList = {}
				// dataObjList = {...this.pageItemData}
				// dataObjList['score']=this.scoreStr,
				// console.log("dataObjList",dataObjList);
				// console.log("dataObjList1",this.pageItemData);
				uni.navigateTo({
					url: '/pages/match/match_order',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						// res.eventChannel.emit('match_content_Click', { content: {'scoreStr':this.scoreStr,...this.pageItemData}})
						// console.log("item",item);
						res.eventChannel.emit('match_content_Click', {
							content: item,
							gameType
						})
					},
					animationType: 'slide-in-top',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style>
	.detail-content {
		font-size: 14px;
		text-align: center;
	}

	.detail-content-list {
		background: #fff;
	}

	.detail-content-list-body {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		color: #fff;
		/* margin: 10px; */
		line-height: 38px;
		/* border-radius: 4px; */
		border-bottom: 0.5px solid #597ef8;
	}

	/* 
	.detail-content-list-body:nth-child(even) {

		background: #171e25;
	} */

	.detail-body-scope-status {
		display: flex;
		align-items: center;
		width: 30%;
		color: #597ef8;
	}

	.detail-body-scope {
		font-size: 14px;
		font-weight: 700;
		margin: auto;
	}

	.detail-body-scope-right {
		display: inline-block;
		width: auto;
	}

	.detail-body-earnings {
		width: 35%;
		color: #1a1;
		font-weight: bold;
		border-right: 0.5px solid #597ef8;
		border-left: 0.5px solid #597ef8;
	}

	.detail-body-order {
		width: 35%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.order-button {
		min-width: 65px;
		height: 25px;
		line-height: 25px;
		background: #597ef8;
		color: #fff;
		border-radius: 3px;
		font-size: 13px;
		margin: 0 5px;
	}
</style>
