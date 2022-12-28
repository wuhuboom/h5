<template>
	<view class="">
		
		 <transition >
			 <!-- 自定义弹窗 -->
			 <view class="_showModal" v-show="show">
			 		<view class="_shade"></view>
			 		<view class="_modalBox" @click.stop="clickBtn('cancel')">
			 			<view class="_modal">
			 				<slot name="title">
			 					<view class="title" v-show="title">{{title}}</view>
			 				</slot>
			 				<slot name="image">
			 					<view class="imageWarningWrap">
			 						<image v-if="icon == 'warning'" src="../../static/images/exit_prompt.svg" mode="" class="imageWarning"></image>
			 						
			 						<image v-if="icon=='success'" src="../../static/images/success.png" mode="" class="imageWarning"></image>
			 					</view>
			 				</slot>
			 				<slot name="content">
			 					<!-- <view class="content">{{content}}</view> -->
			 					<view class="centerContent">
			 						<view class="centerContentTitle">
			 							{{ceterTitle}}
			 						</view>
			 						<view class="centerContentDesc">
			 							{{ceterDesc}}
			 						</view>
			 					</view>
			 				</slot>
			 				<slot name="btn">
			 					<view class="btnbox">
			 						<view v-if="cancelText" class="btn" :style="{color:cancelColor,background:cancelBackgroundColor}" @click.stop="clickBtn('cancel')">{{cancelText}}</view>
			 						<view class="btn" :style="{color:confirmColor,background:confirmBackgroundColor}" @click.stop="clickBtn('confirm')">{{confirmText}}</view>
			 					</view>
			 				</slot>
			 			</view>
			 		</view>
			 </view>
			 
		 </transition>
	</view>
	
</template>

<script>
	export default {
		name:"show-modal",
		computed: {
			show(){
				return this.$modalStore.state.show;
			},
			icon(){
				return this.$modalStore.state.icon;
			},
			title(){
				return this.$modalStore.state.title;
			},
			content(){
				return this.$modalStore.state.content;
			},
			ceterTitle(){
				return this.$modalStore.state.ceterTitle;
			},
			ceterDesc(){
				return this.$modalStore.state.ceterDesc;
			},
			showCancel(){
				return this.$modalStore.state.showCancel;
			},
			cancelText(){
				return this.$modalStore.state.cancelText;
			},
			cancelColor(){
				return this.$modalStore.state.cancelColor;
			},
			cancelBackgroundColor(){
				return this.$modalStore.state.cancelBackgroundColor;
			},
			confirmText(){
				return this.$modalStore.state.confirmText;
			},
			confirmColor(){
				return this.$modalStore.state.confirmColor;
			},
			confirmBackgroundColor(){
				return this.$modalStore.state.confirmBackgroundColor;
			}
		},
		methods:{
			closeModal(){
				this.$modalStore.commit('hideModal')
			},
			clickBtn(res){
				this.$modalStore.commit('hideModal')
				this.$modalStore.commit('success',res)
			}
		},
		beforeDestroy(){
			this.$modalStore.commit('hideModal')
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
._showModal{
		position: fixed;
		top: 0;
		left:0;
		width: 100%;
		height: 100%;
		z-index:10000;
		._shade{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: #000;
			opacity: .6;
			z-index:11000;
		}
		._modalBox{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index:12000;
			display: flex;
			justify-content: center;
			align-items: center;
			._modal{
				flex: none;
				width:345px;
				// min-height:247px;
				// height:247px;
				background: #132736;
				border-radius: 12px;
				// display: flex;
				// flex-direction: column;
				// align-items: center;
				.title{
					text-align: center;
					font-size: 16px;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #333333;
					margin-top: 20px;
				}
				.content{
					min-height: 80px;
					width: 284px;
					margin:45px auto;
					font-size: 20px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #333333;
					display: flex;
					justify-content: center;
					align-items: center;
					letter-spacing: 3px;
				}
				.centerContent{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: #fff;
					margin: 10px 0;
					.centerContentTitle{
						font-size: 16px;
						color: #fff;
						font-weight: 700;
					}
					
					.centerContentDesc{
						margin-bottom: 30px;
						color: #3d8dfe;
						font-size: 12px;
					}
				}
				.imageWarningWrap{
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 18px;
					.imageWarning{
						width: 60px;
						height: 60px;
					}
				}
				.btnbox{
					display: flex;
					// justify-content: center;
					justify-content: space-evenly;
					// padding-top: 10px;
					flex-direction: row;
					margin-bottom: 20px;
					.btn{
						width: 150px;
						height: 50px;
						border-radius: 12px;
						display: flex;
						justify-content: center;
						align-items: center;
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 16px;
						// margin:  -5px 30px 30px 30px;
					}
				}
			}
		}
		
}



@-webkit-keyframes puff-in-center {
  0% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(4px);
            filter: blur(4px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes puff-in-center {
  0% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(4px);
            filter: blur(4px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}


@-webkit-keyframes puff-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(4px);
            filter: blur(4px);
    opacity: 0;
  }
}
@keyframes puff-out-center {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(4px);
            filter: blur(4px);
    opacity: 0;
  }
}



// .v-enter-active{
//   animation: puff-in-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
//    -webkit-animation:  puff-in-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
// }
// .v-leave-active {
// 	animation: puff-out-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
//   -webkit-animation: puff-out-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
// }



</style>
