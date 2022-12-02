<template>
  <div>
    数字大屏
    <el-button @click="test()"></el-button>
  </div>
</template>

<script>
import {getTests} from '../../api/data'
export default {
  data(){
    return {
      city_code:'320100'
    }
  },
  methods:{
    test(){
      getTests(this.city_code).then((res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>