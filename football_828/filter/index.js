const filters = {
	moneyFormat: function(money) {
		if (money * 1) { //如果非数字的,不能进行转换
			return money / 100;
		} else {
			return money;
		}
	},
	splitDate: function(value) {
		// console.log("value", value, typeof value);
		if (value) {
			return value.substr(0, 10)
		} else {
			return ''
		}
	},
	splittTime: function(value) {
		return value.substr(-8)
	}
}

export default (vm) => {
	Object.keys(filters).forEach(key => {
		vm.filter(key, filters[key])
	})
}
