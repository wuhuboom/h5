<template>
	<view class="accountReportPage">
		<uni-nav-bar
			backgroundColor	="#00111C"
			color="#fff"
			:statusBar="true"
			:border="false"
			@clickLeft="goBackBtnClick"
			style="font-weight: 600;"
			:fixed="true"
		>
			<block slot="left">
				<view class="navLeftBtn">
					<image src="../../../static/images/back.svg" mode=""></image>
				</view>
			</block>
		
			<view class="navTitleCenter">{{navTitle}}</view>
		</uni-nav-bar>
		
		<view class="accountListContainer">
			<u-input
				v-model="searchUsername"
				:clearable = "false"
				height="80" 
				:custom-style="customStyleInput" 
				:placeholder="placeholderAccount" 
				placeholder-style="color:#506778;font-size:12px"
			/>
			<view class="searchBox">
				<view class="searchBoxList" @click="searchBoxListClick">
					<view class="searchInputShow">
						{{initSearchInputText}}
					</view>
					<span :class="!showListBool?arrowClass:arrowClassActive"></span>
					<view class="inputSearchList" :style="!showListBool?'display: none;':''">
						<scroll-view scroll-y="true" class="scrollInputSearchList">
							
							<view class="inputSearchListItem" v-for="(item,index) in inputSearchListItemArray" :key="index" @click="inputSearchListItemClick(item,index)">
								<view class="">
									{{item.nameStr}}
								</view>
								<image v-if=" currentIndex == index " src="../../../static/images/dian.png" mode=""></image>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="searchBtn" @click="searchWhereBtnClick">
					{{$t('user.report.account.list.center.search.where.query.search.text')}}
				</view>
			</view>
			<view class="tableBox">
				<view class="tableBoxCenterTitle">
					<view class="tableBoxCenterTitleItem">
						{{$t('user.report.account.list.center.list.head.username.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('user.report.account.list.center.list.head.date.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('user.report.account.list.center.list.head.money.text')}}
					</view>
					<view class="tableBoxCenterTitleItem">
						{{$t('user.report.account.list.center.list.head.status.text')}}
					</view>
				</view>
				<view class="tableBoxBody">
					
					<mescroll-uni ref="mescrollRef" :fixed="true" height="900"  top="0" :topbar="false" bottom="0" :bottombar="true" :safearea="false"  @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" >
											
						
						<view class="tableBoxBodyTBody" v-for="(item, index) in dataAccountList" :key="item.id">
							<view class="tableBoxBodyTBodyItem tBodyItemUserName">
								{{item.username}}
								<!-- {{item.createdAt | timestampStrSlice}} -->
							</view>
							<view class="tableBoxBodyTBodyItem tBodyItemDate">
								{{item.theNewLoginTime | timestampStr}}
								<!-- {{item.betMoney | moneyFormat}} ({{item.id}}) -->
							</view>
							
							<view class="tableBoxBodyTBodyItem tBodyItemMoney" >
								<!-- {{item|statusToStr|moneyFormat}} -->
								{{item.balance | moneyFormat}}
							</view>
							<view class="tableBoxBodyTBodyItem" :style="item.status === 1 ? 'color:#00FF65' :'color:#fff'">
								<!-- {{$t('order.center.list.head.detail.text')}} -->
								{{item.status === 1 ? $t('user.report.account.list.center.list.data.status.text') : $t('user.report.account.list.center.list.data.unable.text')}}
							</view>
						</view>
											
					</mescroll-uni>
					
				</view>
				
				
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import {
		subPlayersReq
	} from '@/api/index.js'
	import {myMixin} from '@/util/mixins.js'
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/football/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin,myMixin], // ??????mixin
		components: {
			MescrollBodyDiy // ?????????main.js?????????????????????????????????,????????????????????????(iOS?????? APP HBuilderX2.7.9)
		},
		data() {
			return {
				navTitle:this.$t('user.report.account.list.center.title.text'),
				searchUsername:'',
				customStyleInput:{
					"border-radius": "5px",
					"background-color": "#334756",
					"text-indent": "10px",
					"color":"#fff"
				},
				placeholderAccount:this.$t('user.report.account.list.center.search.where.input.account.text'),
				initSearchInputText:this.$t('user.report.account.list.center.search.where.all.text'),
				inputSearchListItemArray:[{
					nameStr:this.$t('user.report.account.list.center.search.where.all.text'),
				},{
					nameStr:this.$t('user.report.account.list.center.search.where.fbd.text'),
				},{
					nameStr:this.$t('user.report.account.list.center.search.where.query.text'),
				}],
				showListBool:false,
				arrowClass:'iconfont icon-arrow-down rightArrow',
				arrowClassActive:'iconfont icon-arrow-down rightArrow rightArrowActive',
				currentIndex:0,
				dataAccountList:[],
				
				mescroll: null, // mescroll???????????? (????????????,mixins?????????)
				// ?????????????????????(??????, ??????????????????????????????)
				downOption: { 
					
				},
				// ?????????????????????(??????, ??????????????????????????????)
				upOption: {
					page: {
						size: 10 // ?????????????????????,??????10
					},
					noMoreSize: 5, // ???????????????????????????????????????5????????????'-- END --'?????????
					empty: {
					    icon : "../../../static/images/nodata.png" ,
						tip: 'Absolutely empty'
					},
					textLoading:'Loading',
					textNoMore:'-- End --'
				}
			}
		},
		methods: {
			goBackBtnClick(){
				uni.navigateTo({
				   url: '/pages/user/report_management',
				   animationType: 'pop-in',
				   animationDuration: 200
				})
			},
			inputSearchListItemClick(item,index){
				this.initSearchInputText = item.nameStr
				this.currentIndex = index;
			},
			searchBoxListClick(){
				this.showListBool = !this.showListBool
			},
			searchWhereBtnClick(){
				// this.pageNo = 1
				// this.pageSize = 10
				this.dataAccountList = []
				this.mescroll.resetUpScroll();
			},
			/*?????????????????????, ???????????????????????? (????????????,mixins?????????)*/
			downCallback(){
				this.dataAccountList = []
				this.mescroll.resetUpScroll();
			},
			/*?????????????????????*/
			upCallback(page) {
				let pageNum = page.num; // ??????, ?????????1??????
				let pageSize = page.size; // ??????, ????????????10???
				// console.log("pageNum",pageNum);
				// console.log("pageSize",pageSize);
				this.getAccountListData(pageNum,pageSize)
			},
			/*???????????????????????????,???????????????????????????(???????????????page.num=1,???????????????up.callback)*/
			reloadList(){
				this.mescroll.resetUpScroll();
			},
			async getAccountListData(pageNum,pageSize){
				// ????????????????????????
				uni.$emit("setMescrollGlobalOption", {
					up:{
						empty:{
							tip: this.$t('alert.absolutely.empty')
						},
						textNoMore:this.$t('alert.nomore')
					},
				})
				let reqParam = {}
				reqParam.time = this.currentIndex + 1
				if(this.searchUsername){
					reqParam.username = this.searchUsername
				}
				reqParam.pageNo = pageNum
				reqParam.pageSize = pageSize
				let resR = await subPlayersReq(reqParam,this.localLoginToken)
				if(resR.code === 200){
					this.mescroll.endBySize(resR.data.results.length,resR.data.totalCount)
					//??????????????????
					if(pageNum == 1) this.dataAccountList = []; //???????????????????????????????????????
					this.dataAccountList = this.dataAccountList.concat(resR.data.results); //???????????????
				}else if(resR.code === 402 || resR.code === 403 ){
					this.logout()
					uni.showToast({
						title:resR.msg,
						icon:'none',
						duration: 2000,
						success:(res)=>{
							uni.reLaunch({
								url:'/pages/login/login'
							})
						}
					});
				}
			}
		}
	}
