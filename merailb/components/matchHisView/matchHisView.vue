<template>
	<view class="">
		<view class="hot-event">
			<view class="new_match-item" v-for="(item,index) in hisListData" :key="item.id">
				<view class="items">
					<view class="listitem">
						<view class="toplines">
							<view class="lefts darkfontscolor">
								{{item.startTime | timestampStr | splitDate}}
							</view>
							<view class="imgs">
								<image src="../../static/images/toptixing.png" mode="" class="imgfilterdark">
								</image>
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
								<image :src="item.mainLogo ? item.mainLogo:'../../static/images/default.png'" mode="">
								</image>
								<view class="fonts darkfontscolor">
									{{item.mainName}}
								</view>
							</view>
							<view class="vs darkfontscolor">
								{{item.score | fullScoreFormat}}
							</view>
							<view class="cc">
								<view class="fonts darkfontscolor">
									{{item.guestName}}
								</view>
								<image :src="item.guestLogo ? item.guestLogo:'../../static/images/default.png'" mode="">
							</view>
						</view>

					</view>
					<view class="blokcs">
						<view class="trs">
							<view class="lines">
								<view class="acfonts">
									{{$t('matchHis.halftime.text')}}
								</view>
								<view class="bcfonts">
									{{item.score | halfScoreFormat}}
								</view>
							</view>
							<view class="lines">
								<view class="acfonts">
									{{$t('matchHis.fulltime.text')}}
								</view>
								<view class="bcfonts">
									{{item.score | fullScoreFormat}}
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
					leftStr = leftStr.replace(':', "-")
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
					rightStr = rightStr.replace(':', "-")
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
		padding: 10px 15px 0;
	}

	.new_match-item {
		min-height: 90px;
		margin-bottom: 10px;
		background: url(../../static/images/listbg.png);
		background-position: 50%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		// margin-top: 4px;
		box-sizing: border-box;
		box-shadow: 0 2px 4px 0 #0000000f;
		border-radius: 6px;
		display: flex;
		flex-direction: column;

		.items {
			width: 100%;
			border-radius: 8px;
			overflow: hidden;
			// margin-bottom: 20px;

			.listitem {

				margin-bottom: 10px;

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
						// width: 10px;
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


					.darkfontscolor {
						color: #597ef7;

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


			.blokcs {
				background: #fff;
				padding: 0 11px;

				.trs {
					.lines {
						position: relative;
						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-webkit-align-items: center;
						-ms-flex-align: center;
						align-items: center;
						-webkit-box-pack: justify;
						-webkit-justify-content: space-between;
						-ms-flex-pack: justify;
						justify-content: space-between;
						height: 38px;
						border-bottom: 0.5px solid #e5e5e5;

						&:last-child {
							border: none;
						}

						.acfonts {
							font-size: 13px;
							color: #333;
							text-align: left;
							font-weight: 700;
							white-space: nowrap;
						}

						.bcfonts {
							font-size: 13px;
							color: #333;
							text-align: left;
							font-weight: 700;
							letter-spacing: 2px;
						}
					}


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
