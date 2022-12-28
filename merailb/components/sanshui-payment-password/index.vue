<template>
	<view>
		<sanshuiModal ref="ssModal" :mode="_parentMode" :position="_parentPosition" @change="changeModal">
			<view class="digital-keyboard-modal" :class="'digital-keyboard-modal-' + _mode">
				<view class="dk-close" v-if="_mode !== 1 && _mode !== 4" @click="close()">
					<icon type="clear" color="#333" :size="u50"></icon>
				</view>
				<swiper class="dk-swiper" :current="current">
					<swiper-item @touchmove.prevent.stop>
						<view class="dk-title">{{_titleObj.title}}</view>
						<view class="dk-subtitle">{{_titleObj.subTitle}}</view>
						<view class="pwd-box clearfix" @click="getKeyboard">
							<view class="pwd-text" v-for="(item,index) in _digits" :key="index" :data-index="index"
								:class="{active:(activeInput == index)}">{{payPassWord[index]}}</view>
						</view>
					</swiper-item>
					<!-- 设置新安全密码 -->
					<block v-if="_mode === 2 || _mode === 5">
						<swiper-item @touchmove.prevent.stop>
							<view class="dk-title">{{_titleObj.title}}</view>
							<view class="dk-subtitle">{{_titleObj.twoSubTitle}}</view>
							<view class="pwd-box clearfix" @click="getKeyboard">
								<view class="pwd-text" v-for="(item,index) in _digits" :key="index" :data-index="index"
									:class="{active:(activeInput==index)}">{{payPassWord[index]}}</view>
							</view>
						</swiper-item>
					</block>
					<!-- 修改安全密码 -->
					<block v-else-if="_mode === 3">
						<swiper-item @touchmove.prevent.stop>
							<view class="dk-title">{{_titleObj.twoTitle}}</view>
							<view class="dk-subtitle">{{_titleObj.twoSubTitle}}</view>
							<view class="pwd-box clearfix" @click="getKeyboard">
								<view class="pwd-text" v-for="(item,index) in _digits" :key="index" :data-index="index"
									:class="{active:(activeInput==index)}">{{payPassWord[index]}}</view>
							</view>
						</swiper-item>
						<swiper-item @touchmove.prevent.stop>
							<view class="dk-title">{{_titleObj.threeTitle}}</view>
							<view class="dk-subtitle">{{_titleObj.threeSubTitle}}</view>
							<view class="pwd-box clearfix" @click="getKeyboard">
								<view class="pwd-text" v-for="(item,index) in _digits" :key="index" :data-index="index"
									:class="{active:(activeInput==index)}">{{payPassWord[index]}}</view>
							</view>
						</swiper-item>
					</block>
				</swiper>
				<block v-if="_mode !== 1 && _mode !== 4">
					<view class="pwd-tips">安全密码为6位数字，用于提现、设置密保、添加银行卡等操作，可保障资金安全</view>
					<view class="pwd-tips pwd-tips-errot">{{msgText}}</view>
				</block>
				<view class="pwd-forget">
					<text v-if="_forget && _mode === 1" @click="forgetPwd">忘记安全密码</text>
				</view>
				<view class="digital-keyboard"
					:class="{'digital-keyboard-show' : dkFlag || _mode === 1 || _mode === 4}">
					<view class="dk-down" v-if="_mode !== 1 && _mode !== 4">
						<block v-if="showPrevText">
							<view class="dk-submit dk-return" @click="changeSwiper(-1)">上一步</view>
						</block>
						<view class="dk-down-icon" @click="changeKeyboard(!dkFlag)"></view>
						<block v-if="trigger === 'auto' && !(_mode === 2 && current === 0)">
							<view class="dk-submit" @click="submit(true)">完成</view>
						</block>
					</view>
					<view class="digital-key-box clearfix">
						<view class="num" v-for="item in digitalList" :key="item"
							:class="{'no-num':(item === '' || item === '-1')}" @click="getKeyNumber(item)">{{item}}
						</view>
					</view>
				</view>
			</view>
		</sanshuiModal>
	</view>
</template>

