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
			let langStr = uni.getStorageSync('run_lang')
			// console.log("langStr", langStr);
			if (!langStr) {
				uni.setStorageSync('run_lang', 'en')
			}



			// // console.log("lang",langStr);
			// this.$i18n.locale = langStr
			try {
				const userInfo = uni.getStorageSync('userInfoRunSc') || '';
				// console.log(userInfo);
				if (userInfo) {
					uni.getStorage({
						key: 'userInfoRunSc',
						success: (res) => {
							// console.log("res", res.data);
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
	// /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	// @import './tuniao-ui/index.scss';
	// @import './tuniao-ui/iconfont.css';

	/* @import url("~@/common/animate.css"); */

	// @import "./tm-vuetify/mian.min.css";
	// /* 主题包 */
	// @import "./tm-vuetify/scss/theme.css";

	@import 'uview-ui/theme.scss';
	/*每个页面公共css */
	@import url("./static/iconfont/iconfont.css");
	@import url("./static/iconfont2/iconfont.css");
	@import url("./static/iconfont3/iconfont.css");

	/*每个页面公共css uParse为优化版本,这个是thorui组件*/
	@import './common/app.css';
	/* #ifndef APP-NVUE */
	@import './components/uni/uParse/src/wxParse.css';
	/* #endif */


	html {
		display: inline-flex;
	}


	uni-toast {
		z-index: 1002;
	}

	uni-tabbar .uni-tabbar .uni-tabbar__item {
		margin-top: 6px;
		padding-bottom: 6px;
	}

	// uni-toast .uni-sample-toast .uni-simple-toast__text {
	// 	color: #00ff65;
	// }

	/* uni-tabbar.uni-tabbar-bottom .uni-tabbar {
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;
	} */

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}



	/* @font-face{
	font-family:'SimHei';
	src: url('/ttf_fonts/SimHei.ttf')
	format('truetype');
	} */
</style>
