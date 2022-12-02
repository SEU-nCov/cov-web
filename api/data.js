import axios from './axios'

const baseURL = 'http://localhost:9000/'
const AliyunURL = 'https://geo.datav.aliyun.com/'
//const baseURL='http://1.116.226.116:8090/'


// 主页相关
export const getChinaMap = () => {
	return axios.request({
		url: AliyunURL+'areas_v3/bound/100000_full.json',
		method: 'get'
	})
}

// 使用新浪疫情数据接口获取数据
export const getChinaCovData = () => {
	return axios.request({
		//url: '/g2/getOnsInfo?name=disease_h5',
		url:'/ug/api/wuhan/app/data/list-total',
		method: 'get'
	})
}
export const getCityCovData = (code) => {
	return axios.request({
		url:'/newsqa/v1/query/pubished/daily/list?adCode='+code+'&limit=1',
		method: 'get'
	})
}
export const getChinaCovAddData = () => {
	return axios.request({
		url:'/news/wap/fymap2020_data.d.json?_=1580892522427',
		method: 'get'
	})
}
export const getVaccineTopData = () => {
	return axios.request({
		url:'/newsqa/v1/automation/modules/list?modules=VaccineTopData',
		method: 'get'
	})
}

// 核酸检测点相关接口
export const getTests = (param) => {	// 核酸采样点
	return axios.request({
		url: baseURL + 'getNatPointbycity',//admin/CovTest/get
		method: 'post',
		data: param
	})
}

export const searchTestByName = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/getPointsbyname',
		method: 'post',
		data: param
	})
}
export const searchTestByArea = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/getPointsbyarea',
		method: 'post',
		data: param
	})
}
export const filterTest = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/getPointsbyThreeVariable',
		method: 'post',
		data: param
	})
}
// 核酸检测机构相关接口
export const getAllTestPoint = (param) =>{	// 核酸检测机构
	return axios.request({
		url: baseURL + 'admin/get/TestPoint',
		method: 'post',
		data: param
	})
}

export const searchTestPoint = (param) =>{	// 核酸检测机构
	return axios.request({
		url: baseURL + 'admin/get/AreaTestPoint',
		method: 'post',
		data: param
	})
}

// 疫苗接种相关接口
export const searchVaccineByNameDateAddressDose = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/search',
		method: 'post',
		data: param
	})
}
export const getVaccinedPeopleName = () => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/get/peopleName',
		method: 'get'
	})
}
export const getVaccinePointName = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/get/pointName',
		method: 'post',
		data: param
	})
}
export const getVaccineAreaRanking = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/get/vaccineAreaRanking',
		method: 'post',
		data: param
	})
}
export const getCityMap = (code) => {
	return axios.request({
		url: AliyunURL + 'areas_v3/bound/'+code+'_full.json',
		//url: AliyunURL + 'areas_v3/bound/geojson?code='+code+'_full',
		method: 'get'
	})
}
export const getCityVaccinedData = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/get/cityVaccinedData',
		method: 'post',
		data: param
	})
}
export const getVaccinePoints = (param) => {
	return axios.request({
		url: baseURL + 'admin/CovVaccine/get/vaccinedPoints',
		method: 'post',
		data: param
	})
}


//风险区相关
export const getArea = () => {
	return axios.request({
		url: baseURL + 'admin/getAllRiskArea',
		method: 'get'
	})
}




//出行防疫政策相关
export const getPolicy = (param) => {
	return axios.request({
		url: baseURL + 'getTravelPolicy',
		method: 'post',
		data: param
	})
}
export const getSingleCityPolicy = (param) => {
	return axios.request({
		url: baseURL + 'getSingleCityPolicy',
		method: 'post',
		data: param
	})
}

