<template>
  <div><p>minute</p>{{ weather_data.data.minutely }}</div>
  
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