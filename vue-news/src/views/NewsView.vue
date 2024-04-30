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
    var vm = this;
    fetchNewsList()
      .then(function(response) {
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