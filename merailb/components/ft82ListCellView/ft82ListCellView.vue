<template>
	<view class="cell">
		<view class="item">
			<view class="avatar" :style="itemCell.style">
				<image class="icon" :src="itemCell.imageIcon" mode="" :style="itemCell.imageStyle"></image>
			</view>
			<text class="label">{{itemCell.name}}</text>
		</view>
		<u-icon name="arrow-right" color="#f8f8f8" size="28"></u-icon>
	</view>
</template>

<script>
	export default {
		name: "ft82ListCellView",
		props: {
			itemCell: {
				type: Object,
				require: true,
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.cell {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		padding: 11px 8px;
		border-bottom: 2px solid #171e25;
		width: 90%;
		margin: 0 auto;

		.item {
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: center;

			.avatar {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 33px;
				height: 33px;
				border-radius: 50%;

				.icon {
					width: 22px;
					height: 17px;
				}
			}
		}

		.label {
			color: #f8f8f8;
			padding-left: 15px;
		}

	}
</style>
