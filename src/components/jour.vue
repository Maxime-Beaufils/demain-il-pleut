<template>
  <div>jour : {{ weather_data.data.daily }}</div>
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