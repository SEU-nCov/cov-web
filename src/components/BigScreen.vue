<template>
	<div class="board">
		<el-row :gutter="20">
			<el-col :span="8">
				<div class="left">
					<div style="margin-top: 15px;">
						<el-row :gutter="20">
							<el-col :span="6">
								<dv-border-box-6 :color="['#4798ef','#67a1e5']" style="margin-left:80px; width:65%;">
									<el-button class="nowButton" type="text" @click="nowClick">
										现有确诊
									</el-button>
								</dv-border-box-6>
							</el-col>
							<el-col :span="6">
								<dv-border-box-6 :color="['#4798ef','#67a1e5']" style="margin-left:55px;width:65%;">
									<el-button class="totalButton" type="text" @click="totalClick">
										累计确诊
									</el-button>
								</dv-border-box-6>
							</el-col>
							<el-col :span="6">
								<dv-border-box-6 :color="['#4798ef','#67a1e5']" style="margin-left:25px;width:65%;">
									<el-button class="countryButton" type="text" @click="activeTab=true">
										全国疫情
									</el-button>
								</dv-border-box-6>
							</el-col>
							<el-col :span="6">
								<dv-border-box-6 :color="['#4798ef','#67a1e5']" style="width:65%;">
									<el-button class="cityButton" type="text" @click="activeTab=false">
										<i></i>本省疫情
									</el-button>
								</dv-border-box-6>
							</el-col>
						</el-row>
					</div>
					<dv-decoration-8 style="width:100%;height:30px;" :color="['#4798ef', '#67a1e5']" />
					<dv-border-box-6 class="cov_card" :color="['#4798ef', '#67a1e5']"
						style="height: 200px;width: 99%;margin-top:20px;margin-left: 5px;">
						<!-- 全国疫情数据:六个部分 -->
						<div v-if="this.chinaCovData" v-show="activeTab==true" class="cov_data_china">
							<el-row>
								<el-col class="cov_input" :span="4">
									<dv-border-box-7 style="margin-left:15px;margin-top:10px;width:80%;">
										<h4>境外输入</h4>
										<div class="number">{{this.chinaCovData.total.input}}</div>
										<p class="added" style="display: block;">
											较昨日<span>+{{this.chinaCovData.today.input}}</span></p>
									</dv-border-box-7>
								</el-col>
								<el-col class="cov_nosymptom" :span="4">
									<dv-border-box-7 style="margin-top:10px;">
										<h4>无症状感染者</h4>
										<div class="number">{{this.chinaCovData.extData.noSymptom}}</div>
										<p class="added" style="display: block;">
											较昨日<span>+{{this.chinaCovData.extData.incrNoSymptom}}</span></p>
									</dv-border-box-7>
								</el-col>
								<el-col class="cov_today_confirm" :span="4">
									<dv-border-box-7 style="margin-left:8px;margin-top:10px;width:95%;">
										<h4 @click="openMessage">现有确诊<i></i></h4>
										<div class="number">
											{{this.chinaCovData.total.confirm-this.chinaCovData.total.dead-this.chinaCovData.total.heal}}
										</div>
										<p class="added" style="display: block;">
											较昨日<span>+{{this.chinaCovData.today.storeConfirm}}</span></p>
									</dv-border-box-7>
								</el-col>
								<el-col class="cov_confirm" :span="4">
									<dv-border-box-7 style="margin-left:10px;margin-top:10px;width:90%;">
										<h4>累计确诊</h4>
										<div class="number">{{this.chinaCovData.total.confirm}}</div>
										<p class="added" style="display: block;">
											较昨日<span>+{{this.chinaCovData.today.confirm}}</span></p>
									</dv-border-box-7>
								</el-col>
								<el-col class="cov_dead" :span="4">
									<dv-border-box-7 style="margin-left:8px;margin-top:10px;width:85%;">
										<h4>累计死亡</h4>
										<div class="number">{{this.chinaCovData.total.dead}}</div>
										<p class="added" style="display: block;">
											较昨日<span>+{{this.chinaCovData.today.dead}}</span></p>
									</dv-border-box-7>
								</el-col>
								<el-col class="cov_heal" :span="4">
									<dv-border-box-7 style="margin-top:10px;width:85%;">
										<h4>累计治愈</h4>
										<div class="number">{{this.chinaCovData.total.heal}}</div>
										<p class="added" style="display: block;">
											较昨日<span>+{{this.chinaCovData.today.heal}}</span></p>
									</dv-border-box-7>
								</el-col>
							</el-row>
							<el-row>
								<el-col class="cov_time">
									截至{{this.chinaCovData.lastUpdateTime}}
								</el-col>
								<el-col class="foot">
									<div @click="openNotify">数据说明<i></i></div>
								</el-col>
							</el-row>
						</div>
						<!-- 城市疫情数据:三个部分 -->
						<div v-if="this.cityCovData" v-show="activeTab==false" class="cov_data_province">
							<el-row>
								<el-col class="cov_province_confirm" :span="8">
									<dv-border-box-7 style="margin-left:20px;margin-top:10px;width:85%;">
										<h4>累计确诊</h4>
										<div class="number">{{this.cityCovData.confirm}}</div>
										<p class="added" style="display: block;">
											较昨日<span>+{{this.cityCovData.newConfirm}}</span></p>
									</dv-border-box-7>
								</el-col>
								<el-col class="cov_province_dead" :span="8">
									<dv-border-box-7 style="margin-left:10px;margin-top:10px;width:85%;">
										<h4>累计死亡</h4>
										<div class="number">{{this.cityCovData.dead}}</div>
										<p class="added" style="display: block;">
											较昨日<span>+{{this.cityCovData.newDead}}</span></p>
									</dv-border-box-7>
								</el-col>
								<el-col class="cov_province_heal" :span="8">
									<dv-border-box-7 style="margin-top:10px;width:85%;">
										<h4>累计治愈</h4>
										<div class="number">{{this.cityCovData.heal}}</div>
										<p class="added" style="display: block;">
											较昨日<span>+{{this.cityCovData.newHeal}}</span></p>
									</dv-border-box-7>
								</el-col>
							</el-row>
							<el-row>
								<el-col class="cov_time">
									截至{{myTimeToLocal(this.cityCovData._mtime)}}
								</el-col>
								<el-col class="foot">
									<div @click="openNotify">数据说明<i></i></div>
								</el-col>
							</el-row>
						</div>
					</dv-border-box-6>
					<dv-border-box-8 ref="policy_card"
						style="margin-top: 20px;color:white;width: 99%;margin-left: 5px;padding-bottom: 1px;margin-bottom: 10px;">
						<div class="cov_title">
							出行防疫政策
						</div>
						<div class="cov_subtitle">
							科学防疫·伴你安全出行
						</div>
						<dv-border-box-2 class="header" :color="['#4798ef', '#67a1e5']"
							style="width: 95%;margin-left: 15px;margin-bottom: 20px;">
							出发地
							<el-cascader class="addressCascader" v-model="selectedAddressFrom" :options="addressOptions"
								@change="addressFromChange" placeholder="请选择地址" style="width: 30%;">
							</el-cascader>
							<i class="el-icon-sort" @click="addressExchange"></i>
							目的地
							<el-cascader class="addressCascader" v-model="selectedAddressTo" :options="addressOptions"
								@change="addressToChange" placeholder="请选择地址" style="width: 30%;">
							</el-cascader>
						</dv-border-box-2>
						<dv-border-box-2 ref="From" :color="['#4798ef', '#67a1e5']"
							style="margin-top:20px;width: 95%;margin-left: 15px;">
							<i class="el-icon-location" style="padding-top: 20px;color: #55aaff;font-weight: 550;">
								离开{{this.selectedFromCity}}
							</i>
							<div v-html="this.fromPolicy" class="content">
								{{this.fromPolicy}}
							</div>
						</dv-border-box-2>
						<dv-border-box-2 ref="To" :color="['#4798ef', '#67a1e5']"
							style="margin-top:20px;width: 95%;margin-left: 15px;margin-bottom: 20px;">
							<i class="el-icon-location" style="padding-top: 20px;color: #55aaff;font-weight: 550;">
								进入{{this.selectedToCity}}
							</i>
							<div v-html="this.toPolicy" class="content">
								{{this.toPolicy}}
							</div>
						</dv-border-box-2>
					</dv-border-box-8>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="center">
					<div class="title" style="margin-top: 20px;">
						<span class="title-text">新冠疫情大数据可视化平台</span>
						<dv-decoration-5 style="width:100%;height:40px;" :dur='2.5' :reverse="true"
							:color="['#4798ef', '#67a1e5']" />
					</div>
					<div class="map_div">
						<dv-border-box-12>
							<div class="title_china">
								中国疫情地图
							</div>
							<div class="cov_map">
								<div ref="chinaMap" style="height: 500px;">
								</div>
							</div>
						</dv-border-box-12>
						<dv-border-box-12 class="recent-card" style="margin-top: 10px;font-weight: bold;">
							<div ref="recentResults" style="height: 350px;padding-top: 20px;"></div>
						</dv-border-box-12>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="right">
					<div>
						<div class='time' style="color: white;">
							<el-row :gutter="20">
								<el-col :span="10" style="margin-top:20px;font-size: 25px;font-weight: 600;">
									{{formatDate(nowTime)}}
								</el-col>
								<el-col :span="14"
									style="margin-top:18px;font-size: 22px;font-weight: 600;display: flex;">
									所在地：
									<el-cascader class="cov_location_name" v-model="selecetedProvince"
										:options="addressOptions" clearable filterable placeholder="请选择"
										@change="getCityCovData">
									</el-cascader>
								</el-col>
							</el-row>
						</div>
					</div>
					<dv-decoration-8 :reverse="true" style="margin-top:5px;width:100%;height:30px;"
						:color="['#4798ef', '#67a1e5']" />
					<el-carousel :interval="4000" height="260px" style="background-color: transparent;"
						indicator-position="none">
						<el-carousel-item v-for="item in this.vaccinePoints" :key="item.id"
							style="background-color: transparent;">
							<dv-border-box-6 :color="['#4798ef', '#67a1e5']"
								style="margin-top: 20px;height:85%;color: white;display: flex;width:97%;margin-left:5px;margin-right:10px;">
								<p>疫苗接种点信息</p>
								<div class="vacName" style="text-weight: 550;">
									{{item.vac_pointname}}
								</div>
								<p style="margin-top: 15px;margin-left:100px; text-align: left;">
									地址：{{item.location}}<br />
									开放时间：{{item.open_time}}<br />
									电话：{{item.vac_pointphone}}<br />
								<div style="margin-left:100px; text-align: left;margin-top: -15px;">
									<el-row :gutter="20">
										<el-col :span="5">
											疫苗品种：
										</el-col>
										<el-col :span="19">
											<div v-if="item.vac_kind">
												<el-tag v-show="item.vac_kind.indexOf('0')!=-1" size="mini">武汉生物
												</el-tag>
												<el-tag v-show="item.vac_kind.indexOf('1')!=-1" size="mini">北京科兴
												</el-tag>
												<el-tag v-show="item.vac_kind.indexOf('2')!=-1" size="mini">北京生物
												</el-tag>
												<el-tag v-show="item.vac_kind.indexOf('3')!=-1" size="mini">成都生物
												</el-tag>
												<el-tag v-show="item.vac_kind.indexOf('4')!=-1" size="mini">长春生物
												</el-tag>
											</div>
										</el-col>
									</el-row>
								</div>
								<br />
								<p style="margin-left:100px; text-align: left;margin-top: -15px;">
									备注：{{item.vac_extraInfo}}
								</p>
							</dv-border-box-6>
						</el-carousel-item>
					</el-carousel>
					<!-- 核酸点 -->
					<dv-border-box-7 class="testBoard" style="width:98%;margin-right:8px;height: 330px;color: white;"
						:color="['#4798ef', '#67a1e5']">
						<div class="title">
							核酸点信息
						</div>
						<dv-scroll-board :config="testConfig"
							style="width:97%;height:80%;margin-left: 10px;margin-top: 10px;" />
					</dv-border-box-7>
					<!-- 风险区-->
					<dv-border-box-10 class="areaBoard"
						style="width:98%;margin-right:8px;margin-top: 20px;height: 330px;color: white;margin-bottom: 10px;"
						:color="['#4798ef', '#67a1e5']">
						<div class="title">
							风险区信息
						</div>
						<dv-scroll-board :config="areaConfig"
							style="width:97%;height:80%;margin-left:10px;padding-top: 10px;" />
					</dv-border-box-10>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		regionData,
		provinceAndCityData,
		CodeToText,
		TextToCode
	} from "../../node_modules/element-china-area-data"
	import {
		getChinaCovData,
		getVaccineTopData,
		getArea,
		getCityCovData,
		getTests,
		getVaccinePoints,
		getPolicy,
		getSingleCityPolicy
	} from '../../api/data'
	import "../../api/chinaMap.js";
	export default {
		data() {
			return {
				nowTime: new Date(),
				activeTab: true,
				selecetedProvince: ['320000', '320100'],
				city_code: '320100',
				chinaCovData: undefined,
				cityCovData: {},
				mapAirDataNow: [],
				mapAirDataTotal: [],
				chinaMap: '',
				recentDays: [],
				recentTodayData: [],
				recentTotalData: [],
				vaccineTopData: undefined,
				chinaTotalVaccinations: "-",
				chinaNewVaccinations: "-",
				chinaVaccinationsPer100: "-",
				worldTotalVaccinations: "-",
				worldNewVaccinations: "-",
				worldVaccinationsPer100: "-",
				addressOptions: provinceAndCityData,
				selectedFromCity: '南京市',
				selectedFromCode: 320100,
				selectedToCity: '南京市',
				selectedToCode: 320100,
				selectedAddressFrom: ['320000', '320100'],
				selectedAddressTo: undefined,
				fromPolicy: '在京党政机关、国有企事业单位人员带头执行，除重要公务活动需要外原则上不出京，确需出京的严格审批管理。提倡市民群众减少出京活动，确需出京的，要防范旅途疫情风险，全程规范佩戴口罩，做好个人防护，不前往有疫情的县（市、区、旗）。如途中出现涉疫风险，就地配合落实防疫措施，暂缓进返京。严控本地中高风险区及其他涉疫风险人员出京。',
				toPolicy: '1.加强机场口岸防疫管理，严格落实入境人员和高风险岗位工作人员全流程闭环管理要求。入境人员严格执行“7天集中隔离+3天居家健康监测”措施。<br><br>2.7天内出现本土疫情的县（市、区、旗）人员严格限制进返京，已抵京的分类落实隔离观察、健康监测、核酸检测等措施，居家期间不外出。其他人员持48小时内核酸阴性证明和“北京健康宝”绿码正常进返京，在抵京后以及出现涉疫风险、疑似症状时，都要第一时间通过电话、微信等方式主动向社区（村）、酒店或单位报告，本人及同住人员配合做好排查管理、健康监测。<br><br>3.进返京人员抵京后居家健康监测3天，开展3天2检（抵京24小时内完成一次核酸检测，间隔24小时后、抵京72小时内完成第二次核酸检测），7天内不聚餐、不聚会、不前往人群密集场所。涉疫风险人员配合落实居家（店）健康监测等防疫措施。居家隔离、居家健康监测及其同住人员，要严格居家、不外出。<br></br>',
				comePolicy: '',
				leavePolicy: '',
				vaccinePoints: [{
					vac_pointid: 0,
					vac_pointname: '南京同仁医院',
					location: '江宁区秣陵街道吉印大道2007号',
					vac_kind: "01234",
					open_time: '24小时',
					vac_pointphone: '无',
					vac_extraInfo: '8:00-24:00东北门停车场核酸采集处;次日0:00-8:00急诊门外核酸采集处'
				}],
				testingSites: [{
					id: 0,
					name: '南京同仁医院',
					province: '江苏省',
					city: '南京市',
					area: '江宁区',
					address: '吉印大道2007号',
					type: 0,
					turnaroundTime: '24小时出报告',
					reservation: false,
					openingTime: '24小时',
					telephone: '无',
					extraInfo: '8:00-24:00东北门停车场核酸采集处;次日0:00-8:00急诊门外核酸采集处'
				}],
				currentPage: 1,
				pageSize: 5,
				areaData: [
					['高风险区', '北京', '丰台区太平桥街道精图雅苑'],
					['高风险区', '北京', '大兴区亦庄（地区）镇三羊里小区11-31号楼'],
					['高风险区', '北京', '大兴区亦庄（地区）镇三羊里小区11-31号楼'],
					['高风险区', '北京', '大兴区亦庄（地区）镇三羊里小区11-31号楼']
				],
				areaConfig: {
					data: this.areaData,
					index: true,
					columnWidth: [50, 120, 180],
					align: ['center', 'center', 'center'],
					headerBGC: '#4798ef'
				},
				testConfig: {

				}
			}
		},
		methods: {
			formatDate(date) {
				return date.toLocaleString();
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.currentPage = 1;
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
			},
			getMapData() {
				getChinaCovData().then(res => {
					this.chinaCovData = res.data.data.areaTree[2]; //中国
					this.mapAirDataNow = this.chinaCovData.children.map(item => {
						return {
							name: item.name,
							value: item.today.confirm //现有确诊
						}
					});
					this.mapAirDataTotal = this.chinaCovData.children.map(item => {
						return {
							name: item.name,
							value: item.total.confirm //累计确诊
						}
					});
					this.drawMap(this.mapAirDataNow);
					var chinaDayList = res.data.data.chinaDayList;//过去数据
					var length = chinaDayList.length;
					for(var i=9;i>0;i--){
						this.recentTodayData.push(chinaDayList[length-i].today.confirm);
						this.recentTotalData.push(chinaDayList[length-i].total.confirm);
					}
					this.recentTodayData.push(res.data.data.chinaTotal.today.confirm);
					this.recentTotalData.push(res.data.data.chinaTotal.total.confirm);
					console.log(this.recentTodayData);
					console.log(this.recentTotalData);
					this.drawEcharts(this.recentTodayData);
				});
			},
			getCityCovData() {
				this.city_code = this.selecetedProvince[1];
				if (CodeToText[this.selecetedProvince[1]] == "市辖区")
					this.city_code = this.selecetedProvince[0];
				getCityCovData(this.selecetedProvince[0]).then(res => {
					this.cityCovData = res.data.data[0];
				})
			},
			getVaccineTopData() {
				getVaccineTopData().then(res => {
					this.vaccineTopData = res.data.data.VaccineTopData;
					this.chinaTotalVaccinations = (this.vaccineTopData['中国'].total_vaccinations /
							100000000)
						.toFixed(1);
					this.chinaNewVaccinations = (this.vaccineTopData['中国'].new_vaccinations / 10000)
						.toFixed(1);
					this.chinaVaccinationsPer100 = (this.vaccineTopData['中国']
							.total_vaccinations_per_hundred)
						.toFixed(2);
					this.worldTotalVaccinations = (this.vaccineTopData['全球'].total_vaccinations /
							100000000)
						.toFixed(1);
					this.worldNewVaccinations = this.vaccineTopData['全球'].new_vaccinations > 0 ? (this
						.vaccineTopData['全球'].new_vaccinations / 10000).toFixed(1) : "-";
					this.worldVaccinationsPer100 = (this.vaccineTopData['全球']
							.total_vaccinations_per_hundred)
						.toFixed(2);
				});
			},
			drawMap(airData) {
				var map_div = this.$refs.chinaMap;
				let option = {
					// 提示浮窗样式
					tooltip: {
						show: true,
						trigger: 'item',
						alwaysShowContent: false,
						backgroundColor: '#0C121C',
						borderColor: 'rgba(0, 0, 0, 0.16);',
						hideDelay: 100,
						triggerOn: 'mousemove',
						enterable: true,
						textStyle: {
							color: '#DADADA',
							fontSize: '12',
							width: 20,
							height: 30,
							overflow: 'break'
						},
						formatter(params) {
							console.log(params)
							return `地区:${params.name}</br>确诊:${params.value}`
						},
						showDelay: 100
					},
					// 地图配置
					geo: {
						map: 'china',
						roam: true,
						zoom: 1.1,
						// 地图文字
						label: {
							// 通常状态下的样式
							show: true, // 默认是否显示地区名称
							fontSize: 10,
							color: '#2e6099'
						},
						// 地图区域的样式设置
						itemStyle: {
							// 地图边界颜色
							borderColor: '#fff',
							// 地图区域背景颜色
							areaColor: '#e6e6e6',
							// 鼠标放上去高亮的样式

						},
						emphasis: {
							// 鼠标放上去的样式
							label: {
								color: 'black'
							},
							itemStyle: {
								// 鼠标放上去地图区域背景颜色
								areaColor: '#0984e3',
								borderWidth: 0,
							}
						}
					},
					series: [{
						data: airData,
						geoIndex: 0, //将空气质量的数据和第0个geo配置关联在一起
						type: 'map'
					}, ],
					// 视觉映射组件
					visualMap: {
						type: 'piecewise',
						pieces: [{
								min: 10000
							}, // 不指定 max，表示 max 为无限大（Infinity）。
							{
								min: 1000,
								max: 9999
							},
							{
								min: 100,
								max: 999
							},
							{
								min: 10,
								max: 99
							},
							{
								min: 0,
								max: 9
							}
						],
						inRange: {
							color: ['#fcded0', '#ffaa85', '#ff7b69', '#cc2929', '#8c0d0d', '#660208']
						},
						textGap: 5,
						itemWidth: 15,
						itemHeight: 15,
						itemGap: 5,
						left: '5%',
						bottom: '5%',
						textStyle: {
							fontSize: '30px',
							color: '#fff',
						}
					}
				};
				if (map_div) {
					if (this.chinaMap != null && this.chinaMap != "" && this.chinaMap != undefined) {
						this.chinaMap.dispose();
					}
					this.chinaMap = this.$echarts.init(map_div)
					this.chinaMap.setOption(option)
				}
			},
			drawEcharts(data) {
				var x = this.recentDays;
				var y = data;
				var div = this.$refs.recentResults;
				if (div) {
					var myChart = this.$echarts.init(div);
					// 指定图表的配置
					var option = {
						title: {
							text: "近10天内中国疫情形势",
							x: 'center',
							textStyle: {
								color: 'white',
								fontSize: 25,
								fontWeight: 600,
								fontFamily: 'Arial',
							},
						},
						grid: {
							top: '20%',
							left: '12%', //原来是10%，修改为20%
							right: '5%',
							bottom: '24%',
						},
						tooltip: {}, //提示框
						legend: {
							icon: 'circle',
							right: '10%',
							y: 'top',
							data: ['数量'],
							textStyle:{
								color:'white',
								fontSize: 15
							}
						},
						xAxis: {
							axisLabel: {
								rotate: 30
							},
							data: x, //x轴
							axisLine: {
								lineStyle: {
									color: "#fff",
								}
							}
						},
						yAxis: {
							min: function(value) {//取最小值向下取整为最小刻度
							    return Math.floor(value.min)
							},
							max: function(value) {//取最大值向上取整为最大刻度
							    return  Math.ceil(value.max) 
							},
							axisLine: {
								lineStyle: {
									color: "#fff",
								}
							}
						}, //不写的话，y轴默认就标出数字
						//=====图标的数据
						series: [{
							name: "数量", //鼠标放上去浮现的内容，跟data一样
							type: "line", //指定图类型
							data: y //分别对应x轴的数值
						}]
					};
					// 对实例对象设置配置
					myChart.setOption(option);
				}
			},
			nowClick() {
				this.drawMap(this.mapAirDataNow);
				this.drawEcharts(this.recentTodayData);
			},
			totalClick() {
				this.drawMap(this.mapAirDataTotal);
				this.drawEcharts(this.recentTotalData);
			},
			openMessage() {
				this.$notify({
					title: '疫情数据说明',
					dangerouslyUseHTMLString: true,
					message: '1.数据含义:<p>"现有确诊数"为当前正在治疗中的确诊人数,此数值为随疫情数据的实时更新而发生变化。</p>2.计算方法:<br />现有确诊数=累计确诊数-累计死亡数-累计治愈数'
				});
			},
			openNotify() {
				this.$notify({
					title: '疫情数据说明',
					dangerouslyUseHTMLString: true,
					message: '1.数据来源：来自国家卫健委、各省市区卫健委、各省市区政府、港澳台官方渠道的公开数据。<br /> 2.数据更新时间：实时更新全国、各省区市数据，因需要追踪、核实计算时间，与官方发布时间相比，会存在一定的时间延迟。<br /> 3.实时数据统计原则：<br />①每日上午，全国数据会优先使用国家卫健委公布的数据，由于各省卫健委公布数据的发布时间和统计时间段各不相同，会出现全国数据大于各省份总和的情况；<br />②各省卫健委陆续公布数据，如果各省份数据总和超过国家卫健委公布的数据，则全国数据切换为各省数据总和；<br />③新增数据以国家卫健委公布的最新一日新增数据为准。'
				});
			},
			myTimeToLocal(inputTime) {
				if (!inputTime && typeof inputTime !== 'number') {
					return '';
				}
				var localTime = '';
				inputTime = new Date(inputTime).getTime();
				const offset = (new Date()).getTimezoneOffset();
				localTime = (new Date(inputTime - offset * 60000)).toISOString();
				localTime = localTime.substr(0, localTime.lastIndexOf('.'));
				localTime = localTime.replace('T', ' ');
				return localTime;
			},
			getToAndFromPolicy() {
				var toAndFrom = {
					from_city: this.selectedFromCity,
					to_city: this.selectedToCity
				}
				getPolicy(toAndFrom).then((res) => {
					if (res.data.code == 200) {
						this.fromPolicy = res.data.data.from_policy;
						this.toPolicy = res.data.data.to_policy;
					} else { // 未收录
						console.log(res.data.msg);
					}
				});
				this.policyResize();
			},
			addressFromChange() {
				this.selectedFromCity = CodeToText[this.selectedAddressFrom[1]];
				this.selectedFromCode = this.selectedAddressFrom[1];
				if (this.selectedFromCity == "市辖区") {
					this.selectedFromCode = this.selectedAddressFrom[0];
					this.selectedFromCity = CodeToText[this.selectedAddressFrom[0]];
				}
				if (this.selectedAddressTo == undefined) {
					this.selectedToCity = this.selectedFromCity;
					this.selectedToCode = this.selectedFromCode;
				}
				this.getToAndFromPolicy();
			},
			addressToChange() {
				this.selectedToCity = CodeToText[this.selectedAddressTo[1]];
				this.selectedToCode = this.selectedAddressTo[1];
				if (this.selectedToCity == "市辖区") {
					this.selectedToCode = this.selectedAddressTo[0];
					this.selectedToCity = CodeToText[this.selectedAddressTo[0]];
				}
				if (this.selectedAddressFrom == undefined) {
					this.selectedFromCity = this.selectedToCity;
					this.selectedFromCode = this.selectedToCode;
				}
				console.log(this.selectedToCity);
				this.getToAndFromPolicy();
			},
			addressExchange() {
				var tmp1 = this.selectedFromCity;
				var tmp2 = this.selectedFromCode;
				var tmp3 = this.selectedAddressFrom;
				this.selectedFromCity = this.selectedToCity;
				this.selectedFromCode = this.selectedToCode;
				this.selectedAddressFrom = this.selectedAddressTo;
				this.selectedToCity = tmp1;
				this.selectedToCode = tmp2;
				this.selectedAddressTo = tmp3;
				this.getToAndFromPolicy();
			},
			getVaccinePointList() {
				var param = {
					city_code: this.city_code
				};
				getVaccinePoints(param).then(res => {
					this.vaccinePoints = res.data.data;
				});
			},
			getTestList() {
				var param = {
					city_name: CodeToText[this.city_code]
				};
				getTests(param).then(res => {
					var resdata = Array.from(res.data.data);
					this.testingSites = [];
					resdata.map(item => {
						var item1 = [item.nat_pointname,
							CodeToText[Math.floor(item.city_code / 10000) * 10000] + CodeToText[item
								.city_code] + CodeToText[item.area_code] + item.location,
							'电话' + item.nat_pointphone,
							'采样点类型:' + item.nat_type == '0' ? '公立' : item.nat_type == '1' ? '民营' : '临时'
						];
						this.testingSites.push(item1);
						var item2 = [
							'出报告时间:' + item.nat_turnaroundTime == '0' ? '6小时出报告' : item
							.nat_turnaroundTime == '1' ? '12小时出报告' : '24小时出报告',
							'是否可预约:' + item.nat_reservation == '1' ? "可线上预约" : "无法线上预约",
							'营业时间:' + item.open_time,
							'备注:' + item.nat_extraInfo
						];
						this.testingSites.push(item2);
					});
					this.testConfig = {
						data: this.testingSites
					};
					this.testConfig = {
						...this.testConfig
					}
				});

			},
			getRiskArea() {
				getArea().then((res) => {
					this.areaData = res.data.data.map(item => {
						return [
							item.risk_level == 2 ? '高风险区' : item.risk_level == 1 ? '中风险区' : '低风险区',
							CodeToText[item.area_code],
							item.risk_address
						]
					});
					this.areaConfig = {
						data: this.areaData,
						index: true,
						columnWidth: [50, 120, 180],
						align: ['center', 'center', 'center'],
						headerBGC: '#4798ef'
					}
					this.areaConfig = {
						...this.areaConfig
					}
				});

			},
			policyResize() {
				setTimeout(() => {
					this.$refs.From.initWH();
					this.$refs.To.initWH();
					this.$refs.policy_card.initWH();
				}, 300)
			}
		},
		mounted() {
			for (var i = 10; i >= 1; i--) {
				var temp = new Date().getTime() - 3600 * 1000 * 24 * i;
				this.recentDays.push(this.myTimeToLocal(temp).slice(0, 10));
			}
			this.getVaccineTopData();
			this.getCityCovData();
			this.getMapData();
			this.getTestList();
			this.getVaccinePointList();
			this.getRiskArea();
		}
	}
