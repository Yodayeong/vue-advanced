<template>
  <div>
    <p v-for="item in fetchedAsk">
      <a v-bind:href="item.url">{{ item.title }}</a>
      <small>{{ item.time_ago }} by {{ item.user }}</small>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      //vuex의 state.ask를 ask에 담은 것
      fetchedAsk: state => state.ask
    }),
  },
  created() {
    this.$store.dispatch('FETCH_ASK');
  },
}
</script>

<style>

</style>