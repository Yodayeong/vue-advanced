<template>
  <div>
    <div v-for="n in news">{{ n.title }}</div>
  </div>
</template>

<script>
import { fetchNewsList } from '../api/index.js';

export default {
  data() {
    return {
      news: []
    }
  },
  created() {
    console.log('호출 전: ', this)
    //바인딩
    var vm = this;
    fetchNewsList()
      .then(function(response) {
        console.log('호출 후: ', this)
        vm.news = response.data;
      })
      .catch(function(error) {
        console.log(error);
      })
  },
}
</script>

<style>

</style>