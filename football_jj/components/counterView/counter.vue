<!-- 自定义倒计时组件 -->
<template>
	<!-- timerStrCounter -->
	<span class="countVier">{{timerStrCounter}}</span>
</template>

<script>
	export default {
		name: "counter",
		props: {
			endtime: {
				type: Number,
				required: true,
			},
			test: {
				type: String,
			}
		},
		filters: {
			formateStr(val) { //先不用过滤器,过滤器中没有this		
				let time = val / 1000
				// console.log("time",time);
				if (time > 0) {
					let day = parseInt(time / (60 * 60 * 24))
					let hr = parseInt((time % (60 * 60 * 24)) / (60 * 60))
					let min = parseInt((time % 3600) / 60)
					let sec = parseInt(time % 60)

					let show_day = day > 9 ? day : '0' + day

					// let show_day = day * 24
					let show_hr = hr > 9 ? hr : '0' + hr
					let show_min = min > 9 ? min : '0' + min
					let show_sec = sec > 9 ? sec : '0' + sec
					let timeStr = show_day + ":" + show_hr + ":" + show_min + ":" + show_sec
					// console.log("(show_day + show_hr)",(show_day + show_hr*1));
					// let timeStr =  (show_day + show_hr*1)+":"+show_min+":"+show_sec

					return timeStr
				} else {
					clearInterval(this.countInterVal)
					return "00:00:00"
				}

			}
		},
		data() {
			return {
				currRemainingTime: 0,
				now: 0,
				showBool: false,
				countInterVal: null,
			}
		},
		onShow() {
			// console.log("dataSrc",this.endtime);
		},
		methods: {
			// formate(t){
			// 	return parseInt(t) / 1000
			// }
		},
		computed: {
			'timerStrCounter'() {
				// if(!this.showBool){
				// 	this.currRemainingTime = this.endtime
				// 	this.showBool = true
				// }

				// console.log("this.currRemainingTime",this.currRemainingTime);
				let time = this.currRemainingTime / 1000
				// console.log("time",time);
				if (time > 0) {
					let day = parseInt(time / (60 * 60 * 24))
					let hr = parseInt((time % (60 * 60 * 24)) / (60 * 60))
					let min = parseInt((time % 3600) / 60)
					let sec = parseInt(time % 60)

					// let show_day = day > 9 ? day : '0' + day

					let show_day = day * 24
					let show_hr = hr > 9 ? hr : '0' + hr
					let show_hr_two = (show_day + show_hr * 1)
					let show_hr_confirm = show_hr_two > 9 ? show_hr_two : '0' + show_hr_two
					// let show_hr_confirm = show_hr_two
					let show_min = min > 9 ? min : '0' + min
					// let show_min = min
					let show_sec = sec > 9 ? sec : '0' + sec
					let timeStr = show_hr_confirm + ":" + show_min + ":" + show_sec
					// let show_sec = sec
					// let timeStr = show_day + ":" + show_hr + ":" + show_min + ":" + show_sec
					// console.log("(show_day + show_hr)",(show_day + show_hr*1));
					// let timeStr = ""
					// if (show_hr_confirm > 0) {
					// 	timeStr = show_hr_confirm + "h" + show_min + "m" + show_sec + "s"
					// } else {
					// 	timeStr = show_min + "m" + show_sec + "s"
					// }


					// console.log("timeStr",timeStr);
					return timeStr
				} else {
					clearInterval(this.countInterVal)
					return "0h0m0s"
				}

				// console.log("computed的时间",this.currRemainingTime);
				// return this.currRemainingTime
			},
		},
		onShow() {

		},
		created() {

		},
		mounted() {
			// console.log("item.remainingTime",this.test+"-"+this.endtime);
			// console.log("test",this.test);
			this.currRemainingTime = null
			this.currRemainingTime = this.endtime

			this.countInterVal = setInterval(() => {
				this.currRemainingTime = this.currRemainingTime - 1000
			}, 1000);
		},
		onUnload() {
			clearInterval(this.countInterVal)
		},
		onHide() {
			clearInterval(this.countInterVal)
		}
	}
</script>

<style>
	.countVier {
		/* margin-left: 5px; */
	}
</style>
