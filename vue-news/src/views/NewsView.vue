<template>
  <div>
    <p v-for="item in fetchedNews">
      <a v-bind:href="item.url">{{ item.title }}</a>
      <small>{{ item.time_ago }} by {{ item.user }}</small>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      fetchedNews: 'fetchedNews'
    }),
  },
  created() {
    this.$store.dispatch('FETCH_NEWS');
  },
}
</script>

<style>

</style>