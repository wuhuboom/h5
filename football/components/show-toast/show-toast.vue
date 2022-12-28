<template>
	<view class="_showToast" v-show="show">
		<view class="_shade"></view>
		<view class="_ToastBox">
			<view class="Toast-box">
				<!-- <view style="height: 10px;"></view> -->
		<!-- 		<image v-if="icon=='success'" class="Toast-icon" src="@/static/success.png"></image>
				<text v-if="icon=='success'" class="Toast-title-success">{{title}}</text>
				<image v-if="icon=='fail'" class="Toast-icon" src="@/static/fail.png"></image>
				<text v-if="icon=='fail'" class="Toast-title-fail">{{title}}</text> -->
				<text class="Toast-subtitle">{{content}}</text>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		name:"show-toast",
		data() {
			return {
				
			};
		},
		computed: {
			show(){
				return this.$toastStore.state.show;
			},
			title(){
				return this.$toastStore.state.title;
			},
			content(){
				return this.$toastStore.state.content;
			},
			icon(){
				return this.$toastStore.state.icon;
			}	
		},
		mounted() {
			setTimeout(()=>{
				this.$toastStore.commit('hideToast')
				// this.$toastStore.commit('success',"confirm")
			},3000)
		},
		methods:{
			closeToast(){
				this.$toastStore.commit('hideToast')
			},
			clickBtn(res){
				this.$toastStore.commit('hideToast')
				this.$toastStore.commit('success',res)
			}
		},
		beforeDestroy(){
			this.$toastStore.commit('hideToast')
		},
	}
</script>

<style lang="scss" scoped>
._showToast{
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
		// background: #000;
		// opacity: .6;
		z-index:11000;
	}
	._ToastBox{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index:12000;
		display: flex;
		justify-content: center;
		align-items: center;
		.Toast-box{
			  position: absolute;
			  min-width: 40px;
			  min-height: 30px;
			  top:50%;
			  left: 50%;
			  transform: translate(-50%,-50%);
			  background: #00111c;
			  box-shadow: 0px 10px 20px 0px rgba(28, 23, 47, 0.2);
			  border-radius: 5px;
			  display: flex;
			  flex-direction: column;
			  align-items: center;
			  .Toast-icon{
				  width: 71px;
				  height: 71px;
				  display: block;
				  margin-top:17px;
			  }
			  .Toast-title-fail{
				  font-size: 20px;
				  font-family: Source Han Sans CN;
				  font-weight: bold;
				  color: #EC4E4E;
				  margin-top: 18px;
			  }
			  .Toast-title-success{
				  font-size: 20px;
				  font-family: Source Han Sans CN;
				  font-weight: bold;
				  color: #26B156;
				  margin-top: 18px;
			  }
			  .Toast-subtitle{
				  font-size: 12px;
				  font-family: Source Han Sans CN;
				  font-weight: 400;
				  // color: #666666;
				  color: #00ff65;
				  margin-top: 6px;
				  padding: 0 12px 0 12px;
				  text-align: center;
			  }
		}
	}				
}	
</style>
