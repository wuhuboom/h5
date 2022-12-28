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

// 登录的请求接口
export const loginReq = (queryParam) => {
	return ajax(requestCurr + '/player/auth/login', queryParam, 'POST')
}

// 登录的请求接口(新设备)
export const loginNewReq = (queryParam) => {
	return ajax(requestCurr + '/player/auth/login_new', queryParam, 'POST')
}


// 注销的请求接口
export const logoutReq = (token) => {
	return ajax(requestCurr + '/player/auth/logout', '', 'GET', token)
}

// 注册时是否获取系统配置,是否需要邀请码,是否需要手机验证码,区号列表
export const sysConfigReq = () => {
	return ajax(requestCurr + '/player/auth/sys_config', '', 'GET', '')
}


// 注册的请求接口
export const registerReq = (queryParam) => {
	return ajax(requestCurr + '/player/auth/regist', queryParam, 'POST')
}


// 获取验证码请求接口
export const verifyCodeReq = (verifyKey) => {
	return ajax(requestCurr + '/player/auth/verify_code?verifyKey=' + verifyKey, 'GET')
}

// 校验验证码
export const verifyCodeCheckReq = (verifyKey, code) => {
	return ajax(requestCurr + '/player/auth/verify_code_check?verifyKey=' + verifyKey + "&code=" + code, 'GET')
}

// 提现密码是否设置
export const getPwdPayReq = (token) => {
	return ajax(requestCurr + '/player/getPwdPay', '', 'GET', token)
}

// 设置提现密码
export const setPwdPayReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/setPwdPay', queryParam, 'POST', token)
}


// 修改提现密码
export const editPwdPayReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/v2/change_pwd_pay', queryParam, 'POST', token)
}

// 找回提现密码(需要验证码)
export const editPwdPayNeedCodeReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/v2/phone_change_pwd_pay', queryParam, 'POST', token)
}


//获取轮播图
export const sliderReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/home/slider', queryParam, 'GET', token)
}

// 获取滚动广告
export const swiperReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/home/swiper', queryParam, 'GET', token)
}

// 获取公告通知接口
export const noticeReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/home/notice', queryParam, 'GET', token)
}

// 获取公告通知接口(修改为已读状态)
export const noticeReadReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/home/notice/read', queryParam, 'GET', token)
}

// 获取热门赛事
export const hotReq = (token) => {
	return ajax(requestCurr + '/player/home/hot', '', 'GET', token)
}

// 获取个人信息
export const playerInfoReq = (token) => {
	return ajax(requestCurr + '/player/player_info', '', 'GET', token)
}

// 修改登录密码请求接口
export const editPwdReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/auth/editPwd', queryParam, 'POST', token)
}

// 查询全部赛事(POST),赛事结果传ID过来(GET)
export const gameReq = (queryParam, token, type = 'POST') => {
	return ajax(requestCurr + '/player/game', queryParam, type, token)
}

// 查询赛事结果
export const gameFinishReq = (queryParam, token, type = 'POST') => {
	return ajax(requestCurr + '/player/game/finished', queryParam, type, token)
}

// 下注前准备获取的信息
export const preReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/bet/pre', queryParam, 'POST', token)
}

// 赛事下注
export const betReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/bet', queryParam, 'POST', token)
}

// 订单中心
export const betsReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/bets', queryParam, 'POST', token)
}

// 订单中心-今日订单
export const betsTodayReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/bets/today', queryParam, 'POST', token)
}

// 订单中心详情
export const betInfoReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/betInfo', queryParam, 'GET', token)
}

// 取消订单
export const unbetReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/unbet', queryParam, 'GET', token)
}

//余额变动记录
export const balanceChangeReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/balance_change', queryParam, 'POST', token)
}

// 数据中心
export const dataCenterReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/data_center', queryParam, 'POST', token)
}

// 数据中心下级详情
export const dataCenterDetailReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/data_center/detail', queryParam, 'POST', token)
}

// 返佣中心-提取
export const rebateDrawReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/rebate_draw', queryParam, 'POST', token)
}

