<template>
	<mescroll-uni :ref="'mescrollRef'+i" :loadgif="985" @init="mescrollInit" :down="downOption" @down="downCallback"
		:up="upOption" @up="upCallback" @emptyclick="emptyClick" :fixed="false">
		<!-- 数据列表 -->
		<matchListView :listData="matchSwiperList" :fromUrlNum="2" v-if="matchSwiperList.length !== 0" keyNameStr="yes">
		</matchListView>
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import {
		myMixin,
		setSearchTeamNameMixin
	} from '@/util/mixins.js'
	import counter from './counterView/counter.vue';
	import matchListView from './matchListView/matchListView.vue';
	// import noDataView from '@/components/noDataView/noDataView.vue';
	import {
		gameReq,
	} from '../api/index.js'
	export default {
		// 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		mixins: [myMixin, setSearchTeamNameMixin, MescrollMixin, MescrollMoreItemMixin],
		data() {
			return {
				downOption: {
					use: false,
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
						icon: "../../static/images/noData.svg",
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
				searTeamNameStr: ""
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
			teamName: {
				type: String,
			},
			height: [Number, String] // mescroll的高度
		},
		// watch: {
		// 	teamName: {
		// 		handler: function(newVal, oldVal) {
		// 			console.log("oldVal", oldVal)
		// 			console.log("newVal", newVal)
		// 			if (oldVal === newVal) {
		// 				this.searTeamNameStr = newVal
		// 			}
		// 		},
		// 		immediate: true
		// 	}
		// },
		mounted() {


		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				console.log("111");
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
				// console.log("searchTeamNameStr", this.searchTeamNameStr);
				reqParam.startTime = this.index
				reqParam.status = 0
				reqParam.pageNo = pageNoAllNum
				reqParam.pageSize = pageSizeAllNum
				if (this.searchTeamNameStr) {
					reqParam.teamName = this.searchTeamNameStr
				}

				let resR = await gameReq(reqParam, this.token_Str)
				// console.log("resR",resR.data.results);
				let resArray
				if (resR.code === 200) {
					// resArray = resR.data.results
					if (this.index === 0) {
						this.set_match_all_num(resR.data.totalCount)
					} else if (this.index === 1) {
						this.set_match_today_num(resR.data.totalCount)
					} else if (this.index === 2) {
						this.set_match_tom_num(resR.data.totalCount)
					}
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
