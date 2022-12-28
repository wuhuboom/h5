<template>
	<mescroll-uni :ref="'mescrollRef'+i" :loadgif="985" @init="mescrollInit" :down="downOption" @down="downCallback"
		:up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<!-- 数据列表 -->
		<matchHisView :hisListData="matchSwiperList" v-if="matchSwiperList.length !== 0"></matchHisView>
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import {
		myMixin,
		setSearchHisTeamNameMixin,
	} from '@/util/mixins.js'
	// import counter from './counterView/counter.vue';
	import matchHisView from './matchHisView/matchHisView.vue';
	// import noDataView from '@/components/noDataView/noDataView.vue';
	import {
		gameFinishReq,
	} from '../api/index.js'
	export default {
		mixins: [myMixin, setSearchHisTeamNameMixin, MescrollMixin,
			MescrollMoreItemMixin
		], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		data() {
			return {
				downOption: {
					auto: false, // 不自动加载 
					isLock: true,
					auto: false, // 不自动加载 
				},
				upOption: {
					auto: false, // 不自动加载
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						icon: "../../static/images/noData-c.svg",
						tip: 'Absolutely empty'
					},
					// toTop:{
					// 	src:""
					// },
					textLoading: 'Loading',
					// textNoMore:'-- End --'
				},
				matchSwiperList: [],
				localLoginToken: null,
			}
		},
		props: {
			i: Number, // 每个tab页的专属下标
			index: { // 当前tab的下标
				type: Number,
				default () {
					return 0
				}
			},
			token_Str: {
				type: String,
			},
			height: [Number, String] // mescroll的高度
		},
		mounted() {


		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.matchSwiperList = []
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.getAllMatch(pageNum, pageSize)
			},
			async getAllMatch(pageNoAllNum, pageSizeAllNum) {
				// 动态更新全局配置
				uni.$emit("setMescrollGlobalOption", {
					down: {
						textInOffset: this.$t('alert.textInOffset'),
						textOutOffset: this.$t('alert.textOutOffset'),
						textLoading: this.$t('alert.loading'),
						textSuccess: this.$t('alert.textSuccess'),
						textErr: this.$t('alert.textErr'),
					},
					up: {
						empty: {
							tip: this.$t('alert.absolutely.empty')
						},
						textNoMore: this.$t('alert.nomore'),
						textLoading: this.$t('alert.loading')
					},
				})
				let reqParam = {}

				reqParam.startTime = this.index
				reqParam.pageNo = pageNoAllNum
				reqParam.pageSize = pageSizeAllNum
				if (this.searchHisTeamNameStr) {
					reqParam.teamName = this.searchHisTeamNameStr
				}


				let resR = await gameFinishReq(reqParam, this.token_Str)
				// console.log("resR",resR.data.results);
				let resArray
				if (resR.code === 200) {
					// resArray = resR.data.results
					this.mescroll.endSuccess(resR.data.results.length);
					//设置列表数据
					if (pageNoAllNum == 1) this.matchSwiperList = [];
					this.matchSwiperList = this.matchSwiperList.concat(resR.data.results);
				} else {
					//联网失败, 结束加载
					this.mescroll.endErr();
				}
			},
			//点击空布局按钮的回调
			emptyClick() {

			},
			reloadList(i) {
				let currRefStr = `mescrollRef${i}`
				// console.log("重载",this.$refs,this.$refs[currRefStr].mescroll.resetUpScroll());
				this.matchSwiperList = []
				this.mescroll.resetUpScroll();
			}
		}
	}
</script>
