<template>
	<view class="cell" :style="needOtherStyle ? 'border-bottom:none' : 'border-bottom-style:soild'">
		<view class="cell-left">
			<image :src="itemCell.imageIcon" mode="" class="cell-icon"></image>
			<view class=" cell-text">{{itemCell.name}}
			</view>
		</view>
		<u-icon name="arrow-right" color="#323232c7" size="16px"></u-icon>
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
		// height: 50px;
		padding: 10px 0;
		line-height: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 0;
		margin-bottom: 0;

		.cell-left {
			display: flex;
			align-items: center;

			.cell-icon {
				width: 20px;
				height: 20px;
			}

			.cell-text {
				margin-left: 15px;
				font-size: 12px;
				color: #333;
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
