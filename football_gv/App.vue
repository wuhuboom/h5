<script>
	import {
		mapMutations
	} from 'vuex'
	// import VConsole from './static/vconsole.min.js'
	// import eruda from './static/eruda.js'


	export default {
		globalData: {
			kefuaddress: '', //这里是客服在线地址(此处失效,已改为接口获取)
			fontUrlStr: '', //这里修改字体文件的服务器路径,仅支持http,不支持https
			webTitle: 'gvfootball',
		},
		methods: {
			...mapMutations(['login'])
		},
		onLaunch: function() {
			let fontUrl = getApp().globalData.fontUrlStr
			let simHeiFontUrl = fontUrl + "/ttf_fonts/SimHei.ttf"
			let GBFontUrl = fontUrl + "/ttf_fonts/Hiragino-Sans-GB-W3.ttf"
			// console.log("fontUrl",fontUrl);
			// console.log('App Launch')
			let langStr = uni.getStorageSync('foot_lang')
			// console.log("langStr", langStr);
			if (!langStr) {
				uni.setStorageSync('foot_lang', 'en')
			}



			// // console.log("lang",langStr);
			// this.$i18n.locale = langStr
			try {
				const userInfo = uni.getStorageSync('userInfoFootball') || '';
				if (userInfo.user) {
					// console.log(userInfo);
					uni.getStorage({
						key: 'userInfoFootball',
						success: (res) => {
							this.login(res.data)
						}
					});
				} else {
					// uni.reLaunch({
					// 	url:`/pages/login/login`,
					// 	success() {
					// 		uni.clearStorageSync()
					// 	}
					// })
				}
			} catch (e) {

				// error

			};



			// setTimeout(() => {

			// 	uni.loadFontFace({
			// 		global: true,
			// 		family: 'SimHei',
			// 		source: 'url("' + simHeiFontUrl + '")',
			// 		success() {
			// 			// console.log('loadingFontSuccess')
			// 		}
			// 	})

			// 	uni.loadFontFace({
			// 		global: true,
			// 		family: 'Hiragino Sans GB',
			// 		source: 'url("' + GBFontUrl + '")',
			// 		success() {
			// 			// console.log('loadingFontSuccess')
			// 		}
			// 	})

			// }, 300)


		},
		onShow: function() {
			// console.log('App Show')
			// let console_pre = 'height: 20px;line-height:20px;background: #B58F44; color: #fff; border-radius: 3px 0 0 3px;'
			// let console_back = 'height: 20px;line-height:20px;background: #007AFF; color: #fff; border-radius: 0 3px 3px 0;'

			//#ifdef H5
			let console_pre =
				'height: 20px;line-height:20px;background: #39455E; color: #fff; border-radius: 3px 0 0 3px;'
			let console_back =
				'height: 20px;line-height:20px;background: #007AFF; color: #fff; border-radius: 0 3px 3px 0;'
			console.log(`%c football %c Welcome to this platform `, console_pre, console_back)

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

<style>
	/* @import url("~@/common/animate.css"); */
	@import 'uview-ui/theme.scss';
	/*每个页面公共css */
	@import url("./static/iconfont/iconfont.css");
	@import url("./static/iconfont2/iconfont.css");
	@import url("./static/iconfont3/iconfont.css");

	html {
		display: inline-flex;
	}


	uni-toast {
		z-index: 1002;
	}

	uni-tabbar .uni-tabbar .uni-tabbar__item {
		margin-top: 6px;
		padding-bottom: 20px;

	}

	uni-toast .uni-sample-toast .uni-simple-toast__text {
		color: #00ff65;
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
	    src: url('/ttf_fonts/SimHei.ttf') 
	    format('truetype');
	} */
</style>
