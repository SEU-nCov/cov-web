<template>
  <div id="app">
    <big-screen></big-screen>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import BigScreen from './components/BigScreen.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    BigScreen
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