<script>
	//依赖的弹窗模块
	import sanshuiModal from '@/components/sanshui-modal'
	export default {
		components: {
			sanshuiModal
		},
		data() {
			return {
				activeInput: 0, //当前输入的下标
				digitalList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '-1'], //键盘
				paymentPwd: '', //安全密码内容
				dkFlag: true, //安全密码键盘的显示与隐藏
				current: 0,
				paymentPwds: [], //上一次安全密码内容,历史安全密码,
				msgText: '',
				u50: uni.upx2px(50)
			};
		},
		props: {
			value: {
				type: String,
				default: ''
			},
			digits: {
				type: [Number, String],
				default: 6
			},
			forget: {
				type: Boolean,
				default: true
			},
			/*
			 *	可选值说明（这一个顺序最好不要改，跟当前步骤步进行有关系，自动提交要用到mode跟current的判断  是否要自动提交）
			 *	1 安全密码校验（用于校验安全）
			 *	2 设置安全密码（2步  输入=》确认输入）
			 *	3 修改安全密码（3步 原安全密码=》输入=》确认输入）
			 *	4 找回登录密码(同mode = 1一样，就怕后端校验接口不一样而额外添加的一个mode)
			 *	5 重置安全密码
			 */
			mode: {
				type: [Number, String],
				default: 1
			},
			/*
			 *	可选值说明
			 *	hand 手动
			 *	auto 自动
			 */
			trigger: {
				type: String,
				default: 'auto'
			},
			userName: {
				type: String,
				default: ''
			}
		},
		computed: {
			payPassWord() {
				var payPassWord = this.paymentPwd.split('') || [];
				payPassWord.fill('*');
				return payPassWord;
			},
			_forget() {
				return String(this.forget) === 'false' ? false : true;
			},
			_digits() {
				return isNaN(this.digits) ? 6 : parseInt(this.digits);
			},
			_mode() {
				if (isNaN(this.mode) || !this.mode) {
					return 1;
				}
				return +this.mode
			},
			_titleObj() {
				let arr = [{
						// title: '输入安全密码',
						// subTitle: '请输入安全密码',
						title: 'Enter the payment password',
						subTitle: 'Please enter the payment password'
					},
					// {
					// 	title: '设置安全密码',
					// 	subTitle: '请设置安全密码',
					// 	twoSubTitle: '请再次输入安全密码以确认'
					// },
					// {
					// 	title: '修改安全密码',
					// 	twoTitle: '设置安全密码',
					// 	threeTitle: '设置安全密码',
					// 	subTitle: '请输入安全密码 以验证身份',
					// 	twoSubTitle: '请设置新的安全密码',
					// 	threeSubTitle: '请再次输入安全密码以确认',
					// },
					// {
					// 	title: '输入安全密码',
					// 	subTitle: '请输入安全密码'
					// },
					// {
					// 	title: '重置安全密码',
					// 	subTitle: '请输入安全密码',
					// 	twoSubTitle: '请再次输入安全密码以确认'
					// }
				]
				return arr[this._mode - 1];
			},
			_parentMode() {
				return this._mode === 1 || this._mode === 4 ? 'full' : 'cover';
			},
			_parentPosition() {
				return this._mode === 1 || this._mode === 4 ? 'bottom' : 'middle';
			},
			showPrevText() {
				return this.current >= (this._mode - 1) || (this._mode === 5 && this.current > 0) ? true : false;
			}
		},
		methods: {
			// 模态框显示或者关闭的回调
			changeModal(e) { // 返回是一个Boolean值
				if (e) {
					this.current = 0;
					this.changeKeyboard(); //默认拉起键盘
				} else {
					this.changeKeyboard(false); //默认拉起键盘
					this.clearAll();
				}
			},
			// 开关键盘
			changeKeyboard(flag = true) {
				this.dkFlag = flag;
				!flag && (this.activeInput = -1);
			},
			/*
				pro可选址
				show	显示
				hide	隐藏
				toggle	动态判断
			*/
			modalFun(pro) {
				this.$refs.ssModal[pro]();
			},
			clear() {
				this.paymentPwd = '';
				this.activeInput = 0;
				this.paymentPwds.splice(this.current, 1);
			},
			clearAll() {
				this.paymentPwd = '';
				this.activeInput = 0;
				this.current = 0;
				this.paymentPwds = [];
			},
			showError(msg) {
				if (!msg) return this.msgText = '';
				if (this._mode !== 1 && this._mode !== 4) {
					this.msgText = msg;
				} else {
					uni.showToast({
						title: msg
					})
				}
			},
			forgetPwd() {
				// console.log('这里是忘记密码跳转逻辑');
			},
			cancel() {
				this.$emit('cancel');
			},
			close() {
				let tips = '';
				if (this._mode === 2) {
					tips = '您是否要放弃设置安全密码';
				} else if (this._mode === 5) {
					tips = '您是否要放弃重置安全密码';
				} else {
					tips = '您是否要放弃修改安全密码';
				}
				uni.showModal({
					title: '关闭提示',
					content: tips,
					confirmText: '我再想想',
					cancelText: '关闭',
					success: (res) => {
						if (!res.confirm) {
							this.modalFun('hide');
						}
					}
				})
			},
			submit(clickFlag) { //clickFlag主动点击
				if (this.trigger !== 'auto' && !clickFlag) return;
				if (this.paymentPwd.length !== this._digits) {
					this.showError('请输入' + this._digits + '位安全密码');
				} else {
					this.showError('');
					if (this._mode === 5 || this._mode === 4 || this.current >= (this._mode - 1)) {
						if (this._mode === 5 && this.current === 0) { //下一步，再次输入
							return this.changeSwiper(1);
						}
						if (this.current > 0) { //需要校验2次安全密码的是否相等
							if (this.paymentPwd !== this.paymentPwds[this.current - 1]) {
								this.showError('两次安全密码输入不一致');
								setTimeout(() => {
									this.paymentPwd = '';
									this.paymentPwds[this.current] = '';
									this.activeInput = 0;
								}, 300)
								return;
							}
							this.showError('');
							if (this._mode === 2) { //设置安全密码
								uni.showLoading({
									title: '正在设置密码'
								});
								// 如果不把逻辑卸载这里面，直接把setTimeout删除即可
								setTimeout(() => { //模拟请求，把这个换成ajax请求哈，或者emit出去 外面去请求，但是建议都集成在这边 省的写一堆重置代码
									uni.hideLoading();
									let response = { //模拟返回
										code: 1,
										value: this.paymentPwd
									}
									if (response.code === 1) {
										this.$emit('submit', { //这里是传出去给调用者的，参数任意下，只要能区分就行
											type: 'reset',
											value: this.paymentPwd
										});
										this.modalFun('hide');
									}
								}, 1000)
							} else { //修改安全密码
								uni.showLoading({
									title: '正在重置密码'
								});
								// 如果不把逻辑卸载这里面，直接把setTimeout删除即可
								setTimeout(() => { //模拟请求，把这个换成ajax请求哈，或者emit出去 外面去请求，但是建议都集成在这边 省的写一堆重置代码
									uni.hideLoading();
									let response = { //模拟返回
										code: 1,
										msg: '重置新安全密码成功'
									}
									if (response.code === 1) {
										this.$emit('submit', {
											type: 'modify',
											value: this.paymentPwd
										});
										this.modalFun('hide');
									}
								}, 1000)
							}
							return;
						}
						this.checkSafePwd('check');
					} else {
						if (this._mode === 3 && this.current === 0) { //校验安全密码正确性
							this.checkSafePwd('verify');
							return;
						}
						this.changeSwiper(1);
					}
				}
			},
			checkSafePwd(type) {
				uni.showLoading({
					title: 'loading'
					// title: '校验安全密码中'
				});
				setTimeout(() => { //模拟请求，把这个换成ajax请求哈，或者emit出去 外面去请求，但是建议都集成在这边 省的写一堆重置代码
					uni.hideLoading();
					this.$emit('submit', { //设置或者重置新安全密码
						type: 'check',
						value: this.paymentPwd
					});
					this.modalFun('hide');
					// let response = { //模拟返回
					// 	code: 1,
					// 	msg: '密码正确'
					// }
					// if (response.code === 1) {
					// 	if (type === 'check') {
					// 		this.$emit('submit', { //设置或者重置新安全密码
					// 			type: 'check',
					// 			value: this.paymentPwd
					// 		});
					// 		this.modalFun('hide');
					// 	} else {
					// 		this.changeSwiper(1); //执行下一步
					// 	}
					// } else {
					// 	this.clear();
					// 	if (type !== 'check') {
					// 		this.showError(response.msg);
					// 	}
					// }
				}, 300)
			},
			changeSwiper(num) {
				if (isNaN(num)) {
					num = 1;
				}
				this.current += num;
				this.paymentPwd = this.paymentPwds[this.current] || '';
				let activeInput = this.paymentPwd.length
				this.activeInput = activeInput - (activeInput >= this._digits ? 1 : 0);
			},
			getKeyNumber(val) {
				let paymentPwdArr = this.paymentPwd.split('');
				if (val === '' || (val != -1 && paymentPwdArr.length === this._digits)) { //空或者已经达到最大值
					if (paymentPwdArr.length === this._digits && this.trigger === 'auto') {
						this.submit();
						return;
					}
					return false;
				} else if (val != -1) { //数字输入
					paymentPwdArr.splice(this.activeInput, 0, val);
					this.activeInput++;
					this.paymentPwd = paymentPwdArr.join('');
					this.paymentPwds[this.current] = this.paymentPwd;
					if (paymentPwdArr.length === this._digits && this.trigger === 'auto') {
						this.submit();
						return;
					}
				} else { //删除
					if (this.activeInput >= 0) {
						this.activeInput !== 0 && this.activeInput--;
						paymentPwdArr.splice(this.activeInput, 1);
						this.paymentPwd = paymentPwdArr.join('');
						this.paymentPwds[this.current] = this.paymentPwd;
					}
				}
			},
			getKeyboard(e) {
				let index = e && e.target.dataset.index;
				if (index === undefined) {
					this.activeInput = 0;
					this.changeKeyboard(false);
					return;
				}
				var _length = this.paymentPwd.length;
				this.activeInput = index <= _length ? index : _length;
				this.changeKeyboard();
			}
		}
	}
