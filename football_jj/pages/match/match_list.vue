<template>
	<view class="mainView">
		<view class="Homepage">
			<view class="com-nav">
				<uni-nav-bar backgroundColor="#F8F8F8" color="#fff" :statusBar="true" :border="false" :fixed="true"
					leftWidth="30" rightWidth="30">
					<!-- 	<block slot="left">
						<view class="left-icon">
							<view class="left">
								<view class="">
									1
								</view>
							</view>
						</view>
					</block> -->
					<view class="search">
						<!-- <u-search color="#FFFFFF" shape="square" search-icon-color="#606266"
							:placeholder="$t('match.search.text')" bg-color="#171E25" :show-action="false" height="60"
							v-model="keywordSearch" margin="8px 0" @search="searchChange" @blur="searchChange"
							@clear="clearClick">
						</u-search> -->
						<view class="inputsarea">
							<input type="text" v-model="keywordSearch" value="" :placeholder="$t('match.search.text')"
								@input="keywordSearchInput" />
							<view class="btns">
								<image src="../../static/images/search.png" mode=""></image>
								<u-icon name="close-circle-fill" v-if="isShowClearBool" @click="clearKeyWord"></u-icon>
								<view class="fonts" @click="searchChange">
									{{$t('backapi.self.bank.search.text')}}
								</view>
							</view>
						</view>
					</view>
					<!-- <block slot="right">
						<view class="nav-right">
							<view class="right-icon">
								<view class="searchTeam">
									{{$t('backapi.self.bank.search.text')}}
								</view>
							</view>
						</view>
					</block> -->

				</uni-nav-bar>

			</view>
			<view class="btns">
				<view class="btn" v-for="(item,index) in list" :key="index" @click="tab_btn_click(index)">
					<view :class="index === swiperCurrent ? 'btn_text btn-active':'btn_text' ">
						{{item.name}}
						<text class="num"
							:style="index === swiperCurrent ? 'color: #507ef6;' : 'color: #323232;'">{{item.value ? item.value:''}}</text>
					</view>
				</view>
			</view>
			<swiper class="swiper-content" :current="swiperCurrent" @animationfinish.stop="animationfinish"
				@change="swiperChange" @touch="touchAAAA">
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
				height: "", // 需要固定swiper的高度
				localLoginToken: null,
				keywordSearch: "",
				isShowClearBool: false,
				// list: [{
				// 	name: this.$t('match.all.text'),
				// 	value: ""
				// }, {
				// 	name: this.$t('match.today.text'),
				// 	value: ""
				// }, {
				// 	name: this.$t('match.tomorrow.text'),
				// 	value: ""
				// }],
				list_all_num: "",
				list_today_num: "",
				list_tomorrow_num: "",

				tabs: [{

				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的

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

			// 初始化语言
			this.initLang()


			this.$nextTick(() => {
				this.change_finish_bool(true)
			})
			//    //初始化页面
			// this.current = 0



		},
		computed: {
			list: function() {
				let list = [{
					name: this.$t('match.all.text'),
					value: " ( " + this.matchAllNum + " )"
				}, {
					name: this.$t('match.today.text'),
					value: " ( " + this.matchTodayNum + " )"
				}, {
					name: this.$t('match.tomorrow.text'),
					value: " ( " + this.matchTomorrowNum + " )"
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
					text: this.$t('tabar.funlist')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabar.bet')
				})
				uni.setTabBarItem({
					index: 4,
					text: this.$t('tabar.mine')
				})

			},
			keywordSearchInput() {
				if (!this.keywordSearch) {
					this.isShowClearBool = false
					return false
				}

				this.isShowClearBool = true

				this.searchChange()
			},
			clearKeyWord() {
				this.keywordSearch = ""
				this.isShowClearBool = false
				this.searchChange()
			},
			tab_btn_click(index) {
				// console.log("index",index);
				this.swiperCurrent = index;
				let refStr = `mescrollItem${index}`
				// this.$refs[refStr].reloadList(index)
				// console.log("mescrollItem",this.$refs[refStr]);
			},
			// 获取指定下标的mescroll对象
			getMescroll(i) {
				let mescrollItems = this.$refs;
				if (mescrollItems) {
					let item = mescrollItems[i]
					if (item) return item.mescroll
				}
				return null
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				// this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				// console.log("点击");
				this.change_finish_bool(true)
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
			swiperChange(e) { //先暂时屏蔽这个
				this.change_finish_bool(false)
				let current = e.detail.current;
				// console.log("current",current);
				// let refStr = `mescrollItem${current}`
				// this.$refs[refStr].reloadList(current)
			},
			touchAAAA(e) {
				// console.log("e", e);
			},
			homeCardClick(item) { //赛事点击获取详情

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

<style lang="scss" scoped>
	page {
		background: #f8f8f8;
	}

	.Homepage {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 50px);
		// height: 100vh;
		width: 100%;

		.btns {
			display: flex;
			flex-wrap: nowrap;
			font-size: 14px;
			justify-content: space-between;
			align-items: center;
			color: #323233;
			width: 100%;
			background: #FFFFFF;
			height: 50px;
			padding: 0 20px;

			.btn {
				font-family: Alibaba PuHuiTi;
				text-align: center;
				display: flex;
				color: #323233;
				font-size: 13px;

				.btn_text {
					height: 30px;
					line-height: 30px;
					padding: 0 10px;
				}
			}

			.btn-active {
				color: #507ef6;
				position: relative;

				&:before {
					content: "";
					position: absolute;
					bottom: -10px;
					left: 50%;
					margin-left: -25%;
					width: 50%;
					height: 2px;
					background-color: #507ef6;
				}
			}
		}

		.swiper-content {
			flex: 1;
			// background-color: #171E25;

			.swiper-item {}
		}

	}

	.left-icon {
		line-height: 15px;
		padding-left: 10px;
	}

	/deep/ .uni-navbar__header-btns-left {
		width: 10px;
	}

	/deep/ .uni-navbar__header-container {
		padding: 0;
	}

	.search {
		// width: 110%;
		width: 98%;
		// margin-left: -15px;
		display: flex;
		align-items: center;


		.inputsarea {
			width: 100%;
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
			// height: 0.8rem;
			border: 1px solid #597ef7;
			border-radius: 4px;
			padding-left: 10px;
			box-sizing: border-box;
			overflow: hidden;
			position: relative;

			.btns {
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				-ms-flex-pack: center;
				justify-content: center;
				width: 110px;
				height: 30px;
				background: #597ef7;
				box-sizing: border-box;
				padding: 0 10px;

				image {
					width: 12px;
					height: 12px;
					margin-right: 5px;
				}

				.fonts {
					color: #fff;
					font-size: 14px;
				}
			}
		}
	}

	.nav-right {}

	.right-icon {
		height: 44px;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;

		.lianmeng {
			width: 22px;
		}

		.searchTeam {
			/* min-width: 35px; */
			height: 25px;
			line-height: 25px;
			background: linear-gradient(90deg, #ffd37d, #ca962e);
			color: #050505;
			border-radius: 3px;
			font-size: 13px;
			/* margin: 0 5px; */
			padding: 0 5px;
		}
	}

	/deep/ .uni-navbar__header-btns-right {
		width: 10px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	/deep/ uni-input {
		color: #333;
		font-size: 14px;
	}

	/deep/ .u-icon--right {
		position: absolute;
		right: 120px;

	}
</style>
