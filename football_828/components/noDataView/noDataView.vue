<template>
	<view class="noDataView">
		<image :src="imageUrl" mode=""></image>
		<view class="noDataViewTitle">
			{{$t('nodata.text')}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "noDataView",
		props: {
			iconStr: {
				type: String,
				require: true
			},
			// iconNormal:'../../static/images/nodata.png',
			// iconOrder:'../../static/images/order-record.png',
			// iconRecharge:'../../static/images/recharge-record.png',
			// iconWithdraw:'../../static/images/withdraw-record.png',
		},
		computed: {
			imageUrl() {
				switch (this.iconStr) {
					case 'order':
						return '../../static/images/order-record.png'
					case 'recharge':
						return '../../static/images/recharge-record.png'
					case 'withdraw':
						return '../../static/images/withdraw-record.png'
					default: //上述条件都不满足时，默认执行的代码
						return '../../static/images/noData-c.svg'
				}
			}

		},
		data() {
			return {

			}
		},
		methods: {
			aaa() {
				switch (id) {
					case 1:
						console.log("普通会员");
						break; //停止执行，跳出switch
					case 2:
						console.log("VIP会员");
						break; //停止执行，跳出switch
					case 3:
						console.log("管理员");
						break; //停止执行，跳出switch
					default: //上述条件都不满足时，默认执行的代码
						console.log("游客");
				}
			}
		}
	}
</script>

<style>
	.noDataView {
		padding-top: 40px;
		text-align: center;
		font-weight: 400;
		font-size: 12px;
		color: #334756;
	}

	.noDataView image {
		width: 75px;
		height: 75px;
	}

	.noDataViewTitle {
		line-height: 15px;
	}
</style>
