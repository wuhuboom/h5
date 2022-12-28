//能发生ajax请求异步的函数模块
//封装axios库
//函数的返回值是promise对象
// import axios from 'axios'
import Vue from 'vue'
import VueI18n from 'vue-i18n';
import messages from '../locale/index'

Vue.use(VueI18n);

// ,timeout=10000
export default function ajax(url, data = {}, method = 'GET', token = '') {

	return new Promise((resolve, reject) => {

		const i18n = new VueI18n({
			locale: uni.getStorageSync('ft_lang') ? uni.getStorageSync('ft_lang') : 'en',
			messages,
		});

		//创建一个Vue实例，并传入i18n去绑定多语言
		const vueInstance = new Vue({
			i18n
		});


		let promise;
		let header = {}
		if (token) {
			header.token = token
		}
		header['Content-Type'] = 'application/x-www-form-urlencoded'
		promise = uni.request({
			url,
			data,
			method,
			header
		});
		// console.log("promise",promise);
		promise.then(response => {

			if (response[0]) { //如果这个为1,可能有错误
				// resolve({code:-101,msg:'超时了'})
				console.log("Have error", response[0].errMsg);
				uni.showToast({
					title: "Have error" + response[0].errMsg,
					icon: "none",
					duration: 2000
				});
			} else {
				// console.log("response[1].data",response[1].data);
				let resG = response[1].data
				if (resG.code === 200 || resG.code === 409 || resG.code === 104 || resG.code === 106) {
					resolve(response[1].data)
				} else if (resG.code === 401 || resG.code === 402 || resG.code ===
					403) { //401-无权访问 402-未登录或者登录失效 403-账号已被禁用
					let vue = new Vue();
					vue.$store.commit('logout')
					uni.showToast({
						icon: 'none',
						title: resG.msg,
						success: () => {
							uni.reLaunch({
								url: '/pages/login/login',
							});
						}
					});

					// reject(resG.msg)
				} else if (resG.code === 103) { //表单提交项验证未通过
					let currData = resG.data[0]
					let currMsgKey = currData.msgKey
					// console.log("vue",vueInstance.$t(`backapi.${currMsgKey}`));
					uni.showToast({
						icon: 'none',
						title: vueInstance.$t(`backapi.${currMsgKey}`)
					});
					if (currMsgKey == "codeError") {
						resolve(response[1].data)
					} else if (currMsgKey == "phoneNotBind") {
						resolve(response[1].data)
					} else if (currMsgKey == "codeTimeOut") {
						resolve(response[1].data)
					}

					// reject(currData)
				} else if (resG.code === 105) { //特定报错信息提示
					let currData = resG.data
					if (currData.length !== 0) {
						let msgStr = ""
						let timeStr = ""
						let failStr = ""
						let showMsg = ""
						if (currData.length === 3) {
							msgStr = currData[0].msgKey
							timeStr = currData[1].msgKey
							failStr = currData[2].value
							showMsg = vueInstance.$t(`backapi.${msgStr}`) + failStr +
								vueInstance.$t(`backapi.pwdErrorCountRight`) + " " +
								vueInstance.$t(`backapi.waittime1`) + " " + timeStr + " " + vueInstance
								.$t(
									`backapi.waittime2`)
						} else if (currData.length === 2) {

							if (currData[0].msgKey == 'pwdErrorCount') {
								failStr = currData[1].value
								showMsg = vueInstance.$t(`backapi.pwdErrorCountLeft`) + failStr +
									vueInstance.$t(`backapi.pwdErrorCountRight`)
							} else if (currData[0].msgKey == 'pwdErrorMax' || currData[0].msgKey ==
								'loginFrozening') {
								timeStr = currData[1].msgKey
								showMsg = vueInstance.$t(`backapi.waittime1`) + " " + timeStr + " " +
									vueInstance
									.$t(`backapi.waittime2`)
							}
						}

						uni.showToast({
							icon: 'none',
							duration: 3000,
							title: showMsg
						});


						resolve(response[1].data)
					}



				} else if (resG.code === 107) { //充值维护/短信维护
					uni.showToast({
						title: resG.msg,
						icon: "none",
						duration: 3000
					});
				} else if (resG.code === 500) { //出错的响应
					uni.showToast({
						icon: 'none',
						title: 'System Error,Please Contact Management'
					});
					reject("error-" + resG.code)
				}
				// resolve(response[1].data)
			}
		}).catch(error => {
			console.log("Request error" + error);
			// console.log("请求出错了"+error.message);
			// message.error("请求出错了"+error.message)
			// 请求出错了timeout of 10000ms exceeded
			// if(error.message.indexOf('timeout') !== -1){ //超时了,返回对应的
			//     resolve({code:-101,msg:'超时了'})
			// }else{
			//     // Message({
			//     //     showClose: true,
			//     //     message: "请求出错了"+error.message,
			//     //     type: 'error'
			//     // });
			// }


		})



	})


}


export function addQueryString_real(params) {

	let paramsData = '';
	for (let Key in params) { //for..in 遍历对象的可枚举属性包括自身属性与原型 的属性
		paramsData += `${Key}=${params[Key]}&`;
	}
	paramsData = paramsData.substr(0, paramsData.length - 1);
	return paramsData;
}


export function addQueryString_objectKey(params) {

	// params={name:'张三',age:'18'}
	let requestUrl = ""
	//直接返回以key为索引的数组,如['name','age']
	let currArray = Object.keys(params) //仅遍历对象自身的可枚举属性
	currArray.forEach(item => {
		requestUrl = requestUrl + item + "=" + params[item] + "&"
	})


	if (requestUrl !== '') {
		// 删除最后一个字符 几种方式
		requestUrl = requestUrl.substr(0, requestUrl.length - 1);
		// requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf('&'));
	}

	// console.log("requestUrl",requestUrl)

	return requestUrl

	// let paramsData = '';
	// for (var Key in params) {
	//     paramsData += `${Key}=${params[Key]}&`;
	// }
	// paramsData = paramsData.substr(0, paramsData.length - 1);
	// return paramsData;
}
