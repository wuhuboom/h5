<template>
	<!-- #ifdef APP-PLUS || MP-WEIXIN || H5 -->
	<view class="tui-drag__wrap" :list="list" :style="{ height: getHeight + 'rpx' }" :basedata="baseData"
		:change:list="handler.listObserver" :change:basedata="handler.baseDataObserver">
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || MP-WEIXIN || H5 -->
		<view class="tui-drag__wrap" :style="{ height: getHeight + 'rpx' }">
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="tui-drag__item" v-for="(item, index) in list" :key="item.id" :data-index="index"
				:style="{ width:100 / columns + '%', height:  baseData.itemHeight + 'px' }"
				@longpress="handler.longPress" :data-basedata="baseData" :data-edit="isEdit"
				@touchstart="handler.touchStart" :catch:touchmove="dragging?handler.touchMove:''"
				:catch:touchend="dragging?handler.touchEnd:''">
				<slot :entity="item.data" :fixed="item.fixed" :index="index" :height="itemHeight" :isEdit="isEdit">
				</slot>
			</view>
			<!-- #endif -->

			<!-- #ifdef APP-PLUS || H5 -->
			<view class="tui-drag__item" v-for="(item, index) in list" :key="item.id" :data-index="index"
				:style="{ width: 100 / columns + '%', height: itemHeight + 'rpx' }" @longpress="handler.longPress"
				:data-basedata="baseData" :data-edit="isEdit" @touchstart="handler.touchStart"
				@touchmove="handler.touchMove" @touchend="handler.touchEnd">
				<slot :entity="item.data" :fixed="item.fixed" :index="index" :height="itemHeight" :isEdit="isEdit">
				</slot>
			</view>
			<!-- #endif -->

			<!-- #ifndef APP-PLUS || MP-WEIXIN || H5-->
			<view class="tui-drag__item"
				:class="{'tui-drag__current':current===index,'tui-drag__transition':current!==index && !isInit,'tui-drag__fixed':item.fixed,'tui-drag__hidden':isInit}"
				v-for="(item, index) in list" :key="item.id" :data-index="index"
				:style="{ width: 100 / columns + '%', height: itemHeight + 'rpx',transform:`translate3d(${index === current && !item.fixed ? transX : item.transX}, ${index === current && !item.fixed  ? transY: item.transY}, 0px)`}"
				@longpress="longPress" @touchstart="touchstart" @touchmove.stop.prevent="touchmove"
				@touchend="touchend">
				<slot :entity="item.data" :fixed="item.fixed" :index="index" :height="itemHeight" :isEdit="isEdit">
				</slot>
			</view>
			<!-- #endif -->
		</view>