</script>

<style>
page{
	background-color: #071a28;
	height: 100%;
	position: relative;
}

.accountReportPage{
	
}

.navLeftBtn image{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
}

.navTitleCenter{
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
}


.accountListContainer{
	padding: 0 16px;
	height: calc(100% - 88px);
	padding-top: 10px;
}

.searchBox{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 4px;
	padding-top: 10px;
}

.searchBoxList{
	width: 90%;
	margin-right: 5%;
	height: 42px;
	font-size: 12px;
	background-color: #334756;
	/* border: 0px; */
	color: #fff;
	border-radius: 5px;
	padding-left: 10px;
	position: relative;
}

.searchInputShow{
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	
}


.searchBtn{
	font-family: Roboto;
	width: 73px;
	min-height: 42px;
	text-align: center;
	background-color: #3d8dfe;
	font-size: 14px;
	font-weight: 500;
	color: #fff;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 5px;
	
}

.rightArrow{
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	align-items: center;
	height: 100%;
	font-weight: 100;
	width: 12%;
	justify-content: center;
	font-size: 16px;
	color: #fff;
	/* transition: transform .2s cubic-bezier(.645, .045, .355, 1); */
	/*??????????????????????????????0.3s ????????????*/
	transition: all .3s ease-out;
}

.rightArrowActive{
    /*??????180???*/
	transform: rotate(180deg);
}


.inputSearchList{
	position: absolute;
	width: 100%;
	left: 0;
	top: 42px;
	box-sizing: border-box;
	z-index: 100;
}

.scrollInputSearchList{
	border-radius: 5px;
	width: 100%;
	max-height: 10em;
	background-color: #132736;
	box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	padding: 10px 0;
}

.inputSearchListItem{
	display: flex;
	align-items: center;
	justify-content: space-between;
	line-height: 37px;
	font-weight: 400;
	padding: 0 10px;
}

.inputSearchListItem image{
	width: 15px;
	height: 15px;
}



.tableBox{
	margin-top: 6px;
	height: calc(100vh - 167px);
	padding-bottom: 4px;
	/* border-radius: 5px; */
	/* overflow: hidden; */
}

.tableBoxCenterTitle{
	/* width: 100%; */
	height: 50px;
	line-height: 50px;
	font-size: 12px;
	background: #334756;
	box-shadow: 0 1px 3px rgb(0 0 0 / 16%);
	border-radius: 5px 5px 0 0;
	padding: 0 10px;
	display: flex;
	align-items: center;
}

.tableBoxCenterTitleItem{
	width: 25%;
	font-size: 12px;
	color: #fff;
	font-weight: 500;
	line-height: 20px;
	text-align: center;
}

.tableBoxBody{
	background: #132736;
	/* ????????????scrollView?????????.?????? */
	height: calc(100% - 70px);
	border-radius: 0 0 5px 5px;
}


.tableBoxBodyTBody{
	/* margin: 10px 10px 0; */
	margin: 10px 10px;
	height: 42px;
	background: #334756;
	border-radius: 2px;
	display: flex;
	align-items: center;
	
}

.tableBoxBodyTBodyItem{
	text-align: center;
	/* font-size: 12px; */
	font-size: 13px;
	font-family: Alibaba PuHuiTi;
	font-weight: 400;
	color: #fff;
	width: 25%;
}

.tBodyItemMoney{
	color: #3d8dfe;
	
}
</style>