//返佣中心-列表
export const rebateListReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/rebate_list', queryParam, 'POST', token)
}

// 返佣中心-统计
export const rebateStatisReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/rebate_statis', queryParam, 'GET', token)
}

//个人报表-列表
export const reportFormReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/report_form', queryParam, 'POST', token)
}

//团队报表-列表
export const reportFormTeamReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/report_form_team', queryParam, 'POST', token)
}

//用户列表
export const subPlayersReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/sub_players', queryParam, 'POST', token)
}

// 充值准备
export const rechargePreReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/recharge_pre', queryParam, 'GET', token)
}

// 充值
export const rechargeReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/recharge', queryParam, 'POST', token)
}

// 虚拟币添加
export const usdtAddReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/virtual_currency_add', queryParam, 'POST', token)
}


// 虚拟币修改
export const usdtEditReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/virtual_currency_edit', queryParam, 'POST', token)
}


// 虚拟币列表
export const usdtListReq = (token) => {
	return ajax(requestCurr + '/player/virtual_currency_list', '', 'POST', token)
}

// 绑定银行卡
export const bindBankCardReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/bind_bank_card', queryParam, 'POST', token)
}

// 修改银行卡
export const bindBankCardEditReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/bind_bank_card_edit', queryParam, 'POST', token)
}


// 获取银行列表
export const banksReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/banks', queryParam, 'GET', token)
}


// 获取已绑定的银行卡信息
export const bankCardInfo = (token) => {
	return ajax(requestCurr + '/player/bank_card_info', '', 'GET', token)
}

// 获取sim信息
export const simCardInfoInfo = (token) => {
	return ajax(requestCurr + '/player/sim_card_info', '', 'GET', token)
}

//绑定sim号
export const bindSimCardReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/bind_sim_card', queryParam, 'POST', token)
}

//修改绑定sim号
export const bindSimCardEditReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/bind_sim_card_edit', queryParam, 'POST', token)
}

//获取充值记录
export const rechargeLogReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/recharge_log', queryParam, 'POST', token)
}


//获取提现记录
export const withdrawLogReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/withdrawal_log', queryParam, 'POST', token)
}

//提现
export const withdrawalReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/withdrawal', queryParam, 'POST', token)
}

//获取提现前的数据，提现准备
export const withdrawalPreReq = (token) => {
	return ajax(requestCurr + '/player/withdrawal_pre', '', 'GET', token)
}

// 获取客服地址(临时)
export const servTmpReq = (token) => {
	return ajax(requestCurr + '/player/home/serv_tmp', '', 'GET', token)
}

// 获取客服地址
export const servReq = (token) => {
	return ajax(requestCurr + '/player/home/serv', '', 'GET', token)
}

// 获取APP下注地址
export const appUrlReq = (token) => {
	return ajax(requestCurr + '/player/home/app_url', '', 'GET', token)
}


// 换绑手机号
export const phoneBindReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/v2/phone_bind', queryParam, 'POST', token)
}


// 修改登录密码(需短信验证码)
export const phoneChangePwdReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/v2/phone_change_pwd', queryParam, 'POST', token)
}


// 找回登录密码
export const changePwdOnlineReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/v2/change_pwd_online', queryParam, 'POST', token)
}


// 获取手机验证码-未登录状态
export const notLoginchangePwd = (queryParam, token) => {
	return ajax(requestCurr + '/player/v2/phone_code/change_pwd', queryParam, 'POST', token)
}


// 获取手机验证码-登录状态(需手机号)
export const phoneCodeReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/v2/phone_code', queryParam, 'POST', token)
}


// 获取手机验证码(无需手机号)
export const phoneCodeOnlineReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/v2/phone_code/online', queryParam, 'POST', token)
}


//获取手机验证码-未登录状态-需要填写用户名
export const phoneCodeNeedNameReq = (queryParam, token) => {
	return ajax(requestCurr + '/player/v2/phone_code/username', queryParam, 'POST', token)
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
