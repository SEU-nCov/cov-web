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
								<dv-border-box-6 :color="['#4798ef','#67a1e5']" style="margin-left:40px;width:65%;">
									<el-button class="totalButton" type="text" @click="totalClick">
										累计确诊
									</el-button>
								</dv-border-box-6>
							</el-col>
							<el-col :span="6"></el-col>
							<el-col :span="6"></el-col>
						</el-row>
					</div>
					<dv-decoration-8 style="width:100%;height:30px;" :color="['#4798ef', '#67a1e5']" />
					<el-card class="cov_card" style="border-radius: 20px;">
						<!-- 选择标签 -->
						<div class="card_tabs">
							<div class="card_tab active" @click="activeTab=true">
								全国疫情数据(含港澳台)
							</div>
							<div class="card_tab" @click="activeTab=false">
								<i></i>江苏疫情数据
							</div>
						</div>
						<!-- 全国疫情数据:六个部分 -->
						<div v-if="this.chinaCovData" v-show="activeTab==true" class="cov_data_china">
							<el-row>
								<el-col class="cov_input" style="background-color: rgb(255,250,247);" :span="8">
									<h4>境外输入</h4>
									<div class="number">{{this.chinaCovData.total.input}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.today.input}}</span></p>
								</el-col>
								<el-col class="cov_nosymptom" style="background-color: rgb(254,247,255);" :span="8">
									<h4>无症状感染者</h4>
									<div class="number">{{this.chinaCovData.extData.noSymptom}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.extData.incrNoSymptom}}</span></p>
								</el-col>
								<el-col class="cov_today_confirm" style="background-color: rgb(255, 244, 244);"
									:span="8">
									<h4 @click="openMessage">现有确诊<i></i></h4>
									<div class="number">
										{{this.chinaCovData.total.confirm-this.chinaCovData.total.dead-this.chinaCovData.total.heal}}
									</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.today.storeConfirm}}</span></p>
								</el-col>
							</el-row>
							<el-row>
								<el-col class="cov_confirm" style="background-color: rgb(255, 247, 247);" :span="8">
									<h4>累计确诊</h4>
									<div class="number">{{this.chinaCovData.total.confirm}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.today.confirm}}</span></p>
								</el-col>
								<el-col class="cov_dead" style="background-color: rgb(243, 246, 248);" :span="8">
									<h4>累计死亡</h4>
									<div class="number">{{this.chinaCovData.total.dead}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.today.dead}}</span></p>
								</el-col>
								<el-col class="cov_heal" style="background-color: #f1f8f4;" :span="8">
									<h4>累计治愈</h4>
									<div class="number">{{this.chinaCovData.total.heal}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.today.heal}}</span></p>
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
								<el-col class="cov_province_confirm" style="background-color: rgb(255, 247, 247);">
									<h4>累计确诊</h4>
									<div class="number">{{this.cityCovData.confirm}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.cityCovData.newConfirm}}</span></p>
								</el-col>
								<el-col class="cov_province_dead" style="background-color: rgb(243, 246, 248);">
									<h4>累计死亡</h4>
									<div class="number">{{this.cityCovData.dead}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.cityCovData.newDead}}</span></p>
								</el-col>
								<el-col class="cov_province_heal" style="background-color: #f1f8f4;">
									<h4>累计治愈</h4>
									<div class="number">{{this.cityCovData.heal}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.cityCovData.newHeal}}</span></p>
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
							<el-row class="cov_more">
								<el-col :span="12">
									<el-select class="cov_location_name" v-model="selecetedProvince" clearable
										filterable placeholder="请选择" @change="getCityCovData">
										<el-option v-for="item in provinces" :key="item.value" :label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="12">
									<el-button class="cov_province_go" size="small" plain round>了解更多
									</el-button>
								</el-col>
							</el-row>
							<el-row class="toolbox">
								<el-col :span="8">
									<el-button type="primary" size="mini" icon="el-icon-s-check" circle
										style="margin-left: 31px;"></el-button>
									<div class="toolbox_name">防疫政策</div>
								</el-col>
								<el-col :span="8">
									<el-button type="danger" size="mini" icon="el-icon-office-building" circle
										style="margin-left: 30px;"></el-button>
									<div class="toolbox_name">疫苗点信息</div>
								</el-col>
								<el-col :span="8">
									<el-button type="warning" size="mini" icon="el-icon-reading" circle
										style="margin-left: 30px;"></el-button>
									<div class="toolbox_name">防疫知识</div>
								</el-col>
							</el-row>
						</div>
					</el-card>
					<el-card class="policy_card" style="border-radius: 12px;">
						</el-image>
						<div class="cov_title">
							出行防疫政策
						</div>
						<div class="cov_subtitle">
							科学防疫·伴你安全出行
						</div>
						<el-card class="header" style="border-radius: 12x;">
							出发地
							<el-cascader v-model="selectedAddressFrom" :options="addressOptions"
								@change="addressFromChange" placeholder="请选择地址" style="width: 40%;">
							</el-cascader>
							<i class="el-icon-sort" @click="addressExchange"></i>
							目的地
							<el-cascader v-model="selectedAddressTo" :options="addressOptions" @change="addressToChange"
								placeholder="请选择地址" style="width: 40%;">
							</el-cascader>
						</el-card>
						<el-card class="From" style="border-radius: 12x;">
							<i class="el-icon-location"></i>
							离开{{this.selectedFromCity}}

							<div v-html="this.fromPolicy" class="content">
								{{this.fromPolicy}}
							</div>
						</el-card>
						<el-card class="To" style="border-radius: 12x;">
							<i class="el-icon-location"></i>
							进入{{this.selectedToCity}}
							<div v-html="this.toPolicy" class="content">
								{{this.toPolicy}}
							</div>
						</el-card>
					</el-card>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="center">
					<div class="title" style="margin-top: 20px;">
						<span class="title-text">大数据可视化平台</span>
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
					</div>
				</div>

			</el-col>
			<el-col :span="8">
				<div class="right">
					<div class='time' style="color: white;margin-top:20px;font-size: 25px;font-weight: 600;">
						{{formatDate(nowTime)}}
					</div>
					<dv-decoration-8 :reverse="true" style="margin-top:5px;width:100%;height:30px;"
						:color="['#4798ef', '#67a1e5']" />
					<!-- 疫苗接种点信息 -->
					<el-carousel :interval="4000" type="card" height="310px">
						<el-carousel-item v-for="item in this.vaccinePoints" :key="item.id">
							<el-card class="ranking-card" style="margin-top: 20px;">
								<el-descriptions :title="item.vac_pointname" :column="1" size="large">
									<el-descriptions-item label="地址">{{item.location}}</el-descriptions-item>
									<el-descriptions-item label="开放时间">{{item.open_time}}</el-descriptions-item>
									<el-descriptions-item label="电话">{{item.vac_pointphone}}</el-descriptions-item>
									<el-descriptions-item label="疫苗品种">
										<div v-if="item.vac_kind">
											<el-tag v-show="item.vac_kind.indexOf('0')!=-1" size="mini">武汉生物</el-tag>
											<el-tag v-show="item.vac_kind.indexOf('1')!=-1" size="mini">北京科兴</el-tag>
											<el-tag v-show="item.vac_kind.indexOf('2')!=-1" size="mini">北京生物</el-tag>
											<el-tag v-show="item.vac_kind.indexOf('3')!=-1" size="mini">成都生物</el-tag>
											<el-tag v-show="item.vac_kind.indexOf('4')!=-1" size="mini">长春生物</el-tag>
										</div>
									</el-descriptions-item>
									<el-descriptions-item label="备注">{{item.vac_extraInfo}}</el-descriptions-item>
								</el-descriptions>
							</el-card>
						</el-carousel-item>
					</el-carousel>
					<!-- 核酸点 -->
					<el-card style="margin-top: 20px;border-radius: 12px;">
						<el-table ref="multipleTable"
							:data="testingSites.slice((currentPage-1)*pageSize,currentPage*pageSize)"
							style="width: 100%">
							<el-table-column type="expand">
								<template slot-scope="props">
									<el-form label-position="left" inline class="demo-table-expand">
										<el-form-item label="核酸采样点名称">
											<span>{{ props.row.name }}</span>
										</el-form-item>
										<el-form-item label="地址">
											<span>{{ props.row.province+props.row.city+props.row.address }}</span>
										</el-form-item>
										<!-- 公立;民营;临时 -->
										<el-form-item label="采样点类型">
											<el-tag
												:type="props.row.type == '0' ? 'primary' : props.row.type == '1' ? 'success' : 'warning'"
												disable-transitions>
												{{props.row.type == '0' ?'公立':props.row.type == '1' ?'民营':'临时'}}
											</el-tag>
										</el-form-item>
										<!-- 6小时出报告,12小时出报告,24小时出报告 -->
										<el-form-item label="出报告时间">
											<span>{{ props.row.turnaroundTime =='0'?'6小时出报告':props.row.turnaroundTime =='1'?'12小时出报告':'24小时出报告' }}</span>
										</el-form-item>
										<!-- 可线上预约 -->
										<el-form-item label="是否可预约">
											<span>{{ props.row.reservation=='1'? "可线上预约":"否" }}</span>
										</el-form-item>
										<!-- 例:周一至周日8:30-11:00,14:00-16:00 -->
										<el-form-item label="营业时间">
											<span>{{ props.row.openingTime }}</span>
										</el-form-item>
										<!-- 例:52721644 -->
										<el-form-item label="电话">
											<span>{{ props.row.telephone }}</span>
										</el-form-item>
										<!-- 例:只做应检尽检 -->
										<el-form-item label="备注">
											<span>{{ props.row.extraInfo }}</span>
										</el-form-item>
									</el-form>
								</template>
							</el-table-column>
							<el-table-column prop="name" label="核酸采样点名称">
							</el-table-column>
							<el-table-column prop="province" label="省份" width="80">
							</el-table-column>
							<el-table-column prop="city" label="市" width="80">
							</el-table-column>
							<el-table-column prop="area" label="区" width="80">
							</el-table-column>
							<el-table-column prop="address" label="地址">
							</el-table-column>
						</el-table>
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper" :total="testingSites.length">
						</el-pagination>
					</el-card>
					<!-- 风险区-->
					<el-card class="area_card" style="border-radius: 12px;margin-top:10px ;">
						<el-table class="content" :data="areaData" style="width: 100%">
							<el-table-column fixed="left" label="操作" width="100">
								<template slot-scope="scope">
									<el-button @click="doEdit(scope.row)" size="mini" icon="el-icon-edit" type="text"
										style="color: #00007f;">
									</el-button>
									<el-button @click="doDelete(scope.row)" size="mini" icon="el-icon-delete"
										type="text" style="color: #00007f;">
									</el-button>
								</template>
							</el-table-column>
							<el-table-column prop="level" label="等级" sortable width="120">
							</el-table-column>
							<el-table-column prop="area" label="区域" sortable width="120">
							</el-table-column>
							<el-table-column prop="address" label="具体位置">
							</el-table-column>
						</el-table>
					</el-card>
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
				selecetedProvince: '320000',
				city_code: '320100',
				provinces: [{
					value: '110000',
					label: '北京市'
				}, {
					value: '120000',
					label: '天津市'
				}, {
					value: '130000',
					label: '河北省'
				}, {
					value: '140000',
					label: '山西省'
				}, {
					value: '150000',
					label: '内蒙古'
				}, {
					value: '210000',
					label: '辽宁省'
				}, {
					value: '220000',
					label: '吉林省'
				}, {
					value: '230000',
					label: '黑龙江省'
				}, {
					value: '310000',
					label: '上海市'
				}, {
					value: '320000',
					label: '江苏省'
				}, {
					value: '330000',
					label: '浙江省'
				}, {
					value: '340000',
					label: '安徽省'
				}, {
					value: '350000',
					label: '福建省'
				}, {
					value: '360000',
					label: '江西省'
				}, {
					value: '370000',
					label: '山东省'
				}, {
					value: '410000',
					label: '河南省'
				}, {
					value: '420000',
					label: '湖北省'
				}, {
					value: '430000',
					label: '湖南省'
				}, {
					value: '440000',
					label: '广东省'
				}, {
					value: '450000',
					label: '广西省'
				}, {
					value: '460000',
					label: '海南省'
				}, {
					value: '500000',
					label: '重庆市'
				}, {
					value: '510000',
					label: '四川省'
				}, {
					value: '520000',
					label: '贵州省'
				}, {
					value: '530000',
					label: '云南省'
				}, {
					value: '540000',
					label: '西藏'
				}, {
					value: '610000',
					label: '陕西省'
				}, {
					value: '620000',
					label: '甘肃省'
				}, {
					value: '630000',
					label: '青海省'
				}, {
					value: '640000',
					label: '宁夏'
				}, {
					value: '650000',
					label: '新疆'
				}, {
					value: '710000',
					label: '台湾省'
				}, {
					value: '810000',
					label: '香港'
				}, {
					value: '820000',
					label: '澳门'
				}],
				chinaCovData: undefined,
				chinaCovAddData: undefined,
				cityCovData: {},
				mapAirDataNow: [],
				mapAirDataTotal: [],
				chinaMap: '',
				chinaMapNext: '',
				nowType: 'danger',
				totalType: '',
				vaccineTopData: undefined,
				chinaTotalVaccinations: "-",
				chinaNewVaccinations: "-",
				chinaVaccinationsPer100: "-",
				worldTotalVaccinations: "-",
				worldNewVaccinations: "-",
				worldVaccinationsPer100: "-",
				addressOptions: provinceAndCityData,
				selectedFromCity: '南京市',
				selectedFromCode: 320000,
				selectedToCity: '南京市',
				selectedToCode: 320000,
				selectedAddressFrom: ['320000', '320100'],
				selectedAddressTo: undefined,
				fromPolicy: '在京党政机关、国有企事业单位人员带头执行，除重要公务活动需要外原则上不出京，确需出京的严格审批管理。提倡市民群众减少出京活动，确需出京的，要防范旅途疫情风险，全程规范佩戴口罩，做好个人防护，不前往有疫情的县（市、区、旗）。如途中出现涉疫风险，就地配合落实防疫措施，暂缓进返京。严控本地中高风险区及其他涉疫风险人员出京。',
				toPolicy: '1.加强机场口岸防疫管理，严格落实入境人员和高风险岗位工作人员全流程闭环管理要求。入境人员严格执行“7天集中隔离+3天居家健康监测”措施。<br><br>2.7天内出现本土疫情的县（市、区、旗）人员严格限制进返京，已抵京的分类落实隔离观察、健康监测、核酸检测等措施，居家期间不外出。其他人员持48小时内核酸阴性证明和“北京健康宝”绿码正常进返京，在抵京后以及出现涉疫风险、疑似症状时，都要第一时间通过电话、微信等方式主动向社区（村）、酒店或单位报告，本人及同住人员配合做好排查管理、健康监测。<br><br>3.进返京人员抵京后居家健康监测3天，开展3天2检（抵京24小时内完成一次核酸检测，间隔24小时后、抵京72小时内完成第二次核酸检测），7天内不聚餐、不聚会、不前往人群密集场所。涉疫风险人员配合落实居家（店）健康监测等防疫措施。居家隔离、居家健康监测及其同住人员，要严格居家、不外出。<br><br>4.严格落实快递、外卖、冷链、医疗机构等重点行业、重点场所、重点区域人群常态化核酸筛查，确保“应检尽检”。进入党政机关、企事业单位、公共场所及社区（村），乘坐公共交通工具，严格扫码、测温、查验72小时内核酸检测阴性证明。各小区（村）加强卡口管理，严格落实查验要求。<br><br>5.压实疫情防控“四方责任”。各行业主管部门坚持“管行业必须管防疫、管业务必须管防疫”，加强日常检查指导，发现问题及时督促整改。在京单位严格落实防疫主体责任，动态完善人员台账，强化内部管理，抓实抓细各项防疫措施。各区对属地疫情防控工作负总责，统筹各方资源力量，确保各项防疫措施落实落位。个人要当好自身健康管理第一责任人，主动报告个人涉疫情况，自觉履行核酸检测、扫码查验等防疫义务。对于违反首都防疫政策，造成不良后果的，依法追究责任并通报曝光。',
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
				pageSize: 10,
				
				areaData: [{
					id: 0,
					level: '高风险区',
					area: '北京',
					address: '丰台区太平桥街道精图雅苑'
				}, {
					id: 1,
					level: '高风险区',
					area: '北京',
					address: '大兴区亦庄（地区）镇三羊里小区11-31号楼'
				}, {
					id: 2,
					level: '高风险区',
					area: '北京',
					address: '大兴区亦庄（地区）镇三羊里小区11-31号楼'
				}, {
					id: 3,
					level: '高风险区',
					area: '北京',
					address: '大兴区亦庄（地区）镇三羊里小区11-31号楼'
				}]
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
					this.chinaCovDataOld = res.data.data.chinaDayList[58];
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
				});
			},
			getCityCovData() {
				getCityCovData(this.selecetedProvince).then(res => {
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
			nowClick() {
				this.nowType = 'danger';
				this.totalType = '';
				this.drawMap(this.mapAirDataNow);
			},
			totalClick() {
				this.nowType = '';
				this.totalType = 'danger';
				this.drawMap(this.mapAirDataTotal);
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
				getTests(this.city_code).then(res => {
					var resdata = Array.from(res.data.data);
					this.testingSites = resdata.map(item => {
						return {
							id: item.nat_pointid,
							name: item.nat_pointname,
							province: CodeToText[Math.floor(item.city_code / 10000) * 10000], //省级
							city: CodeToText[item.city_code], //市级
							area: CodeToText[item.area_code], //区级
							address: item.location,
							type: item.nat_type,
							turnaroundTime: item.nat_turnaroundTime,
							openingTime: item.open_time,
							telephone: item.nat_pointphone,
							reservation: item.nat_reservation,
							extraInfo: item.nat_extraInfo
						}
					});
					// this.testPointNames = resdata.map(item => {
					// 	return {
					// 		value: item.nat_pointname
					// 	}
					// });
				});
			},
			getRiskArea() {
				getArea().then((res) => {
					this.areaData = res.data.data.map(item => {
						return {
							id: item.risk_id,
							level: item.risk_level == 2 ? '高风险区' : item.risk_level == 1 ? '中风险区' : '低风险区',
							address: item.risk_address,
							area: CodeToText[item.area_code]
						}
					});
				});
			},
		},
		created() {
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
		float: left;
		position: relative;
		width: 33.3%;
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
		font: 700 15px/10px DIN Alternate, din_alternate_bold, -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
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
		color: #999;
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
		margin-bottom: -1px;
		margin-left: 3px;
		width: 10px;
		height: 10px;
		background: url(https://mat1.gtimg.com/news/worldvaccine/question.png);
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
	.cov_card .cov_province_dead h4 {
		text-align: center;
		font: 12px/15px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		font-weight: normal;
		font-weight: 600;
		color: #333;
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
	.cov_card .cov_province_dead .number {
		color: #333;
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
		width: 50%;
		margin-left: 12px;
		margin-top: 5px;
		margin-bottom: 5px;
		font-size: 11px;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		color: #999999;
	}

	.foot {
		float: right;
		width: 30%;
		font-size: 11px;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		color: #7c7c7c;
		text-align: center;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.cov_more {
		margin-top: 5px;
		margin-bottom: 10px;
	}

	/* 白色框框 */
	::v-deep .cov_card .cov_location_name {
		margin-left: 25px;
		border-radius: 40px;
		width: 80%;
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
		margin-top: 1px;
		border-radius: 36px;
		border-color: #8e8ec1;
		color: #1a418c;
		text-align: center;
		font-size: 11px;
		height: 30px;
		width: 92%
	}

	::v-deep .cov_location_name .el-input .el-select__caret {
		margin-right: 10px;
		margin-top: 5px;
		color: #C0C4CC;
		font-size: 14px;
		transition: transform .3s;
		transform: rotateZ(180deg);
		cursor: pointer;
	}

	.toolbox_name {
		text-align: center;
		margin-top: 2px;
		margin-bottom: 8px;
		font: 10px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #333;
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
	.totalButton {
		font-weight: bold;
		font-size: 18px;
		color: white;
	}
</style>
