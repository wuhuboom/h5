<template>
	<view class="wrapListCell" :style="itemCellStyle">
		<view class="cell_iconAndTitle">
			<image :src="itemCell.imageIcon" mode="" class="cell_icon"></image>
			<view class="cell_title">
				{{itemCell.name}}
			</view>
		</view>
		<image src="../../static/images/arrow.svg" mode="" class="cell_arrowRight" v-if="showImgBool"></image>
	</view>
</template>

<script>
	export default{
		name:'wrapListCellView',
		props:{
			itemCellStyle:{
				type:String,
				default:'border-radius: 5px;'
			},
			itemCell:{
				type:Object,
				require:true,
			},
			showImgBool:{
				type:Boolean,
				default:false,
			}
		},
		mounted() {
			// console.log("itemCell",this.itemCell);
		},
		data(){
			return {
				errCode: 0,
				errMsg: ''
			}
		}
	}
</script>

<style>
	
	.wrapListCell{
		margin-top: 10px;
		height: 45px;
		background: #132736;
		border-radius: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
	}
	
	
	.cell_arrowRight{
		width: 12px;
		height: 17px;
	}
	
	.cell_iconAndTitle{
	
		display: flex;
		align-items: center;
	}
	
	.cell_icon{
		width: 25px;
		height: 25px;
	}
	
	.cell_title{
		margin-left: 5px;
		font-size: 14px;
		color: #fff;
		
	}
	
</style>