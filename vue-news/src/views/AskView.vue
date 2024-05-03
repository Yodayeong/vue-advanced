<template>
  <div>
    <div v-for="a in this.$store.state.ask">{{ a.title }}</div>
  </div>
</template>

<script>

export default {
  created() {
    this.$store.dispatch('FETCH_ASK');
  },
}
</script>

<style>

</style>