</script>

<style lang="scss">
	.digital-keyboard-modal {
		height: 100%;
		background-color: #fff;

		&.digital-keyboard-modal-1,
		&.digital-keyboard-modal-4 {
			height: auto;
			border-radius: 20px 20px 0px 0px;
			background: #fff url(data:image/png;base64,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) center top / 100% auto no-repeat;
			padding-padding: 0;
			padding-padding: constant(safe-area-inset-top);
			padding-padding: env(safe-area-inset-top);
		}

		&.digital-keyboard-modal-2,
		&.digital-keyboard-modal-5,
		&.digital-keyboard-modal-3 {
			padding-top: 180rpx;

			.dk-title {
				color: #000;
			}

			.digital-keyboard {
				width: 100%;
				position: fixed;
				bottom: 0;
				left: 0;
				position: fixed;
				left: 0;
				bottom: 0;
			}
		}

		.dk-title {
			font-size: 36rpx;
			font-weight: 800;
			color: #fff;
			line-height: 90rpx;
			text-align: center;
		}

		.dk-swiper {
			height: 260rpx;
		}

		.dk-submit {
			position: absolute;
			right: 0;
			top: 0;
			padding: 0 20rpx;
			color: #38f;
			font-size: 28rpx;
			line-height: 70rpx;
		}

		.dk-return {
			right: auto;
			left: 0;
		}


		.dk-close {
			position: fixed;
			left: 30rpx;
			top: 30rpx;
		}

		.dk-subtitle {
			font-size: 24rpx;
			color: rgba(152, 152, 148, 1);
			line-height: 3;
			text-align: center;
		}

		.dk-down {
			text-align: center;
			line-height: 70rpx;
			box-shadow: 0 0 0 2rpx #eee;

			.dk-down-icon {
				border-left: 1px solid #bbb;
				border-bottom: 1px solid #bbb;
				width: 40rpx;
				height: 40rpx;
				display: inline-block;
				transform: scale(.5) rotate(-45deg);
			}
		}

		.pwd-tips {
			color: #666;
			font-size: 24rpx;
			line-height: 1.5;
			padding: 15rpx 100rpx;
		}

		.pwd-tips-errot {
			color: #ff4242;
			font-size: 30rpx;
			text-align: center;
		}

		.pwd-forget {
			font-size: 24rpx;
			color: #26C6B3;
			padding: 20rpx 0 30rpx;
			text-align: center;
			line-height: 33rpx;
		}

		.digital-keyboard {
			box-shadow: 0 -1rpx 0 3rpx #eee;
			width: 100%;
			transition: all .2s linear;
			transform: translateY(100%);
		}

		/* 键盘 */
		.digital-key-box {
			box-shadow: 0 0 0 2rpx #eee;
			position: relative;
			overflow: hidden;
			width: 100%;
		}

		.digital-keyboard-show {
			transform: translateY(0);
		}

		.num {
			transition: all .2s linear;
			float: left;
			background-color: #fff;
			box-shadow: 0 0 0 2rpx #eee;
			width: 33.33333333%;
			cursor: pointer;
			height: 100rpx;
			text-align: center;
			color: #333;
			line-height: 100rpx;
			font-size: 55rpx;
			font-weight: bold;
			position: relative;
			overflow: hidden;

			&:after {
				content: "";
				display: block;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				pointer-events: none;
				//设置径向渐变
				background-image: radial-gradient(circle, rgba(0, 0, 0, .65) 20%, transparent 20%);
				background-repeat: no-repeat;
				background-position: 50%;
				transform: scale(5);
				opacity: 0;
				transition: transform .2s ease-in-out, opacity .3s ease-in-out;
			}

			&:active:after {
				transform: scale(0);
				opacity: .5;
				//设置初始状态
				transition: 0s;
			}
		}

		.num:nth-of-type(3n+1) {
			border-bottom: 0;
			border-left: 0;
		}

		.num:nth-of-type(3n+2) {
			border-bottom: 0;
			border-left: 0;
			border-right: 0;
		}

		.num.no-num {
			background-color: #fff;
			font-size: 0;
		}


		.num:last-child {
			background: #fff url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+6YCA5qC8PC90aXRsZT4KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuiuouWNlS3lvLnnqpciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMDAuMDAwMDAwLCAtNzc2LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUwLjAwMDAwMCwgNzY1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IumAgOagvCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAuMDAwMDAwLCAxMS4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwIiB4PSIwLjA0NzkwNDE5MTYiIHk9IjAiIHdpZHRoPSIyMy45NTIwOTU4IiBoZWlnaHQ9IjI0Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIyLjcwNjU4NjgsNC42MzIgQzIzLjA3Mzg1MjMsNC42MzIgMjMuMzc3MjQ1NSw0Ljc1MiAyMy42MTY3NjY1LDQuOTkyIEMyMy44NTYyODc0LDUuMjMyIDIzLjk3NjA0NzksNS41MiAyMy45NzYwNDc5LDUuODU2IEwyMy45NzYwNDc5LDE4LjI0IEMyMy45NzYwNDc5LDE4LjU3NiAyMy44NTYyODc0LDE4Ljg2NCAyMy42MTY3NjY1LDE5LjEwNCBDMjMuMzc3MjQ1NSwxOS4zNDQgMjMuMDczODUyMywxOS40NjQgMjIuNzA2NTg2OCwxOS40NjQgTDcuMzc3MjQ1NTEsMTkuNDY0IEw3LjM1MzI5MzQxLDE5LjQ2NCBMNy4zMDUzODkyMiwxOS40NjQgQzcuMjI1NTQ4OSwxOS40NjQgNy4xMDk3ODA0NCwxOS40NDggNi45NTgwODM4MywxOS40MTYgQzYuODA2Mzg3MjMsMTkuMzg0IDYuNjkwNjE4NzYsMTkuMzM2IDYuNjEwNzc4NDQsMTkuMjcyIEw2LjU4NjgyNjM1LDE5LjI0OCBMNi41NjI4NzQyNSwxOS4yMjQgTDAuNDMxMTM3NzI1LDEzLjIgTDAuNDMxMTM3NzI1LDEzLjE3NiBDMC4xNDM3MTI1NzUsMTIuOTM2IDAsMTIuNTYgMCwxMi4wNDggQzAsMTEuODA4IDAuMDM1OTI4MTQzNywxMS41OTIgMC4xMDc3ODQ0MzEsMTEuNCBDMC4xNzk2NDA3MTksMTEuMjA4IDAuMjc5NDQxMTE4LDExLjA0OCAwLjQwNzE4NTYyOSwxMC45MiBMNi41Mzg5MjIxNiw0LjkyIEM2LjU3MDg1ODI4LDQuODg4IDYuNjUwNjk4Niw0Ljg0IDYuNzc4NDQzMTEsNC43NzYgQzYuOTM4MTIzNzUsNC42OCA3LjEzNzcyNDU1LDQuNjMyIDcuMzc3MjQ1NTEsNC42MzIgTDIyLjcwNjU4NjgsNC42MzIgTDIyLjcwNjU4NjgsNC42MzIgWiBNMTkuNTY4ODYyMywxNS40MzIgQzE5LjcxMjU3NDksMTUuMjA4IDE5LjczNjUyNjksMTUuMDA4IDE5LjY0MDcxODYsMTQuODMyIEMxOS41NDQ5MTAyLDE0LjY1NiAxOS4zODUyMjk1LDE0LjQ1NiAxOS4xNjE2NzY2LDE0LjIzMiBDMTguODkwMjE5NiwxMy45NiAxOC41MTg5NjIxLDEzLjYwOCAxOC4wNDc5MDQyLDEzLjE3NiBDMTcuNTc2ODQ2MywxMi43NDQgMTcuMDY5ODYwMywxMi4yOCAxNi41MjY5NDYxLDExLjc4NCBDMTcuMTE3NzY0NSwxMS4yMjQgMTcuNjYwNjc4NiwxMC43MDQgMTguMTU1Njg4NiwxMC4yMjQgQzE4LjY1MDY5ODYsOS43NDQgMTkuMDMzOTMyMSw5LjM2OCAxOS4zMDUzODkyLDkuMDk2IEMxOS40OTcwMDYsOC45MiAxOS41OTI4MTQ0LDguNzE2IDE5LjU5MjgxNDQsOC40ODQgQzE5LjU5MjgxNDQsOC4yNTIgMTkuNDg5MDIyLDguMDQ4IDE5LjI4MTQzNzEsNy44NzIgQzE5LjI0OTUwMSw3Ljg0IDE5LjIwMTU5NjgsNy43OTYgMTkuMTM3NzI0Niw3Ljc0IEMxOS4wNzM4NTIzLDcuNjg0IDE5LjAyNTk0ODEsNy42NDggMTguOTk0MDEyLDcuNjMyIEMxOC43NzA0NTkxLDcuNDg4IDE4LjU1MDg5ODIsNy40MzIgMTguMzM1MzI5Myw3LjQ2NCBDMTguMTE5NzYwNSw3LjQ5NiAxNy45MjQxNTE3LDcuNiAxNy43NDg1MDMsNy43NzYgQzE3LjQ3NzA0NTksOC4wNDggMTcuMDkzODEyNCw4LjQxNiAxNi41OTg4MDI0LDguODggQzE2LjEwMzc5MjQsOS4zNDQgMTUuNTc2ODQ2Myw5Ljg0IDE1LjAxNzk2NDEsMTAuMzY4IEMxNC41MjI5NTQxLDkuOTA0IDE0LjA2Mzg3MjMsOS40NjggMTMuNjQwNzE4Niw5LjA2IEMxMy4yMTc1NjQ5LDguNjUyIDEyLjg3MDI1OTUsOC4zMTIgMTIuNTk4ODAyNCw4LjA0IEMxMi4yOTU0MDkyLDcuNzIgMTIuMDIzOTUyMSw3LjUzNiAxMS43ODQ0MzExLDcuNDg4IEMxMS41NDQ5MTAyLDcuNDQgMTEuMzI5MzQxMyw3LjQ3MiAxMS4xMzc3MjQ2LDcuNTg0IEMxMS4xMDU3ODg0LDcuNjE2IDExLjAyOTk0MDEsNy42NzIgMTAuOTEwMTc5Niw3Ljc1MiBDMTAuNzkwNDE5Miw3LjgzMiAxMC43MTQ1NzA5LDcuODg4IDEwLjY4MjYzNDcsNy45MiBDMTAuNDc1MDQ5OSw4LjA5NiAxMC40MDcxODU2LDguMzE2IDEwLjQ3OTA0MTksOC41OCBDMTAuNTUwODk4Miw4Ljg0NCAxMC43ODY0MjcxLDkuMTc2IDExLjE4NTYyODcsOS41NzYgQzExLjQ0MTExNzgsOS44MTYgMTEuNzc2NDQ3MSwxMC4xMzIgMTIuMTkxNjE2OCwxMC41MjQgQzEyLjYwNjc4NjQsMTAuOTE2IDEzLjA1Mzg5MjIsMTEuMzQ0IDEzLjUzMjkzNDEsMTEuODA4IEMxMy4wMjE5NTYxLDEyLjI4OCAxMi41NTA4OTgyLDEyLjczMiAxMi4xMTk3NjA1LDEzLjE0IEMxMS42ODg2MjI4LDEzLjU0OCAxMS4zMzczMjUzLDEzLjg4OCAxMS4wNjU4NjgzLDE0LjE2IEMxMC44NDIzMTU0LDE0LjM2OCAxMC42NjI2NzQ3LDE0LjYgMTAuNTI2OTQ2MSwxNC44NTYgQzEwLjM5MTIxNzYsMTUuMTEyIDEwLjQwMzE5MzYsMTUuMzQ0IDEwLjU2Mjg3NDMsMTUuNTUyIEMxMC41OTQ4MTA0LDE1LjU4NCAxMC42NjI2NzQ3LDE1LjY0OCAxMC43NjY0NjcxLDE1Ljc0NCBDMTAuODcwMjU5NSwxNS44NCAxMC45MzgxMjM4LDE1LjkwNCAxMC45NzAwNTk5LDE1LjkzNiBDMTEuMTkzNjEyOCwxNi4xMTIgMTEuNDQ1MTA5OCwxNi4xNzIgMTEuNzI0NTUwOSwxNi4xMTYgQzEyLjAwMzk5MiwxNi4wNiAxMi4yNzk0NDExLDE1Ljg5NiAxMi41NTA4OTgyLDE1LjYyNCBDMTIuODIyMzU1MywxNS4zNTIgMTMuMTczNjUyNywxNS4wMDQgMTMuNjA0NzkwNCwxNC41OCBDMTQuMDM1OTI4MSwxNC4xNTYgMTQuNTA2OTg2LDEzLjcwNCAxNS4wMTc5NjQxLDEzLjIyNCBDMTUuNTYwODc4MiwxMy43MzYgMTYuMDYzODcyMywxNC4yMTIgMTYuNTI2OTQ2MSwxNC42NTIgQzE2Ljk5MDAyLDE1LjA5MiAxNy4zNjUyNjk1LDE1LjQ1NiAxNy42NTI2OTQ2LDE1Ljc0NCBDMTcuODYwMjc5NCwxNS45MzYgMTguMDk5ODAwNCwxNi4wNjQgMTguMzcxMjU3NSwxNi4xMjggQzE4LjY0MjcxNDYsMTYuMTkyIDE4Ljg2NjI2NzUsMTYuMTYgMTkuMDQxOTE2MiwxNi4wMzIgTDE5LjEzNzcyNDYsMTUuOTM2IEMxOS4xMzc3MjQ2LDE1LjkzNiAxOS4xOTc2MDQ4LDE1Ljg2OCAxOS4zMTczNjUzLDE1LjczMiBDMTkuNDM3MTI1NywxNS41OTYgMTkuNDg5MDIyLDE1LjUzMiAxOS40NzMwNTM5LDE1LjU0IEMxOS40NTcwODU4LDE1LjU0OCAxOS40ODkwMjIsMTUuNTEyIDE5LjU2ODg2MjMsMTUuNDMyIFoiIGlkPSLlvaLnirYiIGZpbGw9IiM5OTk5OTkiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) center center / auto 50rpx no-repeat;
		}

		.pwd-box {
			padding-left: 10rpx;
			position: relative;
			text-align: center;
		}

		.pwd-text {
			position: relative;
			line-height: 110rpx;
			vertical-align: middle;
			text-align: center;
			font-size: 50rpx;
			font-weight: bold;
			width: 92rpx;
			height: 92rpx;
			margin-right: 10rpx;
			display: inline-block;
			box-shadow: 0 0 0 2rpx #ccc;
			overflow: hidden;
		}

		.pwd-text.active:after {
			-webkit-animation: twinkle 1s infinite;
			animation: twinkle 1s infinite;
			height: 70%;
			width: 4rpx;
			content: '';
			position: absolute;
			top: 15%;
			left: 50%;
			margin-left: -2rpx;
			background-color: #4fa5e1;
		}

		@keyframes twinkle {
			from {
				background-color: #4fa5e1;
			}

			to {
				background-color: transparent;
			}
		}
	}
</style>
