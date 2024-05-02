<template>
  <div>
    <div v-for="a in ask">{{ a.title }}</div>
  </div>
</template>

<script>
import { fetchAskList } from '../api/index.js'

export default {
  data() {
    return {
      ask: []
    }
  },
  //created(): 컴포넌트가 생성되자마자 실행되는 로직이 들어감
  created() {
    fetchAskList()
      .then(response => this.ask = response.data)
      //에러 핸들링에 대한 처리를 catch에서 다 받아줌
      .catch(error => console.log(error))
  }

}
</script>

<style>

</style>