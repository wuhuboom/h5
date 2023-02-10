const filters = {
  moneyFormat: function (money) {
	if(money*1){  //如果非数字的,不能进行转换
		return money/100;
	}else{
		return money;
	}
  }
}

export default (vm) => {
  Object.keys(filters).forEach(key => {
    vm.filter(key, filters[key])
  })
}
