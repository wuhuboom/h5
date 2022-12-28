<template>
	<view class="mainView">
		<view class="macthPage">
			<view class="search">
				<!-- @search="searchChange" @blur="searchChange" -->
				<u-search color="#FFFFFF" search-icon-color="#606266" :placeholder="$t('match.search.text')"
					bg-color="#132736" :show-action="false" input-align="center" height="60" v-model="keywordSearch"
					margin="10px" @change="searchChange" @clear="clearClick">
				</u-search>
			</view>
			<view class="contentWrap">
				<view>
					<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
						:bold="false" swiperWidth="750" bg-color="#00111c" font-size="20" bar-width="60"
						inactive-color="#FFFFFF" active-color="#3d8dfe"></u-tabs-swiper>
				</view>
				<!-- @change="swiperChange" -->
				<swiper class="swiperTab" :current="swiperCurrent" @transition="transition"
					@animationfinish.stop="animationfinish" @change="swiperChange">
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
			</view>
		</view>

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

				let langStr = uni.getStorageSync('lang')
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

			// tabs通知swiper切换
			tabsChange(index) {
				// console.log("index",index);
				this.swiperCurrent = index;
				let refStr = `mescrollItem${index}`
				this.$refs[refStr].reloadList(index)
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.change_his_finish_bool(true)
			},
			scroll(e) {
				//记录scroll位置
				this.scrollTop = e.detail.scrollTop
			},
			scrollToday(e) {
				//记录scroll位置
				this.scrollTopToday = e.detail.scrollTop
			},
			scrollTom(e) {
				//记录scroll位置
				this.scrollTopTom = e.detail.scrollTop
			},

			swiperChange(e) {
				this.change_his_finish_bool(false)
				let current = e.detail.current;
				// let refStr = `mescrollItem${current}`
				// this.$refs[refStr].reloadList(current)

			},
			homeCardClick() {
				// console.log("111");


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

<style>
	page {
		height: 100%;
		/* background-color: #071a28; */
		background-color: #00111c;
	}

	.mainView {
		height: 100%;
	}

	.macthPage {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.contentWrap {
		height: 100%;
	}

	.search {
		margin: 10px 15% 0 15%;
	}

	.swiperTab {
		height: 100%;
	}

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
		padding-top: 10px;
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
		padding-top: 25px;
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
