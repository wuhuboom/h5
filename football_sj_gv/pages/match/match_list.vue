<template>
	<view class="mainView">
		<view class="macthPage">
			<view class="search">
				<!-- 	<uni-search-bar 
					:placeholder="$t('match.search.text')" 
					bgColor="#132736"
					@confirm="search" 
					cancelButton="none"
					radius="20"
					style="color: #FFFFFF"
				 /> -->
				<!-- @change="searchChange" @search="searchChange" @blur="searchChange"-->
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

				<swiper class="swiperTab" :current="swiperCurrent" @transition="transition"
					@animationfinish.stop="animationfinish" @change="swiperChange">
					<swiper-item class="swiper-item">

						<mescroll-item :teamName="keywordSearch" ref="mescrollItem0" :i="0" :index="0"
							:token_Str="localLoginToken"></mescroll-item>

					</swiper-item>
					<swiper-item class="swiper-item">

						<mescroll-item :teamName="keywordSearch" ref="mescrollItem1" :i="1" :index="1"
							:token_Str="localLoginToken" :height="height"></mescroll-item>
					</swiper-item>
					<swiper-item class="swiper-item">

						<mescroll-item :teamName="keywordSearch" ref="mescrollItem2" :i="2" :index="2"
							:token_Str="localLoginToken" :height="height"></mescroll-item>
					</swiper-item>
				</swiper>

			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		gameReq,
	} from '../../api/index.js'
	import {
		myMixin,
		setSearchTeamNameMixin
	} from '@/util/mixins.js'
	import MescrollItem from "../../components/mescroll-swiper-item.vue";
	export default {
		mixins: [myMixin, setSearchTeamNameMixin],
		data() {
			return {
				height: "", // ????????????swiper?????????
				localLoginToken: null,
				keywordSearch: "",
				// list: [{
				// 	name: this.$t('match.all.text') + "(?)"
				// }, {
				// 	name: this.$t('match.today.text') + "(?)"
				// }, {
				// 	name: this.$t('match.tomorrow.text') + "(?)"
				// }],
				tabs: [{

				}],
				// ??????????????????????????????????????????tabs?????????swiper?????????current?????????????????????
				current: 0, // tabs?????????current???????????????????????????tab??????
				swiperCurrent: 0, // swiper?????????current????????????????????????swiper-item????????????

				canReset: true,
			}
		},
		components: {
			MescrollItem
		},
		onShow() {

			this.change_finish_bool(false)
			this.swiperCurrent = 0

			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();

			this.scrollSelfStyle = "height: " + (windowHeight - 130) + 'px' + ";width: 100%;"

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// ???????????????
			this.initLang()

			this.$nextTick(() => {
				this.change_finish_bool(true)
			})


			//    //???????????????
			// this.current = 0
			// this.swiperCurrent = 0

			// ???????????????????????????
			// this.getThreeData()

			// this.$nextTick(() => {
			// 	this.$refs["mescrollItem0"].reloadList()
			// 	this.$refs["mescrollItem1"].reloadList()
			// 	this.$refs["mescrollItem2"].reloadList()
			// })


		},
		computed: {
			list: function() {
				let list = [{
					name: this.$t('match.all.text') + " ( " + this.matchAllNum + " )"
				}, {
					name: this.$t('match.today.text') + " ( " + this.matchTodayNum + " )"
				}, {
					name: this.$t('match.tomorrow.text') + " ( " + this.matchTomorrowNum + " )"
				}]
				return list
			}

		},
		watch: {
			changAnimationFinishBool: {
				handler: function(newVal, oldVal) {
					// console.log("oldVal", oldVal)
					// console.log("newVal", newVal)
					if (newVal) {
						let refStr = `mescrollItem${this.swiperCurrent}`
						this.$nextTick(() => {
							this.$refs[refStr].reloadList(this.swiperCurrent)
						})
					}
				},
				immediate: true
			}
		},
		methods: {

			// ...mapMutations(['logout']),

			initLang() { //???????????????

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


			},
			// ??????????????????
			async getThreeData() {

				let tempACount = await this.getTotalRequestHandle(0)
				let tempTCount = await this.getTotalRequestHandle(1)
				let tempTomCount = await this.getTotalRequestHandle(2)
				this.list = [{
					name: this.$t('match.all.text') + " ( " + tempACount + " )"
				}, {
					name: this.$t('match.today.text') + " ( " + tempTCount + " )"
				}, {
					name: this.$t('match.tomorrow.text') + " ( " + tempTomCount + " )"
				}]

			},
			async getTotalRequestHandle(start) {
				let reqParam = {}
				reqParam.startTime = start
				reqParam.status = 0
				reqParam.pageNo = 1
				reqParam.pageSize = 1
				let resA = await gameReq(reqParam, this.localLoginToken)
				let tempACount = "?"
				if (resA.code === 200) {
					tempACount = resA.data.totalCount
					return tempACount
				} else if (resA.code === 402 || resA.code === 403) {
					this.$refs.uToast.show({
						title: resA.msg,
						url: '/pages/login/login',
					})
					this.logout()

					return "?"
				}

			},
			// ?????????????????????mescroll??????
			getMescroll(i) {

				let mescrollItems = this.$refs;
				if (mescrollItems) {
					let item = mescrollItems[i]
					if (item) return item.mescroll
				}
				return null
			},
			// tabs??????swiper??????
			tabsChange(index) {
				// console.log("index",index);
				this.swiperCurrent = index;
				let refStr = `mescrollItem${index}`
				this.$refs[refStr].reloadList(index)
				// console.log("mescrollItem",this.$refs[refStr]);
			},
			// swiper-item?????????????????????tabs?????????????????????
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// ??????swiper????????????????????????????????????swiper????????????dx????????????????????????????????????????????????
			// swiper???????????????????????????tabs???swiper?????????
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.change_finish_bool(true)
			},
			scroll(e) {
				//??????scroll??????
				this.scrollTop = e.detail.scrollTop
			},
			scrollToday(e) {
				//??????scroll??????
				this.scrollTopToday = e.detail.scrollTop
			},
			scrollTom(e) {
				//??????scroll??????
				this.scrollTopTom = e.detail.scrollTop
			},

			swiperChange(e) {
				this.change_finish_bool(false)
				let current = e.detail.current;
				// console.log("current",current);
				// let refStr = `mescrollItem${current}`
				// this.$refs[refStr].reloadList(current)
			},
			homeCardClick(item) { //????????????????????????

				uni.navigateTo({
					url: '/pages/match/match_content',
					success: (res) => {
						// ??????eventChannel??????????????????????????????
						uni.setStorageSync('queryMatchContentItemUrlFrom', 'match');
						res.eventChannel.emit('matchDeClick', {
							content: item,
							from: 'match'
						})
					},
					animationType: 'pop-in',
					animationDuration: 200
				});

			},
			searchChange() {
				this.set_search_team_name(this.keywordSearch)
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
				this.set_search_team_name("")
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
		padding-top: 20px;
		padding-bottom: 12px;
		font-size: 14px;
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
