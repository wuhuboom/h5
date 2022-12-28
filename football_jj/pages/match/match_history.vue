<template>
	<view class="mainView">

		<view class="u-tabs-box">
			<view class="backTitleBar-wrapper colCent borderBox">
				<view class="fixedBox">
					<view class="common_header" style="height: 44px;">
						<view class="define">
							<view class="define_left_slot" @click="goBackBtnClick">
								<view class="">
									<u-icon name="arrow-left" size="32"></u-icon>
								</view>
							</view>
							<view class="define_center_slot">
								<view class="">
									<text class="title">{{navTitle}}</text>
								</view>
							</view>
							<view class="define_right_slot">
								<view class="">
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
			<view class="">
				<view class="example-body">
					<view class="select-group">
						<button :class="swiperCurrent === index ? 'tody-btn active-btn':'tody-btn unactive-btn'"
							v-for="(item,index) in list" :key="index"
							@click="selectUniButton(item,index)">{{item.name}}</button>
						<!-- 	<button class="tody-btn unactive-btn">{{$t('matchHis.yesterday.text')}}</button>
						<button class="tody-btn unactive-btn">{{$t('matchHis.nearly.text')}}</button> -->
					</view>
				</view>
			</view>
		</view>
		<swiper class="swiperTab" :current="swiperCurrent" @animationfinish.stop="animationfinish"
			@change="swiperChange">
			<swiper-item class="swiper-item">
				<mescroll-his-item ref="mescrollItem0" :i="0" :index="0" :token_Str="localLoginToken">
				</mescroll-his-item>
			</swiper-item>
			<swiper-item class="swiper-item">
				<mescroll-his-item ref="mescrollItem1" :i="1" :index="1" :token_Str="localLoginToken">
				</mescroll-his-item>
			</swiper-item>
			<swiper-item class="swiper-item">
				<mescroll-his-item ref="mescrollItem2" :i="2" :index="2" :token_Str="localLoginToken">
				</mescroll-his-item>
			</swiper-item>
		</swiper>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		gameFinishReq,
	} from '../../api/index.js'
	import {
		myMixin,
		setSearchHisTeamNameMixin
	} from '@/util/mixins.js'
	import MescrollHisItem from "../../components/mescroll-swiper-his-item.vue";

	export default {
		mixins: [myMixin, setSearchHisTeamNameMixin],
		components: {
			MescrollHisItem
		},
		data() {
			return {
				navTitle: this.$t('tabar.sportsresults'),
				keywordSearch: "",
				list: [{
					name: this.$t('matchHis.today.text')
				}, {
					name: this.$t('matchHis.yesterday.text')
				}, {
					name: this.$t('matchHis.nearly.text')
				}],
				tabs: [{

				}],
				current: 0,
				swiperCurrent: 0,
			}
		},

		onShow() {

			this.change_his_finish_bool(false)
			this.swiperCurrent = 0

			// 初始化语言
			this.initLang()

			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();

			this.scrollSelfStyle = "height: " + (windowHeight - 130) + 'px' + ";width: 100%;"

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// this.$nextTick(() => {
			// 	this.$refs["mescrollItem0"].reloadList()
			// 	this.$refs["mescrollItem1"].reloadList()
			// 	this.$refs["mescrollItem2"].reloadList()
			// })

			this.$nextTick(() => {
				this.change_his_finish_bool(true)
			})
		},
		methods: {
			// ...mapMutations(['logout']),
			initLang() { //初始化语言

				let langStr = uni.getStorageSync('ft_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				uni.setTabBarItem({
					index: 0,
					text: this.$t('tabar.home')
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('tabar.competition')
				})
				uni.setTabBarItem({
					index: 2,
					text: this.$t('tabar.sportsresults')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabar.mine')
				})



				this.list = [{
					name: this.$t('matchHis.today.text')
				}, {
					name: this.$t('matchHis.yesterday.text')
				}, {
					name: this.$t('matchHis.nearly.text')
				}]

			},
			goBackBtnClick() {
				uni.switchTab({
					url: '/pages/funList/index',
					animationType: 'slide-in-top',
					animationDuration: 200
				})
			},
			selectUniButton(item, index) {
				// console.log("index",index);
				this.swiperCurrent = index;
				let refStr = `mescrollItem${index}`
				this.$refs[refStr].reloadList(index)
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				this.current = current;
				this.change_his_finish_bool(true)
			},
			swiperChange(e) { //先暂时屏蔽这个
				this.change_his_finish_bool(false)
				let current = e.detail.current;
			},
			searchChange() {
				this.set_his_search_team_name(this.keywordSearch)
				// this.getThreeData()
				if (this.swiperCurrent === 0) {
					this.$refs["mescrollItem0"].reloadList()
				} else if (this.swiperCurrent === 1) {
					this.$refs["mescrollItem1"].reloadList()
				} else if (this.swiperCurrent === 2) {
					this.$refs["mescrollItem2"].reloadList()
				}
			},
			clearClick() {
				this.keywordSearch = ""
				this.set_his_search_team_name("")
				if (this.swiperCurrent === 0) {
					this.$refs["mescrollItem0"].reloadList()
				} else if (this.swiperCurrent === 1) {
					this.$refs["mescrollItem1"].reloadList()
				} else if (this.swiperCurrent === 2) {
					this.$refs["mescrollItem2"].reloadList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
	}

	.mainView {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 0px);
		// height: 100vh;
		width: 100%;
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
		// color: #fff;
		font-weight: 700;
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

	// 导航栏结束

	.select-group {
		display: flex;
		width: 100%;
		height: 45px;
		text-align: center;
		background: #fff;
		// margin-top: 1px;

		button {
			flex: 1;
			font-size: 16px;
			font-weight: 700;
			color: #7f8aa1;
			background: none;

			&::after {
				border: 0;
			}
		}

		.active-btn {
			color: #507ef6;
			position: relative;
			font-size: 18px;

			&::after {
				position: absolute;
				top: unset;
				bottom: 0px;
				left: 50%;
				margin-left: -10px;
				width: 35%;
				height: 4px;
				background: #507ef6;
			}
		}
	}

	.swiperTab {
		flex: 1;
	}
</style>