</template>
<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
<script src="./tui-drag.wxs" lang="wxs" module="handler"></script>
<!-- #endif -->
<script>
	import mpdrag from './tui-drag.js'
	export default {
		name: 'tuiDrag',
		mixins: [mpdrag],
		emits: ['click', 'sortend', 'change'],
		props: {

			/*
			  ?????????
			  ???????????? fixed?????????????????????????????????????????????????????????????????????
			*/
			listData: {
				type: Array,
				default () {
					return [];
				}
			},
			// ??????
			columns: {
				type: Number,
				default: 3
			},
			// ??????????????????
			topSize: {
				type: Number,
				default: 0
			},
			// ??????????????????
			bottomSize: {
				type: Number,
				default: 0
			},
			// ?????? item ??????, ???????????? item-wrap ?????? rpx
			itemHeight: {
				type: Number,
				default: 0
			},
			// ??????????????????
			scrollTop: {
				type: Number,
				default: 0
			},
			//??????????????????true???????????????
			isEdit: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				/* ??????????????? */
				baseData: {},
				platform: '', // ????????????
				listWxs: [], // wxs ??????????????? list ??????
				rows: 4, // ??????

				list: [], // ???????????????
				dragging: false,
				isInit: true
			};
		},
		watch: {
			listData(val) {
				this.list = []
				setTimeout(() => {
					this.init()
				}, 0);
			},
			columns(val) {
				this.list = []
				setTimeout(() => {
					this.init()
				}, 0);
			}
		},
		computed: {
			getHeight() {
				return this.rows * this.itemHeight;
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.init();
			})
		},
		methods: {
			vibrate() {
				// #ifndef H5
				if (this.platform !== 'devtools') uni.vibrateShort();
				// #endif
			},
			pageScroll(e) {
				uni.pageScrollTo({
					scrollTop: e.scrollTop,
					duration: 0
				});
			},
			drag(e) {
				this.dragging = e.dragging;
			},
			listChange(e) {
				this.listWxs = e.list;
			},
			itemClick(e) {
				let index = e.currentTarget.dataset.index;
				let item = this.listWxs[index];

				this.$emit('click', {
					key: item.realKey,
					data: item.data,
					extra: e.detail
				});
			},
			unique(n = 6) {
				let rnd = '';
				for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
				return 'tui_' + new Date().getTime() + rnd;
			},
			/**
			 *  ??????????????? dom ??????
			 */
			initDom(callback) {
				let {
					windowWidth,
					windowHeight,
					platform
				} = uni.getSystemInfoSync();
				let remScale = (windowWidth || 375) / 375;

				this.platform = platform;

				let baseData = {};
				baseData.windowHeight = windowHeight;
				baseData.realTopSize = (this.topSize * remScale) / 2;
				baseData.realBottomSize = (this.bottomSize * remScale) / 2;
				baseData.columns = this.columns;
				baseData.rows = this.rows;

				const query = uni.createSelectorQuery().in(this);
				query.select('.tui-drag__item').boundingClientRect();
				query.select('.tui-drag__wrap').boundingClientRect();
				query.exec(res => {
					if (res && res.length > 0 && res[0] && res[0].width) {
						baseData.itemWidth = res[0].width;
						baseData.itemHeight = res[0].height;
						baseData.wrapLeft = res[1].left;
						baseData.wrapTop = res[1].top + this.scrollTop;
						this.dragging = false;
						this.baseData = baseData;
						callback && callback()
					}
				});
			},
			/**
			 *  ???????????????
			 *  {listData, topSize, bottomSize, itemHeight} ?????????????????????????????????????????????
			 */
			init() {
				// ???????????????true?????????wxs????????????,
				this.dragging = true;
				this.isInit = true
				let delItem = item => {
					let obj = {
						...item
					}
					let fixed = obj.fixed || false;
					delete obj["fixed"];
					return {
						id: this.unique(),
						fixed: fixed,
						data: {
							...obj
						}
					};
				};
				let listData = this.listData,
					_list = [];
				// ??????????????????????????????, ?????????????????????
				listData.forEach((item, index) => {
					_list.push(delItem(item));
				});

				let i = 0,
					columns = this.columns;
				let list = (_list || []).map((item, index) => {
					item.realKey = i++; // ????????????
					item.sortKey = index; // ????????????

					item.tranX = `${(item.sortKey % columns) * 100}%`;
					item.tranY = `${Math.floor(item.sortKey / columns) * 100}%`;
					return item;
				});
				this.rows = Math.ceil(list.length / columns);
				this.list = list;
				this.listWxs = list;
				if (list.length === 0) return;
				let delay_time = 1000
				// #ifndef APP-PLUS || MP-WEIXIN || H5
				delay_time = 500
				// #endif
				// ????????????????????????, ???????????? initDom ??????, ???????????????????????? dom ??????
				this.$nextTick(() => {
					setTimeout(() => {
						this.initDom(() => {
							// #ifndef APP-PLUS || MP-WEIXIN || H5
							list.map((item, index) => {
								item.transX =
									`${index%columns * this.baseData.itemWidth}px`;
								item.transY =
									`${Math.floor(index/columns) * this.baseData.itemHeight}px`;
							})
							this.list = list;
							this.listWxs = list;
							setTimeout(() => {
								this.isInit = false
							}, 500)
							// #endif
						})
					}, delay_time);
				})
			},
			sort_end(e) {
				this.$emit('sortend', {
					listData: e.listData
				});
			},
			change(e) {
				this.$emit('change', {
					listData: e.listData
				});
			}
		}
	};
</script>

<style scoped>
	.tui-drag__wrap {
		position: relative;
	}

	.tui-drag__wrap .tui-drag__item {
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		/* #ifndef APP-PLUS || MP-WEIXIN || H5 */
		transition: transform 0s;
		/* #endif */
	}

	.tui-drag__transition {
		transition: transform 0.35s !important;
	}

	.tui-drag__wrap .tui-drag__current {
		z-index: 10 !important;
	}

	.tui-drag__wrap .tui-drag__fixed {
		z-index: 1 !important;
	}

	.tui-drag__hidden {
		opacity: 0;
		visibility: hidden;
	}
</style>
