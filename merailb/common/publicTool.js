//全局请求基础域名或IP接口
export function toDecimal2(x) { //金额处理两位小数点
	var f = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
}


// ---------------------时间类方法

// export function get(){ //获取当天0点时间戳
// 	return new Date(new Date().toLocaleDateString()).getTime()/1000 + 1
// }


export function getminTime10(i) { //获取前i天00点00分01秒时间戳
	if (i == 1) { //如果为1，则返回当天的00点00分01秒时间戳
		return new Date(new Date().toLocaleDateString()).getTime() / 1000 + 1
	} else if (i == -1) { //如果为-1，则返回昨天的00点00分01秒时间戳
		return new Date(new Date().toLocaleDateString()).getTime() / 1000 - 24 * 60 * 60 + 1
	} else {
		return new Date(new Date().toLocaleDateString()).getTime() / 1000 - i * 24 * 60 * 60 + 1
	}
}

export function getMaxTime10(i) { //获取前i天23点59分59秒时间戳
	if (i == 1) { //如果为1，则返回当天的23点59分59秒时间戳
		return new Date(new Date().toLocaleDateString()).getTime() / 1000 + 24 * 60 * 60 - 1
	} else { //否则返回前几天的23点59分59秒时间戳
		// console.log("进来");
		return new Date(new Date().toLocaleDateString()).getTime() / 1000 - ((i - 1) * 24 * 60 * 60) - 1
	}
}

//13位时间戳的处理   
export function formatDateToStr(value) {
	var date = new Date();
	date.setTime(value);
	var month = date.getMonth() + 1;
	var hours = date.getHours();
	if (hours < 10) {
		hours = "0" + hours;
	}
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	var second = date.getSeconds();
	if (second < 10) {
		second = "0" + second;
	}
	var time = date.getFullYear() + "-" + month + "-" + date.getDate() +
		" " + hours + ":" + minutes + ':' + second;
	return time;
}


//13位时间戳的处理   
export function formatDateTimeSolt(inputTime, num) {
	var date = new Date(inputTime * num);
	// var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}


//13位时间戳转时间处理，格式自定义  
export function formatSoltDateTime(inputTime, num) {
	var date = new Date(inputTime * num);
	// var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return d + '-' + m + '-' + y + ' ' + h + ':' + minute + ':' + second;
}



//时间戳转日期时间型工具类
export function formatDateTime(inputTime) {
	var date = new Date(inputTime * 1000);
	// var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}




export const getTimeState = () => {
	// 获取当前时间
	let timeNow = new Date();
	// 获取当前小时
	let hours = timeNow.getHours();
	// 设置默认文字
	let text = ``;
	// 判断当前时间段
	if (hours >= 0 && hours <= 10) {
		text = `早上好`;
	} else if (hours > 10 && hours <= 14) {
		text = `中午好`;
	} else if (hours > 14 && hours <= 18) {
		text = `下午好`;
	} else if (hours > 18 && hours <= 24) {
		text = `晚上好`;
	}
	// console.log(`hours >>>>>`, hours);
	// console.log(`text >>>>`, text);
	// 返回当前时间段对应的状态
	return text;
};


// //输出网址地址
// export default {  
//   websiteUrl,
//   webSocketUrl,
//   imageSiteUrl
//   // now,  
//   // isArray  
// }


/**
 *  获取当前时间戳（10位）
 */
export function timestampTen() {
	let outcome = Math.round(new Date().getTime() / 1000).toString();
	return outcome
}


//获取当前日期
export function getCurrentDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year + "-" + formatZero(month) + "-" + formatZero(day);
}


//格式化日期时间
function formatZero(n) {
	if (n >= 0 && n <= 9) {
		return "0" + n;
	} else {
		return n;
	}
}



// 获取日期方法（date为当天日期，i为相隔天数，例如：获取明天日期，则将i=1传入）
export function getDate(date, i) {
	if (date === undefined || date === null) {
		date = new Date();
	}
	let month, day;
	date.setTime(date.getTime() + i * 24 * 60 * 60 * 1000);
	month = date.getMonth() + 1 < 10 ? '0' + parseInt(date.getMonth() + 1) : date.getMonth() + 1;
	day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	let time = date.getFullYear() + "-" + month + "-" + day;
	return time;
}


export function randomString(e) {
	e = e || 32;
	var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz",
		a = t.length,
		n = "";
	for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n
}


//生成min到max的随机数
export function randomNum(minNum, maxNum) {
	switch (arguments.length) {
		//如果只传入一个参数
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}


export function getRandomNum(minNum, maxNum, decimalNum) {
	var max = 0,
		min = 0
	minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum)
	switch (arguments.length) {
		case 1:
			return Math.floor(Math.random() * (max + 1))
		case 2:
			return Math.floor(Math.random() * (max - min + 1) + min)
		case 3:
			return (Math.random() * (max - min) + min).toFixed(decimalNum)
		default:
			return Math.random()
	}
}


// 截取指定个数,字符串中间替换成特殊字符
export function forMate(str, start = 1, end = 1, middle = '***') {
	const startStr = str.slice(0, start)
	const endStr = str.slice(str.length - end, str.length)

	return startStr + middle + endStr
}