</script>

<style scoped>
	.board {
		height: 100%;
		background-image: url("../assets/pageBg.png");
		background-size: cover;
		background-position: center center;
	}

	.title-text {
		font-weight: bold;
		font-size: 30px;
		color: white;
		transform: translate(-50%);
	}

	::v-deep .cov_card .card_tabs {
		overflow: hidden;
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
	}

	/* 全国疫情数据 */
	::v-deep .cov_card .card_tab.active {
		/* width: 50%; */
		font-size: 12px;
		background: #f1f1f1;
	}

	/* 地区疫情数据 */
	::v-deep .cov_card .card_tab {
		float: left;
		width: 50%;
		font: 12px/45px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #333;
		text-align: center;
		background: #ffffff;
	}

	/* 地区疫情数据icon */
	.cov_card .card_tab i {
		display: inline-block;
		margin: 16px 5px 0 0;
		width: 10px;
		height: 13px;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAMAAACAXYxPAAAAgVBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzNi1y5rAAAAKnRSTlMAuQ/daEsK+eTDoUTvycGojVc/Oh4U88+ygHosJQXg1NKscDPqlmJdKRh9lJelAAAA8ElEQVQoz12QiXKDMAxE1wFCIEBDbgq5mp7v/z+wwh5Dp28GeSUseW0FdpsV5E36o4nBAXWRAK+xlkG5k3FoE5w8a9gqsgnVBew1U5JaPPt9uwZOrYwcaU9hKoW6ho3JN1r7bOPAdW+DCjKLvKhhITkOMi6sLJKIo62WeBxLaYWoxuHv8hSE4mlcH/TePElo73iOFnK7Un9jGw56eh8tJLdw80++pAoZfQluLePKZfSd6g/fPGQc7dfMKVjObPLEOiaOTJGKZRDLnIUCH6Rzzz2KQhMdZXhva5k5e9+1Hz5zt7ykUyQcduSM0z+GiibqX4FjFj/TNw/kAAAAAElFTkSuQmCC);
		background-size: auto;
		background-size: 100% 100%;
		vertical-align: top;
	}

	.cov_card .cov_confirm,
	.cov_card .cov_dead,
	.cov_card .cov_heal,
	.cov_card .cov_input,
	.cov_card .cov_nosymptom,
	.cov_card .cov_province_confirm,
	.cov_card .cov_province_dead,
	.cov_card .cov_province_heal,
	.cov_card .cov_severe,
	.cov_card .cov_suspect,
	.cov_card .cov_today_confirm {
		padding-top: 10px;
		float: left;
	}

	.cov_card .cov_confirm::before,
	.cov_card .cov_dead::before,
	.cov_card .cov_heal::before,
	.cov_card .cov_input::before,
	.cov_card .cov_nosymptom::before,
	.cov_card .cov_province_confirm::before,
	.cov_card .cov_province_dead::before,
	.cov_card .cov_province_heal::before,
	.cov_card .cov_severe::before,
	.cov_card .cov_suspect::before,
	.cov_card .cov_today_confirm::before {
		content: "";
		position: absolute;
		right: 0;
		top: 46px;
		width: 1px;
		height: 10px;
		background: #e8e8e8;
	}

	/* 字体风格 */
	.cov_card .cov_confirm .number,
	.cov_card .cov_dead .number,
	.cov_card .cov_heal .number,
	.cov_card .cov_input .number,
	.cov_card .cov_nosymptom .number,
	.cov_card .cov_province_confirm .number,
	.cov_card .cov_province_dead .number,
	.cov_card .cov_province_heal .number,
	.cov_card .cov_severe .number,
	.cov_card .cov_suspect .number,
	.cov_card .cov_today_confirm .number {
		font: 700 20px/20px DIN Alternate, din_alternate_bold, -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		text-align: center;
	}

	/*较昨日*/
	.cov_card .cov_confirm .added,
	.cov_card .cov_dead .added,
	.cov_card .cov_heal .added,
	.cov_card .cov_input .added,
	.cov_card .cov_nosymptom .added,
	.cov_card .cov_province_confirm .added,
	.cov_card .cov_province_dead .added,
	.cov_card .cov_province_heal .added,
	.cov_card .cov_severe .added,
	.cov_card .cov_suspect .added,
	.cov_card .cov_today_confirm .added {
		display: none;
		font: 8px/2 -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #ffffff;
		text-align: center;
	}

	/* 境外输入 */
	.cov_card .cov_input .added span,
	.cov_card .cov_input .number {
		color: #ffa352;
	}

	/* 无症状感染 */
	.cov_card .cov_nosymptom .added span,
	.cov_card .cov_nosymptom .number,
	.cov_card .cov_severe .added span,
	.cov_card .cov_severe .number {
		color: #791618;
	}

	/* 现有确诊icon? */
	.cov_card .cov_today_confirm i {
		display: inline-block;
		margin-bottom: -2px;
		margin-left: 3px;
		width: 18px;
		height: 18px;
		color: white;
		background: url('../assets/问号.png');
		background-size: auto;
		background-size: 100% 100%;
	}

	/* 六板块文字大小 */
	.cov_card .cov_input h4,
	.cov_card .cov_confirm h4,
	.cov_card .cov_nosymptom h4,
	.cov_card .cov_today_confirm h4,
	.cov_card .cov_severe h4,
	.cov_card .cov_dead h4,
	.cov_card .cov_heal h4,
	.cov_card .cov_province_confirm h4,
	.cov_card .cov_province_heal h4,
	.cov_card .cov_province_dead h4,
	.vacName {
		text-align: center;
		font: 18px/15px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		font-weight: normal;
		font-weight: 600;
		color: #ffffff;
	}

	/* 现有确诊 */
	.cov_card .cov_today_confirm .added span,
	.cov_card .cov_today_confirm .number {
		color: #e44a3d;
	}

	/* 累计确诊 */
	.cov_card .cov_confirm .added span,
	.cov_card .cov_confirm .number,
	.cov_card .cov_province_confirm .added span,
	.cov_card .cov_province_confirm .number {
		color: #a31d13;
	}

	/* 累计死亡 */
	.cov_card .cov_dead .added span,
	.cov_card .cov_dead .number,
	.cov_card .cov_province_dead .added span,
	.cov_card .cov_province_dead .number,
	.vacName {
		color: #55aaff;
	}

	/* 累计治愈 */
	.cov_card .cov_heal .added span,
	.cov_card .cov_heal .number,
	.cov_card .cov_province_heal .added span,
	.cov_card .cov_province_heal .number {
		color: #34aa70;
	}

	/* 数据更新时间 */
	.cov_time {
		width: 35%;
		margin-top: 20px;
		margin-bottom: 5px;
		font-size: 15px;
		font-weight: 550;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		color: #ffffff;
	}

	.foot {
		float: right;
		width: 20%;
		font-size: 15px;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		color: #ffffff;
		text-align: center;
		margin-top: 20px;
		font-weight: 550;
		margin-bottom: 5px;
	}

	.foot i {
		display: inline-block;
		margin-bottom: -2px;
		margin-left: 3px;
		width: 18px;
		height: 18px;
		background: url('../assets/问号.png');
		background-size: auto;
		background-size: 100% 100%;
	}

	.cov_more {
		margin-top: 5px;
		margin-bottom: 10px;
	}

	/* 白色框框 */
	::v-deep .cov_location_name {
		margin-top: -5px;
		margin-left: 15px;
		border-radius: 40px;
		width: 50%;
	}

	/* 了解更多的红框 */
	::v-deep .cov_province_go {
		float: right;
		margin-right: 20px;
		width: 70%;
		border: 1px solid #c60000;
		border-radius: 36px;
		font: 11px/11px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #c60000;
		text-align: center;
	}

	::v-deep .cov_location_name .el-input__inner {
		border-radius: 36px;
		background-color: transparent;
		border-width: 3px;
		border-color: #ffffff;
		color: #ffffff;
		text-align: center;
		font-size: 11px;
		height: 30px;
		width: 92%
	}

	::v-deep .cov_location_name .el-input .el-select__caret {
		margin-right: 10px;
		color: #C0C4CC;
		font-size: 14px;
		transition: transform .3s;
		transform: rotateZ(180deg);
		cursor: pointer;
	}

	.toolbox_name {
		margin-top: 20px;
		text-align: center;
		margin-top: 2px;
		margin-bottom: 8px;
		font: 10px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #333;
	}

	.cov_title {
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 20px;
		margin-left: 5px;
		padding-top: 10px;
		margin-bottom: 6px;
	}

	.cov_subtitle {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
		margin-left: 5px;
		margin-bottom: 14px;
	}

	.el-icon-sort {
		transform: rotate(90deg);
		margin-left: 20px;
		margin-right: 15px;
	}

	::v-deep .addressCascader {
		margin-left: 10px;
	}

	::v-deep .el-cascader .el-input .el-input__inner {
		color: white;
		background-color: transparent;
		height: 28px;
		font-size: 13px;
		font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	}

	.content {
		margin-top: 10px;
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 20px;
	}

	/* 中国疫情地图 */
	.title_china {
		margin-top: 10px;
		height: 44px;
		position: relative;
		font: 550 24px/70px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #ffffff;
	}

	.nowButton,
	.totalButton,
	.countryButton,
	.cityButton {
		font-weight: bold;
		font-size: 18px;
		color: white;
	}

	.border-box-content {
		text-align: center;
	}

	::v-deep .el-carousel__item:nth-child(2n) {
		background-color: transparent;
	}

	::v-deep .el-carousel__item:nth-child(2n+1) {
		background-color: transparent;
	}

	::v-deep .multipleTable,
	.el-table__expanded-cell {
		background-color: transparent !important;
	}

	::v-deep .multipleTable th,
	::v-deep .multipleTable tr,
	::v-deep .multipleTable td {
		background-color: transparent !important;
	}

	.testBoard .title {
		margin-top: 10px;
	}

	.areaBoard .title {
		padding-top: 15px;
	}
</style>
