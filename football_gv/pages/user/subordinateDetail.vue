<template>
	<view class="subordinateDetailPage">
		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>

		<view class="subordinateDetailMain">
			<view class="subordinateDetailTabs">
				<view
					:class="selectCurrent === index ? 'subordinateDetailTabsItem tabsActive':'subordinateDetailTabsItem'"
					v-for="(item,index) in tabList" :key="index" @click="changeTabSelect(item,index)">
					{{item.name}}
				</view>
			</view>

			<view class="subordinateDetailContainer">
				<view class="subordinateDetailTableBox">
					<view class="subordinateDetailTableBoxHearder">
						<view class="subordinateDetailTableBoxHearderCell">
							{{$t('user.subordinateDetail.center.lower.level.text')}}
						</view>
						<view class="subordinateDetailTableBoxHearderCell">
							{{$t('user.subordinateDetail.center.new.member.text')}}
						</view>
						<view class="subordinateDetailTableBoxHearderCell">
							{{$t('user.subordinateDetail.center.topUp.member.text')}}
						</view>
						<view class="subordinateDetailTableBoxHearderCell">
							{{$t('user.subordinateDetail.center.withdrawl.member.text')}}
						</view>
					</view>
					<view class="subordinateDetailTableBoxBody">
						<view class="subordinateDetailTableBoxBodyContent" v-for="(item,index) in dataList" :key="index"
							v-if="noDataBool">
							<view class="subordinateDetailTableBoxBodyCell">
								{{item.levelType}}{{$t('user.subordinateDetail.center.level.agent.text')}}
							</view>
							<view class="subordinateDetailTableBoxBodyCell">
								{{item.newPlayer}}
							</view>
							<view class="subordinateDetailTableBoxBodyCell">
								{{item.recharge}}
							</view>
							<view class="subordinateDetailTableBoxBodyCell">
								{{item.cumulativeReflect}}
							</view>
						</view>

						<noDataView v-if="!noDataBool && dataList.length === 0" />
					</view>


				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		dataCenterDetailReq
	} from '@/api/index.js'
	// import {mapState,mapMutations} from 'vuex'
	import noDataView from '@/components/noDataView/noDataView.vue';
	import {
		myMixin
	} from '@/util/mixins.js'
	export default {
		components: {
			noDataView
		},
		data() {
			return {
				navTitle: this.$t('user.subordinateDetail.center.title.text'),
				tabList: [{
					name: this.$t('user.subordinateDetail.center.today.text'),
					value: 1,
				}, {
					name: this.$t('user.subordinateDetail.center.yes.text'),
					value: 2,
				}, {
					name: this.$t('user.subordinateDetail.center.nearly7.text'),
					value: 3,
				}, {
					name: this.$t('user.subordinateDetail.center.nearly30.text'),
					value: 5,
				}],
				current: 0,
				selectCurrent: 0,
				timeNum: 0,
				dataList: [],
				currSearchName: "",
				noDataBool: false,
			}
		},
		mixins: [myMixin],
		// computed:{
		// 	...mapState(['hasLogin'])
		// },
		// onLoad() {
		// 	if(!this.hasLogin){
		// 		uni.reLaunch({
		// 		   url: '../login/login',
		// 		   animationType: 'pop-in',
		// 		   animationDuration: 200
		// 		})
		// 	}
		// },
		onShow() {

			// this.localLoginToken = this.$store.state.userInfo.token
			// this.localLoginToken = uni.getStorageSync('footballToken');

			// 初始化语言
			this.initLang()


			// 获取页面的url值
			this.getPageParamData()

			this.current = 0
			this.selectCurrent = 0
			this.timeNum = 0
			// 获取数据
			this.getSubLevelDetail(1)

		},
		methods: {
			getPageParamData() {
				// 这种方法和onload那种方法灵活一些
				let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
				let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
				let currentPageOptions = currentPage.options ////获取路由参数
				let currentPageRoute = currentPage.route //获取当前页面路由

				// console.log("currentPageOptions",currentPageOptions);
				if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('searchName')) {
					this.currSearchName = currentPageOptions.searchName
				}

			},
			initLang() { //初始化语言


				let langStr = uni.getStorageSync('foot_lang')
				// console.log("lang",langStr);
				this.$i18n.locale = langStr

				this.navTitle = this.$t('user.subordinateDetail.center.title.text')
				this.tabList = [{
					name: this.$t('user.subordinateDetail.center.today.text'),
					value: 1,
				}, {
					name: this.$t('user.subordinateDetail.center.yes.text'),
					value: 2,
				}, {
					name: this.$t('user.subordinateDetail.center.nearly7.text'),
					value: 3,
				}, {
					name: this.$t('user.subordinateDetail.center.nearly30.text'),
					value: 5,
				}]

			},
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/statistics',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			changeTabSelect(item, index) {
				this.selectCurrent = index
				this.timeNum = item.value
				this.getSubLevelDetail(this.timeNum)
			},
			async getSubLevelDetail(timeNumber) {
				let reqParam = {}
				if (this.currSearchName) {
					reqParam.username = this.currSearchName
				}
				reqParam.time = timeNumber
				let resR = await dataCenterDetailReq(reqParam, this.localLoginToken)
				// console.log("resR",resR);
				if (resR.code === 200) {
					if (resR.data && resR.data.length !== 0) {
						this.noDataBool = true
						this.dataList = resR.data
					} else {
						this.dataList = []
						this.noDataBool = false
					}
				} else if (resR.code === 402 || resR.code === 403) {
					this.logout()
					uni.showToast({
						title: resR.msg,
						icon: 'none',
						duration: 2000,
						success: (res) => {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					});
				}

			}
		}
	}
</script>

<style>
	page {
		background-color: #00111c;
		height: 100%;
	}

	.navLeftBtn image {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
	}

	.navTitleCenter {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.subordinateDetailPage {
		height: 100vh;
	}

	.subordinateDetailMain {
		height: calc(100% - 44px);
	}

	.subordinateDetailTabs {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-size: 14px;
	}

	.subordinateDetailTabsItem {
		width: 22%;
		height: 50px;
		color: #cbcbcb;
		text-align: center;
		font-weight: 400;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tabsActive {
		border-bottom: 1px solid #3d8dfe;
		color: #3d8dfe;
	}

	.subordinateDetailContainer {
		height: calc(100% - 72px);
		margin: 10px 16px 0;
		background-color: #132736;
		border-radius: 0 0 5px 5px;
	}

	.subordinateDetailTableBox {
		margin-top: 10px;
		height: 100%;
	}

	.subordinateDetailTableBoxHearder {
		width: 100%;
		height: 46px;
		background: #334756;
		border-radius: 5px 5px 0 0;
		display: flex;
		align-items: center;
	}

	.subordinateDetailTableBoxHearderCell {
		width: 25%;
		font-weight: 500;
		font-size: 12px;
		color: #fff;
		font-family: Roboto;
		text-align: center;
	}

	.subordinateDetailTableBoxBody {
		height: calc(100% - 72px);
		max-height: 1200px;
		overflow-y: scroll;
		margin: 0 10px;
		border-radius: 2px;
		padding-bottom: 15px;
	}

	.subordinateDetailTableBoxBodyContent {
		height: 42px;
		background: #334756;
		border-radius: 2px;
		margin-top: 10px;
		display: flex;
		align-items: center;
	}

	.subordinateDetailTableBoxBodyCell {
		text-align: center;
		width: 25%;
		color: #fff;
		font-size: 12px;
		font-weight: 400;
	}
</style>
