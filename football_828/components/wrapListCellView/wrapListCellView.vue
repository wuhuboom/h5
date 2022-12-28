<template>
	<view class="cell" :style="needOtherStyle ? 'border-bottom:none' : 'border-bottom-style:soild'">
		<view class="cell-left">
			<image :src="itemCell.imageIcon" mode="" class="cell-icon"
				:style="needOtherStyle ? 'width:30px;height:30px;' : 'width:34px;height:34px;'"></image>
			<view class=" cell-text">{{itemCell.name}}
			</view>
		</view>
		<image src="../../static/images/arrow.svg" mode="" class="cell_arrowRight" v-if="showImgBool"></image>
	</view>
</template>

<script>
	export default {
		name: 'wrapListCellView',
		props: {
			itemCellStyle: {
				type: String,
				default: 'border-radius: 5px;'
			},
			itemCell: {
				type: Object,
				require: true,
			},
			showImgBool: {
				type: Boolean,
				default: false,
			},
			needOtherStyle: {
				type: Boolean,
				default: false,
			}
		},
		mounted() {
			// console.log("itemCell",this.itemCell);
		},
		data() {
			return {
				errCode: 0,
				errMsg: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cell,
	.cellOther {
		height: 50px;
		// padding-left: 12px;
		// padding-right: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		border-bottom-width: 0.5px;
		border-bottom-color: #323334;
		border-bottom-style: solid;
		// width: 380px;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 0;
		margin-bottom: 0;

		.cell-left {
			display: flex;
			align-items: center;

			.cell-icon {
				width: 34px;
				height: 34px;
			}

			.cell-text {
				margin-left: 15px;
				font-size: 16px;
				color: #fff;
			}



		}

		.cell_arrowRight {
			width: 12px;
			height: 17px;
		}

		&:last-child {
			border-bottom: none;
		}
	}
</style>
