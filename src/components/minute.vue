<template>
  <div>{{ weather_data.hourly }}</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters(['weather_data']),
    },
  }
</script>

<style>

</style>