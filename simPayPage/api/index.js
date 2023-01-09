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
// curWwwPath = 'http://39.108.156.81:8080'



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

// 提交的请求接口
export const uploadCertificatReq = (queryParam, token) => {
	return ajax(requestCurr + '/user/v2/uploadCertificate', queryParam, 'POST', token)
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
