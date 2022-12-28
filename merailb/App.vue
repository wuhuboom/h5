<script>
	import {
		mapMutations
	} from 'vuex'
	// import VConsole from './static/vconsole.min.js'
	// import eruda from './static/eruda.js'
	export default {
		globalData: {
			webTitle: 'merailb',
		},
		methods: {
			...mapMutations(['login'])
		},
		onLaunch: function() {

			uni.hideTabBar();
			let langStr = uni.getStorageSync('merailb_lang')
			if (!langStr) {
				uni.setStorageSync('merailb_lang', 'en')
			}

			// // console.log("lang",langStr);
			// this.$i18n.locale = langStr

			try {
				const userInfo = uni.getStorageSync('userInfoMerailb') || '';
				if (userInfo) {
					// console.log(userInfo);
					uni.getStorage({
						key: 'userInfoMerailb',
						success: (res) => {
							// console.log("res", res);
							this.login(res.data)
						}
					});
				} else {

				}
			} catch (e) {

				// error

			};

		},
		onShow: function() {
			// console.log('App Show')
			//#ifdef H5
			let console_pre =
				'height: 20px;line-height:20px;background: #6dcab8; color: #fff; border-radius: 3px 0 0 3px;'
			let console_back =
				'height: 20px;line-height:20px;background: #3a78cb; color: #fff; border-radius: 0 3px 3px 0;'
			console.log(`%c Version %c 1.5.0 `, console_pre, console_back)
			//#endif

		},
		onHide: function() {
			// console.log('App Hide')
		},
		mounted() {
			// new VConsole();
			// eruda.init();
		}
	}
</script>

<style lang="scss">
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/* @import url("~@/common/animate.css"); */
	@import 'uview-ui/theme.scss';
	/*每个页面公共css */
	@import url("./static/iconfont/iconfont.css");


	view,
	text {
		box-sizing: border-box;
	}

	uni-tabbar.uni-tabbar-bottom .uni-tabbar {
		border-radius: 20px 20px 0 0;
		background: #fff;
		border: unset;
		box-shadow: 0 -3px 6px 0 rgba(91, 125, 239, 20%);
	}

	uni-tabbar .uni-tabbar .uni-tabbar__item {
		margin-top: 4px;
		padding-bottom: 8px;
	}

	uni-toast .uni-sample-toast .uni-simple-toast__text {
		color: #fff;
	}



	/* uni-tabbar.uni-tabbar-bottom .uni-tabbar {
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
	} */

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}



	/* 	@font-face{
		font-family:'SimHei';
	    src: url('http://47.241.62.70:3777/ttf_fonts/SimHei.ttf') 
	    format('truetype');
	} */
</style>
