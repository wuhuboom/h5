<template>
	<view class="accountReportPage">
		<uni-nav-bar backgroundColor="#00111C" color="#fff" :statusBar="true" :border="false"
			@clickLeft="goBackBtnClick" style="font-weight: 600;" :fixed="true">
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../static/images/back.svg" mode=""></image>
				</view>
			</block>

			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>

		<view class="accountListContainer">
			<view class="tableBox">
				<view class="tableBoxCenterTitle">
					<view class="tableBoxCenterTitleItem">
						{{$t('backapi.self.statistics.top.content.playerName.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('home.balance')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('backapi.self.statistics.top.content.reg.time.text')}}
					</view>
				</view>
				<view class="tableBoxBody">
					<!-- height="900" -->
					<mescroll-uni ref="mescrollRef" :fixed="true" height="900" top="0" :topbar="false" bottom="0"
						:bottombar="true" :safearea="false" @down="downCallback" @up="upCallback" :down="downOption"
						:up="upOption">


						<view class="tableBoxBodyTBody" v-for="(item, index) in dataAimList" :key="item.id">
							<view class="tableBoxBodyTBodyItem tBodyItemUserName">
								{{item.username}}
							</view>
							<view class="tableBoxBodyTBodyItem tBodyItemDate">
								{{item.balance | moneyFormat}}
							</view>
							<view class="tableBoxBodyTBodyItem tBodyItemDate">
								{{item.createdAt | timestampStr}}
							</view>
						</view>

					</mescroll-uni>

				</view>


			</view>


		</view>
	</view>
</template>

<script>
	import {
		inactiveListReq
	} from '@/api/index.js'
	import {
		myMixin
	} from '@/util/mixins.js'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, myMixin], // 使用mixin
		components: {
			MescrollBodyDiy // 避免与main.js注册的全局组件名称相同,否则注册组件失效(iOS真机 APP HBuilderX2.7.9)
		},
		data() {
			return {
				navTitle: this.$t('backapi.self.statistics.top.content.not.active.person.list.text'),
				timenum: '',
				customStyleInput: {
					"border-radius": "5px",
					"background-color": "#334756",
					"text-indent": "10px",
					"color": "#fff"
				},
				placeholderAccount: this.$t('user.report.account.list.center.search.where.input.account.text'),
				initSearchInputText: this.$t('user.report.account.list.center.search.where.all.text'),
				inputSearchListItemArray: [{
					nameStr: this.$t('user.report.account.list.center.search.where.all.text'),
				}, {
					nameStr: this.$t('user.report.account.list.center.search.where.fbd.text'),
				}, {
					nameStr: this.$t('user.report.account.list.center.search.where.query.text'),
				}],
				showListBool: false,
				arrowClass: 'iconfont icon-arrow-down rightArrow',
				arrowClassActive: 'iconfont icon-arrow-down rightArrow rightArrowActive',
				currentIndex: 0,
				dataAimList: [],

				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {

				},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						icon: "../../static/images/nodata.png",
						tip: 'Absolutely empty'
					},
					textLoading: 'Loading',
					textNoMore: '-- End --'
				}
			}
		},
		onShow() {
			let pagearr = getCurrentPages(); //获取应用页面栈/获取当前打开过的页面路由数组
			let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
			let currentPageOptions = currentPage.options ////获取路由参数
			let currentPageRoute = currentPage.route //获取当前页面路由
			// console.log("currentPageOptions",currentPageOptions);
			if (currentPageOptions.length !== 0 && currentPageOptions.hasOwnProperty('timenum')) {
				// console.log("currentPageOptions", currentPageOptions.timenum);
				this.timenum = (currentPageOptions.timenum) * 1 + 1
			}
		},
		methods: {
			goBackBtnClick() {
				uni.navigateTo({
					url: '/pages/user/statistics',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			inputSearchListItemClick(item, index) {
				this.initSearchInputText = item.nameStr
				this.currentIndex = index;
			},
			searchBoxListClick() {
				this.showListBool = !this.showListBool
			},
			searchWhereBtnClick() {
				// this.pageNo = 1
				// this.pageSize = 10
				this.dataAimList = []
				this.mescroll.resetUpScroll();
			},
			/*下拉刷新的回调, 重置列表为第一页 (此处可删,mixins已默认)*/
			downCallback() {
				this.dataAimList = []
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				// console.log("pageNum",pageNum);
				// console.log("pageSize",pageSize);
				this.getAccountListData(pageNum, pageSize)
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			async getAccountListData(pageNum, pageSize) {
				// 动态更新全局配置
				uni.$emit("setMescrollGlobalOption", {
					up: {
						empty: {
							tip: this.$t('alert.absolutely.empty')
						},
						textNoMore: this.$t('alert.nomore')
					},
				})
				let reqParam = {}
				reqParam.time = this.timenum
				// if (this.timenum) {
				// 	reqParam.username = this.timenum
				// }
				reqParam.pageNo = pageNum
				reqParam.pageSize = pageSize
				let resR = await inactiveListReq(reqParam, this.localLoginToken)
				if (resR.code === 200) {
					this.mescroll.endBySize(resR.data.results.length, resR.data.totalCount)
					//设置列表数据
					if (pageNum == 1) this.dataAimList = []; //如果是第一页需手动制空列表
					this.dataAimList = this.dataAimList.concat(resR.data.results); //追加新数据
				} else if (resR.code === 409) {
					uni.showToast({
						title: this.$t('backapi.self.alert.fast.access.tip.text'),
						icon: 'none',
						duration: 2000,
						success: (res) => {
							//  请求失败,隐藏加载状态
							this.mescroll.endErr()
						}
					});
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
		background-color: #071a28;
		height: 100%;
		position: relative;
	}

	.accountReportPage {
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


	.accountListContainer {
		padding: 0 16px;
		height: calc(100% - 68px);
		padding-top: 10px;
	}

	.searchBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 4px;
		padding-top: 10px;
	}

	.searchBoxList {
		width: 90%;
		margin-right: 5%;
		height: 42px;
		font-size: 12px;
		background-color: #334756;
		/* border: 0px; */
		color: #fff;
		border-radius: 5px;
		padding-left: 10px;
		position: relative;
	}

	.searchInputShow {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;

	}


	.searchBtn {
		font-family: Roboto;
		width: 73px;
		min-height: 42px;
		text-align: center;
		background-color: #3d8dfe;
		font-size: 14px;
		font-weight: 500;
		color: #fff;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 5px;

	}

	.rightArrow {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		align-items: center;
		height: 100%;
		font-weight: 100;
		width: 12%;
		justify-content: center;
		font-size: 16px;
		color: #fff;
		/* transition: transform .2s cubic-bezier(.645, .045, .355, 1); */
		/*设置所有动画的效果：0.3s 淡出效果*/
		transition: all .3s ease-out;
	}

	.rightArrowActive {
		/*旋转180度*/
		transform: rotate(180deg);
	}


	.inputSearchList {
		position: absolute;
		width: 100%;
		left: 0;
		top: 42px;
		box-sizing: border-box;
		z-index: 100;
	}

	.scrollInputSearchList {
		border-radius: 5px;
		width: 100%;
		max-height: 10em;
		background-color: #132736;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		padding: 10px 0;
	}

	.inputSearchListItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 37px;
		font-weight: 400;
		padding: 0 10px;
	}

	.inputSearchListItem image {
		width: 15px;
		height: 15px;
	}



	.tableBox {
		margin-top: 6px;
		height: calc(100vh - 137px);
		/* height: calc(100vh - 167px); */
		padding-bottom: 4px;
		/* border-radius: 5px; */
		/* overflow: hidden; */
	}

	.tableBoxCenterTitle {
		/* width: 100%; */
		height: 50px;
		line-height: 50px;
		font-size: 12px;
		background: #334756;
		box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
		border-radius: 5px 5px 0 0;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	.tableBoxCenterTitleItem {
		width: 25%;
		font-size: 12px;
		color: #fff;
		font-weight: 500;
		line-height: 20px;
		text-align: center;
	}

	.tableBoxBody {
		background: #132736;
		/* 用原生的scrollView的时候.用上 */
		height: calc(100% - 70px);
		border-radius: 0 0 5px 5px;
	}


	.tableBoxBodyTBody {
		/* margin: 10px 10px 0; */
		margin: 10px 10px;
		height: 42px;
		background: #334756;
		border-radius: 2px;
		display: flex;
		align-items: center;
		justify-content: space-evenly
	}

	.tableBoxBodyTBodyItem {
		text-align: center;
		/* font-size: 12px; */
		font-size: 13px;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #fff;
		width: 25%;
		word-break: break-word;
	}

	.tBodyItemMoney {
		color: #3d8dfe;

	}
</style>
