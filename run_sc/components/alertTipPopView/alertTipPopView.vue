<template>
	<!-- 自定义弹窗,二次封装 -->
	<view class="">
		<uni-popup ref="popup" :mask-click="true" :is-mask-click="true" mask-background-color="rgba(0,17,28,.45)" >
			<view class="helpModalViewCenter" v-if="showAlertTipNum === 1">
				{{$t('match.content.list.alert.left.text')}}{{ballNum}}{{$t('match.content.list.alert.right.text')}}
			</view>
			
			<view class="helpModalViewCenter" v-else>
				{{$t('match.content.list.alert.main.left.text')}}{{ballNum}}{{$t('match.content.list.alert.main.right.text')}}
			</view>
		</uni-popup>
	</view>
	
<!-- 	<view class="" @click="maskClickEvent">
		<view class="maskTip" >
			
		</view>
		<view class="maskContent">
			<view class="popWrap">
				<view class="helpModalViewCenter" v-if="showAlertTipNum === 1">
					{{$t('match.content.list.alert.left.text')}}{{ballNum}}{{$t('match.content.list.alert.right.text')}}
				</view>
				
				<view class="helpModalViewCenter" v-else>
					{{$t('match.content.list.alert.main.left.text')}}{{ballNum}}{{$t('match.content.list.alert.main.right.text')}}
				</view>
			</view>
		</view>
	</view> -->
</template>

<script>
	export default{
		name:'alertTipPopView',
		emits: ['change', 'maskClick'],
		props:{
			showAlertTipNum:{
				type:Number,
				default:1
			},
			ballNum:{
				type:Number,
				require:true
			},
			isMaskClick:{
				type:Boolean,
				defalut:false
			}
		},
		data(){
			return {
				maskTipBool:false,
				maskShowBool:false,
			}
		},
		mounted() {
			// console.log("isMaskClick",this.isMaskClick,this.ballNum);
		},
		computed:{
			
		},
		// watch:{
		// 	// ballNum(newItemVal,oldItemVal){
		// 	// 	console.log("newItemVal,oldItemVal",newItemVal,oldItemVal);
		// 	// }
		// 	ballNum: {
		// 		// 数据发生变化就会调用这个函数  
		// 		handler(newVal, oldVal) {
		// 			console.log('oldVal:', oldVal)
		// 			console.log('newVal:', newVal)
		// 		},
		// 		// 立即处理 进入页面就触发
		// 		immediate: true
		// 	}
		// },
		onShow() {
			
		},
		methods:{
			openTip(){
				this.$refs.popup.open('center')
				// this.maskShowBool = true
			},
			maskClickEvent(){
				// this.maskTipBool = !this.maskTipBool
				
			
				if(this.isMaskClick){
					this.maskShowBool = false
					console.log("maskClick");
				}
				
				// this.$emit('maskClick')
				// console.log("点击事件");
			}
		}
	}
</script>

<style>
	
	.helpModalViewCenter{
		max-width: 200px;
		max-height: 50px;
		/* margin: 20px; */
		padding: 8px 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #00FF65;
		border-radius:7px;
		background: #334756;
	}
	
	.maskTip{
		opacity: 1;
		position: fixed;
		inset: 0px;
		background-color: rgba(0, 17, 28, 0.45);
		transition: opacity 300ms ease 0ms, -webkit-transform 300ms ease 0ms, transform 300ms ease 0ms;
		transform-origin: 50% 50%;
	}
	
	.maskContent{
	    transform: scale(1);
	    opacity: 1;
	    position: fixed;
	    display: flex;
	    flex-direction: column;
	    inset: 0px;
	    justify-content: center;
	    align-items: center;
	    transition: opacity 300ms ease 0ms, -webkit-transform 300ms ease 0ms, transform 300ms ease 0ms;
	    transform-origin: 50% 50%;
	}
	
	.popWrap{
		display: block;
		position: relative;
		background-color: transparent;
	}
	
</style>