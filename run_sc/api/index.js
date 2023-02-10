// import {websiteUrl,webSocketUrl,imageSiteUrl} from "../common/base.js"
import ajax, {
	addQueryString_objectKey,
	addQueryString_real
} from './ajax'

// let requestCurr = "/curr"
// let requestCurr = ""

//#ifdef H5
//获取当前网址，如： http://localhost:8888/eeeeeee/aaaa/vvvv.html
var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
//#endif

//#ifndef H5
let curWwwPath = ""
let pathName = ""
//#endif

var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8888
var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/abcd
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

// 如需配置文件生效(根目录直接拿出来,二级目录需单独提前config文件出来)
curWwwPath = BASEPATH
// curWwwPath = 'http://192.168.1.1:10100'


let hashUrl = curWwwPath.split('/#')[0]
// console.log("hashUrl",hashUrl);
let webHashUrl = ""
let websiteUrl
if (hashUrl.indexOf('https:') !== -1) {
	// console.log("存在",hashUrl);
	webHashUrl = hashUrl.split('https://')[1].split('/')[0]
	websiteUrl = 'https://' + webHashUrl;
} else {
	// console.log("不存在",hashUrl);
	webHashUrl = hashUrl.split('http://')[1].split('/')[0]
	websiteUrl = 'http://' + webHashUrl;
}


//全局请求基础域名或IP接口
// const websiteUrl = 'http://' + webHashUrl;
const webSocketUrl = 'ws://' + webHashUrl;

// console.log("websiteUrl", websiteUrl);

let requestCurr = websiteUrl

// console.log("requestCurr",requestCurr);

export const MaxWidthNum = 750
export const websiteUrlStr = websiteUrl

//#ifdef H5
// 获取当前(域名/ip+端口)
export const newWebAddress = window.location.host
//#endif


//#ifndef H5
export const newWebAddress = curWwwPath
//#endif


// 获取验证码请求接口
export const generateCaptchaReq = () => {
	return ajax(requestCurr + '/runner/v2/generateCaptcha', {}, 'POST')
}

// 登录的请求接口(正常情况下)
export const loginReq = (queryParam) => {
	return ajax(requestCurr + '/runner/v2/login', queryParam, 'POST')
}

// 注册的请求接口
export const registerReq = (queryParam) => {
	return ajax(requestCurr + '/runner/v2/register', queryParam, 'POST')
}


// 注销的请求接口
export const logoutReq = (token) => {
	return ajax(requestCurr + '/runner/v2/logOut', '', 'POST', token)
}

// 获取个人信息
export const getMeReq = (token) => {
	return ajax(requestCurr + '/runner/v2/getMe', {}, 'POST', token)
}

//获取轮播图
export const getSlideshowReq = (queryParam, token) => {
	return ajax(requestCurr + '/runner/v2/getSlideshow', queryParam, 'POST', token)
}


// 获取公告通知接口
export const getAnnouncementReq = (token) => {
	return ajax(requestCurr + '/runner/v2/getAnnouncement', {}, 'POST', token)
}

// 获取客服地址
export const servReq = (token) => {
	return ajax(requestCurr + '/runner/v2/getCustomerServiceAddress', {}, 'POST', token)
}

// 银行卡UPI操作
export const bankUpiReq = (queryParam, token, operate) => {
	return ajax(requestCurr + '/runner/v2/setUpi?action=' + operate, queryParam, 'POST', token)
}

// 开始/停止接单
export const imWorkingReq = (queryParam, token) => {
	return ajax(requestCurr + '/runner/v2/imWorking', queryParam, 'POST', token)
}

// 获取接单订单
export const getReceiveCollectionOrderReq = (queryParam, token) => {
	return ajax(requestCurr + '/runner/v2/getReceiveCollectionOrder', queryParam, 'POST', token)
}


// 确认接单状态按钮点击
export const confirmTheOrderReq = (queryParam, token) => {
	return ajax(requestCurr + '/runner/v2/confirmTheOrder', queryParam, 'POST', token)
}

// 接单代付情况
export const getCollectionDetailReq = (queryParam, token, type) => {
	return ajax(requestCurr + '/runner/v2/getCollectionDetail?action=' + type, queryParam, 'POST', token)
}

// 排行榜
export const rankingListReq = (queryParam, token) => {
	return ajax(requestCurr + '/runner/v2/rankingList?action=accumulative', queryParam, 'POST', token)
}

// 接单记录
export const getCollectionRecordReq = (queryParam, token) => {
	return ajax(requestCurr + '/runner/v2/getCollectionRecord', queryParam, 'POST', token)
}

// 账变记录
export const getChangeAmountReq = (queryParam, token) => {
	return ajax(requestCurr + '/runner/v2/getChangeAmount', queryParam, 'POST', token)
}

//提现
export const withdrawalReq = (queryParam, token) => {
	return ajax(requestCurr + '/runner/v2/withdraw', queryParam, 'POST', token)
}







// 获取初始请求地址和初始请求ws地址
export const requestWebsiteUrl = websiteUrl
export const requestWebSocketUrl = webSocketUrl


/**
 * 已知前后文 取中间文本
 * @param str 全文
 * @param start 前文
 * @param end 后文
 * @returns 中间文本 || null
 */
export function getStr(str, start, end) {
	let res = str.match(new RegExp(`${start}(.*?)${end}`))
	return res ? res[1] : null
}
